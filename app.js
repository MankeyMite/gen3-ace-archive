(() => {
  "use strict";

  const catalog = window.ACE_CATALOG;
  const LOCAL_CODES_KEY = "ace-developer-codes";
  const LOCAL_GUIDES_KEY = "ace-developer-guides";
  const LOCAL_PAGES_KEY = "ace-developer-pages";
  const LOCAL_CODE_PROJECT_SIGNATURE = "_baseProjectSignature";
  const customContent = window.ACE_CUSTOM_CONTENT || {};
  const projectCodes = Array.isArray(customContent.codes) ? customContent.codes : (Array.isArray(window.ACE_CUSTOM_CODES) ? window.ACE_CUSTOM_CODES : []);
  const projectGuides = Array.isArray(customContent.guides) ? customContent.guides : [];
  const builtInGuides = Array.isArray(window.ACE_BUILTIN_GUIDES) ? window.ACE_BUILTIN_GUIDES : [];
  const projectPages = customContent.pages && typeof customContent.pages === "object" ? customContent.pages : {};
  let localCodes = loadLocalCollection(LOCAL_CODES_KEY, []);
  let localGuides = loadLocalCollection(LOCAL_GUIDES_KEY, []);
  let localPages = loadLocalCollection(LOCAL_PAGES_KEY, {});
  catalog.guides ||= [];
  const builtInCodeIds = new Set(catalog.codes.map((code) => code.id));
  function mergeCode(code) {
    const index = catalog.codes.findIndex((entry) => entry.id === code.id);
    if (code.deleted) {
      if (index >= 0) catalog.codes.splice(index, 1);
      return;
    }
    if (index >= 0) catalog.codes[index] = code;
    else catalog.codes.push(code);
  }
  projectCodes.forEach(mergeCode);
  localCodes.filter(localCodeCanOverrideProject).forEach(mergeCode);

  function projectCodeSignature(code) {
    return JSON.stringify(code, (key, value) => ["locallyAdded", LOCAL_CODE_PROJECT_SIGNATURE].includes(key) ? undefined : value);
  }

  function localCodeCanOverrideProject(code) {
    const projectCode = projectCodes.find((entry) => entry.id === code.id);
    if (!projectCode) return true;
    return code[LOCAL_CODE_PROJECT_SIGNATURE] === projectCodeSignature(projectCode);
  }
  function normalizeGuide(guide) {
    if (guide.type === "interactive-setup" && Array.isArray(guide.phases)) {
      guide.phases = guide.phases.filter((phase) => Boolean(
        phase.title?.trim() || phase.shortTitle?.trim() || phase.objective?.trim() || phase.image?.trim()
        || phase.sections?.length || phase.checks?.length
      ));
    }
    return guide;
  }
  function mergeGuide(guide) {
    normalizeGuide(guide);
    const index = catalog.guides.findIndex((entry) => entry.id === guide.id);
    if (guide.deleted) { if (index >= 0) catalog.guides.splice(index, 1); return; }
    if (index >= 0) catalog.guides[index] = guide;
    else catalog.guides.push(guide);
  }
  builtInGuides.forEach(mergeGuide);
  projectGuides.forEach(mergeGuide);
  localGuides.forEach(mergeGuide);
  localStorage.setItem(LOCAL_GUIDES_KEY, JSON.stringify(localGuides));
  const pageContent = {
    troubleshooting: { title: "Find out why a code did not run.", introduction: "General diagnostic guides and video examples will live here.", body: "" },
    faq: { title: "Frequently asked questions", introduction: "Common questions about compatibility, terminology, safety, and this archive will appear here.", body: "" },
    ...projectPages,
    ...localPages,
  };
  const variationDrafts = new Map();
  let activeVariation = "";
  let editingCodeId = "";
  let editingGuideId = "";
  let interactivePhaseDrafts = [];
  let activeInteractivePhase = 0;
  const state = {
    game: localStorage.getItem("ace-game") || "emerald",
    language: localStorage.getItem("ace-language") || "en",
    platform: localStorage.getItem("ace-platform") || "accurate",
    category: "All",
    search: "",
  };
  const incomingUrl = new URL(window.location.href);
  const sharedGame = incomingUrl.searchParams.get("game");
  const sharedLanguage = incomingUrl.searchParams.get("language");
  const sharedPlatform = incomingUrl.searchParams.get("platform");
  if (catalog.games.some((item) => item.id === sharedGame)) state.game = sharedGame;
  if (catalog.languages.some((item) => item.id === sharedLanguage)) state.language = sharedLanguage;
  if (catalog.platforms.some((item) => item.id === sharedPlatform)) state.platform = sharedPlatform;

  const $ = (selector, root = document) => root.querySelector(selector);
  const elements = {
    game: $("#game-select"), language: $("#language-select"), platform: $("#platform-select"),
    grid: $("#code-grid"), count: $("#result-count"), categories: $("#category-filters"),
    search: $("#code-search"), status: $("#setup-status"), dialog: $("#code-dialog"),
    dialogContent: $("#dialog-content"), empty: $("#empty-state"), toast: $("#toast"),
    guideDialog: $("#guide-dialog"), guideDialogContent: $("#guide-dialog-content"),
  };
  const SHARE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.6 13.4a4 4 0 0 0 5.65.05l2.2-2.2a4 4 0 0 0-5.66-5.66l-1.26 1.26m1.87 3.75a4 4 0 0 0-5.65-.05l-2.2 2.2a4 4 0 0 0 5.66 5.66l1.25-1.25" /></svg>';

  function nameFor(collection, id) {
    return catalog[collection].find((entry) => entry.id === id)?.name || id;
  }

  function codeCountLabel(count) {
    return `${count} code${count === 1 ? "" : "s"}`;
  }

  function loadLocalCollection(key, fallback) {
    try {
      const saved = JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
      return saved && typeof saved === "object" ? saved : fallback;
    } catch { return fallback; }
  }

  function initSetup() {
    elements.game.innerHTML = catalog.games.map((game) => `<option value="${game.id}">${game.name}</option>`).join("");
    elements.language.innerHTML = catalog.languages.map((language) => `<option value="${language.id}">${language.name}</option>`).join("");
    elements.platform.innerHTML = catalog.platforms.map((platform) =>
      `<option value="${platform.id}">${platform.name}</option>`).join("");
    elements.game.value = state.game;
    elements.language.value = state.language;
    updatePlatformAvailability();
    elements.platform.value = state.platform;

    elements.game.addEventListener("change", (event) => {
      updateSetup("game", event.target.value);
      updatePlatformAvailability();
    });
    elements.language.addEventListener("change", (event) => updateSetup("language", event.target.value));
    elements.platform.addEventListener("change", (event) => updateSetup("platform", event.target.value));
  }

  function updatePlatformAvailability() {
    catalog.platforms.forEach((platform) => {
      const option = elements.platform.querySelector(`option[value="${platform.id}"]`);
      option.disabled = Boolean(platform.games && !platform.games.includes(state.game));
    });
    const selected = catalog.platforms.find((platform) => platform.id === state.platform);
    if (selected?.games && !selected.games.includes(state.game)) {
      state.platform = "accurate";
      localStorage.setItem("ace-platform", state.platform);
    }
    elements.platform.value = state.platform;
    renderLibrary();
  }

  function updateSetup(key, value) {
    state[key] = value;
    localStorage.setItem(`ace-${key}`, value);
    renderLibrary();
  }

  function isCompatible(code) {
    return code.games.includes(state.game) && code.languages.includes(state.language) && code.platforms.includes(state.platform);
  }

  function visibleCodes() {
    const query = state.search.trim().toLowerCase();
    return catalog.codes.filter((code) => {
      const text = [code.title, code.summary, code.category, ...(code.tags || [])].join(" ").toLowerCase();
      return isCompatible(code) && (state.category === "All" || code.category === state.category) && (!query || text.includes(query));
    }).sort((a, b) => Number(Boolean(b.recommended)) - Number(Boolean(a.recommended)) || compareTitles(a, b));
  }

  function compareTitles(a, b) {
    return String(a.title || "").localeCompare(String(b.title || ""), undefined, { sensitivity: "base", numeric: true });
  }

  function renderCategories() {
    const categories = ["All", ...new Set(catalog.codes.filter(isCompatible).map((code) => code.category))];
    if (!categories.includes(state.category)) state.category = "All";
    elements.categories.innerHTML = categories.map((category) => `
      <button type="button" class="${category === state.category ? "active" : ""}" data-category="${category}">${category}</button>`).join("");
  }

  function renderLibrary() {
    renderCategories();
    const codes = visibleCodes();
    const game = nameFor("games", state.game);
    const language = nameFor("languages", state.language);
    const platform = nameFor("platforms", state.platform);
    elements.status.innerHTML = `<span>●</span> Showing entries verified for <strong>${game} · ${language} · ${platform}</strong>`;
    elements.count.textContent = codes.length;
    elements.empty.hidden = codes.length > 0;
    elements.grid.innerHTML = codes.map((code) => {
      const count = codeBlockCount(code);
      const countTag = count > 1 ? `<span class="code-count-tag">${codeCountLabel(count)}</span>` : "";
      return `
      <article class="code-card" data-id="${code.id}" tabindex="0">
        <div class="code-card-tags"><span class="category-tag">${code.category}</span>${code.recommended ? '<span class="recommended-tag">Recommended</span>' : ""}</div>
        <div class="code-list-copy"><h3>${code.title}</h3><p>${code.summary}</p></div>
        <div class="card-meta"><span class="difficulty ${code.difficulty.toLowerCase()}">${code.difficulty}</span>${countTag}</div>
      </article>`;
    }).join("");
  }

  function getVariant(code) {
    const variants = code.variants || {};
    return variants[`${state.game}|${state.language}|${state.platform}`]
      || variants[`${state.game}|${state.language}|*`]
      || variants[`${state.game}|*|${state.platform}`]
      || variants[`*|${state.language}|${state.platform}`]
      || variants[`${state.language}|${state.platform}`]
      || variants[`*|${state.platform}`]
      || variants[`${state.language}|*`]
      || variants.default
      || { template: [] };
  }

  function cleanCodeTemplate(template) {
    return Array.isArray(template) ? template.map((line) => String(line).trim()).filter(Boolean) : [];
  }

  function isBoxCodeLine(line) {
    return /^box\s*(?:1[0-4]|[1-9])\s*:/i.test(String(line || "").trim());
  }

  function cleanGuideText(value) {
    return String(value || "").split(/\r?\n/).map((line) => line.trim()).join("\n").replace(/^\s+|\s+$/g, "");
  }

  function codeNoteFromLine(line) {
    const match = String(line || "").trim().match(/^code\s+note\s*:(.*)$/i);
    return match ? cleanGuideText(match[1]) : null;
  }

  function variantCodeBlocks(variant) {
    const blocks = Array.isArray(variant?.codes)
      ? variant.codes.map((block, index) => {
        const hasCodeNote = Object.prototype.hasOwnProperty.call(block || {}, "codeNote");
        return {
          title: safeText(block?.title) || `Code ${index + 1}`,
          note: cleanGuideText(block?.note || block?.description || ""),
          codeNote: hasCodeNote ? cleanGuideText(block.codeNote) : null,
          template: cleanCodeTemplate(block?.template),
        };
      }).filter((block) => block.template.length)
      : [];
    if (blocks.length) return blocks;
    const template = cleanCodeTemplate(variant?.template);
    return template.length ? [{ title: "Code 1", note: "", codeNote: null, template }] : [];
  }

  function codeBlockCount(code) {
    return variantCodeBlocks(getVariant(code)).length;
  }

  function variantGuideAfter(variant) {
    return cleanGuideText(variant?.guideAfter || variant?.after || "");
  }

  function parseCodeDraft(value) {
    const blocks = [];
    let noteBuffer = [];
    let codeBuffer = [];
    let codeNote = null;
    let codeBoundaryPending = false;
    let after = "";
    const noteText = () => cleanGuideText(noteBuffer.join("\n"));
    const pushBlock = () => {
      const template = lines(codeBuffer.join("\n"));
      if (template.length) {
        const block = { title: `Code ${blocks.length + 1}`, note: noteText(), template };
        if (codeNote !== null) block.codeNote = codeNote;
        blocks.push(block);
      }
      noteBuffer = [];
      codeBuffer = [];
      codeNote = null;
      codeBoundaryPending = false;
    };
    String(value || "").split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      const parsedCodeNote = codeBuffer.length ? codeNoteFromLine(line) : null;
      if (/^-{3,}$/.test(trimmed)) {
        pushBlock();
      } else if (parsedCodeNote !== null) {
        codeNote = parsedCodeNote;
        codeBoundaryPending = true;
      } else if (isBoxCodeLine(line)) {
        if (codeBuffer.length && codeBoundaryPending) pushBlock();
        codeBuffer.push(trimmed);
        codeBoundaryPending = false;
      } else if (!trimmed && codeBuffer.length) {
        codeBoundaryPending = true;
      } else {
        if (codeBuffer.length) pushBlock();
        if (trimmed || noteBuffer.length) noteBuffer.push(line);
      }
    });
    if (codeBuffer.length) pushBlock();
    else after = noteText();
    return { blocks, after };
  }

  function parseCodeBlocks(value) {
    return parseCodeDraft(value).blocks;
  }

  function formatCodeDraft(blocks, after = "") {
    const parts = blocks.map((block) => {
      const codeParts = [block.note, block.template.join("\n")].filter(Boolean);
      if (block.codeNote !== null && block.codeNote !== undefined) codeParts.push(`Code note:${block.codeNote ? ` ${block.codeNote}` : ""}`);
      return codeParts.join("\n");
    });
    if (after) parts.push(after);
    return parts.join("\n\n");
  }

  function variantToEditorText(variant) {
    return formatCodeDraft(variantCodeBlocks(variant), variantGuideAfter(variant));
  }

  function codeDraftSignature(blocks, after = "") {
    return JSON.stringify({ blocks: blocks.map((block) => ({ note: block.note || "", codeNote: block.codeNote ?? null, template: block.template })), after: after || "" });
  }

  function variantFromCodeDraft(blocks, after, notes) {
    const hasGuideText = blocks.some((block) => block.note) || Boolean(after);
    const hasCodeNotes = blocks.some((block) => block.codeNote !== null && block.codeNote !== undefined);
    if (blocks.length > 1 || hasGuideText || hasCodeNotes) {
      const variant = { codes: blocks, notes };
      if (after) variant.guideAfter = after;
      return variant;
    }
    return { template: blocks[0]?.template || [], notes };
  }

  function controlFor(parameter) {
    if (parameter.type === "choice") {
      const choices = catalog.choices[parameter.source];
      return `<label class="generator-field"><span>${parameter.label}</span><div class="searchable-select">
        <input type="search" data-choice-search="${parameter.id}" placeholder="${parameter.placeholder || "Search…"}" autocomplete="off" />
        <select name="${parameter.id}" size="5" required>${choices.map((choice) => `<option value="${choice.id}">${choice.name}</option>`).join("")}</select>
      </div></label>`;
    }
    return `<label class="generator-field"><span>${parameter.label}</span><input name="${parameter.id}" type="number" min="${parameter.min}" max="${parameter.max}" value="${parameter.default}" required /></label>`;
  }

  function openCode(id) {
    const code = catalog.codes.find((entry) => entry.id === id);
    if (!code) return;
    const variant = getVariant(code);
    const codeBlocks = variantCodeBlocks(variant);
    const guideAfter = variantGuideAfter(variant);
    const parameters = code.parameters || [];
    const usefulVariantNote = /^(Locally added developer entry|Game, language and platform-specific variation|Compatibility-specific override)\.?$/i.test(variant.notes || "") ? "" : (variant.notes || "");
    const executionSteps = codeBlocks.length > 1
      ? [
        "Type in and execute each code in order, starting with Code 1.",
        "Save before each execution unless the source or guide says otherwise.",
        "If one code crashes or nothing happens, stop and read the troubleshooting section below.",
      ]
      : [
        "Type in the code and save the game.",
        "Execute the code.",
        "If it crashes or nothing happens, read the troubleshooting section below.",
      ];
    const troubleshootingItems = [
      "Make sure the code is typed correctly in the correct boxes.",
      "Read and make sure you meet the requirements for this code.",
      "Keep Pokémon out of the last row of box 11, and all of boxes 12–14.",
      `Attempt to clear ghost data in boxes 11–14. <button type="button" class="inline-link" data-open-guide="clear-ghost-data">Click here</button> for a tutorial on how to do this.`,
      `Go to the <button type="button" class="inline-link" data-open-tab="troubleshooting">ACE troubleshooting tab</button> to see video examples of how to solve an ACE code problem.`,
    ];
    const outputPanels = codeBlocks.map((block, index) => {
      const usedBoxCount = block.template.length;
      const remainingBoxText = usedBoxCount < 14
        ? `${usedBoxCount === 13 ? "Box 14" : `Boxes ${usedBoxCount + 1}–14`} may have any name.`
        : "";
      const displayedCodeNote = block.codeNote === null ? remainingBoxText : block.codeNote;
      const outputNotes = [displayedCodeNote, index === codeBlocks.length - 1 ? usefulVariantNote : ""].filter(Boolean);
      const heading = codeBlocks.length > 1 ? block.title : (parameters.length ? "Generated code" : "Box name code");
      const guideNote = block.note ? `<div class="code-guide-note">${renderFormattedText(block.note)}</div>` : "";
      return `${guideNote}<div class="output-panel code-output-panel"><div class="output-heading"><h3>${escapeHtml(heading)}</h3><button type="button" data-copy-code="${index}">${codeBlocks.length > 1 ? "Copy" : "Copy all"}</button></div>
        <pre data-generated-code="${index}"></pre>${outputNotes.length ? `<div class="code-notes">${outputNotes.map((note) => `<p>${escapeHtml(note)}</p>`).join("")}</div>` : ""}</div>`;
    }).join("");
    const afterGuide = guideAfter ? `<div class="code-guide-note code-guide-note-after">${renderFormattedText(guideAfter)}</div>` : "";
    const outputPanel = `<div class="code-output-stack">${codeBlocks.length > 1 ? `<div class="multi-code-toolbar"><span>${codeCountLabel(codeBlocks.length)}</span><button type="button" data-copy-code="all">Copy all</button></div>` : ""}${outputPanels}${afterGuide}</div>`;
    const generatorArea = parameters.length
      ? `<div class="dialog-layout"><form class="generator-form" id="generator-form"><h3>Your choices</h3>${parameters.map(controlFor).join("")}</form>${outputPanel}</div>`
      : `<form class="fixed-code-section" id="generator-form">${outputPanel}</form>`;
    elements.dialogContent.innerHTML = `
      <div class="dialog-header"><div><span class="category-tag">${code.category}</span>${codeBlocks.length > 1 ? `<span class="code-count-tag">${codeCountLabel(codeBlocks.length)}</span>` : ""}<h2>${code.title}</h2><div class="code-description">${renderFormattedText(code.summary)}</div></div><div class="dialog-actions"><button class="share-code" type="button" aria-label="Copy share link" title="Copy share link">${SHARE_ICON}</button><button class="close-dialog" aria-label="Close">×</button></div></div>
      <div class="compatibility-strip"><span>✓ ${nameFor("games", state.game)}</span><span>✓ ${nameFor("languages", state.language)}</span><span>✓ ${nameFor("platforms", state.platform)}</span></div>
      <section class="requirements"><h3>Requirements</h3><ul>${(code.requirements || ["No special requirements listed"]).map((item) => `<li>${item}</li>`).join("")}</ul></section>
      ${generatorArea}
      <div class="instructions"><h3>Steps</h3><ol>${executionSteps.map((step) => `<li>${step}</li>`).join("")}</ol></div>
      <details class="source-code"><summary>Show source code</summary><pre>${(code.sourceCode || ["Source code not added yet."]).join("\n")}</pre><p class="source">Source: ${code.source.url ? `<a href="${code.source.url}" target="_blank" rel="noreferrer">${code.source.label}</a>` : code.source.label}</p></details>
      <section class="tutorial-video"><h3>Video tutorial</h3>${videoMarkup(code.video)}</section>
      <section class="quick-check"><h3>Quick troubleshooting checklist</h3><ol>${troubleshootingItems.map((item) => `<li>${item}</li>`).join("")}</ol></section>`;
    $(".close-dialog", elements.dialogContent).addEventListener("click", () => elements.dialog.close());
    $(".share-code", elements.dialogContent).addEventListener("click", () => shareCode(code));
    $("#generator-form").addEventListener("input", () => renderGenerated(code));
    elements.dialogContent.querySelectorAll("[data-choice-search]").forEach((input) => {
      input.addEventListener("input", () => filterChoices(input));
    });
    elements.dialogContent.querySelectorAll("[data-copy-code]").forEach((button) => button.addEventListener("click", copyCode));
    elements.dialogContent.querySelector("[data-open-guide]")?.addEventListener("click", (event) => {
      elements.dialog.close(); activateTab("guides"); openGuide(event.currentTarget.dataset.openGuide);
    });
    elements.dialogContent.querySelector("[data-open-tab]")?.addEventListener("click", (event) => {
      elements.dialog.close(); activateTab(event.currentTarget.dataset.openTab);
    });
    renderGenerated(code);
    setCodeDeepLink(code.id);
    elements.dialog.showModal();
  }

  function codeShareUrl(id) {
    const url = new URL(window.location.href);
    url.searchParams.set("game", state.game);
    url.searchParams.set("language", state.language);
    url.searchParams.set("platform", state.platform);
    url.hash = `code=${encodeURIComponent(id)}`;
    return url;
  }

  function setCodeDeepLink(id) {
    history.replaceState(null, "", codeShareUrl(id));
  }

  async function copyShareUrl(url, button) {
    if (!button) return;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const temporaryInput = document.createElement("textarea");
      temporaryInput.value = url; temporaryInput.style.position = "fixed"; temporaryInput.style.opacity = "0";
      document.body.append(temporaryInput); temporaryInput.select();
      document.execCommand("copy"); temporaryInput.remove();
    }
    button.classList.add("copied"); button.innerHTML = "<span aria-hidden=\"true\">✓</span>"; button.setAttribute("aria-label", "Share link copied"); button.title = "Share link copied";
    setTimeout(() => {
      if (!button.isConnected) return;
      button.classList.remove("copied"); button.innerHTML = SHARE_ICON; button.setAttribute("aria-label", "Copy share link"); button.title = "Copy share link";
    }, 1800);
  }

  async function shareCode(code) {
    await copyShareUrl(codeShareUrl(code.id).href, $(".share-code", elements.dialogContent));
  }

  function guideShareUrl(id) {
    const url = new URL(window.location.href);
    url.searchParams.delete("game"); url.searchParams.delete("language"); url.searchParams.delete("platform");
    url.hash = `guide=${encodeURIComponent(id)}`;
    return url;
  }

  function setGuideDeepLink(id) {
    history.replaceState(null, "", guideShareUrl(id));
  }

  async function shareGuide(guide) {
    await copyShareUrl(guideShareUrl(guide.id).href, $(".share-guide", elements.guideDialogContent));
  }

  function clearCodeDeepLink() {
    const url = new URL(window.location.href);
    url.searchParams.delete("game"); url.searchParams.delete("language"); url.searchParams.delete("platform");
    url.hash = "";
    history.replaceState(null, "", url);
  }

  function clearGuideDeepLink() {
    const url = new URL(window.location.href);
    if (!url.hash.startsWith("#guide=")) return;
    url.hash = "";
    history.replaceState(null, "", url);
  }

  function videoMarkup(video) {
    if (!video) return `<div class="video-placeholder"><span>▶</span><p>Tutorial video will appear here</p></div>`;
    const match = String(video).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/) || String(video).match(/^([\w-]{11})$/);
    if (!match) return `<div class="video-placeholder"><p>Video link needs a valid YouTube URL.</p></div>`;
    return `<div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${match[1]}" title="Video tutorial" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
  }

  function renderGuides() {
    const guides = [...(catalog.guides || [])].sort(compareTitles);
    $("#guide-list").innerHTML = guides.map((guide) => `<article class="guide-card" tabindex="0" data-guide-id="${guide.id}"><span class="category-tag">${guide.category}</span><div><h2>${guide.title}</h2><p>${guide.summary}</p></div><span class="difficulty ${guide.difficulty.toLowerCase()}">${guide.difficulty}</span></article>`).join("");
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  }

  function renderFormattedText(value) {
    const lines = String(value || "").split(/\r?\n/);
    let html = "", listOpen = false, paragraph = [];
    const closeParagraph = () => { if (paragraph.length) { html += `<p>${paragraph.map(escapeHtml).join(" ")}</p>`; paragraph = []; } };
    const closeList = () => { if (listOpen) { html += "</ul>"; listOpen = false; } };
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("## ")) { closeParagraph(); closeList(); html += `<h2>${escapeHtml(trimmed.slice(3))}</h2>`; }
      else if (trimmed.startsWith("### ")) { closeParagraph(); closeList(); html += `<h3>${escapeHtml(trimmed.slice(4))}</h3>`; }
      else if (/^-\s*/.test(trimmed)) { closeParagraph(); if (!listOpen) { html += "<ul>"; listOpen = true; } html += `<li>${escapeHtml(trimmed.replace(/^-\s*/, ""))}</li>`; }
      else if (!trimmed) { closeParagraph(); closeList(); }
      else { closeList(); paragraph.push(trimmed); }
    });
    closeParagraph(); closeList();
    return html;
  }

  function renderPages() {
    ["troubleshooting", "faq"].forEach((pageId) => {
      const page = pageContent[pageId];
      const body = pageId === "faq" ? renderFaqContent(page.body) : `<div class="formatted-content">${renderFormattedText(page.body)}</div>`;
      $(`#${pageId}-content`).innerHTML = `<p class="step-label">${pageId === "faq" ? "FAQ" : "TROUBLESHOOTING"}</p><h1>${escapeHtml(page.title)}</h1>${page.introduction ? `<p class="page-introduction">${escapeHtml(page.introduction)}</p>` : ""}${body}`;
    });
  }

  function renderFaqContent(value) {
    const questions = [];
    let current = null;
    String(value || "").split(/\r?\n/).forEach((line) => {
      if (line.trim().startsWith("## ")) {
        current = { question: line.trim().slice(3), answer: [] };
        questions.push(current);
      } else if (current) current.answer.push(line);
    });
    if (!questions.length) return `<div class="faq-empty">Add FAQ questions in Developer mode using <strong>## Question</strong>.</div>`;
    return `<div class="faq-list">${questions.map((item) => `<details class="faq-item"><summary><span>${escapeHtml(item.question)}</span><b aria-hidden="true">+</b></summary><div class="faq-answer formatted-content">${renderFormattedText(item.answer.join("\n"))}</div></details>`).join("")}</div>`;
  }

  function openGuide(id) {
    const guide = (catalog.guides || []).find((entry) => entry.id === id);
    if (!guide) return;
    setGuideDeepLink(guide.id);
    if (guide.type === "interactive-setup") { openInteractiveGuide(guide); return; }
    elements.guideDialog.classList.remove("setup-guide-dialog");
    elements.guideDialogContent.onclick = null;
    elements.guideDialogContent.onchange = null;
    const guideBody = guide.body ? `<div class="formatted-content">${renderFormattedText(guide.body)}</div>` : (guide.sections || []).map((section) => `<section><h3>${escapeHtml(section.title)}</h3><p>${escapeHtml(section.text)}</p></section>`).join("");
    elements.guideDialogContent.innerHTML = `<div class="dialog-header"><div><span class="category-tag">${escapeHtml(guide.category)}</span><h2>${escapeHtml(guide.title)}</h2><p>${escapeHtml(guide.summary)}</p></div><div class="dialog-actions"><button class="share-code share-guide" type="button" aria-label="Copy share link" title="Copy share link">${SHARE_ICON}</button><button class="close-guide-dialog close-dialog" aria-label="Close">×</button></div></div><article class="guide-content"><p class="guide-introduction">${escapeHtml(guide.introduction)}</p>${guideBody}${guide.video ? `<section><h3>Video tutorial</h3>${videoMarkup(guide.video)}</section>` : ""}</article>`;
    $(".close-guide-dialog", elements.guideDialogContent).addEventListener("click", () => elements.guideDialog.close());
    $(".share-guide", elements.guideDialogContent).addEventListener("click", () => shareGuide(guide));
    elements.guideDialog.showModal();
  }

  function openInteractiveGuide(guide) {
    elements.guideDialog.classList.add("setup-guide-dialog");
    const storageKey = `ace-guide-progress-${guide.id}`;
    let progress;
    try { progress = JSON.parse(localStorage.getItem(storageKey) || '{"complete":[],"checks":{}}'); }
    catch { progress = { complete: [], checks: {} }; }
    progress.complete ||= []; progress.checks ||= {};
    let activePhase = Math.min(Number(sessionStorage.getItem(`${storageKey}-phase`)) || 0, guide.phases.length - 1);

    const saveProgress = () => {
      localStorage.setItem(storageKey, JSON.stringify(progress));
      sessionStorage.setItem(`${storageKey}-phase`, activePhase);
    };

    const renderSection = (section) => `<section class="setup-phase-section"><h3>${escapeHtml(section.title)}</h3>${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}${section.bullets ? `<ul>${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}${section.note ? `<aside class="setup-note"><strong>Note</strong><p>${escapeHtml(section.note)}</p></aside>` : ""}${section.warning ? `<aside class="setup-warning"><strong>Important</strong><p>${escapeHtml(section.warning)}</p></aside>` : ""}</section>`;

    const render = () => {
      const phase = guide.phases[activePhase];
      const checked = new Set(progress.checks[activePhase] || []);
      const completedCount = progress.complete.length;
      const percent = Math.round((completedCount / guide.phases.length) * 100);
      elements.guideDialogContent.innerHTML = `<div class="dialog-header setup-guide-header"><div><span class="category-tag">${escapeHtml(guide.category)}</span><h2>${escapeHtml(guide.title)}</h2><p>${escapeHtml(guide.introduction)}</p></div><div class="dialog-actions"><button class="share-code share-guide" type="button" aria-label="Copy share link" title="Copy share link">${SHARE_ICON}</button><button class="close-guide-dialog close-dialog" aria-label="Close">×</button></div></div>
        <div class="setup-progress" aria-label="${completedCount} of ${guide.phases.length} phases completed"><div><span>${completedCount} of ${guide.phases.length} phases complete</span><strong>${percent}%</strong></div><div class="setup-progress-track"><i style="width:${percent}%"></i></div></div>
        <div class="setup-guide-layout"><nav class="setup-phase-nav" aria-label="Guide phases">${guide.phases.map((item, index) => `<button type="button" data-phase="${index}" class="${index === activePhase ? "active" : ""} ${progress.complete.includes(index) ? "complete" : ""}"><span>${progress.complete.includes(index) ? "✓" : index + 1}</span><b>${escapeHtml(item.shortTitle)}</b></button>`).join("")}</nav>
        <article class="setup-phase-content"><p class="setup-phase-number">Phase ${activePhase + 1} of ${guide.phases.length}</p><h2>${escapeHtml(phase.title)}</h2><p class="setup-objective">${escapeHtml(phase.objective)}</p>${phase.sections.map(renderSection).join("")}
        <figure class="guide-image-placeholder"><div aria-hidden="true">▧</div><figcaption>${escapeHtml(phase.image)}</figcaption><small>Image placeholder — add the relevant screenshot later</small></figure>
        <section class="setup-checkpoint"><h3>Before continuing</h3>${phase.checks.map((item, index) => `<label><input type="checkbox" data-guide-check="${index}" ${checked.has(index) ? "checked" : ""} /><span>${escapeHtml(item)}</span></label>`).join("")}<button type="button" class="phase-complete-button ${progress.complete.includes(activePhase) ? "complete" : ""}" data-toggle-complete>${progress.complete.includes(activePhase) ? "✓ Phase completed" : "Mark phase as complete"}</button></section>
        <div class="setup-phase-actions"><button type="button" data-guide-back ${activePhase === 0 ? "disabled" : ""}>← Previous</button><button type="button" class="next" data-guide-next ${activePhase === guide.phases.length - 1 ? "disabled" : ""}>Next phase →</button></div><p class="guide-source-note">${escapeHtml(guide.sourceNote)}</p></article></div>`;
      $(".close-guide-dialog", elements.guideDialogContent).addEventListener("click", () => elements.guideDialog.close());
      $(".share-guide", elements.guideDialogContent).addEventListener("click", () => shareGuide(guide));
    };

    elements.guideDialogContent.onclick = (event) => {
      const phaseButton = event.target.closest("[data-phase]");
      if (phaseButton) activePhase = Number(phaseButton.dataset.phase);
      else if (event.target.closest("[data-guide-back]") && activePhase > 0) activePhase -= 1;
      else if (event.target.closest("[data-guide-next]") && activePhase < guide.phases.length - 1) activePhase += 1;
      else if (event.target.closest("[data-toggle-complete]")) {
        progress.complete = progress.complete.includes(activePhase) ? progress.complete.filter((index) => index !== activePhase) : [...progress.complete, activePhase].sort((a, b) => a - b);
      } else return;
      saveProgress(); render(); elements.guideDialog.scrollTop = 0;
    };
    elements.guideDialogContent.onchange = (event) => {
      if (!event.target.matches("[data-guide-check]")) return;
      const index = Number(event.target.dataset.guideCheck), values = new Set(progress.checks[activePhase] || []);
      event.target.checked ? values.add(index) : values.delete(index);
      progress.checks[activePhase] = [...values].sort((a, b) => a - b); saveProgress();
    };
    render(); elements.guideDialog.showModal();
  }

  function activateTab(name) {
    document.querySelectorAll("[data-tab]").forEach((button) => button.classList.toggle("active", button.dataset.tab === name));
    document.querySelectorAll("[data-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === name));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function initDeveloperMode() {
    const enabled = window.ACE_DEVELOPER_CONFIG?.showDeveloperMode === 1;
    if (!enabled) return;
    $(".developer-tab").hidden = false;
    const makeChecks = (target, entries, name) => {
      $(target).innerHTML = entries.map((entry) => `<label><input type="checkbox" name="${name}" value="${entry.id}" /><span>${entry.name}</span></label>`).join("");
    };
    makeChecks("#dev-games", catalog.games, "games");
    makeChecks("#dev-languages", catalog.languages, "languages");
    makeChecks("#dev-platforms", catalog.platforms, "platforms");
    $("#developer-form").addEventListener("submit", saveDeveloperCode);
    $("#export-codes").addEventListener("click", exportLocalCodes);
    $("#import-codes").addEventListener("change", importLocalCodes);
    $("#local-codes").addEventListener("click", handleDeveloperCodeAction);
    $("#cancel-code-edit").addEventListener("click", resetDeveloperForm);
    $("#delete-code-edit").addEventListener("click", deleteEditingCode);
    $("#developer-form").querySelectorAll('input[type="checkbox"]').forEach((input) => input.addEventListener("change", renderVariationTabs));
    $("#developer-form").elements.code.addEventListener("input", syncDefaultCodeToVariations);
    $("#combination-tabs").addEventListener("click", selectVariationTab);
    $(".developer-content-tabs").addEventListener("click", (event) => {
      const button = event.target.closest("[data-dev-tab]"); if (!button) return;
      document.querySelectorAll("[data-dev-tab]").forEach((item) => item.classList.toggle("active", item === button));
      document.querySelectorAll("[data-dev-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.devPanel === button.dataset.devTab));
    });
    $("#guide-developer-form").addEventListener("submit", saveDeveloperGuide);
    $("#developer-guides").addEventListener("click", handleDeveloperGuideAction);
    $("#cancel-guide-edit").addEventListener("click", resetGuideDeveloperForm);
    $("#delete-guide-edit").addEventListener("click", deleteEditingGuide);
    $("#interactive-phase-tabs").addEventListener("click", selectInteractivePhase);
    $("#add-guide-phase").addEventListener("click", addInteractivePhase);
    $("#delete-guide-phase").addEventListener("click", deleteInteractivePhase);
    $("#page-developer-form").addEventListener("submit", saveDeveloperPage);
    $("#page-developer-form").elements.page.addEventListener("change", loadPageDeveloperForm);
    renderLocalCodes();
    renderDeveloperGuides();
    loadPageDeveloperForm();
  }

  function selectedDeveloperValues(name) {
    return [...$("#developer-form").querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
  }

  function variationCombinations() {
    const games = selectedDeveloperValues("games");
    const languages = selectedDeveloperValues("languages");
    let platforms = selectedDeveloperValues("platforms").map((id) => ({ id, ids: [id] }));
    const shareEmulatorCode = $("#same-emulator-code").checked;
    if (shareEmulatorCode && platforms.some((item) => item.id === "accurate") && platforms.some((item) => item.id === "inaccurate")) {
      platforms = platforms.filter((item) => !["accurate", "inaccurate"].includes(item.id));
      platforms.unshift({ id: "accurate+inaccurate", ids: ["accurate", "inaccurate"] });
    }
    const baselineGame = games[0], baselineLanguage = languages[0];
    const baselinePlatform = platforms.find((choice) => choice.ids.includes("accurate")) || platforms[0];
    return games.flatMap((game) => languages.flatMap((language) => platforms
      .filter((platformChoice) => platformChoice.ids.some((platformId) => {
        const platform = catalog.platforms.find((item) => item.id === platformId);
        return !platform?.games || platform.games.includes(game);
      }))
      .filter((platformChoice) => !(game === baselineGame && language === baselineLanguage && platformChoice.id === baselinePlatform?.id))
      .map((platformChoice) => ({ game, language, platform: platformChoice.id, platformIds: platformChoice.ids, key: `${game}|${language}|${platformChoice.id}` }))));
  }

  function renderVariationTabs() {
    const selectedGames = selectedDeveloperValues("games"), selectedLanguages = selectedDeveloperValues("languages");
    const selectedPlatforms = selectedDeveloperValues("platforms");
    const baselineGame = selectedGames[0], baselineLanguage = selectedLanguages[0];
    const baselinePlatform = selectedPlatforms.includes("accurate") ? "accurate" : selectedPlatforms[0];
    $("#default-code-label").textContent = baselineGame && baselineLanguage && baselinePlatform
      ? `Default: ${nameFor("games", baselineGame)} · ${nameFor("languages", baselineLanguage)} · ${nameFor("platforms", baselinePlatform)} *`
      : "Default console / accurate-emulator code * - one line per box";
    $("#default-code-help").textContent = baselineGame && baselineLanguage && baselinePlatform
      ? "This baseline is saved automatically. Write instructions between code groups; add 'Code note: your message' after a code to replace its small footer."
      : "Select a game and language to define the baseline. Code lines start with Box 1: through Box 14:; per-code footers start with 'Code note:'.";
    const combinations = variationCombinations();
    combinations.forEach((combo) => {
      if (!variationDrafts.has(combo.key)) variationDrafts.set(combo.key, { value: "", edited: false });
    });
    if (!combinations.some((combo) => combo.key === activeVariation)) activeVariation = combinations[0]?.key || "";
    $("#combination-tabs").innerHTML = combinations.map((combo) => {
      const filled = Boolean(variationDrafts.get(combo.key)?.value.trim());
      const platformName = combo.platform === "accurate+inaccurate" ? "GBA + old emulator" : catalog.platforms.find((item) => item.id === combo.platform)?.shortName;
      return `<button type="button" class="${combo.key === activeVariation ? "active" : ""} ${filled ? "filled" : ""}" data-variation="${combo.key}"><strong>${filled ? "✓ " : ""}${nameFor("games", combo.game)}</strong><span>${nameFor("languages", combo.language)} · ${platformName}</span></button>`;
    }).join("");
    renderActiveVariation();
  }

  function selectVariationTab(event) {
    const button = event.target.closest("[data-variation]");
    if (!button) return;
    activeVariation = button.dataset.variation;
    renderVariationTabs();
  }

  function renderActiveVariation() {
    const field = $("#combination-field");
    if (!activeVariation) {
      field.innerHTML = "<p>Select compatibility above to create variation tabs.</p>";
      return;
    }
    const [game, language, platform] = activeVariation.split("|");
    const draft = variationDrafts.get(activeVariation);
    const platformName = platform === "accurate+inaccurate" ? "GBA console / accurate emulator + old emulator" : nameFor("platforms", platform);
    field.innerHTML = `<label><span>${nameFor("games", game)} · ${nameFor("languages", language)} · ${platformName}</span><textarea rows="10" aria-label="Code for selected compatibility variation" placeholder="Leave blank to use the default code. Write instructions between code groups and add Code note: after any code that needs a custom footer."></textarea></label><small class="variation-state">${draft.value.trim() ? "✓ Variation filled in" : "Uses default code"}</small>`;
    const textarea = field.querySelector("textarea");
    textarea.value = draft.value;
    textarea.addEventListener("input", () => {
      variationDrafts.set(activeVariation, { value: textarea.value, edited: true });
      const filled = Boolean(textarea.value.trim());
      field.querySelector(".variation-state").textContent = filled ? "✓ Variation filled in" : "Uses default code";
      const tab = $("#combination-tabs").querySelector(`[data-variation="${activeVariation}"]`);
      tab?.classList.toggle("filled", filled);
      const title = tab?.querySelector("strong");
      if (title) title.textContent = `${filled ? "✓ " : ""}${nameFor("games", activeVariation.split("|")[0])}`;
    });
  }

  function syncDefaultCodeToVariations() {
    if (activeVariation && !variationDrafts.get(activeVariation)?.value.trim()) renderActiveVariation();
  }

  function lines(value) {
    return String(value || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  }

  function safeText(value) {
    return String(value || "").replace(/[<>]/g, "").trim();
  }

  function saveDeveloperCode(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const games = data.getAll("games"), languages = data.getAll("languages"), platforms = data.getAll("platforms");
    const status = $("#developer-status");
    if (!games.length || !languages.length || !platforms.length) {
      status.textContent = "Select at least one game, language, and platform.";
      return;
    }
    const defaultDraft = parseCodeDraft(data.get("code"));
    if (!defaultDraft.blocks.length) {
      status.textContent = "Add at least one box-name code.";
      return;
    }
    const defaultSignature = codeDraftSignature(defaultDraft.blocks, defaultDraft.after);
    const variants = { default: variantFromCodeDraft(defaultDraft.blocks, defaultDraft.after, "Locally added developer entry.") };
    variationCombinations().forEach((combo) => {
      const draft = variationDrafts.get(combo.key);
      const codeDraft = parseCodeDraft(draft?.value);
      if (!codeDraft.blocks.length || codeDraftSignature(codeDraft.blocks, codeDraft.after) === defaultSignature) return;
      combo.platformIds.forEach((platformId) => {
        variants[`${combo.game}|${combo.language}|${platformId}`] = variantFromCodeDraft(codeDraft.blocks, codeDraft.after, "Game, language and platform-specific variation.");
      });
    });
    const title = safeText(data.get("title"));
    const existingCode = editingCodeId ? catalog.codes.find((entry) => entry.id === editingCodeId) : null;
    const code = {
      id: editingCodeId || `local-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${Date.now()}`,
      title, summary: safeText(data.get("summary")), category: safeText(data.get("category")), difficulty: safeText(data.get("difficulty")),
      recommended: data.get("recommended") === "on",
      games, languages, platforms, tags: existingCode?.tags || [], parameters: existingCode?.parameters || [], variants,
      requirements: lines(data.get("requirements")).map(safeText), sourceCode: lines(data.get("sourceCode")),
      video: safeText(data.get("video")), troubleshooting: lines(data.get("troubleshooting")).map(safeText),
      instructions: existingCode?.instructions || ["Back up your save.", "Confirm every requirement above.", "Enter and execute the code exactly as documented."],
      source: { label: safeText(data.get("sourceLabel")) || "Locally added entry", url: safeText(data.get("sourceUrl")) },
      locallyAdded: true,
    };
    const matchingProjectCode = projectCodes.find((entry) => entry.id === code.id);
    if (matchingProjectCode) code[LOCAL_CODE_PROJECT_SIGNATURE] = projectCodeSignature(matchingProjectCode);
    const localIndex = localCodes.findIndex((entry) => entry.id === code.id);
    if (localIndex >= 0) localCodes[localIndex] = code;
    else localCodes.push(code);
    mergeCode(code);
    localStorage.setItem(LOCAL_CODES_KEY, JSON.stringify(localCodes));
    const wasEditing = Boolean(editingCodeId);
    resetDeveloperForm();
    status.textContent = `${wasEditing ? "Updated" : "Saved"} “${title}”. It is now available under ACE codes.`;
    renderLocalCodes(); renderLibrary();
  }

  function renderLocalCodes() {
    const codes = [...catalog.codes].sort((a, b) => Number(Boolean(b.recommended)) - Number(Boolean(a.recommended)) || compareTitles(a, b));
    $("#local-codes").innerHTML = codes.length ? codes.map((code) => {
      const count = codeBlockCount(code);
      return `<div><span><strong>${code.title}</strong><small>${code.category} · ${code.difficulty}${count > 1 ? ` · ${codeCountLabel(count)}` : ""}${code.recommended ? " · Recommended" : ""}</small></span><span class="local-code-actions"><button type="button" data-edit-code="${code.id}">Edit</button></span></div>`;
    }).join("") : "<p>No codes available.</p>";
  }

  function handleDeveloperCodeAction(event) {
    const editId = event.target.dataset.editCode;
    if (editId) { editDeveloperCode(editId); return; }
    const id = event.target.dataset.deleteLocal;
    if (!id) return;
    localCodes = localCodes.filter((code) => code.id !== id);
    const index = catalog.codes.findIndex((code) => code.id === id);
    if (index >= 0) catalog.codes.splice(index, 1);
    localStorage.setItem(LOCAL_CODES_KEY, JSON.stringify(localCodes));
    renderLocalCodes(); renderLibrary();
  }

  function editDeveloperCode(id) {
    const code = catalog.codes.find((entry) => entry.id === id);
    if (!code) return;
    const form = $("#developer-form");
    editingCodeId = code.id;
    form.elements.title.value = code.title || "";
    form.elements.category.value = code.category || "Utilities";
    form.elements.difficulty.value = code.difficulty || "Unrated";
    form.elements.recommended.checked = Boolean(code.recommended);
    form.elements.summary.value = code.summary || "";
    form.elements.code.value = variantToEditorText(code.variants?.default);
    form.elements.requirements.value = (code.requirements || []).join("\n");
    form.elements.sourceCode.value = (code.sourceCode || []).join("\n");
    form.elements.sourceLabel.value = code.source?.label || "";
    form.elements.sourceUrl.value = code.source?.url || "";
    form.elements.video.value = code.video || "";
    form.elements.troubleshooting.value = (code.troubleshooting || []).join("\n");
    form.querySelectorAll('input[type="checkbox"][name="games"], input[type="checkbox"][name="languages"], input[type="checkbox"][name="platforms"]').forEach((input) => {
      input.checked = (code[input.name] || []).includes(input.value);
    });
    $("#same-emulator-code").checked = false;
    variationDrafts.clear(); activeVariation = "";
    Object.entries(code.variants || {}).forEach(([key, variant]) => {
      if (key.split("|").length === 3) variationDrafts.set(key, { value: variantToEditorText(variant), edited: true });
    });
    renderVariationTabs();
    $("#save-code-button").textContent = "Update code";
    $("#cancel-code-edit").hidden = false;
    $("#delete-code-edit").hidden = false;
    $("#developer-status").textContent = `Editing “${code.title}”.`;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetDeveloperForm() {
    const form = $("#developer-form");
    form.reset(); editingCodeId = ""; variationDrafts.clear(); activeVariation = "";
    renderVariationTabs();
    $("#save-code-button").textContent = "Save code to local library";
    $("#cancel-code-edit").hidden = true;
    $("#delete-code-edit").hidden = true;
  }

  function deleteEditingCode() {
    if (!editingCodeId) return;
    const code = catalog.codes.find((entry) => entry.id === editingCodeId);
    if (!code || !window.confirm(`Delete “${code.title}”?`)) return;
    const id = editingCodeId;
    const needsPersistentDeletion = builtInCodeIds.has(id) || projectCodes.some((entry) => entry.id === id);
    localCodes = localCodes.filter((entry) => entry.id !== id);
    if (needsPersistentDeletion) {
      const deletion = { id, deleted: true, locallyAdded: true };
      const matchingProjectCode = projectCodes.find((entry) => entry.id === id);
      if (matchingProjectCode) deletion[LOCAL_CODE_PROJECT_SIGNATURE] = projectCodeSignature(matchingProjectCode);
      localCodes.push(deletion);
    }
    const catalogIndex = catalog.codes.findIndex((entry) => entry.id === id);
    if (catalogIndex >= 0) catalog.codes.splice(catalogIndex, 1);
    localStorage.setItem(LOCAL_CODES_KEY, JSON.stringify(localCodes));
    resetDeveloperForm(); renderLocalCodes(); renderLibrary();
    $("#developer-status").textContent = `Deleted “${code.title}”. Export the project file to make this deletion permanent.`;
  }

  function saveDeveloperGuide(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = safeText(data.get("title"));
    const existing = editingGuideId ? catalog.guides.find((guide) => guide.id === editingGuideId) : null;
    const isInteractive = !$("#interactive-guide-editor").hidden;
    if (isInteractive) syncInteractivePhaseFromFields();
    const guide = {
      id: editingGuideId || `guide-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${Date.now()}`,
      title, category: safeText(data.get("category")), difficulty: safeText(data.get("difficulty")),
      summary: safeText(data.get("summary")), introduction: safeText(data.get("introduction")),
      video: safeText(data.get("video")), locallyAdded: true,
    };
    if (isInteractive) {
      guide.type = "interactive-setup";
      guide.phases = interactivePhaseDrafts;
      guide.sourceNote = existing?.sourceNote || "Edited in the ACE Archive Developer editor.";
    } else guide.body = String(data.get("body") || "").trim();
    const localIndex = localGuides.findIndex((entry) => entry.id === guide.id);
    if (localIndex >= 0) localGuides[localIndex] = guide; else localGuides.push(guide);
    mergeGuide(guide); localStorage.setItem(LOCAL_GUIDES_KEY, JSON.stringify(localGuides));
    const action = existing ? "Updated" : "Saved";
    resetGuideDeveloperForm(); renderGuides(); renderDeveloperGuides();
    $("#guide-developer-status").textContent = `${action} “${title}”.`;
  }

  function renderDeveloperGuides() {
    const guides = [...catalog.guides].sort(compareTitles);
    $("#developer-guides").innerHTML = guides.map((guide) => `<div><span><strong>${escapeHtml(guide.title)}</strong><small>${escapeHtml(guide.category)} · ${escapeHtml(guide.difficulty)}${guide.type === "interactive-setup" ? " · Interactive" : ""}</small></span><span class="local-code-actions"><button type="button" data-edit-guide="${guide.id}">Edit</button></span></div>`).join("");
  }

  function handleDeveloperGuideAction(event) {
    const id = event.target.dataset.editGuide; if (!id) return;
    const guide = catalog.guides.find((entry) => entry.id === id); if (!guide) return;
    const form = $("#guide-developer-form"); editingGuideId = id;
    ["title", "category", "difficulty", "summary", "introduction", "video"].forEach((name) => { form.elements[name].value = guide[name] || ""; });
    const isInteractive = guide.type === "interactive-setup";
    $("#interactive-guide-editor").hidden = !isInteractive;
    $("#normal-guide-body-field").hidden = isInteractive;
    form.elements.body.required = !isInteractive;
    if (isInteractive) {
      interactivePhaseDrafts = JSON.parse(JSON.stringify(guide.phases || [])); activeInteractivePhase = 0; renderInteractivePhaseTabs();
    } else form.elements.body.value = guide.body || (guide.sections || []).map((section) => `## ${section.title}\n\n${section.text}`).join("\n\n");
    $("#save-guide-button").textContent = "Update guide"; $("#cancel-guide-edit").hidden = false; $("#delete-guide-edit").hidden = false;
    $("#guide-developer-status").textContent = `Editing “${guide.title}”.`; form.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetGuideDeveloperForm() {
    $("#guide-developer-form").reset(); editingGuideId = ""; $("#save-guide-button").textContent = "Save guide";
    $("#cancel-guide-edit").hidden = true; $("#delete-guide-edit").hidden = true;
    $("#interactive-guide-editor").hidden = true; $("#normal-guide-body-field").hidden = false; $("#guide-developer-form").elements.body.required = true;
    interactivePhaseDrafts = []; activeInteractivePhase = 0;
  }

  function phaseToEditorText(phase) {
    return (phase.sections || []).map((section) => {
      const lines = [`## ${section.title}`, ""];
      (section.paragraphs || []).forEach((paragraph) => lines.push(paragraph, ""));
      (section.bullets || []).forEach((item) => lines.push(`- ${item}`));
      if (section.bullets?.length) lines.push("");
      if (section.note) lines.push(`> Note: ${section.note}`, "");
      if (section.warning) lines.push(`> Important: ${section.warning}`, "");
      return lines.join("\n").trim();
    }).join("\n\n");
  }

  function editorTextToSections(value) {
    const sections = []; let section = null, paragraph = [];
    const ensureSection = () => { if (!section) { section = { title: "Instructions", paragraphs: [] }; sections.push(section); } return section; };
    const flushParagraph = () => { if (paragraph.length) { ensureSection().paragraphs ||= []; ensureSection().paragraphs.push(paragraph.join(" ")); paragraph = []; } };
    String(value || "").split(/\r?\n/).forEach((line) => {
      const text = line.trim();
      if (text.startsWith("## ")) { flushParagraph(); section = { title: text.slice(3), paragraphs: [] }; sections.push(section); }
      else if (/^-\s*/.test(text)) { flushParagraph(); ensureSection().bullets ||= []; section.bullets.push(text.replace(/^-\s*/, "")); }
      else if (/^>\s*Note:/i.test(text)) { flushParagraph(); ensureSection().note = text.replace(/^>\s*Note:\s*/i, ""); }
      else if (/^>\s*Important:/i.test(text)) { flushParagraph(); ensureSection().warning = text.replace(/^>\s*Important:\s*/i, ""); }
      else if (!text) flushParagraph();
      else paragraph.push(text);
    });
    flushParagraph();
    return sections.filter((item) => item.title || item.paragraphs?.length || item.bullets?.length);
  }

  function syncInteractivePhaseFromFields() {
    const phase = interactivePhaseDrafts[activeInteractivePhase]; if (!phase) return;
    phase.title = $("#phase-title").value.trim(); phase.shortTitle = $("#phase-short-title").value.trim();
    phase.objective = $("#phase-objective").value.trim(); phase.sections = editorTextToSections($("#phase-body").value);
    phase.image = $("#phase-image").value.trim(); phase.checks = lines($("#phase-checks").value);
  }

  function renderInteractivePhaseTabs() {
    $("#interactive-phase-tabs").innerHTML = interactivePhaseDrafts.map((phase, index) => `<button type="button" class="${index === activeInteractivePhase ? "active" : ""}" data-edit-phase="${index}"><span>${index + 1}</span>${escapeHtml(phase.shortTitle || phase.title || "New phase")}</button>`).join("");
    const phase = interactivePhaseDrafts[activeInteractivePhase];
    if (!phase) return;
    $("#phase-title").value = phase.title || ""; $("#phase-short-title").value = phase.shortTitle || ""; $("#phase-objective").value = phase.objective || "";
    $("#phase-body").value = phaseToEditorText(phase); $("#phase-image").value = phase.image || ""; $("#phase-checks").value = (phase.checks || []).join("\n");
  }

  function selectInteractivePhase(event) {
    const button = event.target.closest("[data-edit-phase]"); if (!button) return;
    syncInteractivePhaseFromFields(); activeInteractivePhase = Number(button.dataset.editPhase); renderInteractivePhaseTabs();
  }

  function addInteractivePhase() {
    syncInteractivePhaseFromFields(); interactivePhaseDrafts.push({ title: "New phase", shortTitle: "New phase", objective: "", sections: [], image: "", checks: [] });
    activeInteractivePhase = interactivePhaseDrafts.length - 1; renderInteractivePhaseTabs();
  }

  function deleteInteractivePhase() {
    if (interactivePhaseDrafts.length <= 1 || !window.confirm("Delete this phase?")) return;
    interactivePhaseDrafts.splice(activeInteractivePhase, 1); activeInteractivePhase = Math.max(0, activeInteractivePhase - 1); renderInteractivePhaseTabs();
  }

  function deleteEditingGuide() {
    const guide = catalog.guides.find((entry) => entry.id === editingGuideId);
    if (!guide || !window.confirm(`Delete “${guide.title}”?`)) return;
    localGuides = localGuides.filter((entry) => entry.id !== guide.id);
    localGuides.push({ id: guide.id, deleted: true, locallyAdded: true });
    mergeGuide({ id: guide.id, deleted: true }); localStorage.setItem(LOCAL_GUIDES_KEY, JSON.stringify(localGuides));
    resetGuideDeveloperForm(); renderGuides(); renderDeveloperGuides(); $("#guide-developer-status").textContent = `Deleted “${guide.title}”.`;
  }

  function loadPageDeveloperForm() {
    const form = $("#page-developer-form"), page = pageContent[form.elements.page.value];
    form.elements.title.value = page.title || ""; form.elements.introduction.value = page.introduction || ""; form.elements.body.value = page.body || "";
    const isFaq = form.elements.page.value === "faq";
    form.elements.body.placeholder = isFaq ? "## What is the question?\n\nWrite the answer here.\n\n## Another question?\n\nWrite the next answer here." : "## Section heading\n\nWrite a paragraph here.\n\n- First list item\n- Second list item";
    $("#page-format-help").textContent = isFaq ? "Start every question with ##, then write its answer below. Each question becomes an expandable pill." : "Use ## for headings, - for lists, and blank lines between paragraphs.";
  }

  function saveDeveloperPage(event) {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); const id = data.get("page");
    const page = { title: safeText(data.get("title")), introduction: safeText(data.get("introduction")), body: String(data.get("body") || "").trim() };
    pageContent[id] = page; localPages[id] = page; localStorage.setItem(LOCAL_PAGES_KEY, JSON.stringify(localPages)); renderPages();
    $("#page-developer-status").textContent = `Saved ${id === "faq" ? "FAQ" : "ACE troubleshooting"} page text.`;
  }

  function mergeExportCollection(projectItems, localItems) {
    const result = [...projectItems];
    localItems.forEach((item) => { const clean = { ...item }; delete clean.locallyAdded; const index = result.findIndex((entry) => entry.id === clean.id); if (index >= 0) result[index] = clean; else result.push(clean); });
    return result;
  }

  function exportLocalCodes() {
    const permanentCodes = [...projectCodes];
    localCodes.filter(localCodeCanOverrideProject).forEach((code) => {
      const cleanCode = { ...code };
      delete cleanCode.locallyAdded;
      delete cleanCode[LOCAL_CODE_PROJECT_SIGNATURE];
      const existingIndex = permanentCodes.findIndex((entry) => entry.id === cleanCode.id);
      if (existingIndex >= 0) permanentCodes[existingIndex] = cleanCode;
      else permanentCodes.push(cleanCode);
    });
    const permanentGuides = mergeExportCollection(projectGuides, localGuides);
    const permanentPages = { ...projectPages, ...localPages };
    const contents = `/* Generated by the ACE Archive Developer editor. */\nwindow.ACE_CUSTOM_CONTENT = ${JSON.stringify({ codes: permanentCodes, guides: permanentGuides, pages: permanentPages }, null, 2)};\n`;
    const blob = new Blob([contents], { type: "text/javascript" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob); link.download = "custom-codes.js"; link.click();
    URL.revokeObjectURL(link.href);
    $("#developer-status").textContent = "Exported custom-codes.js. Replace data/custom-codes.js with the downloaded file to make these codes permanent.";
  }

  async function importLocalCodes(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const raw = await file.text();
      const isProjectFile = raw.includes("window.ACE_CUSTOM_CONTENT") || raw.includes("window.ACE_CUSTOM_CODES");
      const jsonText = isProjectFile ? raw.slice(raw.indexOf("=") + 1, raw.lastIndexOf(";")) : raw;
      const imported = JSON.parse(jsonText);
      const importedContent = Array.isArray(imported) ? { codes: imported, guides: [], pages: {} } : imported;
      if (!Array.isArray(importedContent.codes)) throw new Error("Expected content data");
      localCodes = importedContent.codes.map((code) => {
        const localCode = { ...code, locallyAdded: true };
        const matchingProjectCode = projectCodes.find((entry) => entry.id === code.id);
        if (matchingProjectCode) localCode[LOCAL_CODE_PROJECT_SIGNATURE] = projectCodeSignature(matchingProjectCode);
        return localCode;
      });
      localGuides = (importedContent.guides || []).map((guide) => ({ ...guide, locallyAdded: true }));
      localPages = importedContent.pages || {};
      catalog.codes.splice(0, catalog.codes.length, ...catalog.codes.filter((code) => !code.locallyAdded));
      localCodes.forEach(mergeCode);
      localGuides.forEach(mergeGuide); Object.assign(pageContent, localPages);
      localStorage.setItem(LOCAL_CODES_KEY, JSON.stringify(localCodes)); localStorage.setItem(LOCAL_GUIDES_KEY, JSON.stringify(localGuides)); localStorage.setItem(LOCAL_PAGES_KEY, JSON.stringify(localPages));
      renderLocalCodes(); renderLibrary(); renderGuides(); renderDeveloperGuides(); renderPages(); loadPageDeveloperForm();
      $("#developer-status").textContent = `Imported ${localCodes.length} code${localCodes.length === 1 ? "" : "s"}, ${localGuides.length} guide${localGuides.length === 1 ? "" : "s"}, and page text.`;
    } catch { $("#developer-status").textContent = "That file is not a valid exported code list."; }
    event.target.value = "";
  }

  function filterChoices(input) {
    const select = input.nextElementSibling;
    const query = input.value.toLowerCase();
    [...select.options].forEach((option) => { option.hidden = !option.text.toLowerCase().includes(query); });
  }

  function renderCodeCharacters(value) {
    return [...String(value || "")].map((character) => {
      const escapedCharacter = escapeHtml(character);
      if (/\s/u.test(character)) return escapedCharacter;
      if (character === "." || character === ",") {
        return `<span class="code-char-flexible" title="Available on multiple keyboards">${escapedCharacter}</span>`;
      }
      if (character === "_") return `<span class="code-char-underscore" title="Underscore (space)">${escapedCharacter}</span>`;
      if (character === "[" || character === "]") return `<span class="code-char-bracket">${escapedCharacter}</span>`;
      if (character === "-") return `<span class="code-char-symbol code-char-hyphen" title="Hyphen">${escapedCharacter}</span>`;
      if (/[\p{P}\p{S}]/u.test(character)) return `<span class="code-char-symbol">${escapedCharacter}</span>`;
      if (/[\p{Lu}\p{Lt}]/u.test(character)) return `<span class="code-char-upper">${escapedCharacter}</span>`;
      if (/\p{Ll}/u.test(character)) return `<span class="code-char-lower">${escapedCharacter}</span>`;
      if (/[0-9]/.test(character)) return `<span class="code-char-number">${escapedCharacter}</span>`;
      return escapedCharacter;
    }).join("");
  }

  function renderCodeLine(line) {
    const match = String(line || "").match(/^(Box\s*(?:1[0-4]|[1-9])\s*:)(.*)$/i);
    if (!match) return renderCodeCharacters(line);
    const annotationMatch = match[2].match(/^\s*(.*?)\s*(\[[^\]]*\].*)$/);
    const codeBody = annotationMatch ? annotationMatch[1] : match[2].trim();
    const annotation = annotationMatch ? `<span class="code-line-annotation">${renderCodeCharacters(annotationMatch[2])}</span>` : "";
    return `<span class="box-code-prefix">${escapeHtml(match[1])}</span><span class="code-line-main">${renderCodeCharacters(codeBody)}</span>${annotation}`;
  }

  function renderGenerated(code) {
    const form = $("#generator-form");
    const variant = getVariant(code);
    const values = {};
    (code.parameters || []).forEach((parameter) => {
      const input = form.elements[parameter.id];
      if (parameter.type === "choice") {
        values[parameter.id] = catalog.choices[parameter.source].find((choice) => choice.id === input.value) || catalog.choices[parameter.source][0];
      } else {
        const number = Math.max(parameter.min, Math.min(parameter.max, Number(input.value) || parameter.default));
        values[parameter.id] = { value: number, hex2: number.toString(16).toUpperCase().padStart(2, "0"), hex4: number.toString(16).toUpperCase().padStart(4, "0") };
      }
    });
    variantCodeBlocks(variant).forEach((block, index) => {
      const output = block.template.map((line) => line.replace(/\{(\w+)\.(\w+)\}/g, (_, key, property) => values[key]?.[property] ?? "????"));
      const target = elements.dialogContent.querySelector(`[data-generated-code="${index}"]`);
      if (target) target.innerHTML = output.map(renderCodeLine).join("\n");
    });
  }

  function compactCodeForClipboard(value) {
    return String(value || "").split(/\r?\n/).map((line) => {
      const match = line.match(/^(Box\s*(?:1[0-4]|[1-9])\s*:)\s*(.*)$/i);
      if (!match) return line.replace(/[ \t]+/g, "");
      return `${match[1]} ${match[2].replace(/\s+/g, "")}`;
    }).join("\n");
  }

  async function copyCode(event) {
    const copyTarget = event.currentTarget.dataset.copyCode;
    const outputs = copyTarget === "all"
      ? [...elements.dialogContent.querySelectorAll("[data-generated-code]")]
      : [elements.dialogContent.querySelector(`[data-generated-code="${copyTarget}"]`)].filter(Boolean);
    const output = outputs.map((item) => compactCodeForClipboard(item.textContent)).join("\n\n");
    try { await navigator.clipboard.writeText(output); }
    catch {
      const clipboardFallback = document.createElement("textarea");
      clipboardFallback.value = output;
      clipboardFallback.setAttribute("readonly", "");
      clipboardFallback.style.position = "fixed";
      clipboardFallback.style.opacity = "0";
      document.body.appendChild(clipboardFallback);
      clipboardFallback.select();
      document.execCommand("copy");
      clipboardFallback.remove();
    }
    elements.toast.classList.add("show");
    setTimeout(() => elements.toast.classList.remove("show"), 1800);
  }

  elements.categories.addEventListener("click", (event) => { if (event.target.dataset.category) { state.category = event.target.dataset.category; renderLibrary(); } });
  elements.search.addEventListener("input", (event) => { state.search = event.target.value; renderLibrary(); });
  elements.grid.addEventListener("click", (event) => { const id = event.target.closest("[data-id]")?.dataset.id; if (id) openCode(id); });
  elements.grid.addEventListener("keydown", (event) => { if (event.key === "Enter") openCode(event.target.closest("[data-id]")?.dataset.id); });
  elements.dialog.addEventListener("click", (event) => { if (event.target === elements.dialog) elements.dialog.close(); });
  elements.dialog.addEventListener("close", clearCodeDeepLink);
  document.querySelector(".section-tabs").addEventListener("click", (event) => {
    const tab = event.target.closest("[data-tab]");
    if (!tab) return;
    activateTab(tab.dataset.tab);
  });
  $("#guide-list").addEventListener("click", (event) => { const id = event.target.closest("[data-guide-id]")?.dataset.guideId; if (id) openGuide(id); });
  $("#guide-list").addEventListener("keydown", (event) => { if (event.key === "Enter") openGuide(event.target.closest("[data-guide-id]")?.dataset.guideId); });
  elements.guideDialog.addEventListener("click", (event) => { if (event.target === elements.guideDialog) elements.guideDialog.close(); });
  elements.guideDialog.addEventListener("close", clearGuideDeepLink);
  document.addEventListener("keydown", (event) => {
    const activeElement = document.activeElement;
    const isEditingText = ["INPUT", "TEXTAREA", "SELECT"].includes(activeElement?.tagName) || activeElement?.isContentEditable;
    if (event.key === "/" && !isEditingText) {
      event.preventDefault();
      elements.search.focus();
    }
  });

  initSetup(); initDeveloperMode(); renderLibrary(); renderGuides(); renderPages();
  const sharedCodeId = window.location.hash.startsWith("#code=") ? decodeURIComponent(window.location.hash.slice(6)) : "";
  const sharedGuideId = window.location.hash.startsWith("#guide=") ? decodeURIComponent(window.location.hash.slice(7)) : "";
  if (sharedCodeId && catalog.codes.some((code) => code.id === sharedCodeId && !code.deleted)) openCode(sharedCodeId);
  else if (sharedGuideId && catalog.guides.some((guide) => guide.id === sharedGuideId && !guide.deleted)) {
    activateTab("guides");
    openGuide(sharedGuideId);
  }
  $("#library-version").textContent = catalog.version;
})();
