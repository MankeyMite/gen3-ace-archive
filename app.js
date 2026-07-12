(() => {
  "use strict";

  const catalog = window.ACE_CATALOG;
  const LOCAL_CODES_KEY = "ace-developer-codes";
  const projectCodes = Array.isArray(window.ACE_CUSTOM_CODES) ? window.ACE_CUSTOM_CODES : [];
  let localCodes = loadLocalCodes();
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
  localCodes.forEach(mergeCode);
  const variationDrafts = new Map();
  let activeVariation = "";
  let editingCodeId = "";
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

  function nameFor(collection, id) {
    return catalog[collection].find((entry) => entry.id === id)?.name || id;
  }

  function loadLocalCodes() {
    try {
      const saved = JSON.parse(localStorage.getItem(LOCAL_CODES_KEY) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch { return []; }
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
    });
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
    elements.grid.innerHTML = codes.map((code) => `
      <article class="code-card" data-id="${code.id}" tabindex="0">
        <span class="category-tag">${code.category}</span>
        <div class="code-list-copy"><h3>${code.title}</h3><p>${code.summary}</p></div>
        <div class="card-meta"><span class="difficulty ${code.difficulty.toLowerCase()}">${code.difficulty}</span></div>
      </article>`).join("");
  }

  function getVariant(code) {
    return code.variants[`${state.game}|${state.language}|${state.platform}`]
      || code.variants[`${state.game}|${state.language}|*`]
      || code.variants[`${state.game}|*|${state.platform}`]
      || code.variants[`*|${state.language}|${state.platform}`]
      || code.variants[`${state.language}|${state.platform}`]
      || code.variants[`*|${state.platform}`]
      || code.variants[`${state.language}|*`]
      || code.variants.default;
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
    const usedBoxCount = variant.template.length;
    const remainingBoxText = usedBoxCount < 14
      ? `${usedBoxCount === 13 ? "Box 14" : `Boxes ${usedBoxCount + 1}–14`} may have any name.`
      : "";
    const usefulVariantNote = /^(Locally added developer entry|Game, language and platform-specific variation|Compatibility-specific override)\.?$/i.test(variant.notes || "") ? "" : (variant.notes || "");
    const outputNotes = [remainingBoxText, usefulVariantNote].filter(Boolean);
    const executionSteps = [
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
    const outputPanel = `<div class="output-panel"><div class="output-heading"><h3>${code.parameters.length ? "Generated code" : ""}</h3><button type="button" id="copy-code">Copy all</button></div>
        <pre id="generated-code"></pre>${outputNotes.length ? `<div class="code-notes">${outputNotes.map((note) => `<p>${note}</p>`).join("")}</div>` : ""}</div>`;
    const generatorArea = code.parameters.length
      ? `<div class="dialog-layout"><form class="generator-form" id="generator-form"><h3>Your choices</h3>${code.parameters.map(controlFor).join("")}</form>${outputPanel}</div>`
      : `<form class="fixed-code-section" id="generator-form"><h3>Box name code</h3>${outputPanel}</form>`;
    elements.dialogContent.innerHTML = `
      <div class="dialog-header"><div><span class="category-tag">${code.category}</span><h2>${code.title}</h2><p>${code.summary}</p></div><div class="dialog-actions"><button class="share-code" type="button">Share</button><button class="close-dialog" aria-label="Close">×</button></div></div>
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
    $("#copy-code").addEventListener("click", copyCode);
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

  async function shareCode(code) {
    const url = codeShareUrl(code.id).href;
    try {
      if (navigator.share) await navigator.share({ title: code.title, text: code.summary, url });
      else await navigator.clipboard.writeText(url);
      elements.toast.textContent = navigator.share ? "Share link ready" : "Share link copied";
    } catch (error) {
      if (error?.name === "AbortError") return;
      try { await navigator.clipboard.writeText(url); elements.toast.textContent = "Share link copied"; }
      catch { elements.toast.textContent = url; }
    }
    elements.toast.classList.add("show");
    setTimeout(() => { elements.toast.classList.remove("show"); elements.toast.textContent = "Copied to clipboard"; }, 2200);
  }

  function clearCodeDeepLink() {
    const url = new URL(window.location.href);
    url.searchParams.delete("game"); url.searchParams.delete("language"); url.searchParams.delete("platform");
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
    const guides = catalog.guides || [];
    $("#guide-list").innerHTML = guides.map((guide) => `<article class="guide-card" tabindex="0" data-guide-id="${guide.id}"><span class="category-tag">${guide.category}</span><div><h2>${guide.title}</h2><p>${guide.summary}</p></div><span class="difficulty ${guide.difficulty.toLowerCase()}">${guide.difficulty}</span></article>`).join("");
  }

  function openGuide(id) {
    const guide = (catalog.guides || []).find((entry) => entry.id === id);
    if (!guide) return;
    elements.guideDialogContent.innerHTML = `<div class="dialog-header"><div><span class="category-tag">${guide.category}</span><h2>${guide.title}</h2><p>${guide.summary}</p></div><button class="close-guide-dialog" aria-label="Close">×</button></div><article class="guide-content"><p class="guide-introduction">${guide.introduction}</p>${guide.sections.map((section) => `<section id="guide-${guide.id}-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}"><h3>${section.title}</h3><p>${section.text}</p></section>`).join("")}${guide.video ? `<section><h3>Video tutorial</h3>${videoMarkup(guide.video)}</section>` : ""}</article>`;
    $(".close-guide-dialog", elements.guideDialogContent).addEventListener("click", () => elements.guideDialog.close());
    elements.guideDialog.showModal();
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
    renderLocalCodes();
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
    return games.flatMap((game) => languages.flatMap((language) => platforms
      .filter((platformChoice) => platformChoice.ids.some((platformId) => {
        const platform = catalog.platforms.find((item) => item.id === platformId);
        return !platform?.games || platform.games.includes(game);
      }))
      .map((platformChoice) => ({ game, language, platform: platformChoice.id, platformIds: platformChoice.ids, key: `${game}|${language}|${platformChoice.id}` }))));
  }

  function renderVariationTabs() {
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
    field.innerHTML = `<label><span>${nameFor("games", game)} · ${nameFor("languages", language)} · ${platformName}</span><textarea rows="10" aria-label="Code for selected compatibility variation" placeholder="Leave blank to use the default code"></textarea></label><small class="variation-state">${draft.value.trim() ? "✓ Variation filled in" : "Uses default code"}</small>`;
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
    const defaultTemplate = lines(data.get("code"));
    const variants = { default: { template: defaultTemplate, notes: "Locally added developer entry." } };
    variationCombinations().forEach((combo) => {
      const draft = variationDrafts.get(combo.key);
      const template = lines(draft?.value);
      if (!template.length || template.join("\n") === defaultTemplate.join("\n")) return;
      combo.platformIds.forEach((platformId) => {
        variants[`${combo.game}|${combo.language}|${platformId}`] = { template, notes: "Game, language and platform-specific variation." };
      });
    });
    const title = safeText(data.get("title"));
    const existingCode = editingCodeId ? catalog.codes.find((entry) => entry.id === editingCodeId) : null;
    const code = {
      id: editingCodeId || `local-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${Date.now()}`,
      title, summary: safeText(data.get("summary")), category: safeText(data.get("category")), difficulty: safeText(data.get("difficulty")),
      games, languages, platforms, tags: existingCode?.tags || [], parameters: existingCode?.parameters || [], variants,
      requirements: lines(data.get("requirements")).map(safeText), sourceCode: lines(data.get("sourceCode")),
      video: safeText(data.get("video")), troubleshooting: lines(data.get("troubleshooting")).map(safeText),
      instructions: existingCode?.instructions || ["Back up your save.", "Confirm every requirement above.", "Enter and execute the code exactly as documented."],
      source: { label: safeText(data.get("sourceLabel")) || "Locally added entry", url: safeText(data.get("sourceUrl")) },
      locallyAdded: true,
    };
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
    $("#local-codes").innerHTML = catalog.codes.length ? catalog.codes.map((code) => `<div><span><strong>${code.title}</strong><small>${code.category} · ${code.difficulty}</small></span><span class="local-code-actions"><button type="button" data-edit-code="${code.id}">Edit</button></span></div>`).join("") : "<p>No codes available.</p>";
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
    form.elements.summary.value = code.summary || "";
    form.elements.code.value = code.variants?.default?.template?.join("\n") || "";
    form.elements.requirements.value = (code.requirements || []).join("\n");
    form.elements.sourceCode.value = (code.sourceCode || []).join("\n");
    form.elements.sourceLabel.value = code.source?.label || "";
    form.elements.sourceUrl.value = code.source?.url || "";
    form.elements.video.value = code.video || "";
    form.elements.troubleshooting.value = (code.troubleshooting || []).join("\n");
    form.querySelectorAll('input[type="checkbox"][name]').forEach((input) => {
      input.checked = (code[input.name] || []).includes(input.value);
    });
    $("#same-emulator-code").checked = false;
    variationDrafts.clear(); activeVariation = "";
    Object.entries(code.variants || {}).forEach(([key, variant]) => {
      if (key.split("|").length === 3) variationDrafts.set(key, { value: variant.template.join("\n"), edited: true });
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
    if (needsPersistentDeletion) localCodes.push({ id, deleted: true, locallyAdded: true });
    const catalogIndex = catalog.codes.findIndex((entry) => entry.id === id);
    if (catalogIndex >= 0) catalog.codes.splice(catalogIndex, 1);
    localStorage.setItem(LOCAL_CODES_KEY, JSON.stringify(localCodes));
    resetDeveloperForm(); renderLocalCodes(); renderLibrary();
    $("#developer-status").textContent = `Deleted “${code.title}”. Export the project file to make this deletion permanent.`;
  }

  function exportLocalCodes() {
    const permanentCodes = [...projectCodes];
    localCodes.forEach((code) => {
      const cleanCode = { ...code };
      delete cleanCode.locallyAdded;
      const existingIndex = permanentCodes.findIndex((entry) => entry.id === cleanCode.id);
      if (existingIndex >= 0) permanentCodes[existingIndex] = cleanCode;
      else permanentCodes.push(cleanCode);
    });
    const contents = `/* Generated by the ACE Archive Developer editor. */\nwindow.ACE_CUSTOM_CODES = ${JSON.stringify(permanentCodes, null, 2)};\n`;
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
      const jsonText = raw.includes("window.ACE_CUSTOM_CODES") ? raw.slice(raw.indexOf("=") + 1, raw.lastIndexOf(";")) : raw;
      const imported = JSON.parse(jsonText);
      if (!Array.isArray(imported)) throw new Error("Expected an array");
      localCodes = imported.map((code) => ({ ...code, locallyAdded: true }));
      catalog.codes.splice(0, catalog.codes.length, ...catalog.codes.filter((code) => !code.locallyAdded));
      localCodes.forEach(mergeCode);
      localStorage.setItem(LOCAL_CODES_KEY, JSON.stringify(localCodes));
      renderLocalCodes(); renderLibrary();
      $("#developer-status").textContent = `Imported ${localCodes.length} local code${localCodes.length === 1 ? "" : "s"}.`;
    } catch { $("#developer-status").textContent = "That file is not a valid exported code list."; }
    event.target.value = "";
  }

  function filterChoices(input) {
    const select = input.nextElementSibling;
    const query = input.value.toLowerCase();
    [...select.options].forEach((option) => { option.hidden = !option.text.toLowerCase().includes(query); });
  }

  function renderGenerated(code) {
    const form = $("#generator-form");
    const variant = getVariant(code);
    const values = {};
    code.parameters.forEach((parameter) => {
      const input = form.elements[parameter.id];
      if (parameter.type === "choice") {
        values[parameter.id] = catalog.choices[parameter.source].find((choice) => choice.id === input.value) || catalog.choices[parameter.source][0];
      } else {
        const number = Math.max(parameter.min, Math.min(parameter.max, Number(input.value) || parameter.default));
        values[parameter.id] = { value: number, hex2: number.toString(16).toUpperCase().padStart(2, "0"), hex4: number.toString(16).toUpperCase().padStart(4, "0") };
      }
    });
    const output = variant.template.map((line) => line.replace(/\{(\w+)\.(\w+)\}/g, (_, key, property) => values[key]?.[property] ?? "????"));
    $("#generated-code").textContent = output.join("\n");
  }

  async function copyCode() {
    const output = $("#generated-code").textContent;
    try { await navigator.clipboard.writeText(output); }
    catch { const range = document.createRange(); range.selectNode($("#generated-code")); window.getSelection().removeAllRanges(); window.getSelection().addRange(range); }
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
  document.addEventListener("keydown", (event) => { if (event.key === "/" && document.activeElement.tagName !== "INPUT") { event.preventDefault(); elements.search.focus(); } });

  initSetup(); initDeveloperMode(); renderLibrary(); renderGuides();
  const sharedCodeId = window.location.hash.startsWith("#code=") ? decodeURIComponent(window.location.hash.slice(6)) : "";
  if (sharedCodeId && catalog.codes.some((code) => code.id === sharedCodeId && !code.deleted)) openCode(sharedCodeId);
  $("#library-version").textContent = catalog.version;
})();
