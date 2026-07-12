/*
 * ACE Archive content catalog
 *
 * This file is the content database. Add games, choices, and codes here; app.js
 * reads the schema and builds the interface automatically. The sample output
 * below is deliberately fictional and is only present to demonstrate the UI.
 */
window.ACE_CATALOG = {
  version: "Prototype · July 2026",

  games: [
    { id: "emerald", name: "Emerald", group: "Hoenn" },
    { id: "ruby", name: "Ruby", group: "Hoenn" },
    { id: "sapphire", name: "Sapphire", group: "Hoenn" },
    { id: "firered", name: "FireRed", group: "Kanto" },
    { id: "leafgreen", name: "LeafGreen", group: "Kanto" },
  ],

  languages: [
    { id: "en", name: "English" },
    { id: "de", name: "German" },
    { id: "fr", name: "French" },
    { id: "es", name: "Spanish" },
    { id: "it", name: "Italian" },
    { id: "ja", name: "Japanese" },
  ],

  platforms: [
    { id: "accurate", name: "GBA console / accurate emulator", shortName: "GBA / accurate emulator" },
    { id: "inaccurate", name: "Older / inaccurate emulator", shortName: "Old emulator" },
    { id: "switch", name: "Nintendo Switch", shortName: "Nintendo Switch", games: ["firered", "leafgreen"] },
  ],

  // Small demonstration lists. Replace/extend these with the complete datasets.
  choices: {
    species: [
      { id: "001", name: "Bulbasaur", hex: "0001" },
      { id: "004", name: "Charmander", hex: "0004" },
      { id: "007", name: "Squirtle", hex: "0007" },
      { id: "025", name: "Pikachu", hex: "0019" },
      { id: "150", name: "Mewtwo", hex: "0096" },
      { id: "252", name: "Treecko", hex: "0115" },
      { id: "255", name: "Torchic", hex: "0118" },
      { id: "258", name: "Mudkip", hex: "011B" },
      { id: "384", name: "Rayquaza", hex: "0196" },
    ],
    items: [
      { id: "master-ball", name: "Master Ball", hex: "0001" },
      { id: "rare-candy", name: "Rare Candy", hex: "0044" },
      { id: "old-sea-map", name: "Old Sea Map", hex: "0178" },
      { id: "aurora-ticket", name: "AuroraTicket", hex: "0173" },
      { id: "mystic-ticket", name: "MysticTicket", hex: "0172" },
    ],
  },

  codes: [
    {
      id: "give-item-demo",
      title: "Place an item in the PC",
      summary: "Choose any item by name and generate the matching box-name payload.",
      category: "Items",
      difficulty: "Beginner",
      games: ["emerald"],
      languages: ["en", "de", "fr", "es", "it", "ja"],
      platforms: ["accurate", "inaccurate"],
      tags: ["item", "pc", "inventory"],
      parameters: [
        { id: "item", label: "Choose an item", type: "choice", source: "items", placeholder: "Search items…" },
        { id: "amount", label: "Quantity", type: "number", min: 1, max: 99, default: 1 },
      ],
      variants: {
        default: {
          template: ["Box 1: ITEM {item.hex}", "Box 2: QTY0 {amount.hex2}", "Box 3: DEMO ONLY"],
          notes: "This is a fictional placeholder payload for testing the generator interface.",
        },
        "ja|accurate": {
          template: ["Box 1: JPN0 {item.hex}", "Box 2: QTY0 {amount.hex2}", "Box 3: DEMO ONLY"],
          notes: "Japanese-specific fictional example variant.",
        },
        "*|inaccurate": {
          template: ["Box 1: OLD0 {item.hex}", "Box 2: QTY0 {amount.hex2}", "Box 3: DEMO ONLY"],
          notes: "Fictional example adjusted for the inaccurate-emulator setting.",
        },
      },
      instructions: ["Make a backup of your save.", "Select the item and quantity above.", "Copy the generated box names exactly."],
      requirements: ["A stable ACE species", "The standard box-name bootstrap", "No special wallpaper required"],
      sourceCode: ["; Demonstration source only", "load item_id", "load quantity", "write pc_slot"],
      video: "",
      troubleshooting: ["Confirm the selected language matches the cartridge.", "Check every space and character in each box name.", "Make sure the execution method supports your platform."],
      source: { label: "Example entry — no external source", url: "" },
    },
    {
      id: "encounter-species-demo",
      title: "Set the next encounter species",
      summary: "Search species by name; its internal value is inserted for you.",
      category: "Encounters",
      difficulty: "Intermediate",
      games: ["emerald", "firered", "leafgreen"],
      languages: ["en", "de", "fr", "es", "it"],
      platforms: ["accurate", "switch"],
      tags: ["species", "wild", "encounter"],
      parameters: [
        { id: "species", label: "Choose a species", type: "choice", source: "species", placeholder: "Search species…" },
        { id: "level", label: "Level", type: "number", min: 2, max: 100, default: 5 },
      ],
      variants: {
        default: {
          template: ["Box 1: SPEC {species.hex}", "Box 2: LVL0 {level.hex2}", "Box 3: DEMO ONLY"],
          notes: "This fictional output demonstrates automatic species and level conversion.",
        },
      },
      instructions: ["Save before executing any payload.", "Choose a species and level.", "Follow the verified execution method for your game version."],
      requirements: ["A stable ACE species", "A compatible encounter bootstrap", "BIOS file only when required by your emulator setup"],
      sourceCode: ["; Demonstration source only", "load species_id", "load level", "write encounter_data"],
      video: "",
      troubleshooting: ["Verify the species exists in the Gen 3 index.", "Check the level and every generated character.", "Leave and re-enter the encounter area before testing."],
      source: { label: "Example entry — no external source", url: "" },
    },
    {
      id: "unlock-event-demo",
      title: "Enable an event flag",
      summary: "A simple fixed payload with no values to calculate.",
      category: "Events",
      difficulty: "Beginner",
      games: ["emerald", "ruby", "sapphire"],
      languages: ["en"],
      platforms: ["accurate", "inaccurate"],
      tags: ["event", "flag", "unlock"],
      parameters: [],
      variants: {
        default: {
          template: ["Box 1: EVEN 0001", "Box 2: FLAG DEMO", "Box 3: DEMO ONLY"],
          notes: "Fixed fictional payload used as a card and modal example.",
        },
      },
      instructions: ["Back up your save.", "Copy each box name exactly as displayed.", "Execute using your preferred verified method."],
      requirements: ["A working ACE entry point", "No special wallpaper required"],
      sourceCode: ["; Demonstration source only", "set event_flag", "return"],
      video: "",
      troubleshooting: ["Check that the event is not already active.", "Confirm the code supports your exact game revision.", "Reload the affected map after execution."],
      source: { label: "Example entry — no external source", url: "" },
    },
    {
      id: "utility-demo",
      title: "Quality-of-life utility",
      summary: "Demonstrates a language-specific utility entry.",
      category: "Utilities",
      difficulty: "Advanced",
      games: ["emerald"],
      languages: ["de", "fr"],
      platforms: ["accurate"],
      tags: ["utility", "quality of life"],
      parameters: [],
      variants: {
        default: { template: ["Box 1: UTIL DEMO", "Box 2: LANG ONLY"], notes: "Fictional demonstration code." },
      },
      instructions: ["Confirm your cartridge language first.", "Back up your save.", "Enter the generated names exactly."],
      requirements: ["German or French game language", "A stable ACE species", "A verified exit code for your setup"],
      sourceCode: ["; Demonstration source only", "call utility", "safe_exit"],
      video: "",
      troubleshooting: ["Confirm the cartridge language.", "Check the required exit code.", "Restore the backup if execution freezes."],
      source: { label: "Example entry — no external source", url: "" },
    },
  ],
};
