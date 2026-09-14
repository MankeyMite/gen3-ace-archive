// Parallel wrapper for the pinned FRLG default builder.
// Usage: node scripts/build-frlg-defaults-parallel.cjs [engine.js] [exit.txt]
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { spawn } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const enginePath = path.resolve(process.argv[2] || path.join(root, '.tmp-frlg', 'ace_js.bc.js'));
const exitPath = path.resolve(process.argv[3] || path.join(root, '.tmp-frlg', 'exit.txt'));
const context = {window: {ACE_CUSTOM_CONTENT: {codes: []}}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'data', 'frlg-source-codes.js'), 'utf8'), context);
const codes = context.window.ACE_CUSTOM_CONTENT.codes;
if (codes.length !== 77) throw new Error('Expected 77 FRLG entries');
const total = codes.reduce((sum, code) => sum + Object.keys(code.variants).length, 0);
const workerCount = Math.min(8, codes.length);
const ranges = [];
let start = 0;
let sum = 0;
for (let index = 0; index < codes.length; index++) {
  sum += Object.keys(codes[index].variants).length;
  const threshold = total * (ranges.length + 1) / workerCount;
  if (ranges.length < workerCount - 1 && sum >= threshold && index + 1 < codes.length) {
    ranges.push([start, index + 1]);
    start = index + 1;
  }
}
ranges.push([start, codes.length]);

function runWorker(startIndex, endIndex, index) {
  return new Promise((resolve, reject) => {
    const part = path.join(root, '.tmp-frlg', `part-${index}.json`);
    const child = spawn(process.execPath, [path.join(__dirname, 'build-frlg-defaults.cjs'), enginePath, exitPath], {
      cwd: root,
      windowsHide: true,
      env: {...process.env, FRLG_START: String(startIndex), FRLG_END: String(endIndex), FRLG_PARTIAL: part},
    });
    let errors = '';
    child.stdout.on('data', chunk => process.stdout.write(`[${index + 1}] ${chunk}`));
    child.stderr.on('data', chunk => { errors += chunk; process.stderr.write(`[${index + 1}] ${chunk}`); });
    child.on('error', reject);
    child.on('close', code => code === 0 ? resolve(JSON.parse(fs.readFileSync(part, 'utf8'))) : reject(new Error(`Worker ${index + 1} failed (${code}): ${errors}`)));
  });
}

(async () => {
  console.log(`Building ${total} setup defaults with ${ranges.length} workers`);
  const parts = await Promise.all(ranges.map(([first, last], index) => runWorker(first, last, index)));
  const outputs = [];
  const outputIndexes = new Map();
  const variants = {};
  let combinations = 0;
  for (const part of parts) {
    combinations += part.combinations;
    for (const [id, mapping] of Object.entries(part.variants)) {
      variants[id] = {};
      for (const [key, oldIndex] of Object.entries(mapping)) {
        const output = part.outputs[oldIndex];
        const outputKey = JSON.stringify(output);
        if (!outputIndexes.has(outputKey)) {
          outputIndexes.set(outputKey, outputs.length);
          outputs.push(output);
        }
        variants[id][key] = outputIndexes.get(outputKey);
      }
    }
  }
  if (combinations !== total || Object.keys(variants).length !== codes.length) throw new Error('Incomplete parallel FRLG output');
  const warnings = Object.entries(variants).flatMap(([id, mapping]) =>
    Object.entries(mapping).filter(([, index]) => outputs[index].warning).map(([key]) => `${id} ${key}`));
  const text = `/* Generated from the supplied FRLG source collection with SHA-256 pinned E-Sh4rk assets.\n` +
    ` * Rebuild with: node scripts/build-frlg-defaults-parallel.cjs engine.js exit.txt\n` +
    ` * Engine: 1111FD19EDA81AF7742F402607334CAC657084BD27CE3090BD00DA869154C6F5; exit definitions: AAD1146578486030176BBB848A70C5322698ECA206227210F51EF965EE9B24E8. */\n` +
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
  console.log(JSON.stringify({entries: codes.length, combinations, uniqueOutputs: outputs.length, warnings}, null, 2));
})().catch(error => { console.error(error); process.exitCode = 1; });
