# ACE Archive

A dependency-free, data-driven prototype for a beginner-friendly Gen 3 ACE code library. It runs as a static site and can be hosted at any neutral domain/path (the suggested public name is **ACE Archive**).

> The included payloads are clearly labelled fictional demonstrations. Replace them with verified codes before publishing.

## Run locally

Open `index.html` directly, or serve the folder with any static server, for example:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Developer mode

Developer mode is controlled by the separate `developer-config.js` file. Change:

```js
showDeveloperMode: 1,
```

to show the Developer button beside **ACE codes**. Change it to:

```js
showDeveloperMode: 0,
```

before publishing to hide the button and editor. No special URL or local server is
required. When enabled, the Developer tab contains editors for codes, ACE guides, and
the Troubleshooting/FAQ page text. Saved content appears on the site immediately.

Guide and page-body fields support lightweight formatting: begin a line with `## ` for
a section heading, `### ` for a smaller heading, or `- ` for a list item. Separate
paragraphs with a blank line.

Because a static browser page cannot write directly into project files, new entries
are initially stored in that browser's `localStorage`. Click **Export project file**
to download a ready-made `custom-codes.js`, then replace `data/custom-codes.js` in the
project with that downloaded file. The site loads it automatically, making codes,
guides, and page text part of the project and every deployment. The export merges
existing permanent content with newly added local content.

You may also edit `data/custom-codes.js` manually. Keep the surrounding assignment and
paste a valid exported JSON array after the equals sign:

```js
window.ACE_CUSTOM_CODES = [
  // exported code objects
];
```

Use **Import JSON** to restore either a raw JSON export or an exported
`custom-codes.js` into the editor. Clearing browser site data removes only entries that
have not yet been exported into the project file.

The setting only hides the editor from normal use; it is not authentication. Do not
publish sensitive information in the project. A genuinely private multi-user editor
will require a backend and login system.

## Where content lives

All editable library content is in `data/catalog.js`:

- `games`, `languages`, and `platforms` define the setup choices.
- `choices.species` and `choices.items` power searchable human-readable selectors.
- `codes` contains the library entries.
- `data/guides.js` contains structured built-in interactive guides that need richer step-by-step behavior.
- `variants` selects a payload based on `language|platform`.
- `parameters` describes inputs; the interface builds the generator automatically.

## Add a fixed code

Copy an existing code object and give it a unique `id`. Set its compatibility arrays and leave `parameters` empty. Put the box names or other output lines in `variants.default.template`.

## Add a generated code

Declare a choice or number parameter:

```js
parameters: [
  { id: "item", label: "Choose an item", type: "choice", source: "items" },
  { id: "amount", label: "Quantity", type: "number", min: 1, max: 99, default: 1 },
],
```

Use its fields in template lines:

```js
template: ["Box 1: ITEM {item.hex}", "Box 2: QTY0 {amount.hex2}"]
```

The renderer supports normal object fields such as `{item.hex}` plus calculated number fields `hex2` and `hex4`.

## Compatibility variants

The resolver checks variants from most specific to least specific. Developer-created
entries can use game, language, and platform combinations:

1. `game|language|platform`, such as `emerald|ja|accurate`
2. Game-specific wildcard combinations
3. Legacy `language|platform` combinations
4. `*|platform` or `language|*`
5. `default`

This keeps a shared default payload while allowing only the lines that actually differ to be recorded as variants.

In Developer mode, variation tabs intentionally start blank. Blank means “use the
default code”; filled tabs receive a check mark and are saved as overrides. When the
accurate and old-emulator payloads are identical, select the shared-platform checkbox
to edit one combined variation per game/language. The export expands that shared entry
to both platforms automatically.

The **Current codes** list in Developer mode can load any existing entry back into the
same form for editing. Updating a built-in entry creates a same-ID override in
`custom-codes.js`; it does not modify `catalog.js`. Project-file exports replace older
same-ID entries, so edits remain unique rather than producing duplicate cards.

## Recommended production path

Keep the static catalog while the library is small: it is cheap to host, easy to back up, and every change has a visible Git history. If non-technical contributors need an editor later, move the same schema to a headless CMS or small database and validate entries before publication. Do not expose a public submission form without moderation.
