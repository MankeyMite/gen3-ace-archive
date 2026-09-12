# Gen 3 ACE Archive

Gen 3 ACE Archive is a beginner-friendly collection of Arbitrary Code Execution
(ACE) codes, setup guides, troubleshooting information, and community resources for
Generation 3 Pokémon games.

The project is currently in **beta**. Content is still being expanded and reviewed,
and some games, languages, guides, or visual resources may be marked as coming soon.
Always read a code's requirements and compatibility information carefully before
using it.

Gen 3 ACE Archive is an unofficial fan project by MankeyMite. It is not affiliated
with, endorsed by, or sponsored by Nintendo, Game Freak, Creatures Inc., or The
Pokémon Company.

## Contributing codes and guides

Contributions from the Gen 3 ACE community are welcome. If you have a verified code,
correction, guide, or source that should be included, you can:

- Contact MankeyMite through the [Discord server](https://discord.com/invite/rjQGPhG7e3).
- Fork this repository, add the content, and open a pull request.

Please include the original author and source whenever possible. For codes, document
the supported game, language, console or emulator type, required ACE species, setup
requirements, and any known side effects. Check every box name carefully, including
capitalization, spaces, punctuation, and platform-specific variations.

## Using the content editor

The website includes a browser-based editor for contributors. To use it:

1. Set `showDeveloperMode` to `1` in `developer-config.js`.
2. Open the **Developer** tab and add or edit codes, guides, troubleshooting text, or
   FAQ content.
3. Test the result in each game, language, and platform combination you selected.
4. Click **Export project file**. The editor downloads a generated
   `custom-codes.js` containing the project content and your changes.
5. Replace `data/custom-codes.js` with the exported file.
6. Set `showDeveloperMode` back to `0` before committing.
7. Review the exported diff and commit only the intended project files.

Edits made in Developer mode are initially stored only in that browser's local
storage. They are not part of the repository until you export the project file and
replace `data/custom-codes.js`.

For guide videos, prefer a YouTube URL in the guide editor instead of committing a
large local video file.

## Contribution checklist

Before opening a pull request, confirm that:

- The code was tested on every compatibility combination claimed by the entry.
- Box-name transcriptions and bracketed compact versions match exactly.
- The author, source link, requirements, and side effects are documented.
- Instructions are understandable to someone using ACE for the first time.
- Developer mode is disabled in `developer-config.js`.
- `data/custom-codes.js` contains the exported changes.
- No unrelated browser exports, save files, ROMs, or large media files are included.

Because ACE codes can modify save data and game state, unverified payloads should not
be submitted as working codes. Clearly identify anything that still needs testing or
review.

## ROM revisions and source imports

The public setup order is **Game → What are you playing on? → Language**.
FireRed and LeafGreen on console and emulators combine language and revision in
each choice, such as **English 1.0**, **English 1.1**, and **German 1.0**.
All catalog languages offer both revisions; combinations without verified codes
show no results. Emerald and Switch use language-only choices; Switch always
resolves as ROM **1.1**. Language and revision remain separate in storage,
filtering, and share URLs.

FireRed/LeafGreen entries declare `revisions: ["1.0", "1.1"]` (only the revisions
actually verified) and explicit variant keys such as
`firered|en|accurate|1.0` or `leafgreen|es|switch|1.1`. A platform wildcard is allowed
in `firered|en|*|1.1` only when the source proves shared output. A missing revision
variant is unavailable; it never falls back to `default` or an Emerald variant.
Existing Emerald three-part keys and fallback rules remain supported.

For `old_emu` sources, `sourcePlatformValues` maps `accurate` to `0` and `inaccurate`
to `1`; the displayed variants must also contain the corresponding exact output.
Keep source `lang` mappings in `sourceLanguageValues`. A variant may carry its own
`sourceCode` when a language has separately published assembler text. Raw source
arrays retain the original text; the source viewer selects the documented settings.

Entries with `verificationStatus: "needs-verification"` and a `verificationNote`
remain in the data for review but are excluded from compatible results. Do not
repair contradictory source transcriptions or compile missing payloads to fill a
compatibility gap. The Developer editor supports explicit revision variants and
preserves verification metadata.

Run the dependency-free checks with `node tests/compatibility.cjs`. These check
archive resolution and transcription, not execution on a game or emulator.
See [the first source-import review](docs/source-import-review.md) for the code
inventory, exact source links, compatibility limitations, and skipped material.
