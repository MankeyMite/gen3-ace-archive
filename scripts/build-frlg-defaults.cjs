// Precompute box names from the supplied FRLG sources with the pinned official engine.
// Usage: node scripts/build-frlg-defaults.cjs [engine.js] [exit.txt]
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const enginePath = path.resolve(process.argv[2] || path.join(root, '.tmp-frlg', 'ace_js.bc.js'));
const exitPath = path.resolve(process.argv[3] || path.join(root, '.tmp-frlg', 'exit.txt'));
const expectedEngine = '1111FD19EDA81AF7742F402607334CAC657084BD27CE3090BD00DA869154C6F5';
const expectedExit = 'AAD1146578486030176BBB848A70C5322698ECA206227210F51EF965EE9B24E8';
function verifiedText(file, expected) {
  const bytes = fs.readFileSync(file);
  const hash = crypto.createHash('sha256').update(bytes).digest('hex').toUpperCase();
  if (hash !== expected) throw new Error(`Unexpected SHA-256 for ${file}: ${hash}`);
  return bytes.toString('utf8');
}
verifiedText(enginePath, expectedEngine);
const exitCodes = verifiedText(exitPath, expectedExit);
const engine = require(enginePath).aceGen;
const context = {window: {ACE_CUSTOM_CONTENT: {codes: []}}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'data', 'frlg-source-codes.js'), 'utf8'), context);
const codes = context.window.ACE_CUSTOM_CONTENT.codes;
if (codes.length !== 77) throw new Error(`Expected 77 FRLG entries, got ${codes.length}`);
const start = Number(process.env.FRLG_START || 0);
const end = Number(process.env.FRLG_END || codes.length);
const selectedCodes = codes.slice(start, end);

function sourceFor(variant, platform) {
  const language = variant.generatorLanguage;
  const game = variant.generatorGame;
  return variant.generatorSource.map(line => platform === 'switch' ? String(line) : String(line).replace(
    /^(\s*(?:old_emu|inaccurate_emu|aligned_pc)\s*=\s*)(!!)?\d+(\s*(?:(?:;|\/\/|%%).*)?)$/,
    (_, prefix, booleanCast = '', suffix) => `${prefix}${booleanCast}${platform === 'inaccurate' ? 1 : 0}${suffix}`,
  )).join('\n')
    .replaceAll('POKEMON @input:species', '1 @input:species')
    .replaceAll('{LANG}', language.toUpperCase()).replaceAll('{lang}', language)
    .replaceAll('{LANGNR}', language.slice(0, 3).toUpperCase()).replaceAll('{langnr}', language.slice(0, 3))
    .replaceAll('{GAME}', game.toUpperCase()).replaceAll('{game}', game);
}

function boxNames(output, label) {
  const names = [...output.matchAll(/^Box\s*(\d+):[^\r\n]*?\[([^\]\r\n]*)\]/gm)]
    .map((match) => ({number: Number(match[1]), name: match[2]}));
  if (!names.length) return {
    lines: [],
    warning: `The supplied source could not generate box names for this setup: ${output.trim().slice(-120)}`,
  };
  if (names.some((line, index) => line.number !== index + 1 || line.number > 14 || [...line.name].length > 8)) {
    throw new Error(`${label}: malformed box names`);
  }
  return {
    lines: names.map(line => `Box ${line.number}: [${line.name}]`),
    warning: names.some(line => line.name.includes('✖'))
      ? 'The supplied source default contains an unwritable box-name glyph. Do not enter or copy this output.' : '',
  };
}

const outputs = [];
const outputIndexes = new Map();
const builds = new Map();
const variants = {};
let combinations = 0;
for (const code of selectedCodes) {
  const mapping = {};
  for (const [key, variant] of Object.entries(code.variants)) {
    const platform = key.split('|')[2];
    const source = sourceFor(variant, platform);
    const signature = JSON.stringify([variant.generatorLanguage, variant.generatorGame, source]);
    let result = builds.get(signature);
    if (!result) {
      try {
        result = boxNames(engine.build(variant.generatorLanguage, variant.generatorGame, source, exitCodes)[1], `${code.id} ${key}`);
      } catch (error) {
        result = {lines: [], warning: `The supplied source could not generate box names for this setup: ${String(error).slice(0, 120)}`};
      }
      builds.set(signature, result);
    }
    const outputKey = JSON.stringify(result);
    if (!outputIndexes.has(outputKey)) {
      outputIndexes.set(outputKey, outputs.length);
      outputs.push(result);
    }
    mapping[key] = outputIndexes.get(outputKey);
    combinations++;
  }
  variants[code.id] = mapping;
  if (Object.keys(variants).length % 10 === 0) {
    console.log(`Processed ${Object.keys(variants).length}/${selectedCodes.length} entries (${builds.size} unique builds)`);
  }
}
if (process.env.FRLG_PARTIAL) {
  fs.writeFileSync(path.resolve(process.env.FRLG_PARTIAL), JSON.stringify({outputs, variants, combinations, builds: builds.size}), 'utf8');
  console.log(`Finished entries ${start + 1}-${end}: ${combinations} setups`);
  process.exit(0);
}
const warnings = Object.entries(variants).flatMap(([id, mapping]) =>
  Object.entries(mapping).filter(([, index]) => outputs[index].warning).map(([key]) => `${id} ${key}`));
const text = `/* Generated from the supplied FRLG source collection with SHA-256 pinned E-Sh4rk assets.\n` +
  ` * Rebuild with: node scripts/build-frlg-defaults.cjs engine.js exit.txt\n` +
  ` * Engine: ${expectedEngine}; exit definitions: ${expectedExit}. */\n` +
  `const FRLG_DEFAULT_OUTPUTS = ${JSON.stringify(outputs)};\n` +
  `const FRLG_DEFAULT_VARIANTS = ${JSON.stringify(variants)};\n` +
  `for (const code of window.ACE_CUSTOM_CONTENT.codes) {\n` +
  `  const mapping = FRLG_DEFAULT_VARIANTS[code.id];\n` +
  `  if (!mapping) continue;\n` +
  `  for (const [key, index] of Object.entries(mapping)) {\n` +
  `    const variant = code.variants[key];\n` +
  `    if (!variant) throw new Error('Missing FRLG variant: ' + code.id + ' ' + key);\n` +
  `    variant.defaultBoxNames = FRLG_DEFAULT_OUTPUTS[index].lines;\n` +
  `    variant.defaultWarning = FRLG_DEFAULT_OUTPUTS[index].warning;\n` +
  `  }\n` +
  `}\n`;
fs.writeFileSync(path.join(root, 'data', 'frlg-default-codes.js'), text, 'utf8');
console.log(JSON.stringify({entries: codes.length, combinations, builds: builds.size, uniqueOutputs: outputs.length, warnings}, null, 2));
