// Run with: node tests/compatibility.cjs (no dependencies or network).
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const storage = new Map();
const context = {
  window: { location: { href: 'http://localhost/?game=emerald' } }, URL,
  localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) },
  document: { querySelector: () => ({ querySelector: () => ({}) }) },
};
vm.createContext(context);
vm.runInContext(read('data/catalog.js'), context);
vm.runInContext(read('data/custom-codes.js'), context);
vm.runInContext(read('data/eshark-codes.js'), context);
// Load the actual application functions, stopping before DOM event wiring.
const app = read('app.js');
const end = app.indexOf('  elements.categories.addEventListener');
assert.ok(end > 0);
vm.runInContext(app.slice(0, end) + '\nwindow.testAPI = {state, catalog, elements, updateThirdSelector, updateLanguageSelection, getVariant, resolveVariant, isCompatible, sourceCodeFor, codeShareUrl, tabShareUrl, guideShareUrl, parseCodeLine, renderCodeLine, compactCodeForClipboard, variantCodeBlocks};\n})();', context);
const api = context.window.testAPI;
const codes = api.catalog.codes;
assert.equal(new Set(codes.map(c => c.id)).size, codes.length, 'Unique merged code IDs');
const rawCodes = context.window.ACE_CUSTOM_CONTENT.codes;
assert.equal(new Set(rawCodes.map(c => c.id)).size, rawCodes.length, 'Unique custom IDs including tombstones');
const esharkCodes = rawCodes.filter(code => code.id.startsWith('eshark-'));
assert.equal(esharkCodes.length, 64, 'All 64 document codes are imported');
for (const code of esharkCodes) {
  assert.deepEqual([...code.languages].sort(), ['de', 'en', 'es', 'fr', 'it'], `${code.id}: all non-Japanese Emerald languages`);
}
let combinations = 0, transcriptions = 0;
for (const code of codes) {
  assert.ok(!code.languages.some(l => ['1.0', '1.1'].includes(l)), code.id + ': revisions are not languages');
  if (code.id.startsWith('mettrich-')) assert.ok(code.games.every(g => ['emerald', 'firered', 'leafgreen'].includes(g)), 'Import scope');
  for (const key of Object.keys(code.variants || {})) {
    const parts = key.split('|');
    if (['firered', 'leafgreen'].includes(parts[0])) {
      assert.equal(parts.length, 4, key);
      assert.ok(code.revisions.includes(parts[3]), key);
      if (parts[2] === 'switch') assert.equal(parts[3], '1.1', key);
    }
  }
  for (const game of code.games) for (const language of code.languages) for (const platform of code.platforms) {
    for (const revision of ['firered', 'leafgreen'].includes(game) ? ['1.0', '1.1'] : ['1.1']) {
      Object.assign(api.state, { game, language, platform, revision });
      const compatible = api.isCompatible(code);
      const variant = api.resolveVariant(code);
      if (code.verificationStatus === 'needs-verification') { assert.equal(compatible, false); continue; }
      if (['firered', 'leafgreen'].includes(game)) {
        const expected = code.revisions?.includes(revision) && !(platform === 'switch' && revision !== '1.1')
          && Boolean(code.variants[`${game}|${language}|${platform}|${revision}`] || code.variants[`${game}|${language}|*|${revision}`]);
        assert.equal(compatible, Boolean(expected), `${code.id}: ${game}|${language}|${platform}|${revision}`);
      }
      if (!compatible) continue;
      combinations++;
      assert.ok(api.variantCodeBlocks(variant).length, code.id + ': compatible code has output');
      const source = api.sourceCodeFor(code).join('\n');
      if (code.sourceLanguageValues?.[language] !== undefined) {
        assert.match(source, new RegExp('^lang\\s*=\\s*' + code.sourceLanguageValues[language] + '\\s*$', 'm'), code.id + ': source language selection');
      }
      if (/^(?:old_emu|inaccurate_emu|aligned_pc)\s*=/m.test(source) && (code.id.startsWith('mettrich-') || code.sourcePlatformValues)) {
        assert.equal(code.sourcePlatformValues?.[platform], platform === 'accurate' ? 0 : 1, code.id);
        assert.match(source, new RegExp('^(?:old_emu|inaccurate_emu|aligned_pc)\\s*=\\s*' + (platform === 'accurate' ? 0 : 1) + '(?:\\s*(?:;|//).*)?$', 'm'), code.id);
      }
      for (const block of api.variantCodeBlocks(variant)) for (const line of block.template) {
        const m = line.match(/^Box\s+\d+:[ \t]*(.*?)[ \t]*\[([^\]]*)\]/);
        if (!m) continue;
        assert.equal(m[1].replace(/[ \t]/g, '').replace(/_/g, ' '), m[2].replace(/_/g, ' '), `${code.id}: ${line}`);
        transcriptions++;
      }
    }
  }
}
const byId = id => codes.find(c => c.id === id);
const compactBox = (code, setup, number, block = 0) => {
  Object.assign(api.state, setup);
  const line = api.variantCodeBlocks(api.getVariant(code))[block].template.find(l => new RegExp('^Box\\s+' + number + ':').test(l));
  return line.match(/\[([^\]]*)\]/)[1];
};
const enAcc = { game: 'emerald', language: 'en', platform: 'accurate', revision: '1.1' };
const enOld = { ...enAcc, platform: 'inaccurate' };
const stable = byId('local-stable-ace-species-0x410e-1783794759018');
assert.equal(compactBox(stable, enAcc, 2), ' Rn–BUnP');
assert.equal(compactBox(stable, enOld, 2), ' Rn–BUnQ');
assert.equal(compactBox(stable, enAcc, 3), '9q/wQmBR');
assert.equal(compactBox(stable, enOld, 3), '9qBwQmBR');
const badges = byId('mettrich-get-all-badges-emerald');
assert.equal(compactBox(badges, enAcc, 1), '–BUn,Hgm');
assert.equal(compactBox(badges, enOld, 1), '–BUn/Hgm');
const mirage = byId('mettrich-make-mirage-island-appear-emerald');
assert.equal(compactBox(mirage, enAcc, 3), 'AAATgm');
assert.equal(compactBox(mirage, enAcc, 4), 'ACKPm');
assert.equal(compactBox(mirage, enOld, 3), 'AACTgm');
assert.equal(compactBox(mirage, enOld, 4), 'AEKPm');
const pidTid = byId('eshark-change-pokemon-pid-or-tid-emerald');
assert.equal(compactBox(pidTid, enAcc, 1), 'C.Un6 9n');
assert.equal(compactBox(pidTid, enOld, 1), 'C.Un8 9n');
Object.assign(api.state, enOld);
assert.match(api.sourceCodeFor(pidTid).join('\n'), /^aligned_pc\s*=\s*1\s*\/\//m);
const certificateBootstrap = byId('eshark-certificate-exit-code-bootstrap-emerald');
assert.deepEqual([...certificateBootstrap.platforms], ['accurate']);
const dex = byId('mettrich-dexreg-base64-payload');
assert.doesNotMatch(api.renderCodeLine('Box 2: A A O F 9 q [AAOF9q] ← for old emulators, replace "M" with "O"'), /old emulators|replace/i, 'Device-specific replacement helper is hidden');
assert.match(api.renderCodeLine('Box 4: A 0 I m o [A0Imo] ← zero, not an "O"'), /zero, not an/, 'Non-device transcription help remains visible');
for (const game of ['firered', 'leafgreen']) for (const platform of ['accurate', 'inaccurate']) {
  assert.equal(compactBox(dex, {game, language:'en', platform, revision:'1.0'}, 4), 'n0avBwUI');
  assert.equal(compactBox(dex, {game, language:'en', platform, revision:'1.1'}, 4), 'n0bDBwUI');
}
assert.equal(compactBox(dex, {game:'firered', language:'en', platform:'switch', revision:'1.1'}, 4), 'n0ZnPwUI');
assert.equal(compactBox(dex, {game:'leafgreen', language:'es', platform:'switch', revision:'1.1'}, 4), 'n0bXQAUI');
assert.equal(compactBox(dex, {game:'emerald', language:'ja', platform:'accurate'}, 4), 'ｈ０ａｒｒｇｃＩ');
assert.equal(compactBox(dex, {game:'emerald', language:'ja', platform:'inaccurate'}, 5), 'Ａ　');
assert.equal(api.resolveVariant(dex, {game:'leafgreen', language:'en', platform:'switch', revision:'1.1'}), null);
assert.equal(api.resolveVariant(dex, {game:'firered', language:'en', platform:'switch', revision:'1.0'}), null);
const fixture = {games:['firered'], languages:['en'], platforms:['accurate'], variants:{default:{template:['Box 1: WRONG']}}};
Object.assign(api.state, {game:'firered', language:'en', platform:'accurate', revision:'1.0'});
assert.equal(api.isCompatible(fixture), false, 'Unknown revision cannot fall back to a default');
fixture.revisions = ['1.1'];
assert.equal(api.isCompatible(fixture), false, 'Wrong revision excluded');
assert.equal(api.resolveVariant(fixture), null, 'Legacy defaults cannot mask missing revision output');
assert.equal(api.codeShareUrl('example').searchParams.get('revision'), '1.0');
assert.equal(api.codeShareUrl('example').searchParams.get('language'), 'en');
assert.equal(api.tabShareUrl('codes').searchParams.get('revision'), '1.0');
Object.assign(api.state, {platform:'switch'});
assert.equal(api.codeShareUrl('example').searchParams.get('revision'), '1.1');
assert.equal(api.guideShareUrl('example').searchParams.has('revision'), false);
Object.assign(api.state, enAcc);
assert.equal(api.codeShareUrl('example').searchParams.has('revision'), false);
assert.equal(api.resolveVariant({variants:{'emerald|en|accurate':{template:['legacy']}}}).template[0], 'legacy');
const japanese = byId('mettrich-weldr-japanese-emerald').variants.default.template[12];
assert.equal(api.parseCodeLine(japanese).body, 'ムぬあぉｔｓ　　');
assert.equal(api.compactCodeForClipboard(japanese), 'Box 13: ムぬあぉｔｓ　　');
assert.equal(api.compactCodeForClipboard('Box 13:ムぬあぉｔｓ　　'), 'Box 13: ムぬあぉｔｓ　　', 'Copying rendered output retains Japanese trailing spaces');
assert.equal(api.compactCodeForClipboard('Box 1: A Q D ? P w _ _\t[AQD?Pw  ]'), 'Box 1: AQD?Pw__');
for (const game of ['firered', 'leafgreen']) for (const platform of ['accurate', 'inaccurate']) {
  Object.assign(api.state, {game, platform});
  api.updateThirdSelector();
  assert.equal(api.elements.languageLabel.textContent, 'Language');
  for (const language of api.catalog.languages) for (const revision of ['1.0', '1.1']) {
    const value = `${language.id}|${revision}`;
    assert.ok(api.elements.language.innerHTML.includes(`<option value="${value}">${language.name} ${revision}</option>`));
    api.updateLanguageSelection(value);
    assert.equal(api.elements.language.value, value);
    assert.equal(api.state.language, language.id);
    assert.equal(api.state.revision, revision);
    assert.equal(storage.get('ace-language'), language.id);
    assert.equal(storage.get('ace-revision'), revision);
    assert.equal(api.codeShareUrl('example').searchParams.get('language'), language.id);
    assert.equal(api.codeShareUrl('example').searchParams.get('revision'), revision);
    assert.ok(api.elements.status.innerHTML.includes(`${language.name} · ROM ${revision}`));
    assert.equal(api.isCompatible(dex), language.id === 'en', 'Unverified language/revision payloads remain excluded');
    const translatedFixture = {games:[game], languages:[language.id], platforms:[platform], revisions:[revision],
      variants:{[`${game}|${language.id}|${platform}|${revision}`]:{template:['fixture']}}};
    assert.equal(api.isCompatible(translatedFixture), true, 'Future language/revision variants resolve independently');
    assert.equal(api.resolveVariant(translatedFixture).template[0], 'fixture');
  }
}
Object.assign(api.state, {game:'firered', language:'de', platform:'switch', revision:'1.0'});
api.updateThirdSelector();
assert.equal(api.state.revision, '1.1');
assert.equal(api.elements.language.value, 'de');
assert.ok(api.elements.language.innerHTML.includes('>German</option>'));
assert.ok(!api.elements.language.innerHTML.includes('|1.'));
Object.assign(api.state, {game:'emerald', platform:'accurate'});
api.updateThirdSelector();
api.updateLanguageSelection('de');
assert.equal(api.state.language, 'de');
assert.equal(api.elements.language.value, 'de');
assert.ok(!api.elements.language.innerHTML.includes('|1.'));
console.log(`Passed: ${combinations} compatible combinations, ${transcriptions} spaced/compact checks, paired language selections, revision exclusions, device output oracles, sharing, and Japanese whitespace.`);
