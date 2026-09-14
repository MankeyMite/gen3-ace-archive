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
vm.runInContext(read('data/sleipnir17-codes.js'), context);
vm.runInContext(read('data/frlg-source-codes.js'), context);
vm.runInContext(read('data/frlg-default-codes.js'), context);
// Load the actual application functions, stopping before DOM event wiring.
const app = read('app.js');
const end = app.indexOf('  elements.categories.addEventListener');
assert.ok(end > 0);
vm.runInContext(app.slice(0, end) + '\nwindow.testAPI = {state, catalog, elements, updateThirdSelector, updateLanguageSelection, getVariant, resolveVariant, isCompatible, sourceCodeFor, frlgSourceFor, parseFrlgBoxNames, codeShareUrl, tabShareUrl, guideShareUrl, parseCodeLine, renderCodeLine, renderGenerated, compactCodeForClipboard, codeColorLegend, troubleshootingCodeMarkup, variantCodeBlocks, developerCodeMatches, controlFor};\n})();', context);
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
const sleipnirCodes = rawCodes.filter(code => code.id.startsWith('sleipnir17-'));
assert.equal(sleipnirCodes.length, 39, 'Selected missing Sleipnir17 effects and fixed options are imported');
assert.equal(sleipnirCodes.reduce((total, code) => total + Object.keys(code.variants).length, 0), 438);
assert.equal(sleipnirCodes.filter(code => code.languages.includes('ja')).length, 24, 'Japanese 0x085F or 0x0615 only where sourced');
for (const code of sleipnirCodes) {
  assert.equal(code.rawBoxNames, true, code.id);
  assert.equal(code.sourcePaddedBoxNames, true, `${code.id}: source padding is not input`);
  assert.ok(code.source.url.includes('pastebin.com'), code.id);
  for (const [key, variant] of Object.entries(code.variants)) {
    assert.ok(/^emerald\|(en|fr|it|de|es|ja)\|(accurate|inaccurate)$/.test(key), key);
    assert.ok(variant.template.length >= 3, key);
    for (const line of variant.template) {
      const match = line.match(/^Box\s+(\d+): \[([^\]]*)\]$/);
      assert.ok(match, `${key}: ${line}`);
      assert.ok([...match[2]].length <= 8, `${key}: ${line}`);
      assert.ok(!match[2].includes('*'), `${key}: unresolved marker in ${line}`);
    }
  }
}
const frlgArchive = vm.runInContext('FRLG_SOURCE_ARCHIVE', context);
const frlgCodes = rawCodes.filter(code => code.id.startsWith('frlg-generator-'));
let frlgDefaultCombinations = 0, unavailableFrlgDefaults = 0, warnedFrlgDefaults = 0;
assert.equal(frlgArchive.length, 77, 'All 77 numbered document entries are imported');
assert.equal(frlgCodes.length, 77);
assert.equal(frlgArchive.reduce((total, entry) => total + entry.variants.length, 0), 137, 'All distinct source blocks are retained');
for (const [index, entry] of frlgArchive.entries()) {
  const code = frlgCodes[index];
  assert.equal(entry.number, index + 1);
  assert.equal(code.id, `frlg-generator-${String(entry.number).padStart(3, '0')}`);
  assert.equal(code.title, entry.title);
  assert.equal(code.generatorEngine, 'eshark-frlg');
  assert.equal(code.rawBoxNames, true);
  assert.deepEqual([...code.games], [...entry.games]);
  assert.ok(code.author !== 'E-Sh4rk contributors', `${code.id}: source author was read`);
  for (const [key, variant] of Object.entries(code.variants)) {
    assert.ok(variant.generatorSource.some(line => line.trim() === '@@'), code.id);
    assert.ok(variant.sourcePath.endsWith('.txt'), code.id);
    assert.ok(['fr', 'lg'].includes(variant.generatorGame), code.id);
    assert.ok(variant.generatorLanguage, code.id);
    assert.ok(Array.isArray(variant.defaultBoxNames), `${code.id} ${key}: standard output was evaluated`);
    if (!variant.defaultBoxNames.length) {
      assert.ok(variant.defaultWarning, `${code.id} ${key}: unavailable source has a warning`);
      unavailableFrlgDefaults++;
    }
    if (variant.defaultWarning && variant.defaultBoxNames.length) warnedFrlgDefaults++;
    for (const [index, line] of variant.defaultBoxNames.entries()) {
      assert.match(line, new RegExp(`^Box ${index + 1}: \\[([^\\]]*)\\]$`), `${code.id} ${key}: ${line}`);
      assert.ok([...line.match(/\[([^\]]*)\]$/)[1]].length <= 8, `${code.id} ${key}: at most eight slots`);
      if (!variant.defaultWarning) assert.ok(!line.includes('✖'), `${code.id} ${key}: no unwritable glyph`);
    }
    frlgDefaultCombinations++;
  }
}
assert.equal(frlgDefaultCombinations, 3396, 'Every source-backed FRLG setup has a standard output');
assert.equal(unavailableFrlgDefaults, 30, 'Uncompilable emulator and language setups are not presented as usable codes');
assert.equal(warnedFrlgDefaults, 8, 'Unwritable Japanese roamer defaults remain visibly warned and not copyable');
assert.ok(frlgCodes.some(code => code.games.length === 1), 'Game-specific entries remain game-specific');
assert.ok(frlgCodes.every(code => !Object.keys(code.variants).some(key => key.includes('|ja|switch|'))), 'No unsupported Japanese Switch variants');
Object.assign(api.state, {game:'firered', language:'en', platform:'accurate', revision:'1.1'});
assert.match(api.frlgSourceFor(frlgCodes[0]), /@@ exit = "LoadMapShort_ENG1"/);
Object.assign(api.state, {game:'leafgreen', language:'ja', platform:'accurate', revision:'1.0'});
assert.match(api.frlgSourceFor(frlgCodes[0]), /@@ exit = "LoadMapShort_JAP0"/);
assert.equal(api.getVariant(frlgCodes[0]).generatorGame, 'lg');
Object.assign(api.state, {game:'firered', language:'en', platform:'inaccurate', revision:'1.1'});
assert.match(api.frlgSourceFor(frlgCodes[23]), /^inaccurate_emu = !!1 %%/m, 'Boolean-cast emulator flag is mapped to old emulators');
assert.ok(frlgCodes[24].variants['firered|en|accurate|1.1'].generatorSource.some(line => line.includes('POKEMON')));
assert.ok(frlgCodes[25].variants['firered|en|accurate|1.1'].generatorSource.some(line => line.includes('POKEMON')));
assert.match(api.frlgSourceFor(frlgCodes[24]), /^species = 1 @input:species$/m, 'Bulbasaur is the visible standard species');
assert.deepEqual([...api.parseFrlgBoxNames('Box  1: A _ B [A B]\\nBox  2: X [X]'.replace('\\n', '\n'))], ['Box 1: [A B]', 'Box 2: [X]']);
assert.throws(() => api.parseFrlgBoxNames('Box  1: ✖ [✖]'), /invalid or unwritable/);
assert.throws(() => api.parseFrlgBoxNames('Box  1: A [A]\nBox  1: B [B]'), /invalid or unwritable/);
assert.throws(() => api.parseFrlgBoxNames('Box  1: A [A]\nBox  3: B [B]'), /invalid or unwritable/);
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
          && Boolean(code.variants[`${game}|${language}|${platform}|${revision}`] || code.variants[`${game}|${language}|*|${revision}`]
            || (code.useDefaultForFrlg && code.variants.default))
          && (code.generatorEngine !== 'eshark-frlg' || Boolean(variant?.defaultBoxNames?.length));
        assert.equal(compatible, Boolean(expected), `${code.id}: ${game}|${language}|${platform}|${revision}`);
      }
      if (!compatible) continue;
      combinations++;
      assert.ok(api.variantCodeBlocks(variant).length, code.id + ': compatible code has output');
      const source = api.sourceCodeFor(code).join('\n');
      if (code.sourceLanguageValues?.[language] !== undefined) {
        assert.match(source, new RegExp('^lang\\s*=\\s*' + code.sourceLanguageValues[language] + '\\s*$', 'm'), code.id + ': source language selection');
      }
      if (platform !== 'switch' && /^(?:old_emu|inaccurate_emu|aligned_pc)\s*=/m.test(source) && (code.id.startsWith('mettrich-') || code.sourcePlatformValues)) {
        assert.equal(code.sourcePlatformValues?.[platform], platform === 'accurate' ? 0 : 1, code.id);
        assert.match(source, new RegExp('^(?:old_emu|inaccurate_emu|aligned_pc)\\s*=\\s*(?:!!)?' + (platform === 'accurate' ? 0 : 1) + '(?:\\s*(?:;|//|%%).*)?$', 'm'), code.id);
      }
      for (const block of api.variantCodeBlocks(variant)) for (const line of block.template) {
        const exactName = line.match(/^Box\s*(?:1[0-4]|[1-9])\s*:.*\[([^\]]*)\]/i)?.[1];
        if (exactName !== undefined) {
          const rendered = api.renderCodeLine(line, null, code.sourcePaddedBoxNames === true);
          assert.equal((rendered.match(/class="code-char-slot"/g) || []).length, [...exactName].length, `${code.id}: every box-name character has one slot`);
          const visibleName = code.sourcePaddedBoxNames ? exactName.replace(/[ \t]+$/, '') : exactName;
          assert.equal((rendered.match(/code-char-space/g) || []).length, (visibleName.match(/[ \t　]/g) || []).length, `${code.id}: only spaces to enter have visible markers`);
          if (code.sourcePaddedBoxNames) {
            const renderedName = rendered.match(/<span class="code-line-main[^>]*">([\s\S]*?)<\/span>(?:<span class="code-line-helper"|$)/)?.[1];
            assert.ok(renderedName, `${code.id}: rendered box name`);
            const htmlEscapedName = visibleName.replace(/[&<>"']/g, character => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'})[character]);
            assert.equal(renderedName.replace(/<[^>]+>/g, ''), htmlEscapedName.replace(/[ \t　]/g, '_'), `${code.id}: source padding is invisible`);
          }
        }
        if (code.rawBoxNames) {
          const raw = line.match(/^Box\s+\d+: \[([^\]]*)\]$/);
          assert.ok(raw, `${code.id}: ${line}`);
          assert.equal(api.parseCodeLine(line).body, raw[1], `${code.id}: exact box name`);
          transcriptions++;
          continue;
        }
        const m = line.match(/^Box\s+\d+:[ \t]*(.*?)[ \t]*\[([^\]]*)\]/);
        if (!m) continue;
        assert.equal(m[1].replace(/[ \t]/g, '').replace(/_/g, ' '), m[2].replace(/_/g, ' '), `${code.id}: ${line}`);
        transcriptions++;
      }
    }
  }
}
const byId = id => codes.find(c => c.id === id);
const itemCode = byId('get-any-item-emerald');
assert.ok(itemCode && itemCode.verificationStatus !== 'needs-verification', 'Verified Emerald item picker is published');
assert.equal(itemCode.rawBoxNames, true, 'Item generator uses exact box names');
assert.ok(itemCode.source.url.includes('MankeyMite/Gen3ItemToBoxNames'));
assert.equal(itemCode.parameters[0].source, 'items');
assert.match(api.controlFor(itemCode.parameters[0]), /<select name="item" required>/);
assert.ok(api.catalog.choices.items.length > 300, 'The complete named item list is present');
const itemNames = (hex, platform) => {
  const item = api.catalog.choices.items.find(choice => choice.id === hex);
  assert.ok(item, `Named item ${hex}`);
  Object.assign(api.state, {game:'emerald', language:'en', platform, revision:'1.1'});
  assert.ok(api.isCompatible(itemCode));
  return api.getVariant(itemCode).template.map(line => api.parseCodeLine(line.replace(/\{item\.(\w+)\}/g, (_, property) => item[property])).body);
};
assert.deepEqual([...itemNames('0001', 'accurate')], ['–BUnL…!n', 'AAAGF.o', 'AAJTBn', 'AIRBn', 'IPBnAFQm', 'RToDYJm?', 'Bn']);
assert.deepEqual([...itemNames('0178', 'inaccurate')], ['–BUnN…!n', 'AAANF.o', 'AAQTBn', 'AJRBn', 'IPBnAFQm', 'RToDYJm?', 'Bn']);
for (const item of api.catalog.choices.items) {
  for (const platform of ['accurate', 'inaccurate']) {
    assert.ok(itemNames(item.id, platform).every(name => [...name].length <= 8), `${item.id} ${platform}: max eight slots`);
  }
}
const selectedItem = {value:'0001', selectedIndex:0};
const renderedItem = {innerHTML:''};
context.document.querySelector = selector => selector === '#generator-form'
  ? {elements:{namedItem: () => selectedItem}}
  : {querySelector: () => ({})};
api.elements.dialogContent = {querySelector: selector => selector === '[data-generated-code="0"]' ? renderedItem : null};
Object.assign(api.state, {game:'emerald', language:'en', platform:'accurate', revision:'1.1'});
api.renderGenerated(itemCode);
assert.match(renderedItem.innerHTML.replace(/<[^>]+>/g, ''), /AAAGF\.o/);
selectedItem.value = '0178';
selectedItem.selectedIndex = api.catalog.choices.items.findIndex(item => item.id === '0178');
api.renderGenerated(itemCode);
assert.match(renderedItem.innerHTML.replace(/<[^>]+>/g, ''), /AAANF\.o/);
assert.doesNotMatch(renderedItem.innerHTML.replace(/<[^>]+>/g, ''), /AAAGF\.o/);
const compactBox = (code, setup, number, block = 0) => {
  Object.assign(api.state, setup);
  const line = api.variantCodeBlocks(api.getVariant(code))[block].template.find(l => new RegExp('^Box\\s+' + number + ':').test(l));
  return line.match(/\[([^\]]*)\]/)[1];
};
const enAcc = { game: 'emerald', language: 'en', platform: 'accurate', revision: '1.1' };
const enOld = { ...enAcc, platform: 'inaccurate' };
const sleipnirMew = byId('sleipnir17-make-mew-reappear-emerald');
assert.equal(compactBox(sleipnirMew, enAcc, 1), '?…Un-?Qn');
assert.equal(compactBox(sleipnirMew, enOld, 1), '9…Un-?Qn');
assert.equal(compactBox(sleipnirMew, enAcc, 3), 'EED Qn  ', 'Trailing box-name spaces are retained');
assert.equal(compactBox(byId('sleipnir17-make-gift-beldum-reappear-emerald'), enAcc, 1), 'x“Un-BQn');
assert.equal(compactBox(byId('sleipnir17-clear-hall-of-fame-data-emerald'), enAcc, 3), 'EE‘Hgm  ');
assert.equal(compactBox(byId('sleipnir17-set-berry-trees-bearing-berries-emerald'), enAcc, 4), ' uFRn   ');
assert.equal(compactBox(byId('sleipnir17-enable-all-trainer-rematches-emerald'), enOld, 6), '   …MQm ');
assert.equal(compactBox(byId('sleipnir17-repair-route-weather-sunny-emerald'), enOld, 3), 'EEh…xq  ');
assert.equal(compactBox(byId('sleipnir17-release-a-new-roamer-emerald'), {...enAcc, language:'ja'}, 3), '  ‥?    ');
assert.equal(compactBox(byId('sleipnir17-get-a-whole-case-of-perfect-pokeblocks-emerald'), {...enAcc, language:'ja'}, 4), ' BTQm   ');
assert.equal(compactBox(byId('sleipnir17-get-a-whole-case-of-perfect-pokeblocks-emerald'), {...enOld, language:'ja'}, 10), 'EEE  まqた');
assert.equal(compactBox(byId('sleipnir17-set-berry-trees-bearing-berries-emerald'), {...enAcc, language:'ja'}, 2), '   おF‥o ');
assert.equal(api.compactCodeForClipboard('Box 3: [  A  ]', true), 'Box 3:   A  ');
assert.equal(api.compactCodeForClipboard('Box 3:  A  ', true), 'Box 3:   A  ', 'Rendered exact names copy with leading and trailing spaces');
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
fixture.revisions = ['1.0', '1.1'];
fixture.useDefaultForFrlg = true;
assert.equal(api.isCompatible(fixture), true, 'Explicit shared FireRed/LeafGreen default is compatible');
assert.equal(api.resolveVariant(fixture).template[0], 'Box 1: WRONG', 'Explicit shared default resolves');
Object.assign(api.state, {game:'leafgreen'});
assert.equal(api.isCompatible(fixture), false, 'Shared default does not add unselected games');
Object.assign(api.state, {game:'firered', language:'de'});
assert.equal(api.isCompatible(fixture), false, 'Shared default does not add unselected languages');
Object.assign(api.state, {language:'en', platform:'switch', revision:'1.0'});
assert.equal(api.isCompatible(fixture), false, 'Shared default preserves the Switch ROM 1.1 restriction');
Object.assign(api.state, {platform:'accurate', revision:'1.0'});
assert.equal(api.codeShareUrl('example').searchParams.get('revision'), '1.0');
assert.equal(api.codeShareUrl('example').searchParams.get('language'), 'en');
assert.equal(api.tabShareUrl('codes').searchParams.get('revision'), '1.0');
Object.assign(api.state, {platform:'switch'});
assert.equal(api.codeShareUrl('example').searchParams.get('revision'), '1.1');
assert.equal(api.guideShareUrl('example').searchParams.has('revision'), false);
Object.assign(api.state, enAcc);
assert.equal(api.codeShareUrl('example').searchParams.has('revision'), false);
assert.equal(api.resolveVariant({variants:{'emerald|en|accurate':{template:['legacy']}}}).template[0], 'legacy');
assert.equal(api.developerCodeMatches({games:['firered'], title:'Swap TID and SID', author:'Mettrich', category:'SID'}, 'firered', 'tid'), true);
assert.equal(api.developerCodeMatches({games:['firered'], title:'Swap TID and SID'}, 'leafgreen', ''), false);
assert.equal(api.developerCodeMatches({games:['firered'], title:'Swap TID and SID'}, 'all', 'missing'), false);
const japanese = byId('mettrich-weldr-japanese-emerald').variants.default.template[12];
assert.equal(api.parseCodeLine(japanese).body, 'ムぬあぉｔｓ　　');
assert.equal((api.renderCodeLine(japanese).match(/code-char-space/g) || []).length, 2, 'Japanese spaces render as separated visible underscore markers');
assert.equal((api.renderCodeLine(japanese).match(/class="code-char-slot"/g) || []).length, 8, 'Every Japanese box-name character occupies one slot');
const japaneseFourSpaces = byId('mettrich-weldr-japanese-emerald').variants.default.template[4];
assert.equal((api.renderCodeLine(japaneseFourSpaces).match(/class="code-char-slot"/g) || []).length, 8, 'Four Japanese spaces retain an eight-slot row');
assert.equal((api.renderCodeLine(japaneseFourSpaces).match(/code-char-space/g) || []).length, 4);
Object.assign(api.state, {language:'ja'});
const japaneseLegend = api.codeColorLegend(true);
const otherLegend = api.codeColorLegend(false);
for (const label of ['Hiragana', 'Katakana', 'Alphabet / numbers / symbols', 'Spaces, periods (.) and commas (,) (any work)']) assert.ok(japaneseLegend.includes(label), `Japanese color key: ${label}`);
for (const label of ['Upper case letters', 'Lower case letters', 'Symbols', 'Spaces, periods (.) and commas (,) (any work)']) assert.ok(otherLegend.includes(label), `Non-Japanese color key: ${label}`);
assert.equal((japaneseLegend.match(/code-color-swatch-/g) || []).length, 4);
assert.match(api.troubleshootingCodeMarkup(['Box 1: [Aa1?]']), /Upper case letters/, 'Non-Japanese troubleshooting code keeps its own color key');
assert.match(api.troubleshootingCodeMarkup(['Box 1: [Aa1?]']), /class="code-char-upper">A<\/span>/, 'Non-Japanese troubleshooting code keeps its own colors');
assert.equal((api.renderCodeLine('Box 1: [A B  C  ]').match(/class="code-char-slot"/g) || []).length, 8, 'Latin letters and ordinary spaces also use equal slots in Japanese codes');
assert.equal(api.compactCodeForClipboard('Box 1: [A B  C  ]', true, true), 'Box 1: A_B__C__');
const japaneseColors = api.renderCodeLine('Box 1: [あアＡa１♂_ｶ]');
assert.match(japaneseColors, /class="code-char-hiragana">あ<\/span>/);
assert.match(japaneseColors, /class="code-char-katakana">ア<\/span>/);
assert.match(japaneseColors, /class="code-char-katakana">ｶ<\/span>/, 'Half-width katakana uses the katakana color');
for (const character of ['Ａ', 'a', '１', '♂']) assert.ok(japaneseColors.includes(`class="code-char-japanese-other">${character}</span>`), `${character}: Japanese letters, numbers and symbols use green`);
assert.match(japaneseColors, /class="code-char-underscore"[^>]*>_<\/span>/, 'The visible space marker stays white');
for (const character of ['.', ',']) {
  assert.match(api.renderCodeLine(`Box 1: [あ${character}イ]`), /class="code-char-flexible"/, `${character}: Japanese punctuation shares the white legend color`);
  assert.match(api.renderCodeLine(`Box 1: [A${character}b]`, false), /class="code-char-flexible"/, `${character}: non-Japanese punctuation shares the white legend color`);
}
assert.match(api.renderCodeLine('Box 1: [abc123!?]'), /class="code-char-japanese-other">a<\/span>/, 'ASCII-only Japanese box names use the Japanese palette');
Object.assign(api.state, enAcc);
assert.match(api.renderCodeLine('Box 1: [Aa1?]'), /class="code-char-upper">A<\/span>/, 'Non-Japanese box names retain their palette');
const englishRows = ['Box 1: [Aa1?]', 'Box 2: [Bb2!]'].map(api.renderCodeLine);
assert.ok(englishRows.every((row) => (row.match(/class="code-char-slot"/g) || []).length === 4 && !row.includes('code-char-japanese-other')), 'Every non-Japanese row uses equal slots and retains its palette');
assert.match(englishRows[1], /class="code-char-upper">B<\/span>/, 'The second non-Japanese row keeps uppercase blue');
assert.match(englishRows[1], /class="code-char-lower">b<\/span>/, 'The second non-Japanese row keeps lowercase red');
const displayedText = (line) => api.renderCodeLine(line).replace(/<[^>]+>/g, '');
const trades = byId('sleipnir17-allow-all-in-game-trades-another-time-emerald');
const tradeLines = api.variantCodeBlocks(api.getVariant(trades))[0].template;
assert.equal((api.renderCodeLine(tradeLines[0]).match(/class="code-char-slot"/g) || []).length, 8, 'Compact Sleipnir17 names use eight slots');
assert.equal(displayedText(tradeLines[0]), 'Box 1:X…Un-?Qn', 'Slots do not insert code characters');
assert.equal((api.renderCodeLine(tradeLines[3], null, true).match(/code-char-space/g) || []).length, 2, 'Only internal Sleipnir17 spaces have visible markers');
const displayedSourcePaddedText = (line) => api.renderCodeLine(line, null, true).replace(/<[^>]+>/g, '');
assert.equal(displayedSourcePaddedText(tradeLines[3]), 'Box 4:E__!n', 'Trailing source padding is invisible but internal spaces remain in their slots');
assert.equal(api.compactCodeForClipboard(displayedSourcePaddedText(tradeLines[3]), true), 'Box 4: E__!n', 'Copying does not add trailing padding');
assert.equal(displayedSourcePaddedText(tradeLines[6]), `Box 7:${api.parseCodeLine(tradeLines[6]).body.trimEnd()}`, 'All six padded slots at the end of a short name remain invisible');
assert.equal(displayedSourcePaddedText('Box 1: [A_      ]'), 'Box 1:A_', 'An explicit trailing underscore remains visible before source padding');
assert.equal(displayedText('Box 1: B C U n p 0 E H [BCUnp0EH]'), 'Box 1:BCUnp0EH', 'Source transcription separators are not treated as box-name spaces');
assert.equal(api.compactCodeForClipboard(displayedText('Box 1: B C U n p 0 E H [BCUnp0EH]')), 'Box 1: BCUnp0EH', 'Copying an annotated code stays compact');
assert.equal(displayedText('Box 1:  A  '), 'Box 1:_A__', 'Unannotated box names retain exact leading and trailing spaces after the prefix separator');
Object.assign(api.state, {language:'ja'});
assert.ok(['Box 1: [あＡ]', 'Box 2: [アＢ]'].map(api.renderCodeLine).every((row) => row.includes('code-char-slot')), 'The first Japanese row also uses Japanese slots and colors');
Object.assign(api.state, enAcc);
assert.equal(api.compactCodeForClipboard(japanese), 'Box 13: ムぬあぉｔｓ__');
assert.equal(api.compactCodeForClipboard('Box 13:ムぬあぉｔｓ　　'), 'Box 13: ムぬあぉｔｓ__', 'Copying Japanese output uses visible underscore space markers');
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
