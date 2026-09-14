/* Source blocks transcribed from the supplied FRLG CodeGenerator collection.
 * They are compiled on demand using E-Sh4rk's official generator engine. */
const FRLG_SOURCE_ARCHIVE = [
  {
    "number": 1,
    "title": "Change PRNG seed and teleport (move ACE)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0"
        ],
        "path": "rng/SeedChangeAndWarpENG.txt",
        "source": [
          "@@ title = \"Change PRNG seed and teleport (Move ACE, ENG)\"",
          "@@ author = \"Sleipnir17\"",
          "@@ exit = \"LoadMapShort_{LANG}\"",
          " ",
          "seed = 0x1234ABCD",
          "map_id = 0x1234",
          " ",
          "@@",
          " ",
          "sbc r11,r15, 0xC200",
          "movs r10, {0x3000000}",
          "adc r10,r10, 0x3FC00",
          "bic r10,r10, 0x3AC00",
          "movs r12, { map_id }  ?",
          "strh r12, [r11, 0xD1]",
          "movs r12, { seed }  ?",
          "str r12, [r10]!"
        ]
      },
      {
        "selections": [
          "French",
          "German",
          "Spanish",
          "Italian"
        ],
        "path": "rng/SeedChangeAndWarpEU.txt",
        "source": [
          "@@ title = \"Change PRNG seed and teleport (Move ACE, EU)\"",
          "@@ author = \"Sleipnir17\"",
          "@@ exit = \"LoadMapShort_{LANG}\"",
          " ",
          "seed = 0x1234ABCD",
          "map_id = 0x1234",
          " ",
          "@@",
          " ",
          "sbc r11,r15, 0xC200",
          "movs r10, {0x3000000}",
          "adc r10,r10, 0x3FC0",
          "adc r10,r10, 0xCC0",
          "movs r12, { map_id }  ?",
          "strh r12, [r11, 0xD1]",
          "movs r12, { seed }  ?",
          "str r12, [r10, 0x2D0]!"
        ]
      },
      {
        "selections": [
          "Japanese 1.0"
        ],
        "path": "rng/SeedChangeAndWarpJP0.txt",
        "source": [
          "@@ title = \"Change PRNG seed and teleport (Move ACE, JAP 1.0)\"",
          "@@ author = \"Sleipnir17\"",
          "@@ exit = \"LoadMapShort_JAP0\"",
          " ",
          "seed = 0x1234ABCD",
          "map_id = 0x1234",
          " ",
          "@@",
          " ",
          "0x4700A000",
          "sbc r11,r15, 0xC200",
          "movs r10, {0x3FC00}",
          "adc r10,r10, 0x3000000",
          "bic r10,r10, 0x3AC00",
          "mov r12, { map_id }  ?",
          "strh r12, [r11, 0xF5]",
          "mov r12, { seed }  ?",
          "str r12, [r10, 0x40]!"
        ]
      },
      {
        "selections": [
          "Japanese 1.1"
        ],
        "path": "rng/SeedChangeAndWarpJP1.txt",
        "source": [
          "@@ title = \"Change PRNG seed and teleport (Move ACE, JAP 1.1)\"",
          "@@ author = \"Sleipnir17\"",
          "@@ exit = \"LoadMapShort_JAP1\"",
          " ",
          "seed = 0x1234ABCD",
          "map_id = 0x1234",
          " ",
          "@@",
          " ",
          "0x4700A000",
          "sbc r11,r15, 0xC200",
          "movs r10, {0x3FC00}",
          "adc r10,r10, 0x3000000",
          "bic r10,r10, 0x3AC00",
          "mov r12, { map_id }  ?",
          "strh r12, [r11, 0xF5]",
          "mov r12, { seed }  ?",
          "str r12, [r10, -0x60]!"
        ]
      }
    ]
  },
  {
    "number": 2,
    "title": "Change PRNG seed and teleport",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "Japanese 1.0"
        ],
        "path": "rng/SeedChangeAndWarpGRABJP0.txt",
        "source": [
          "@@ title = \"Change PRNG+Teleport 1.0\"",
          "@@ author = \"final, Theocatic and Mettrich (ported to JPN)\"",
          "@@ exit = null",
          "@@ fill = false",
          " ",
          "map_id = 0x0",
          "warp = 0",
          "seed = 0x0",
          "script = ((warp & 0xFF) << 24) | ((map_id & 0xFFFF) << 8) | 0x39",
          " ",
          "@@",
          " ",
          "0x4A114620",
          "0x405A4B11",
          "0x490D23FF",
          "0xE000011B",
          "0x18C0FF00",
          "0x60026088",
          "0x28FF2200",
          "0x43D26042",
          "0xFF00E000",
          "0x4B0B7202",
          "0x4A0E490C",
          "0x405128FF",
          "0xE0006019",
          "0x2000FF00",
          "0x00004770",
          "0x00FF0000",
          "0x03000EB0",
          "0xFF000000",
          "{script & 0xAAAAAAAA}",
          "{script & 0x55555555}",
          "0x000000FF",
          "0x03005040",
          "0x0000FF00",
          "{(seed & 0xAAAAAAAA) ^ 0x03030303}",
          "0x00FF0000",
          "{(seed & 0x55555555) ^ 0x03030303}"
        ]
      },
      {
        "selections": [
          "Japanese 1.1"
        ],
        "path": "rng/SeedChangeAndWarpGRABJP1.txt",
        "source": [
          "@@ title = \"Change PRNG+Teleport 1.1\"",
          "@@ author = \"final, Theocatic and Mettrich (ported to JPN)\"",
          "@@ exit = null",
          "@@ fill = false",
          " ",
          "map_id = 0",
          "warp = 0",
          "seed = 0",
          "script = ((warp & 0xFF) << 24) | ((map_id & 0xFFFF) << 8) | 0x39",
          " ",
          "@@",
          " ",
          "0x4A114620",
          "0x405A4B11",
          "0x490D23FF",
          "0xE000011B",
          "0x18C0FF00",
          "0x60026088",
          "0x28FF2200",
          "0x43D26042",
          "0xFF00E000",
          "0x4B0B7202",
          "0x4A0E490C",
          "0x405128FF",
          "0xE0006219",
          "0x2000FF00",
          "0x00004770",
          "0x00FF0000",
          "0x03000EB0",
          "0xFF000000",
          "{script & 0xAAAAAAAA}",
          "{script & 0x55555555}",
          "0x000000FF",
          "0x03004F80",
          "0x0000FF00",
          "{(seed & 0xAAAAAAAA) ^ 0x03030303}",
          "0x00FF0000",
          "{(seed & 0x55555555) ^ 0x03030303}"
        ]
      }
    ]
  },
  {
    "number": 3,
    "title": "Change PRNG seed and teleport (Bootstrapped)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0"
        ],
        "path": "rng/SeedChangeAndWarpBootstrappedEN.txt",
        "source": [
          "@@ title = \"Change PRNG seed and teleport (EN)\"",
          "@@ author = \"final, Theocatic and Mettrich\"",
          "@@ exit = \"Bootstrapped\"",
          "@@ filler4 = 0xffffffff",
          " ",
          "map_id = 0x0003",
          "warp = 0",
          "seed = 0x0",
          "script = ((warp & 0xff) << 24) | ((map_id & 0xffff) << 8) | 0x39",
          " ",
          "@@",
          " ",
          "MOV     r12, #0x3000000",
          "ADCS    r11, r12, #0xc300",
          "ADC     r10, r4, #0xff0",
          "STR     r10, [r12, #0xeb8]!",
          "MOV     r12, #{script} ?5",
          "STR     r12, [r10, #0]!",
          "0xe3ffcccc",
          "STRH    r12, [r10, #8]",
          "ADCS    r11, r11, #0xc50",
          "MOV     r12, #{seed} ?5",
          "STR     r12, [r11, #0xb0]!"
        ]
      },
      {
        "selections": [
          "English Switch"
        ],
        "path": "rng/SeedChangeAndWarpBootstrappedENSwitch.txt",
        "source": [
          "@@ title = \"Change PRNG seed and teleport (Switch EN)\"",
          "@@ author = \"final, Theocatic and Mettrich\"",
          "@@ exit = \"Bootstrapped\"",
          "@@ filler4 = 0xffffffff",
          " ",
          "map_id = 0x0003",
          "warp = 0",
          "seed = 0x0",
          "script = ((warp & 0xff) << 24) | ((map_id & 0xffff) << 8) | 0x39",
          " ",
          "@@",
          " ",
          "MOV     r12, #0x3000000",
          "ADCS    r10, r12, #0x3500",
          "ADC     r11, r4, #0xff0",
          "STR     r11, [r12, #0xfb8]!",
          "MOV     r12, #{script} ?5",
          "STR     r12, [r11, #0]!",
          "0xe3ffcccc",
          "STRH    r12, [r11, #8]",
          "ADCS    r10, r10, #0xdd0",
          "MOV     r12, #{seed} ?5",
          "STR     r12, [r10, #0]!"
        ]
      },
      {
        "selections": [
          "French",
          "German",
          "Spanish",
          "Italian"
        ],
        "path": "rng/SeedChangeAndWarpBootstrappedEU.txt",
        "source": [
          "@@ title = \"Change PRNG seed and teleport (EU)\"",
          "@@ author = \"final, Theocatic and Mettrich\"",
          "@@ exit = \"Bootstrapped\"",
          "@@ filler4 = 0xffffffff",
          " ",
          "map_id = 0x0003",
          "warp = 0",
          "seed = 0x0",
          "script = ((warp & 0xff) << 24) | ((map_id & 0xffff) << 8) | 0x39",
          " ",
          "@@",
          " ",
          "MOV     r12, #0x3000000",
          "ADCS    r11, r12, #0xc300",
          "ADC     r10, r4, #0xff0",
          "STR     r10, [r12, #0xeb8]!",
          "MOV     r12, #{script} ?5",
          "STR     r12, [r10, #0]!",
          "0xe3ffcccc",
          "STRH    r12, [r10, #8]",
          "ADCS    r11, r11, #0xc50",
          "MOV     r12, #{seed} ?5",
          "STR     r12, [r11, #0]!"
        ]
      },
      {
        "selections": [
          "French Switch",
          "German Switch",
          "Spanish Switch",
          "Italian Switch"
        ],
        "path": "rng/SeedChangeAndWarpBootstrappedEUSwitch.txt",
        "source": [
          "@@ title = \"Change PRNG seed and teleport (Switch EU)\"",
          "@@ author = \"final, Theocatic and Mettrich\"",
          "@@ exit = \"Bootstrapped\"",
          "@@ filler4 = 0xffffffff",
          " ",
          "map_id = 0x0003",
          "warp = 0",
          "seed = 0x0",
          "script = ((warp & 0xff) << 24) | ((map_id & 0xffff) << 8) | 0x39",
          " ",
          "@@",
          " ",
          "MOV     r12, #0x3000000",
          "ADCS    r10, r12, #0x3500",
          "ADC     r11, r4, #0xff0",
          "STR     r11, [r12, #0xfb8]!",
          "MOV     r12, #{script} ?5",
          "STR     r12, [r11, #0]!",
          "0xe3ffcccc",
          "STRH    r12, [r11, #8]",
          "ADCS    r10, r10, #0xd20",
          "MOV     r12, #{seed} ?5",
          "STR     r12, [r10, #0x0]!"
        ]
      }
    ]
  },
  {
    "number": 4,
    "title": "Change TID and SID",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "rng/tidsid.txt",
        "source": [
          "@@ title = \"Change TID SID (Grab ACE)\"",
          "@@ author = \"Shao & Papa Jefe\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "tid = 00000",
          "sid = 00000",
          "aligned_pc = 0 ; Set to 1 for old emulators",
          " ",
          "@@",
          " ",
          "sbc r12, r15, #0xd100",
          "movs r11, {tid} ?",
          "strh r11, [r12, #{0x34 - (!aligned_pc * 2)}]",
          "movs r11, {sid} ?",
          "strh r11, [r12, #{0x36 - (!aligned_pc * 2)}]"
        ]
      },
      {
        "selections": [
          "Japanese 1.0",
          "Japanese 1.1"
        ],
        "path": "rng/tidsidGRABJP1.txt",
        "source": [
          "@@ title = \"Change TID SID\"",
          "@@ author = \"Shao & Papa Jefe (ported to JPN)\"",
          "@@ exit = null",
          "@@ filler1 = 0x4B07E7FF",
          "@@ filler2 = 0x814AFFFF",
          "@@ filler3 = 0xE7FF818A",
          " ",
          "tid = 0",
          "sid = 0",
          "trainer_ids = ((sid & 0xFFFF) << 16) | (tid & 0xFFFF)",
          "trainer_low = trainer_ids & 0x7F7F7F7F",
          "trainer_high = trainer_ids & 0x80808080",
          " ",
          "@@",
          " ",
          "0x39844629",
          "0x4A076809",
          "0xE000431A",
          "0x46C00C12",
          "0x47704040",
          "{trainer_low}",
          "{trainer_high}"
        ]
      }
    ]
  },
  {
    "number": 5,
    "title": "Replace TID with SID",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/CopySIDtoTID.txt",
        "source": [
          "@@ title = \"Replace TID with SID (Grab ACE)\"",
          "@@ author = \"Papa Jefe\"",
          "@@ exit = \"ROM_BX_lr_Box6_Grab\"",
          " ",
          "; Check Trainer Card after execution to quickly learn Secret ID.",
          "; Reset game to restore original Trainer ID.",
          "; After running, hatched Eggs made via \"Create Egg from nothing\" will always be Shiny.",
          " ",
          "aligned_pc = 0 ; Set to 1 for old emulators",
          " ",
          "@@",
          " ",
          "sbc r12, r15, #0xd100",
          "ldrh r11, [r12, #{0x35 - (!aligned_pc * 2)}]",
          "strh r11, [r12, #{0x34 - (!aligned_pc * 2)}]"
        ]
      }
    ]
  },
  {
    "number": 6,
    "title": "Change TID and SID (move ACE)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "French",
          "German",
          "Spanish",
          "Italian"
        ],
        "path": "rng/tidsid_moveACE.txt",
        "source": [
          "@@ title = \"Change TID SID (Move ACE)\"",
          "@@ author = \"Shao & Papa Jefe\"",
          "@@ exit = \"CommonExit\"",
          " ",
          "tid = 00000",
          "sid = 00000",
          " ",
          "@@",
          " ",
          "sbc r12, r15, #0xd100",
          "movs r11, {tid} ?",
          "strh r11, [r12, #0x34]",
          "movs r11, {sid} ?",
          "strh r11, [r12, #0x36]"
        ]
      }
    ]
  },
  {
    "number": 7,
    "title": "Change Trainer Gender",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/ChangeTrainerGender.txt",
        "source": [
          "@@ title = \"Change Trainer Gender (Grab ACE)\"",
          "@@ author = \"Theocatic\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          ";do not change these",
          "male = 00",
          "female = 01",
          " ",
          ";change this line to male or female",
          "gender = female",
          " ",
          "aligned_pc = 0 ; Set to 1 for old emulators",
          " ",
          "@@",
          " ",
          "sbc r12, r15, #0xd100",
          "movs r11, {gender} ?",
          "strh r11, [r12, #{0x32 - (!aligned_pc * 2)}]"
        ]
      },
      {
        "selections": [
          "Japanese 1.0",
          "Japanese 1.1"
        ],
        "path": "misc/ChangeTrainerGenderGRABJP1.txt",
        "source": [
          "@@ title = \"Change Trainer Gender 1.0 & 1.1\"",
          "@@ author = \"Final; (JPN Port)\"",
          " ",
          "@@ filler1 = 0x720AE7FF",
          " ",
          "gender = 1 // 0 = male, 1 = female",
          " ",
          "@@",
          " ",
          "0x39844629",
          "{((0x2200 | (gender & 1)) << 16) | 0x6809}",
          "0x47704040"
        ]
      }
    ]
  },
  {
    "number": 8,
    "title": "Change Trainer Name",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "French",
          "German",
          "Spanish",
          "Italian"
        ],
        "path": "misc/ChangeTrainerName.txt",
        "source": [
          "@@ title = \"Change Trainer Name\"",
          "@@ author = \"Theocatic | Adrichu00 | Final\"",
          "@@ exit = \"ROM_BX_lr_Box6_Grab\"",
          " ",
          "; This code is for a legal trainer name. If you want a not normally writable",
          "; name, use the code Change Trainer Name (Bootstrapped)",
          "; Write your trainer name in BOX 9's name with no trailing spaces",
          "; Don't use the last char, leave it empty (not space, but 0xFF)",
          " ",
          "@@",
          "ADCGTS r12, r15, r14, ASR #21",
          "SBC r11, r15, #0xd000",
          "SBC r11, r11, #0xda",
          "0xE8BC00C0",
          "0xE8AB00C0"
        ]
      }
    ]
  },
  {
    "number": 9,
    "title": "Change Trainer Name (Bootstrapped)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "French",
          "German",
          "Spanish",
          "Italian"
        ],
        "path": "misc/ChangeTrainerNameBootstrapped.txt",
        "source": [
          "@@ title = \"Change Trainer Name (Bootstrapped)\"",
          "@@ author = \"Theocatic\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "; This code requires a Box 14 exit code for grab ACE.",
          "; https://pomeg-letterbombers.github.io/pokemon-ace-notes/frlg/exit-codes/box-14-exit/",
          " ",
          "L1 = 0xCE",
          "L2 = 0xBF",
          "L3 = 0xCD",
          "L4 = 0xCE",
          "L5 = 0xFF",
          "L6 = 0xFF",
          "L7 = 0xFF",
          "aligned_pc = 0 ; Set to 1 for old emulators",
          "L8 = 0xFF00",
          "L2 = L2 * 0x100",
          "L4 = L4 * 0x100",
          "L6 = L6 * 0x100",
          "name1 = L2 + L1",
          "name2 = L4 + L3",
          "name3 = L5 + L6",
          "name4 = L7 + L8",
          " ",
          "@@",
          "sbc r12, r15, #0xD100",
          "mov r11, {name1} ?",
          "strh r11, [r12, #{0x2a - (!aligned_pc * 2)}]",
          "mov r11, {name2} ?",
          "strh r11, [r12, #{0x2c - (!aligned_pc * 2)}]",
          "mov r11, {name3}?",
          "strh r11, [r12, #{0x2e - (!aligned_pc * 2)}]",
          "mov r11, {name4}?",
          "strh r11, [r12, #{0x30 - (!aligned_pc * 2)}]"
        ]
      }
    ]
  },
  {
    "number": 10,
    "title": "Change Roamer Species",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English Switch",
          "English 1.1",
          "English 1.0",
          "French Switch",
          "French",
          "German Switch",
          "German",
          "Spanish Switch",
          "Spanish",
          "Italian Switch",
          "Italian"
        ],
        "path": "misc/ChangeRoamerSpecies.txt",
        "source": [
          "@@ title = \"Change Roamer Species (move ACE)\"",
          "@@ author = \"Sleipnir\"",
          "@@ exit = \"CommonExit\"",
          "; This code can be executed both if you already have an active roamer or not,",
          "; either way the chosen roamer will be active.",
          "; Features such as PID and IVs will be the ones from the last active roamer.",
          "; If you activated the roamer with this code you'll not see it in the Pokédex untill you do",
          "; some kind of refresh, such as going indoor or flying somewhere",
          "; The species you must look the area for is still the regular roamer species, not the new one.",
          " ",
          "species_index = 0       @input:species",
          " ",
          "@@",
          "sbc r11,pc,0xBA00",
          "adc r11,r11,0X2900",
          "movs r12, {species_index & 0xFFFF} ?",
          "strh r12, [r11,0xA5]  %%    Store species index in roamer location",
          "movs r12,0XEE",
          "sbc r12,r12,0XEC",
          "strb r12, [r11,0xB0]  %%    Activate roamer"
        ]
      }
    ]
  },
  {
    "number": 11,
    "title": "Change Roamer IVs",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English Switch",
          "English 1.1",
          "English 1.0",
          "French Switch",
          "French",
          "German Switch",
          "German",
          "Spanish Switch",
          "Spanish",
          "Italian Switch",
          "Italian"
        ],
        "path": "misc/ChangeRoamerIVs.txt",
        "source": [
          "@@ title = \"Change Roamer IVs (move ACE)\"",
          "@@ author = \"Sleipnir\"",
          "@@ exit = \"CommonExit\"",
          " ",
          "; This code can be executed both if you already have an active roamer or not,",
          "; either way the chosen roamer will be active.",
          "; Features such as species and PID will be the ones from the last active roamer.",
          "; Because of the roamer bug not all IVs will be kept: defense, speed, sp.attack and",
          "; sp.defense will still be 0 and attack will be lower or equal to 7. HPs and ability",
          "; can be manipulated regularly",
          "hp = 0",
          "atk = 0",
          "def = 0",
          "speed = 0",
          "spe_atk = 0",
          "spe_def = 0",
          "ability = 0      ; First ability: 0  /  Second ability: 1",
          " ",
          "; DO NOT MODIFY THE PARAMETERS BELOW",
          "ivea = (ability << 31) | hp | (atk << 5) | (def << 10) | (speed << 15) | (spe_atk << 20) | (spe_def << 25)",
          " ",
          "@@",
          " ",
          "sbc r11,pc,0xBA00",
          "adc r11,r11,0X2900",
          "mvn r12,0X3FC",
          "bic r12,r12,0XE2",
          "strb r12, [r11,0xB0]    %%    Activate roamer",
          "movs r12, {ivea} ?",
          "sbc r11,r11,0x3",
          "str r12, [r11, 0xA1]!   %%    Store IVs in roamer location"
        ]
      }
    ]
  },
  {
    "number": 12,
    "title": "Change Roamer PID",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English Switch",
          "English 1.1",
          "English 1.0",
          "French Switch",
          "French",
          "German Switch",
          "German",
          "Spanish Switch",
          "Spanish",
          "Italian Switch",
          "Italian"
        ],
        "path": "misc/ChangeRoamerPID.txt",
        "source": [
          "@@ title = \"Change Roamer PID (move ACE)\"",
          "@@ author = \"Sleipnir\"",
          "@@ exit = \"CommonExit\"",
          " ",
          "; This code can be executed both if you already have an active roamer or not,",
          "; either way the chosen roamer will be active.",
          "; Features such as species and IVs will be the ones from the last active roamer.",
          " ",
          "PID = 0x1234ABCD",
          " ",
          "@@",
          " ",
          "sbc r11,pc,0xBA00",
          "adc r11,r11,0X2900",
          "mvn r12,0X3FC",
          "bic r12,r12,0XE2",
          "strb r12, [r11,0xB0]    %%    Activate roamer",
          "movs r12, {PID} ?",
          "str r12, [r11, 0xA1]!   %%    Store PID in roamer location"
        ]
      }
    ]
  },
  {
    "number": 13,
    "title": "Change Roamer Species (move ACE)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "Japanese 1.0",
          "Japanese 1.1"
        ],
        "path": "misc/ChangeRoamerSpeciesJAP.txt",
        "source": [
          "@@ title = \"Change Roamer Species (move ACE)\"",
          "@@ author = \"Sleipnir\"",
          "@@ exit = \"CommonExitJAP\"",
          " ",
          "; This code can be executed both if you already have an active roamer or not,",
          "; either way the chosen roamer will be active.",
          "; Features such as PID and IVs will be the ones from the last active roamer.",
          "; If you activated the roamer with this code you'll not see it in the Pokédex untill you do",
          "; some kind of refresh, such as going indoor or flying somewhere",
          "; The species you must look the area for is still the regular roamer species, not the new one.",
          " ",
          "species_index = 0xFB        @input:species",
          " ",
          "@@",
          " ",
          "0x4700A000            %%  Switch to ARM",
          "movs r12,0X1",
          "sbc r11,pc,0x9100",
          "strb r12, [r11,0xCC]  %%    Activate roamer",
          "mov r12, {species_index & 0xFFFF} ?",
          "strh r12, [r11,0xC1]  %%    Store species index in roamer location"
        ]
      }
    ]
  },
  {
    "number": 14,
    "title": "Change Roamer IVs (move ACE)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "Japanese 1.0",
          "Japanese 1.1"
        ],
        "path": "misc/ChangeRoamerIVsJAP.txt",
        "source": [
          "@@ title = \"Change Roamer IVs (move ACE)\"",
          "@@ author = \"Sleipnir\"",
          "@@ exit = \"CommonExitJAP\"",
          " ",
          "; This code can be executed both if you already have an active roamer or not,",
          "; either way the chosen roamer will be active.",
          "; Features such as species and PID will be the ones from the last active roamer.",
          "; Because of the roamer bug not all IVs will be kept: defense, speed, sp.attack and",
          "; sp.defense will still be 0 and attack will be lower or equal to 7. HPs and ability",
          "; can be manipulated regularly",
          " ",
          "hp = 0",
          "atk = 0",
          "def = 0",
          "speed = 0",
          "spe_atk = 0",
          "spe_def = 0",
          "ability = 0      ; First ability: 0  /  Second ability: 1",
          " ",
          "; DO NOT MODIFY THE PARAMETERS BELOW",
          "ivea = (ability << 31) | hp | (atk << 5) | (def << 10) | (speed << 15) | (spe_atk << 20) | (spe_def << 25)",
          " ",
          "@@",
          " ",
          "0x4700A000             %%    Switch to ARM",
          "movs r12,0X1",
          "sbc r11,pc,0x9100",
          "strb r12, [r11,0xCC]   %%    Activate roamer",
          "movs r12, {ivea} ?",
          "str r12, [r11, 0xB9]   %%    Store IVs in roamer location"
        ]
      }
    ]
  },
  {
    "number": 15,
    "title": "Change Roamer PID (move ACE)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "Japanese 1.0",
          "Japanese 1.1"
        ],
        "path": "misc/ChangeRoamerPIDJAP.txt",
        "source": [
          "@@ title = \"Change Roamer PID (move ACE)\"",
          "@@ author = \"Sleipnir\"",
          "@@ exit = \"CommonExitJAP\"",
          " ",
          "; This code can be executed both if you already have an active roamer or not,",
          "; either way the chosen roamer will be active.",
          "; Features such as species and IVs will be the ones from the last active roamer.",
          " ",
          "PID = 0x1234ABCD",
          " ",
          "@@",
          " ",
          "0x4700A000             %%    Switch to ARM",
          "movs r12,0X1",
          "sbc r11,pc,0x9100",
          "strb r12, [r11,0xCC]   %%    Activate roamer",
          "movs r12, {PID} ?",
          "str r12, [r11, 0xBD]!  %%    Store PID in roamer location"
        ]
      }
    ]
  },
  {
    "number": 16,
    "title": "Read Pokemon PID",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "French",
          "German",
          "Spanish",
          "Italian"
        ],
        "path": "pkmn/ReadPIDfromPartySlot4toPartySlot3.txt",
        "source": [
          "@@ title = \"Read PID from Party Slot 2\"",
          "@@ author = \"Papa Jefe, im a blisy and final\"",
          "@@ exit = \"ROM_BX_lr_Box10_Grab\" // Use \"CommonExit\" for move ACE.",
          " ",
          "Atk ?= 0",
          "Def ?= 0",
          "SpA ?= 0",
          "SpD ?= 0",
          "PID ?= ((Atk<<24)+(Def<<16)+(SpA<<8)+SpD) & 0xFFFFFFFF",
          " ",
          "@@",
          " ",
          "MOV r10, #0x2f00000",
          "ADCS r10, r10, #0xe4000",
          "ADCS r11, r10, #0x2ec",
          "LDRB r12, [r10, #0x2eb]",
          "STRH r12, [r11, #0x56]",
          "LDRB r12, [r10, #0x2ea]",
          "STRH r12, [r11, #0x58]",
          "LDRB r12, [r10, #0x2e9]",
          "STRH r12, [r11, #0x5c]",
          "LDRB r12, [r10, #0x2e8]",
          "STRH r12, [r11, #0x5e]"
        ]
      },
      {
        "selections": [
          "English Switch",
          "French Switch",
          "German Switch",
          "Spanish Switch",
          "Italian Switch"
        ],
        "path": "pkmn/ReadPIDfromPartySlot4toPartySlot3_SWITCH.txt",
        "source": [
          "@@ title = \"Read PID from Party Slot 2\"",
          "@@ author = \"Papa Jefe, im a blisy and final\"",
          "@@ exit = \"ROM_BX_lr_Box10_Grab\" // Use \"CommonExit\" for move ACE.",
          " ",
          "Atk ?= 0",
          "Def ?= 0",
          "SpA ?= 0",
          "SpD ?= 0",
          "PID ?= ((Atk<<24)+(Def<<16)+(SpA<<8)+SpD) & 0xFFFFFFFF",
          " ",
          "@@",
          " ",
          "MOV r10, #0x2f00000",
          "ADCS r10, r10, #0xe4000",
          "ADCS r11, r10, #0x2ec",
          "LDRB r12, [r10, #0x2e7]",
          "STRH r12, [r11, #0x52]",
          "LDRB r12, [r10, #0x2e6]",
          "STRH r12, [r11, #0x54]",
          "LDRB r12, [r10, #0x2e5]",
          "STRH r12, [r11, #0x58]",
          "LDRB r12, [r10, #0x2e4]",
          "STRH r12, [r11, #0x5A]"
        ]
      }
    ]
  },
  {
    "number": 17,
    "title": "Read Pokemon SID",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "French",
          "German",
          "Spanish",
          "Italian"
        ],
        "path": "pkmn/ReadPokemonSID.txt",
        "source": [
          "@@ title = \"Read SID from Party Slot 2\"",
          "@@ author = \"Papa Jefe, im a blisy and final\"",
          "@@ exit = \"ROM_BX_lr_Box6_Grab\"",
          " ",
          "Atk ?= 0",
          "Def ?= 0",
          "SID ?= (Atk<<8)+Def & 0xFFFF",
          "@@",
          "MOV r10, #0x2f00000",
          "ADCS r10, r10, #0xe4000",
          "SBC r12, r10, #0x3fc",
          "ADCS r11, r10, #0x2ec",
          "LDRB r10, [r12, #0x6eb]",
          "STRH r10, [r11, #0x58]",
          "LDRB r10, [r12, #0x6ec]",
          "STRH r10, [r11, #0x56]"
        ]
      },
      {
        "selections": [
          "English Switch",
          "French Switch",
          "German Switch",
          "Spanish Switch",
          "Italian Switch"
        ],
        "path": "pkmn/ReadPokemonSID_SWITCH.txt",
        "source": [
          "@@ title = \"Read SID from Party Slot 2\"",
          "@@ author = \"Papa Jefe, im a blisy and final\"",
          "@@ exit = \"ROM_BX_lr_Box6_Grab\"",
          " ",
          "Atk ?= 0",
          "Def ?= 0",
          "SID ?= (Atk<<8)+Def & 0xFFFF",
          "@@",
          "MOV r10, #0x2f00000",
          "ADCS r10, r10, #0xe4000",
          "SBC r12, r10, #0x3fc",
          "ADCS r11, r10, #0x2ec",
          "LDRB r10, [r12, #0x6e7]",
          "STRH r10, [r11, #0x54]",
          "LDRB r10, [r12, #0x6e8]",
          "STRH r10, [r11, #0x52]"
        ]
      }
    ]
  },
  {
    "number": 18,
    "title": "Read Pokemon TID and SID",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "French",
          "German",
          "Spanish",
          "Italian"
        ],
        "path": "pkmn/ReadOTIDfromPartySlot4toPartySlot3.txt",
        "source": [
          "@@ title = \"Read TID and SID from Party Slot 2\"",
          "@@ author = \"Papa Jefe, im a blisy and final\"",
          "@@ exit = \"ROM_BX_lr_Box10_Grab\" // Use \"CommonExit\" for move ACE.",
          " ",
          "Atk ?= 0",
          "Def ?= 0",
          "SpA ?= 0",
          "SpD ?= 0",
          "TID ?= (SpA<<8)+SpD & 0xFFFF",
          "SID ?= (Atk<<8)+Def & 0xFFFF",
          " ",
          "@@",
          " ",
          "MOV r10, #0x2f00000",
          "ADCS r10, r10, #0xe4000",
          "ADCS r11, r10, #0x2ec",
          "LDRB r12, [r10, #0x2ec]",
          "STRH r12, [r11, #0x5e]",
          "LDRB r12, [r10, #0x2ed]",
          "STRH r12, [r11, #0x5c]",
          "SBC r12, r10, #0x3fc",
          "LDRB r10, [r12, #0x6eb]",
          "STRH r10, [r11, #0x58]",
          "LDRB r10, [r12, #0x6ec]",
          "STRH r10, [r11, #0x56]"
        ]
      },
      {
        "selections": [
          "English Switch",
          "French Switch",
          "German Switch",
          "Spanish Switch",
          "Italian Switch"
        ],
        "path": "pkmn/ReadOTIDfromPartySlot4toPartySlot3_SWITCH.txt",
        "source": [
          "@@ title = \"Read TID and SID from Party Slot 2\"",
          "@@ author = \"Papa Jefe, im a blisy and final\"",
          "@@ exit = \"ROM_BX_lr_Box10_Grab\" // Use \"CommonExit\" for move ACE.",
          " ",
          "Atk ?= 0",
          "Def ?= 0",
          "SpA ?= 0",
          "SpD ?= 0",
          "TID ?= (SpA<<8)+SpD & 0xFFFF",
          "SID ?= (Atk<<8)+Def & 0xFFFF",
          " ",
          "@@",
          " ",
          "MOV r10, #0x2f00000",
          "ADCS r10, r10, #0xe4000",
          "ADCS r11, r10, #0x2ec",
          "LDRB r12, [r10, #0x2e8]",
          "STRH r12, [r11, #0x5A]",
          "LDRB r12, [r10, #0x2e9]",
          "STRH r12, [r11, #0x58]",
          "SBC r12, r10, #0x3fc",
          "LDRB r10, [r12, #0x6e7]",
          "STRH r10, [r11, #0x54]",
          "LDRB r10, [r12, #0x6e8]",
          "STRH r10, [r11, #0x52]"
        ]
      }
    ]
  },
  {
    "number": 19,
    "title": "Run script via NPC",
    "games": [
      "firered"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1"
        ],
        "path": "misc/RunScriptViaNPC_FR_Rev1_ENG.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC (Grab ACE)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._.\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; This code inserts a script into the Old Gentleman NPC in Viridian City Pokemon Center.",
          "; Activate the code, and then speak to him and the script should play.",
          "; Works for all non-Japanese games/versions.",
          "; Make sure to select your Language/Version from dropdowns above.",
          " ",
          "; -ENG FireRed 1.1 SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x081690AD",
          "; GiveCelioSapphire = 0x0817101D",
          "; GiveRainbowPass =  0x0817112A",
          "; MysticTicket =  0x084896E9",
          "; AuroraTicket  =  0x08489519",
          "; MoveManiac =  0x08171736",
          "; MoveDeleter =  0x0816d928",
          "; NameBox1Slot1Mon =  0x081a8cab",
          " ",
          "script = 0x00000000",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "English 1.0"
        ],
        "path": "misc/RunScriptViaNPC_FR_ENG.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC (Grab ACE)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._.\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; This code inserts a script into the Old Gentleman NPC in Viridian City Pokemon Center.",
          "; Activate the code, and then speak to him and the script should play.",
          "; Works for all non-Japanese games/versions.",
          "; Make sure to select your Language/Version from dropdowns above.",
          " ",
          "; -ENG FireRed 1.0 SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x08169035",
          "; GiveCelioSapphire = 0x08170FA5",
          "; GiveRainbowPass = 0x081710B2",
          "; MysticTicket (Navel Rock) = 0x08489689",
          "; AuroraTicket (Birth Island) = 0x084894B9",
          "; MoveManiac = 0x081716be",
          "; MoveDeleter = 0x0816d8b0",
          "; NameBox1Slot1Mon = 0x081a8c33",
          " ",
          "script = 0x00000000",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "English Switch"
        ],
        "path": "misc/RunScriptViaNPC_FR_ENG_SWITCH.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC (Grab ACE)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._.\"",
          "@@ exit = \"GrabACEExit\"",
          "; This code inserts a script into the Old Gentleman NPC in Viridian City Pokemon Center.",
          "; Activate the code, and then speak to him and the script should play.",
          "; Works for all non-Japanese games/versions.",
          "; Make sure to select your Language/Version from dropdowns above.",
          " ",
          "; -ENG FireRed Switch SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x0816C73D",
          "; GiveCelioSapphire = 0x081746AD",
          "; GiveRainbowPass = 0x081747BA",
          "; MoveManiac = 0x08174DC6",
          "; MoveDeleter = 0x08170FB8",
          "; NameBox1Slot1Mon = 0x081AC33B",
          " ",
          "script = 0x00000000",
          " ",
          "@@",
          "sbc r12,pc, 0xBA00",
          "mov r11, {script} ?",
          "str r11, [r12, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "French"
        ],
        "path": "misc/RunScriptViaNPC_FR_FRA.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC (Grab ACE)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._.\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; This code inserts a script into the Old Gentleman NPC in Viridian City Pokemon Center.",
          "; Activate the code, and then speak to him and the script should play.",
          "; Works for all non-Japanese games/versions.",
          "; Make sure to select your Language/Version from dropdowns above.",
          " ",
          "; -FRA FireRed SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x0816905C",
          "; GiveCelioSapphire = 0x08170FD1",
          "; GiveRainbowPass =  0x081710DE",
          "; MysticTicket =  0x0847F790",
          "; AuroraTicket  =  0x0847F5DA",
          "; MoveManiac =  0x081716EA",
          "; MoveDeleter =  0x0816D8D8",
          "; NameBox1Slot1Mon =  0x081A765C",
          " ",
          "script = 0x00000000",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "French Switch"
        ],
        "path": "misc/RunScriptViaNPC_FR_FRA_SWITCH.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._. / RocaBOT\"",
          "@@ exit = \"GrabACEExit\"",
          "; This code inserts a script into the Old Gentleman NPC in Viridian City Pokemon Center.",
          "; Activate the code, and then speak to him and the script should play.",
          "; Works for all non-Japanese games/versions.",
          "; Make sure to select your Language/Version from dropdowns above.",
          " ",
          "; -FRA FireRed Switch SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x0816CCDC",
          "; GiveCelioSapphire = 0x08174C51",
          "; GiveRainbowPass =  0x08174D5E",
          "; MoveManiac =  0x0817536A",
          "; MoveDeleter =  0x08171558",
          "; NameBox1Slot1Mon =  0x081ab2dc",
          " ",
          "script = 0x00000000",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "German"
        ],
        "path": "misc/RunScriptViaNPC_FR_GER.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC (Grab ACE)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._.\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; This code inserts a script into the Old Gentleman NPC in Viridian City Pokemon Center.",
          "; Activate the code, and then speak to him and the script should play.",
          "; Works for all non-Japanese games/versions.",
          "; Make sure to select your Language/Version from dropdowns above.",
          " ",
          "; -GER FireRed SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x08168FA0",
          "; GiveCelioSapphire = 0x08170F15",
          "; GiveRainbowPass =  0x08171022",
          "; MysticTicket =  0x08487C8D",
          "; AuroraTicket  =  0x08487AAD",
          "; MoveManiac =  0x08171022",
          "; MoveDeleter =  0x0816D81C",
          "; NameBox1Slot1Mon =  0x081ABA65",
          " ",
          "script = 0x00000000",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "Spanish"
        ],
        "path": "misc/RunScriptViaNPC_FR_SPA.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC (Grab ACE)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._.\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; This code inserts a script into the Old Gentleman NPC in Viridian City Pokemon Center.",
          "; Activate the code, and then speak to him and the script should play.",
          "; Works for all non-Japanese games/versions.",
          "; Make sure to select your Language/Version from dropdowns above.",
          " ",
          "; -SPA FireRed SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x081690CC",
          "; GiveCelioSapphire = 0x08171041",
          "; GiveRainbowPass =  0x0817114E",
          "; MysticTicket =  0x0847FF6C",
          "; AuroraTicket  =  0x0847FD8D",
          "; MoveManiac =  0x0817175A",
          "; MoveDeleter =  0x0816D948",
          "; NameBox1Slot1Mon =  0x081A86FC",
          " ",
          "script = 0x00000000",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "Spanish Switch"
        ],
        "path": "misc/RunScriptViaNPC_FR_SPA_SWITCH.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC\"",
          "@@ author = \"Sleipnir / PapaJefe / Drakon56\"",
          "@@ exit = \"GrabACEExit\"",
          "; This code inserts a script into the Old Gentleman NPC in Viridian City Pokemon Center.",
          "; Activate the code, and then speak to him and the script should play.",
          "; -SPA FireRed Switch SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x0816CD4C",
          "; GiveCelioSapphire = 0x08174CC1",
          "; GiveRainbowPass = 0x08174DCE",
          "; MoveManiac = 0x081753DA",
          "; MoveDeleter = 0x081715C8",
          "script = 0x00000000",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "Italian"
        ],
        "path": "misc/RunScriptViaNPC_FR_ITA.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC (Grab ACE)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._.\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; This code inserts a script into the Old Gentleman NPC in Viridian City Pokemon Center.",
          "; Activate the code, and then speak to him and the script should play.",
          "; Works for all non-Japanese games/versions.",
          "; Make sure to select your Language/Version from dropdowns above.",
          " ",
          "; -ITA FireRed SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x08168FE0",
          "; GiveCelioSapphire = 0x08170F55",
          "; GiveRainbowPass =  0x08171062",
          "; MysticTicket =  0x0847D131",
          "; AuroraTicket  =  0x0847CF7B",
          "; MoveManiac =  0x0817166E",
          "; MoveDeleter =  0x0816D85C",
          "; NameBox1Slot1Mon =  0x081A64BB",
          " ",
          "script = 0x00000000",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "Italian Switch"
        ],
        "path": "misc/RunScriptViaNPC_FR_ITA_SWITCH.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC (Grab ACE)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._.\"",
          "@@ exit = \"GrabACEExit\"",
          "; -ITA Switch FireRed SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x0816CC60",
          "; GiveCelioSapphire = 0x08174BD5",
          "; GiveRainbowPass = 0x08174CE2",
          "; MoveManiac = 0x081752EE",
          "; MoveDeleter = 0x081714DC",
          "; NameBox1Slot1Mon = 0x081AA13B",
          "script = 0x00000000",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "Japanese 1.1",
          "Japanese 1.0"
        ],
        "path": "misc/RunScriptViaNPCJAP.txt",
        "source": [
          "@@ title = \"Run script via NPC (JAP)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._. / Final\"",
          " ",
          "address = 0x02031590 ; Default address is address of box names at ASLR 0",
          " ",
          "; DO NOT TOUCH BELOW PARAMETERS",
          "xx = (address & 0xFF000000)>>24",
          "XX = (address & 0xFF0000)>>16",
          "yy = (address & 0xFF00)>>8",
          "YY = (address & 0xFF)",
          "neg = 0x80000000",
          "ww= ((0xB6-xx) & neg)? ( ((0xB9-xx)&neg)?(((0xEE-xx)&neg)?(xx-0xEE):0):(xx-0xB6)):0",
          "uu= ((0xB6-xx) & neg)? ( ((0xB9-xx)&neg)?(((0xEE-xx)&neg)?(0xEE):xx):(0xB6)):xx",
          "WW= ((0xB6-XX) & neg)? ( ((0xB9-XX)&neg)?(((0xEE-XX)&neg)?(XX-0xEE):0):(XX-0xB6)):0",
          "UU= ((0xB6-XX) & neg)? ( ((0xB9-XX)&neg)?(((0xEE-XX)&neg)?(0xEE):XX):(0xB6)):XX",
          "zz= ((0xB6-yy) & neg)? ( ((0xB9-yy)&neg)?(((0xEE-yy)&neg)?(yy-0xEE):0):(yy-0xB6)):0",
          "vv= ((0xB6-yy) & neg)? ( ((0xB9-yy)&neg)?(((0xEE-yy)&neg)?(0xEE):yy):(0xB6)):yy",
          "ZZ= ((0xB6-YY) & neg)? ( ((0xB9-YY)&neg)?(((0xEE-YY)&neg)?(YY-0xEE):0):(YY-0xB6)):0",
          "VV= ((0xB6-YY) & neg)? ( ((0xB9-YY)&neg)?(((0xEE-YY)&neg)?(0xEE):YY):(0xB6)):YY",
          "UVdata = ((uu<<24)|(UU<<16)|(vv<<8)|VV)",
          "ZWdata = ((ww<<24)|(WW<<16)|(zz<<8)|ZZ)",
          "gSaveBlock1Ptr = 0x03004FA8",
          "offset = 0x0000090A ; offset from gSaveBlock1Ptr to NPC 1 script",
          " ",
          "@@",
          " ",
          "0xA10BB504",
          "0x6800C907",
          "0x1880D0FF",
          "0xE000A105",
          "0xC906FFFF",
          "0x60011889",
          "0xD0FF2000",
          "0xFFFFBD04",
          "0xFFFFFFFF",
          "{ UVdata }",
          "{ ZWdata }",
          "0x515151FF",
          "{ gSaveBlock1Ptr }",
          "0x5151FFFF",
          "{ offset }"
        ]
      }
    ]
  },
  {
    "number": 20,
    "title": "Run script via NPC",
    "games": [
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1"
        ],
        "path": "misc/RunScriptViaNPC_LG_Rev1_ENG.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC (Grab ACE)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._.\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; This code inserts a script into the Old Gentleman NPC in Viridian City Pokemon Center.",
          "; Activate the code, and then speak to him and the script should play.",
          "; Works for all non-Japanese games/versions.",
          "; Make sure to select your Language/Version from dropdowns above.",
          " ",
          "; -ENG LeafGreen 1.1 SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x08169089",
          "; GiveCelioSapphire = 0x08170FF9",
          "; GiveRainbowPass =  0x08171106",
          "; MysticTicket =  0x08488FD5",
          "; AuroraTicket  =  0x08488E05",
          "; MoveManiac =  0x08171712",
          "; MoveDeleter =  0x0816d904",
          "; NameBox1Slot1Mon =  0x081a8c87",
          " ",
          "script = 0x00000000",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "English 1.0"
        ],
        "path": "misc/RunScriptViaNPC_LG_ENG.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC (Grab ACE)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._.\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; This code inserts a script into the Old Gentleman NPC in Viridian City Pokemon Center.",
          "; Activate the code, and then speak to him and the script should play.",
          "; Works for all non-Japanese games/versions.",
          "; Make sure to select your Language/Version from dropdowns above.",
          " ",
          "; -ENG LeafGreen 1.0 SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x08169011",
          "; GiveCelioSapphire = 0x08170F81",
          "; GiveRainbowPass =  0x0817108E",
          "; MysticTicket =  0x08488F65",
          "; AuroraTicket  =  0x08488D95",
          "; MoveManiac =  0x0817169a",
          "; MoveDeleter =  0x0816d88c",
          "; NameBox1Slot1Mon =  0x081a8c0f",
          " ",
          "script = 0x00000000",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "English Switch"
        ],
        "path": "misc/RunScriptViaNPC_LG_ENG_SWITCH.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC (Grab ACE)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._.\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; This code inserts a script into the Old Gentleman NPC in Viridian City Pokemon Center.",
          "; Activate the code, and then speak to him and the script should play.",
          "; Works for all non-Japanese games/versions.",
          "; Make sure to select your Language/Version from dropdowns above.",
          " ",
          "; -ENG LeafGreen Switch SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x0816C719",
          "; GiveCelioSapphire = 0x08174689",
          "; GiveRainbowPass = 0x08174796",
          "; MoveManiac = 0x08174DA2",
          "; MoveDeleter = 0x08170F94",
          "; NameBox1Slot1Mon = 0x081AC317",
          " ",
          "script = 0x00000000",
          " ",
          "@@",
          "sbc r12,pc, 0xBA00",
          "mov r11, {script} ?",
          "str r11, [r12, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "French"
        ],
        "path": "misc/RunScriptViaNPC_LG_FRA.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC (Grab ACE)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._.\"",
          "@@ exit = \"GrabACEExit\"",
          "; This code inserts a script into the Old Gentleman NPC in Viridian City Pokemon Center.",
          "; Activate the code, and then speak to him and the script should play.",
          "; Works for all non-Japanese games/versions.",
          "; Make sure to select your Language/Version from dropdowns above.",
          "; -FRA LeafGreen SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x08169038",
          "; GiveCelioSapphire = 0x08170FAD",
          "; GiveRainbowPass = 0x081710BA",
          "; MysticTicket = 0x0847E4B8",
          "; AuroraTicket = 0x0847E302",
          "; MoveManiac = 0x081716C6",
          "; MoveDeleter = 0x0816D8B4",
          "; NameBox1Slot1Mon = 0x081A7638",
          "script = 0x00000000",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "French Switch"
        ],
        "path": "misc/RunScriptViaNPC_LG_FRA_SWITCH.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._. / RocaBOT\"",
          "@@ exit = \"GrabACEExit\"",
          "; This code inserts a script into the Old Gentleman NPC in Viridian City Pokemon Center.",
          "; Activate the code, and then speak to him and the script should play.",
          "; Works for all non-Japanese games/versions.",
          "; Make sure to select your Language/Version from dropdowns above.",
          "; -FRA LeafGreen Switch SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x0816ccb8",
          "; GiveCelioSapphire = 0x08174c2d",
          "; GiveRainbowPass = 0x08174d3a",
          "; MoveManiac = 0x08175346",
          "; MoveDeleter = 0x08171534",
          "; NameBox1Slot1Mon = 0x081ab2b8",
          "script = 0x00000000",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "German"
        ],
        "path": "misc/RunScriptViaNPC_LG_GER.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC (Grab ACE)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._.\"",
          "@@ exit = \"GrabACEExit\"",
          "; -GER LeafGreen SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x08168F7C",
          "; GiveCelioSapphire = 0x08170EF1",
          "; GiveRainbowPass = 0x08170FFE",
          "; MysticTicket = 0x08486DF9",
          "; AuroraTicket = 0x08486C19",
          "; MoveManiac = 0x0817160A",
          "; MoveDeleter = 0x0816D7F8",
          "; NameBox1Slot1Mon = 0x081ABA41",
          "script = 0x00000000",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "Spanish"
        ],
        "path": "misc/RunScriptViaNPC_LG_SPA.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC (Grab ACE)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._.\"",
          "@@ exit = \"GrabACEExit\"",
          "; -SPA LeafGreen SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x081690A8",
          "; GiveCelioSapphire = 0x0817101D",
          "; GiveRainbowPass = 0x0817112A",
          "; MysticTicket = 0x0847F664",
          "; AuroraTicket = 0x0847F485",
          "; MoveManiac = 0x08171736",
          "; MoveDeleter = 0x0816D924",
          "; NameBox1Slot1Mon = 0x081A86D8",
          "script = 0x00000000",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "Spanish Switch"
        ],
        "path": "misc/RunScriptViaNPC_LG_SPA_SWITCH.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC\"",
          "@@ author = \"Sleipnir / PapaJefe / Drakon56\"",
          "@@ exit = \"GrabACEExit\"",
          "; -SPA LeafGreen Switch SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x0816CD28",
          "; GiveCelioSapphire = 0x08174C9D",
          "; GiveRainbowPass = 0x08174DAA",
          "; MoveManiac = 0x081753B6",
          "; MoveDeleter = 0x081715A4",
          "script = 0x00000000",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "Italian"
        ],
        "path": "misc/RunScriptViaNPC_LG_ITA.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC (Grab ACE)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._.\"",
          "@@ exit = \"GrabACEExit\"",
          "; -ITA LeafGreen SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x08168FBC",
          "; GiveCelioSapphire = 0x08170F31",
          "; GiveRainbowPass = 0x0817103E",
          "; MysticTicket = 0x0847C8C9",
          "; AuroraTicket = 0x0847C713",
          "; MoveManiac = 0x0817164A",
          "; MoveDeleter = 0x0816D838",
          "; NameBox1Slot1Mon = 0x081A6497",
          "script = 0x00000000",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "Italian Switch"
        ],
        "path": "misc/RunScriptViaNPC_LG_ITA_SWITCH.txt",
        "source": [
          "@@ title = \"Run Script via Old Man NPC (Grab ACE)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._.\"",
          "@@ exit = \"GrabACEExit\"",
          "; -ITA Switch LeafGreen SCRIPT LOCATIONS-",
          "; NationalDexScene = 0x0816CC3C",
          "; GiveCelioSapphire = 0x08174BB1",
          "; GiveRainbowPass = 0x08174CBE",
          "; MoveManiac = 0x081752CA",
          "; MoveDeleter = 0x081714B8",
          "; NameBox1Slot1Mon = 0x081AA117",
          "script = 0x00000000",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1d5]!"
        ]
      },
      {
        "selections": [
          "Japanese 1.1",
          "Japanese 1.0"
        ],
        "path": "misc/RunScriptViaNPCJAP.txt",
        "source": [
          "@@ title = \"Run script via NPC (JAP)\"",
          "@@ author = \"Sleipnir / PapaJefe / im a blisy ._. / Final\"",
          " ",
          "address = 0x02031590 ; Default address is address of box names at ASLR 0",
          " ",
          "; DO NOT TOUCH BELOW PARAMETERS",
          "xx = (address & 0xFF000000)>>24",
          "XX = (address & 0xFF0000)>>16",
          "yy = (address & 0xFF00)>>8",
          "YY = (address & 0xFF)",
          "neg = 0x80000000",
          "ww= ((0xB6-xx) & neg)? ( ((0xB9-xx)&neg)?(((0xEE-xx)&neg)?(xx-0xEE):0):(xx-0xB6)):0",
          "uu= ((0xB6-xx) & neg)? ( ((0xB9-xx)&neg)?(((0xEE-xx)&neg)?(0xEE):xx):(0xB6)):xx",
          "WW= ((0xB6-XX) & neg)? ( ((0xB9-XX)&neg)?(((0xEE-XX)&neg)?(XX-0xEE):0):(XX-0xB6)):0",
          "UU= ((0xB6-XX) & neg)? ( ((0xB9-XX)&neg)?(((0xEE-XX)&neg)?(0xEE):XX):(0xB6)):XX",
          "zz= ((0xB6-yy) & neg)? ( ((0xB9-yy)&neg)?(((0xEE-yy)&neg)?(yy-0xEE):0):(yy-0xB6)):0",
          "vv= ((0xB6-yy) & neg)? ( ((0xB9-yy)&neg)?(((0xEE-yy)&neg)?(0xEE):yy):(0xB6)):yy",
          "ZZ= ((0xB6-YY) & neg)? ( ((0xB9-YY)&neg)?(((0xEE-YY)&neg)?(YY-0xEE):0):(YY-0xB6)):0",
          "VV= ((0xB6-YY) & neg)? ( ((0xB9-YY)&neg)?(((0xEE-YY)&neg)?(0xEE):YY):(0xB6)):YY",
          "UVdata = ((uu<<24)|(UU<<16)|(vv<<8)|VV)",
          "ZWdata = ((ww<<24)|(WW<<16)|(zz<<8)|ZZ)",
          "gSaveBlock1Ptr = 0x03004FA8",
          "offset = 0x0000090A ; offset from gSaveBlock1Ptr to NPC 1 script",
          " ",
          "@@",
          " ",
          "0xA10BB504",
          "0x6800C907",
          "0x1880D0FF",
          "0xE000A105",
          "0xC906FFFF",
          "0x60011889",
          "0xD0FF2000",
          "0xFFFFBD04",
          "0xFFFFFFFF",
          "{ UVdata }",
          "{ ZWdata }",
          "0x515151FF",
          "{ gSaveBlock1Ptr }",
          "0x5151FFFF",
          "{ offset }"
        ]
      }
    ]
  },
  {
    "number": 21,
    "title": "Change Pokemon Level",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0"
        ],
        "path": "pkmn/ChangeLevel.txt",
        "source": [
          "@@ title = \"Change Level of Party Slot 6 (Grab ACE)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "level = 99",
          "@@",
          "movs r12, { 0x2024284 + 100 } ?",
          "movs r11, {level} ?",
          "strb r11,  [r12, #484]"
        ]
      },
      {
        "selections": [
          "English Switch"
        ],
        "path": "pkmn/ChangeLevel_SWITCH.txt",
        "source": [
          "@@ title = \"Change Level of Party Slot 6 (Grab ACE)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "level = 99",
          "@@",
          "movs r12, { 0x2024284 + 100 } ?",
          "movs r11, {level} ?",
          "strb r11,  [r12, #480]"
        ]
      },
      {
        "selections": [
          "French Switch"
        ],
        "path": "pkmn/ChangeLevel_FRA_SWITCH.txt",
        "source": [
          "@@ title = \"Change Level of Party Slot 6\"",
          "@@ author = \"Papa Jefe, RocaBOT\"",
          "@@ exit = \"GrabACEExit\" ",
          " ",
          "// Changes the level of the second Pokémon in the party.",
          "// Choose level here. Use rare candy to make permanent.",
          " ",
          "level = 99",
          " ",
          "@@",
          " ",
          "movs r12, { 0x2fe4284 + 100 } ? ; r12 = &Trainer_party + 100 (second Pokemon)",
          "movs r11, {level} ? ; Load level in r11",
          "strb r11, [r12, #480] ; Store r11 (level) in party member 6 "
        ]
      }
    ]
  },
  {
    "number": 22,
    "title": "Perform PID or TID corruption",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0"
        ],
        "path": "pkmn/PIDorTIDCorrupt.txt",
        "source": [
          "@@ title = \"Perform PID or OTID Corruption in Box 3 Slot 1 (Grab ACE)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "ID = 0xD7",
          "CTYPE = 0x40000000",
          "aligned_pc = 0",
          "@@",
          "sbc r11,pc,0x7160 ?",
          "movs r12, 0xE02C ?",
          "STRH r12,[pc,{0x1e - (!aligned_pc * 2)}]",
          "movs r12,{CTYPE|0x30} ?",
          "0x0000FF00",
          "bic r0,r12, 0xB0",
          "ldr r12,[r11,{ID + (!!aligned_pc * 2)}]!",
          "0xEEEEC000",
          "str r12,[r11]!"
        ]
      }
    ]
  },
  {
    "number": 23,
    "title": "Create Pokemon species from nothing",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "pkmn/PokemonFromNothing.txt",
        "source": [
          "@@ title = \"Create Pokemon from nothing (Grab ACE)\"",
          "@@ author = \"Sleipnir (adapted by PapaJefe, Final and Adrichu00)\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "species = 0x3200 @input:species",
          "inaccurate_emu = 0",
          "@@",
          "sbc r11, pc, 0x2940",
          "movs r12, #0xE200",
          "bic r12, r12, #0xFF000",
          "strh r12, [r11, {inaccurate_emu? 0x0C : 0x0A}]!",
          "mov r12, {species & 0xFFFF} ?",
          "strh r12, [r11, 0xA]",
          "strh r12, [r11, 0xE]"
        ]
      }
    ]
  },
  {
    "number": 24,
    "title": "Get any item",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/GetAnyItem.txt",
        "source": [
          "@@ title = \"Get any item (grab ACE)\"",
          "@@ author = \"Sleipnir\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; This code injects the chosen item into your User's PC.",
          "; It always goes to the bottom slot, so it doesn't interfere with any items currently stored there.",
          " ",
          "inaccurate_emu = !!0 %% Set to 1 if you are using an emulator < mgba 0.9",
          "amount = 999 %% Maximum possible amount is 65535",
          "item_index ? = 1 @input:item",
          " ",
          "@@",
          "SBC r12, pc, #{inaccurate_emu ? 0xEE : 0xEC}",
          "SBC r12, r12, #0xBE00",
          "MOVS r11, #{amount & 0xFFFF} ?",
          "STRH r11, [r12, #0xC6] %% Store amount",
          "MOVS r11, #{item_index & 0xFFFF} ?",
          "STRH r11, [r12, #0xC4] %% Store item index"
        ]
      }
    ]
  },
  {
    "number": 25,
    "title": "Create 6IV Egg from Nothing",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "pkmn/Create6IVEgg.txt",
        "source": [
          "@@ title = \"Create 6IV Egg from Nothing (Grab ACE)\"",
          "@@ author = \"PapaJefe & Adrichu00\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "aligned_pc = 0 ; Set to 1 for old emulators",
          "species = POKEMON @input:species",
          "ability = 0",
          "met_data ?= 0x29C0",
          " ",
          "IVs = 0xFFFFFFFF",
          "Checksum ? = ((IVs & 0xFFFF) + (IVs >> 16) + species + met_data) & 0xFFFF",
          " ",
          "@@",
          " ",
          "SBC r11, pc, #0x2F00",
          "MOV r12, {species} ?",
          "STRH r12, [r11, #{0x88 + (!!aligned_pc * 2)}] ; Store species",
          "MOV r12, {met_data} ?",
          "STRH r12, [r11, #{(ability ? 0xA2 : 0xAE) + (!!aligned_pc * 2)}] ; Store origin data",
          "MOV r12, {Checksum} ?",
          "STRH r12, [r11, #{0x84 + (!!aligned_pc * 2)}] ; Store checksum",
          "MOV r12, {IVs} ?",
          "STR r12, [r11, #{(ability ? 0xA4 : 0xB0) + (!!aligned_pc * 2)}]! ; Store IVs"
        ]
      }
    ]
  },
  {
    "number": 26,
    "title": "Create Egg with Custom Hidden Power (bootstrapped)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "pkmn/HiddenPowerEgg.txt",
        "source": [
          "@@ title = \"Create Egg with Custom Hidden Power (bootstrapped)\"",
          "@@ author = \"PapaJefe & it_is_final\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "aligned_pc = 0",
          "species = POKEMON @input:species",
          "ability = 0",
          "IVs = 0xFDFFFFFF",
          "met_data ?= 0x29C0",
          "Checksum ? = ((IVs & 0xFFFF) + (IVs >> 16) + species + met_data) & 0xFFFF",
          "@@",
          "SBC r11, pc, #0x2F00",
          "MOV r12, {species} ?",
          "STRH r12, [r11, #{0x88 + (!!aligned_pc * 2)}]",
          "MOV r12, {met_data} ?",
          "STRH r12, [r11, #{(ability ? 0xA2 : 0xAE) + (!!aligned_pc * 2)}]",
          "MOV r12, {Checksum} ?",
          "STRH r12, [r11, #{0x84 + (!!aligned_pc * 2)}]",
          "MOV r12, {IVs} ?",
          "STR r12, [r11, #{(ability ? 0xA4 : 0xB0) + (!!aligned_pc * 2)}]!"
        ]
      }
    ]
  },
  {
    "number": 27,
    "title": "Change Pokémon OT Name",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "French",
          "German",
          "Spanish",
          "Italian"
        ],
        "path": "pkmn/ChangePokemonOT.txt",
        "source": [
          "@@ title = \"Change Pokémon OT Name\"",
          "@@ author = \"final\"",
          "@@ exit = \"ROM_BX_lr_Box6_Grab\"",
          "@@ filler4 = 0xffffffff",
          " ",
          "aligned_pc = 0",
          "@@",
          "ADCGTS r12, r15, r14, ASR #21",
          "0xffffffff",
          "SBC r10, r15, #0x3fc0",
          "0xe8bc00c0",
          "STR r15, [r10, #0xfa5]!",
          "0xe8ca00c0",
          "{aligned_pc ? 0xe3ffc4c0 : 0xe3ffc4d0}",
          "MOVS r11, #0xbc00",
          "STRB r11, [r10, r12, ASR #27]",
          "0xffffffff"
        ]
      }
    ]
  },
  {
    "number": 28,
    "title": "Replace Pokemon OT w/ Your Trainer Name",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "French",
          "German",
          "Spanish",
          "Italian"
        ],
        "path": "pkmn/ReplacePokemonOT.txt",
        "source": [
          "@@ title = \"Replace Pokemon OT w/ Your Trainer Name\"",
          "@@ author = \"Papa Jefe and final\"",
          "@@ exit = \"ROM_BX_lr_Box6_Grab\"",
          "@@ filler4 = 0xffffffff",
          " ",
          "aligned_pc = 0",
          "@@",
          "SBC r12, r15, #0xd000",
          "SBC r12, r12, #0xd6",
          "SBC r10, r15, #0x3fc0",
          "0xe8bc00c0",
          "STR r15, [r10, #0xfa5]!",
          "0xe8ca00c0",
          "{aligned_pc ? 0xe3ffc4c0 : 0xe3ffc4d0}",
          "MOVS r11, #0xbc00",
          "STRB r11, [r10, r12, ASR #27]",
          "0xffffffff"
        ]
      }
    ]
  },
  {
    "number": 29,
    "title": "Start wild battle with any Pokemon",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "pkmn/StartWildBattleWithAnyPokemon.txt",
        "source": [
          "@ title = \"Start wild battle with any Pokemon\"",
          "@@ author = \"Theocatic / final\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "PokemonHex = 0x00C4 @input:species",
          "PokemonLV = 25",
          "NPC = 2",
          "ScriptStart = (PokemonLV * 0x1000000) + (PokemonHex * 0x100) + 0xB6",
          "ScriptEnd = 0x02B70000",
          "NPCOffset = 0x1A5 + (NPC * 0x18)",
          "@@",
          "sbc r10, pc, 0xBA00",
          "adc r11, r4, 0x300",
          "str r11, [r10, {NPCOffset}]!",
          "mov r12, {ScriptStart} ?",
          "str r12, [r11]!",
          "mov r12, {ScriptEnd} ?",
          "0xE7ABCCAE"
        ]
      }
    ]
  },
  {
    "number": 30,
    "title": "Create any Gift Pokemon (Bootstrapped)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "pkmn/CreateAnyGiftPokemonBootstrapped.txt",
        "source": [
          "@ title = \"Create any Gift Pokemon (Bootstrapped)\"",
          "@@ author = \"Theocatic\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "PokemonHex = 133  @input:species",
          "PokemonLV = 25",
          "NPC = 2",
          " ",
          "ScriptStart = (PokemonLV * 0x1000000) + (PokemonHex * 0x100) + 0x79",
          "ScriptEnd = 0x00000000",
          "NPCOffset = 0x1A5 + (NPC * 0x18)",
          "@@",
          " ",
          "sbc r10, pc, 0xBA00",
          "adc r11, r4, 0x300",
          "str r11, [r10, {NPCOffset}]!",
          "mov r12, {ScriptStart} ?",
          "str r12, [r11]!",
          "mov r12, {ScriptEnd} ?",
          "0xE7ABCCAE",
          "0xE7ABCCAE",
          "0xE7ABCCAE",
          "Adc r12, 0x02 ?",
          "0xE7ABCCAE"
        ]
      }
    ]
  },
  {
    "number": 31,
    "title": "Create Tradeback NPC",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "French",
          "German",
          "Spanish",
          "Italian"
        ],
        "path": "misc/CreateTradebackNPC.txt",
        "source": [
          "@ title = \"Create Tradeback NPC\"",
          "@@ author = \"Theocatic, Final\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          ";After Executing this code talk to the Old Gentleman NPC in the Viridian City Pokemon Center similar to the Run script via NPC code.",
          ";This code will trade the first pokemon in your party for an empty Decamark. Talk to the NPC again to receive back your original Pokemon",
          " ",
          "NPC = 2 ;sets which NPC on the map to run though. NPC 1, 2 and 3 are usable.",
          " ",
          ";Do not modify these values",
          "NPCOffset = 0x1A5 + (NPC * 0x18)",
          "@@",
          " ",
          "SBC r10, pc, 0xBA00",
          "ADC r11, r4, 0x300",
          "MVN r12, #0xff0000",
          "STR r11, [r10, {NPCOffset}]!",
          "; SUB r12, r12, #{0xffff - 0xfe25} ?",
          "SBC r12, r12, #0xee",
          "SBC r12, r12, #0xea",
          "MVN r0, #0xff",
          "STR r12, [r11]! ;writes 0x0200FE25",
          "MOV r10, #0x2fc0000",
          "0xe1ffc4c0  ; MVNS r12, r0, ASR #9",
          "ADCS r10, r10, #0x37000",
          "STR r12, [r10, #0xc0]!"
        ]
      },
      {
        "selections": [
          "English Switch",
          "French Switch",
          "German Switch",
          "Spanish Switch",
          "Italian Switch"
        ],
        "path": "misc/CreateTradebackNPCSwitch.txt",
        "source": [
          "@ title = \"Create Tradeback NPC\"",
          "@@ author = \"Theocatic, Final\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          ";After Executing this code talk to the Old Gentleman NPC in the Viridian City Pokemon Center similar to the Run script via NPC code.",
          ";This code will trade the first pokemon in your party for an empty Decamark. Talk to the NPC again to receive back your original Pokemon",
          " ",
          "NPC = 2 ;sets which NPC on the map to run though. NPC 1, 2 and 3 are usable.",
          " ",
          ";Do not modify these values",
          "NPCOffset = 0x1A5 + (NPC * 0x18)",
          "@@",
          " ",
          "SBC r10, pc, 0xBA00",
          "ADC r11, r4, 0x300",
          "MVN r12, #0xff0000",
          "STR r11, [r10, {NPCOffset}]!",
          "; SUB r12, r12, #{0xffff - 0xfe25} ?",
          "SBC r12, r12, #0xee",
          "SBC r12, r12, #0xea",
          "MVN r0, #0xff",
          "STR r12, [r11]! ;writes 0x0200FE25",
          "MOV r10, #0x2fc0000",
          "0xe1ffc4c0  ; MVNS r12, r0, ASR #9",
          "ADCS r10, r10, #0x37000",
          "STR r12, [r10, #0xBC]!"
        ]
      },
      {
        "selections": [
          "Japanese 1.0",
          "Japanese 1.1"
        ],
        "path": "misc/CreateTradebackNPCGRABJP1.txt",
        "source": [
          "@@ title = \"Create Tradeback NPC\"",
          "@@ author = \"Theocatic, Final (JPN Port)\"",
          "@@ exit = null",
          "@@ filler1 = 0x2227E7FF",
          "@@ filler2 = 0x0212FFFF",
          "@@ filler3 = 0xE7FF2302",
          "@@ filler4 = 0xFFFFE000",
          " ",
          "; Just like the English version of this code, after executing this code,",
          "; talk to the Old Gentleman NPC in the Viridian City Pokémon Center",
          "; when using the default NPC value of 2.",
          "; The code trades the first Pokémon in the party for an empty Decamark.",
          "; Talk to the NPC again to receive the original Pokémon back.",
          "NPC = 2 ; NPC values 1, 2, and 3 are usable.",
          " ",
          "npc_offset = 0x08F0 + ((NPC - 1) * 0x18)",
          "npc_base = (npc_offset >> 6) & 0xFF",
          "npc_tail = npc_offset & 0x3F",
          " ",
          "npc_base_word = ((0x2300 | npc_base) << 16) | 0x6002",
          "npc_tail_word = ((0x3300 | npc_tail) << 16) | 0x019B",
          " ",
          "@@",
          " ",
          "0x4629A0BF",
          "0x68093988",
          "0xE0003258",
          "0x32250052",
          "0x431A061B",
          "{npc_base_word}",
          "{npc_tail_word}",
          "0xE00018C9",
          "0x32086008",
          "0x405B1AA2",
          "0x40406013",
          "0x46C04770"
        ]
      }
    ]
  },
  {
    "number": 32,
    "title": "Teach Pokemon Any Move",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "pkmn/TeachPokemonAnyMove.txt",
        "source": [
          "@ title = \"Teach Pokemon Any Move\"",
          "@@ author = \"Theocatic\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "Move = 325 @input:move",
          "MoveSlot = 3",
          "NPC = 2",
          "ScriptStart = (MoveSlot * 0x1000000) + 0x7B00",
          "ScriptEnd = Move + (0x020000)",
          "NPCOffset = 0x1A5 + (NPC * 0x18)",
          "@@",
          "sbc r10, pc, 0xBA00",
          "adc r11, r4, 0x300",
          "str r11, [r10, {NPCOffset}]!",
          "mov r12, {ScriptStart} ?",
          "str r12, [r11]!",
          "mov r12, {ScriptEnd} ?",
          "0xE7ABCCAE"
        ]
      }
    ]
  },
  {
    "number": 33,
    "title": "Add/Remove Item in Wrong Pocket",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/AddItemWrongPocket.txt",
        "source": [
          "@@ title = \"Add/Remove Item in Wrong Pocket\"",
          "@@ author = \"Adrichu00\"",
          "@@ exit = \"GrabACEExit\"",
          "; Recommended Bootstrapped exit if it doesn't fit",
          " ",
          " ",
          "; DISCLAIMER",
          ";  The item slot that this code would generate is glitched and it will not be",
          ";  deleted when tossed, given, sold... (although you will earn money). You can",
          ";  read how to get rid of this glitched item slots in the DELETE MODE section",
          ";  below.",
          " ",
          "; EXPLANATION",
          ";  When the game tries to reduce the item quantity, it will look for it in the",
          ";  correct pocket and won't be able to reduce its amount, but the effect of the",
          ";  action (use, give, sell...) should be applied.",
          " ",
          "; IMPORTANT",
          ";  Having at least one empty slot in the selected pocket is highly recommended.",
          ";  (Total Key Item slots = 30; Total Ball slots = 13)",
          ";  In other case, the item in the last slot would be overwritten. In addition,",
          ";  the code would have a small chance of failing. If you don't see the item in",
          ";  the selected pocket, try again.",
          ";  More information about why at:",
          ";    https://gist.github.com/Adrichu00/7088b5f37e4507c563e69a9933df957c#the-code",
          " ",
          "; USAGE",
          ";  * If you want to USE the item, use Key Items Pocket.",
          ";  * If you want to GIVE the item, use Balls Pocket.",
          " ",
          ";  Don't USE (Key Items Pocket) Berries or TMs, they probably won't work if you",
          ";  try to use them from the wrong pocket. In addition, they can glitch out the",
          ";  interfaces and freeze the game because their original pockets use a secondary",
          ";  interface. However, you can GIVE (Balls Pocket) them to a mon if you want.",
          ";  As mentioned above, when the item is used (or given) from the wrong pocket,",
          ";  the game will try to reduce the item quantity in the correct pocket. You can",
          ";  avoid losing that item by moving it to the PC.",
          " ",
          " ",
          "; DELETE MODE",
          ";  You can delete an item in the FIRST slot of the selected pocket by leaving",
          ";  the last slot in that pocket EMPTY and setting delete_mode to 1. This may",
          ";  be the only way to get rid of a slot generated with this code.",
          " ",
          " ",
          "; PARAMETERS",
          " ",
          "; Modify these to configure",
          "pocket      = 0      ; 0 for Key Items, 1 for Balls",
          "item_id     = 0x0044 ; @input:item",
          "; 0 for normal mode (insert in last slot), 1 for delete mode (delete first slot)",
          "delete_mode = 0",
          " ",
          "aligned_pc = 0 ; Set to 1 for old emulators",
          " ",
          "; Do not modify anything below",
          " ",
          "offset = (pocket? (delete_mode? 0xBD06: 0xBCD6): (delete_mode? 0xBD7E: 0xBD0A)) - (!!aligned_pc * 2)",
          " ",
          "@@",
          "; Load Address (Target Slot in Pocket)",
          "SUB r11, pc, {offset} ?",
          "; Write Item ID",
          "MOV r12, {item_id & (delete_mode? 0x0000: 0xFFFF)} ?",
          "STRH r12, [r11], 0x02",
          "; Load quantity from last slot (Should be 0 (empty). Must be 0 for delete_mode = 1)",
          "LDRH r12, [r11, {delete_mode? (pocket? 0x30: 0x74): 0x00}]",
          "; Write quantity or Increase it",
          "{delete_mode? 0xE1CBC0B0: 0xE2ACC2B0} ; STRH r12, [r11] or ADC r12, r12, 0x0B",
          "; Nothing or Write",
          "{delete_mode? 0x000000FF: 0xE1CBC0B0} ; Filler or STRH r12, [r11]"
        ]
      },
      {
        "selections": [
          "Japanese 1.0"
        ],
        "path": "misc/AddItemWrongPocketGRABJP0.txt",
        "source": [
          "@@ title = \"Add/Remove Item in Wrong Pocket\"",
          "@@ author = \"Adrichu00 (Ported to JPN)\"",
          "@@ exit = null",
          "@@ filler1 = 0x4040E7FF",
          "@@ filler2 = 0x00C0FFFF",
          "@@ filler3 = 0xE7FF46C0",
          "@@ filler4 = 0xFFFFE000",
          " ",
          "// pocket: 0 = Key Items, 1 = Poké Balls",
          "// delete_mode: 0 = add to last slot, 1 = delete first slot",
          "// Delete mode requires the selected pocket's last slot to be empty.",
          "// Item IDs:",
          "// https://bulbapedia.bulbagarden.net/wiki/List_of_items_by_index_number_in_Generation_III",
          "pocket = 0",
          "item_id = 0x0001",
          "delete_mode = 1",
          " ",
          "p = pocket ? 1 : 0",
          "d = delete_mode ? 1 : 0",
          " ",
          "target_offset = d ? (p ? 0x0430 : 0x03B8) : (p ? 0x0460 : 0x042C)",
          "target_base = (target_offset >> 3) & 0xFF",
          "target_tail = target_offset & 0x07",
          " ",
          "quantity_delta = d ? (p ? 0x32 : 0x76) : 0x02",
          "quantity_base = (quantity_delta >> 3) & 0xFF",
          "quantity_tail = quantity_delta & 0x07",
          " ",
          "quantity_xor = d ? 0 : 1",
          "stored_item = d ? 0 : (item_id & 0xFFFF)",
          "item_a = (stored_item & 0xAAAA) ^ 0x0303",
          "item_b = (stored_item & 0x5555) ^ 0x0303",
          "item_data = (item_b << 16) | item_a",
          " ",
          "@@",
          " ",
          "0x39884629",
          "0x4A056809",
          "{0xE0002000 | target_base}",
          "{0xE0053000 | target_tail}",
          "{item_data}",
          "0x0C131809",
          "0x800A405A",
          "{0xE0002000 | quantity_base}",
          "{0x5A0A3000 | quantity_tail}",
          "{0x405A2300 | quantity_xor}",
          "0x4040804A",
          "0x46C04770"
        ]
      },
      {
        "selections": [
          "Japanese 1.1"
        ],
        "path": "misc/AddItemWrongPocketGRABJP1.txt",
        "source": [
          "@@ title = \"Add/Remove Item in Wrong Pocket\"",
          "@@ author = \"Adrichu00 (Ported to JPN)\"",
          "@@ exit = null",
          "@@ filler1 = 0x4040E7FF",
          "@@ filler2 = 0x00C0FFFF",
          "@@ filler3 = 0xE7FF46C0",
          "@@ filler4 = 0xFFFFE000",
          " ",
          "// pocket: 0 = Key Items, 1 = Poké Balls",
          "// delete_mode: 0 = add to last slot, 1 = delete first slot",
          "// Delete mode requires the selected pocket's last slot to be empty.",
          "// Item IDs:",
          "// https://bulbapedia.bulbagarden.net/wiki/List_of_items_by_index_number_in_Generation_III",
          " ",
          "pocket = 0",
          "item_id = 0x0001",
          "delete_mode = 1",
          " ",
          "p = pocket ? 1 : 0",
          "d = delete_mode ? 1 : 0",
          " ",
          "target_offset = d ? (p ? 0x0430 : 0x03B8) : (p ? 0x0460 : 0x042C)",
          "target_base = (target_offset >> 3) & 0xFF",
          "target_tail = target_offset & 0x07",
          " ",
          "quantity_delta = d ? (p ? 0x32 : 0x76) : 0x02",
          "quantity_base = (quantity_delta >> 3) & 0xFF",
          "quantity_tail = quantity_delta & 0x07",
          " ",
          "quantity_xor = d ? 0 : 1",
          "stored_item = d ? 0 : (item_id & 0xFFFF)",
          " ",
          "item_a = (stored_item & 0xAAAA) ^ 0x0303",
          "item_b = (stored_item & 0x5555) ^ 0x0303",
          "item_data = (item_b << 16) | item_a",
          " ",
          "@@",
          " ",
          "0x39884629",
          "0x4A056809",
          "{0xE0002000 | target_base}",
          "{0xE0053000 | target_tail}",
          "{item_data}",
          "0x0C131809",
          "0x800A405A",
          "{0xE0002000 | quantity_base}",
          "{0x5A0A3000 | quantity_tail}",
          "{0x405A2300 | quantity_xor}",
          "0x4040804A",
          "0x46C04770"
        ]
      }
    ]
  },
  {
    "number": 34,
    "title": "Start Fateful Mew Battle (Bootstrapped)",
    "games": [
      "firered"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1"
        ],
        "path": "pkmn/FatefulMew_FR_Rev1_ENG.txt",
        "source": [
          "@@ title = \"Start Fateful Mew Battle (Bootstrapped)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "script = 0x0816B10C",
          "offset = 0x5D9C",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1bd]!",
          "sbc r12, r12, {offset} ?",
          "str r12, [r11, 0xA8]!",
          "sbc r11, r4, 0x27AE ?",
          "mov r12, {0x0097} ?",
          "strh r12, [r11, 0xCA]"
        ]
      },
      {
        "selections": [
          "English 1.0"
        ],
        "path": "pkmn/FatefulMew_FR_ENG.txt",
        "source": [
          "@@ title = \"Start Fateful Mew Battle (Bootstrapped)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "script = 0x0816B094",
          "offset = 0x5D9C",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1bd]!",
          "sbc r12, r12, {offset} ?",
          "str r12, [r11, 0xA8]!",
          "sbc r11, r4, 0x27AE ?",
          "mov r12, {0x0097} ?",
          "strh r12, [r11, 0xCA]"
        ]
      },
      {
        "selections": [
          "English Switch"
        ],
        "path": "pkmn/FatefulMew_FR_ENG_SWITCH.txt",
        "source": [
          "@@ title = \"Start Fateful Mew Battle (Bootstrapped)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "script = 0x0816E78B",
          "offset = 0x5D8A",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1bd]!",
          "sbc r12, r12, {offset} ?",
          "str r12, [r11, 0xA8]!",
          "sbc r11, r4, 0x27AE ?",
          "mov r12, {0x0097} ?",
          "strh r12, [r11, 0xCA]"
        ]
      },
      {
        "selections": [
          "French"
        ],
        "path": "pkmn/FatefulMew_FR_FRA.txt",
        "source": [
          "@@ title = \"Start Fateful Mew Battle (Bootstrapped)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "script = 0x0816B0BC",
          "offset = 0x5DA1",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1bd]!",
          "sbc r12, r12, {offset} ?",
          "str r12, [r11, 0xA8]!",
          "sbc r11, r4, 0x27AE ?",
          "mov r12, {0x0097} ?",
          "strh r12, [r11, 0xCA]"
        ]
      },
      {
        "selections": [
          "French Switch"
        ],
        "path": "pkmn/FatefulMew_FR_FRA_SWITCH.txt",
        "source": [
          "@@ title = \"Start Fateful Mew Battle (Bootstrapped)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "script = 0x0816ED3C",
          "offset = 0x5DA0",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1bd]!",
          "sbc r12, r12, {offset} ?",
          "str r12, [r11, 0xA8]!",
          "sbc r11, r4, 0x27AE ?",
          "mov r12, {0x0097} ?",
          "strh r12, [r11, 0xCA]"
        ]
      },
      {
        "selections": [
          "German"
        ],
        "path": "pkmn/FatefulMew_FR_GER.txt",
        "source": [
          "@@ title = \"Start Fateful Mew Battle (Bootstrapped)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "script = 0x0816B000",
          "offset = 0x5DA1",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1bd]!",
          "sbc r12, r12, {offset} ?",
          "str r12, [r11, 0xA8]!",
          "sbc r11, r4, 0x27AE ?",
          "mov r12, {0x0097} ?",
          "strh r12, [r11, 0xCA]"
        ]
      },
      {
        "selections": [
          "Spanish"
        ],
        "path": "pkmn/FatefulMew_FR_SPA.txt",
        "source": [
          "@@ title = \"Start Fateful Mew Battle (Bootstrapped)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "script = 0x0816B12C",
          "offset = 0x5DA1",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1bd]!",
          "sbc r12, r12, {offset} ?",
          "str r12, [r11, 0xA8]!",
          "sbc r11, r4, 0x27AE ?",
          "mov r12, {0x0097} ?",
          "strh r12, [r11, 0xCA]"
        ]
      },
      {
        "selections": [
          "Italian"
        ],
        "path": "pkmn/FatefulMew_FR_ITA.txt",
        "source": [
          "@@ title = \"Start Fateful Mew Battle (Bootstrapped)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "script = 0x0816B040",
          "offset = 0x5DA1",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1bd]!",
          "sbc r12, r12, {offset} ?",
          "str r12, [r11, 0xA8]!",
          "sbc r11, r4, 0x27AE ?",
          "mov r12, {0x0097} ?",
          "strh r12, [r11, 0xCA]"
        ]
      }
    ]
  },
  {
    "number": 35,
    "title": "Start Fateful Mew Battle (Bootstrapped)",
    "games": [
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1"
        ],
        "path": "pkmn/FatefulMew_LG_Rev1_ENG.txt",
        "source": [
          "@@ title = \"Start Fateful Mew Battle (Bootstrapped)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "script = 0x0816B0E8",
          "offset = 0x5D9C",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1bd]!",
          "sbc r12, r12, {offset} ?",
          "str r12, [r11, 0xA8]!",
          "sbc r11, r4, 0x27AE ?",
          "mov r12, {0x0097} ?",
          "strh r12, [r11, 0xCA]"
        ]
      },
      {
        "selections": [
          "English 1.0"
        ],
        "path": "pkmn/FatefulMew_LG_ENG.txt",
        "source": [
          "@@ title = \"Start Fateful Mew Battle (Bootstrapped)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "script = 0x0816B070",
          "offset = 0x5D9C",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1bd]!",
          "sbc r12, r12, {offset} ?",
          "str r12, [r11, 0xA8]!",
          "sbc r11, r4, 0x27AE ?",
          "mov r12, {0x0097} ?",
          "strh r12, [r11, 0xCA]"
        ]
      },
      {
        "selections": [
          "English Switch"
        ],
        "path": "pkmn/FatefulMew_LG_ENG_SWITCH.txt",
        "source": [
          "@@ title = \"Start Fateful Mew Battle (Bootstrapped)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "script = 0x0816E767",
          "offset = 0x5D8A",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1bd]!",
          "sbc r12, r12, {offset} ?",
          "str r12, [r11, 0xA8]!",
          "sbc r11, r4, 0x27AE ?",
          "mov r12, {0x0097} ?",
          "strh r12, [r11, 0xCA]"
        ]
      },
      {
        "selections": [
          "French"
        ],
        "path": "pkmn/FatefulMew_LG_FRA.txt",
        "source": [
          "@@ title = \"Start Fateful Mew Battle (Bootstrapped)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "script = 0x0816B098",
          "offset = 0x5DA0",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1bd]!",
          "sbc r12, r12, {offset} ?",
          "str r12, [r11, 0xA8]!",
          "sbc r11, r4, 0x27AE ?",
          "mov r12, {0x0097} ?",
          "strh r12, [r11, 0xCA]"
        ]
      },
      {
        "selections": [
          "French Switch"
        ],
        "path": "pkmn/FatefulMew_LG_FRA_SWITCH.txt",
        "source": [
          "@@ title = \"Start Fateful Mew Battle (Bootstrapped)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "script = 0x0816ED18",
          "offset = 0x5DA0",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1bd]!",
          "sbc r12, r12, {offset} ?",
          "str r12, [r11, 0xA8]!",
          "sbc r11, r4, 0x27AE ?",
          "mov r12, {0x0097} ?",
          "strh r12, [r11, 0xCA]"
        ]
      },
      {
        "selections": [
          "German"
        ],
        "path": "pkmn/FatefulMew_LG_GER.txt",
        "source": [
          "@@ title = \"Start Fateful Mew Battle (Bootstrapped)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "script = 0x0816AFDC",
          "offset = 0x5DA0",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1bd]!",
          "sbc r12, r12, {offset} ?",
          "str r12, [r11, 0xA8]!",
          "sbc r11, r4, 0x27AE ?",
          "mov r12, {0x0097} ?",
          "strh r12, [r11, 0xCA]"
        ]
      },
      {
        "selections": [
          "Spanish"
        ],
        "path": "pkmn/FatefulMew_LG_SPA.txt",
        "source": [
          "@@ title = \"Start Fateful Mew Battle (Bootstrapped)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "script = 0x0816B108",
          "offset = 0x5DA0",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1bd]!",
          "sbc r12, r12, {offset} ?",
          "str r12, [r11, 0xA8]!",
          "sbc r11, r4, 0x27AE ?",
          "mov r12, {0x0097} ?",
          "strh r12, [r11, 0xCA]"
        ]
      },
      {
        "selections": [
          "Italian"
        ],
        "path": "pkmn/FatefulMew_LG_ITA.txt",
        "source": [
          "@@ title = \"Start Fateful Mew Battle (Bootstrapped)\"",
          "@@ author = \"PapaJefe\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "script = 0x0816B01C",
          "offset = 0x5DA0",
          " ",
          "@@",
          "sbc r11,pc, 0xBA00",
          "mov r12, {script} ?",
          "str r12, [r11, 0x1bd]!",
          "sbc r12, r12, {offset} ?",
          "str r12, [r11, 0xA8]!",
          "sbc r11, r4, 0x27AE ?",
          "mov r12, {0x0097} ?",
          "strh r12, [r11, 0xCA]"
        ]
      }
    ]
  },
  {
    "number": 36,
    "title": "Make Starters Reappear",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/MakeStartersReappear.txt",
        "source": [
          "@@ title = \"Make Starters Reappear\"",
          "@@ author = \"Sleipnir\"",
          "@@ exit = \"GrabACEExit\"",
          "; This code will make the three starters reappear in Oak's laboratory.",
          "; To get a starter simply go to Pallet Town and move towards Route 1.",
          "; The cutscene will be triggered just like when you first start the game",
          "; (including the rival battle when exiting the lab)",
          "; Will also change the Roaming Beast if not already released.",
          "; To Re-Release the Roaming Beast, use \"Run Script via NPC\" and then run \"GiveCelioSapphire\"",
          "@@",
          " ",
          "sbc r10, pc, 0xB300",
          "movs r11, 0x300",
          "adc r11, r11, 0x320",
          "adc r0, r11, 0xE0",
          "ldrh r12, [r10, 0xAF]",
          "bic r12,r12,r0",
          "strh r12, [r10, 0xAF]",
          "MOVS r11, #0x00FF0000",
          "sbc r10, pc, 0xB100",
          "strh r11, [r10, 0x3B]"
        ]
      }
    ]
  },
  {
    "number": 37,
    "title": "Respawn Zapdos",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/RespawnZapdos.txt",
        "source": [
          "@@ title = \"Respawn Zapdos\"",
          "@@ author = \"Sleipnir (ported by glu8716)\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; Clears FLAG_HIDE_ZAPDOS, allowing Zapdos to reappear at the Power Plant.",
          " ",
          "@@",
          " ",
          "sbc r10, pc, 0xB300",
          "movs r11, 0xC2000",
          "adc r0, r11, 0",
          "sbc r10, r10, 0",
          "ldrh r12, [r10, 0xB6]",
          "bic r12, r12, r0",
          "strh r12, [r10, 0xB6]"
        ]
      }
    ]
  },
  {
    "number": 38,
    "title": "Respawn Articuno",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/RespawnArticuno.txt",
        "source": [
          "@@ title = \"Respawn Articuno\"",
          "@@ author = \"Sleipnir (ported by glu8716)\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; Clears FLAG_HIDE_ARTICUNO, allowing Articuno to reappear at the Seafoam Islands.",
          " ",
          "@@",
          "sbc r10, pc, 0xB300",
          "movs r11, 0xC4",
          "sbc r0, r11, 0xBF",
          "ldrh r12, [r10, 0xBB]",
          "bic r12, r12, r0",
          "strh r12, [r10, 0xBB]"
        ]
      }
    ]
  },
  {
    "number": 39,
    "title": "Respawn Moltres",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/RespawnMoltres.txt",
        "source": [
          "@@ title = \"Respawn Moltres\"",
          "@@ author = \"Sleipnir (ported by glu8716)\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; Clears FLAG_HIDE_MOLTRES, allowing Moltres to reappear at Mt. Ember.",
          " ",
          "@@",
          "sbc r10, pc, 0xB300",
          "movs r11, 0xC4",
          "sbc r0, r11, 0xBF",
          "sbc r10, r10, 0",
          "ldrh r12, [r10, 0xB6]",
          "bic r12, r12, r0",
          "strh r12, [r10, 0xB6]"
        ]
      }
    ]
  },
  {
    "number": 40,
    "title": "Respawn Mewtwo",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/RespawnMewtwo.txt",
        "source": [
          "@@ title = \"Respawn Mewtwo\"",
          "@@ author = \"Sleipnir (ported by glu8716)\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; Clears FLAG_HIDE_MEWTWO, allowing Mewtwo to reappear at Cerulean Cave.",
          " ",
          "@@",
          "sbc r10, pc, 0xB300",
          "movs r11, 0xC2",
          "sbc r0, r11, 0xBF",
          "ldrh r12, [r10, 0xBB]",
          "bic r12, r12, r0",
          "strh r12, [r10, 0xBB]"
        ]
      }
    ]
  },
  {
    "number": 41,
    "title": "Respawn Deoxys",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/RespawnDeoxys.txt",
        "source": [
          "@@ title = \"Respawn Deoxys\"",
          "@@ author = \"Sleipnir (ported by glu8716)\"",
          "@@ exit = \"GrabACEExit\"",
          "; Clears FLAG_FOUGHT_DEOXYS and FLAG_DEOXYS_FLEW_AWAY, allowing Deoxys to respawn on Birth Island",
          "@@",
          "sbc r11, pc, 0xE4",
          "movs r12, 0xBF0000",
          "bic r12, r12, 0x3FC000",
          "adc r12, r12, 0xEE",
          "sbc r0, r12, 0xDD",
          "sbc r10, r11, 0xB200",
          "ldr r12, [r10, 0xEE]!",
          "bic r12, r12, r0",
          "str r12, [r10]!"
        ]
      }
    ]
  },
  {
    "number": 42,
    "title": "Respawn Lugia and Ho-Oh",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/RespawnLugiaHoOh.txt",
        "source": [
          "@@ title = \"Respawn Lugia and Ho-Oh\"",
          "@@ author = \"Sleipnir (ported by glu8716)\"",
          "@@ exit = \"GrabACEExit\"",
          "pokemon = 1",
          "flag_mask = pokemon == 1 ? 0x0024 : 0x0048",
          "@@",
          "sub  r11, pc, 0xB1F8 ?",
          "mov  r12, {flag_mask} ?",
          "bic  r0, r12, 0x00",
          "ldrh r12, [r11]",
          "bic  r12, r12, r0",
          "strh r12, [r11]"
        ]
      }
    ]
  },
  {
    "number": 43,
    "title": "Respawn Lapras",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/RespawnLapras.txt",
        "source": [
          "@@ title = \"Respawn Lapras\"",
          "@@ author = \"Sleipnir (ported by glu8716)\"",
          "@@ exit = \"GrabACEExit\"",
          "; Clears FLAG_GOT_LAPRAS_FROM_SILPH",
          "@@",
          "sbc r10, pc, 0xB300",
          "movs r11, 0xEE",
          "sbc r0, r11, 0xAD",
          "ldrh r12, [r10, 0xF3]",
          "bic r12, r12, r0",
          "strh r12, [r10, 0xF3]"
        ]
      }
    ]
  },
  {
    "number": 44,
    "title": "Respawn Eevee",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/RespawnEevee.txt",
        "source": [
          "@@ title = \"Respawn Eevee\"",
          "@@ author = \"Sleipnir (ported by glu8716)\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; Clears FLAG_HIDE_EEVEE_BALL, allowing the gift Eevee in Celadon City to be received again.",
          " ",
          "@@",
          "sbc r10, pc, 0xB300",
          "movs r12, 0xBF",
          "bic r12, r12, 0xC000003F",
          "adc r0, r12, 0",
          "sbc r10, r10, 0",
          "ldrh r12, [r10, 0xB6]",
          "bic r12, r12, r0",
          "strh r12, [r10, 0xB6]"
        ]
      }
    ]
  },
  {
    "number": 45,
    "title": "Respawn Magikarp",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/RespawnMagikarp.txt",
        "source": [
          "@@ title = \"Respawn Magikarp\"",
          "@@ author = \"Sleipnir (ported by glu8716)\"",
          "@@ exit = \"GrabACEExit\"",
          "; Clears FLAG_BOUGHT_MAGIKARP",
          "@@",
          "sbc r10, pc, 0xB300",
          "movs r11, 0x2E0",
          "sbc r0, r11, 0xDF",
          "ldrh r12, [r10, 0xF3]",
          "bic r12, r12, r0",
          "strh r12, [r10, 0xF3]"
        ]
      }
    ]
  },
  {
    "number": 46,
    "title": "Respawn Togepi",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/RespawnTogepi.txt",
        "source": [
          "@@ title = \"Respawn Togepi\"",
          "@@ author = \"Sleipnir (ported by glu8716)\"",
          "@@ exit = \"GrabACEExit\"",
          "; Clears FLAG_GOT_TOGEPI_EGG",
          "@@",
          "sbc r10, pc, 0xB200",
          "movs r11, 0x330",
          "adc r0, r11, 0xD0",
          "sbc r10, r10, 0",
          "ldrh r12, [r10, 0x6]",
          "bic r12, r12, r0",
          "strh r12, [r10, 0x6]"
        ]
      }
    ]
  },
  {
    "number": 47,
    "title": "Respawn Hitmonlee and Hitmonchan",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/RespawnHitmon.txt",
        "source": [
          "@@ title = \"Respawn Hitmonlee and Hitmonchan\"",
          "@@ author = \"Sleipnir (ported by glu8716)\"",
          "@@ exit = \"GrabACEExit\"",
          "; Clears FLAG_HIDE_DOJO_HITMONLEE_BALL, FLAG_HIDE_DOJO_HITMONCHAN_BALL, FLAG_GOT_HITMON_FROM_DOJO",
          "@@",
          "sbc r10, pc, 0xB300",
          "movs r12, 0xBF",
          "sbc r0, r12, 0xBB",
          "sbc r10, r10, 0",
          "ldrh r12, [r10, 0xB8]",
          "bic r12, r12, r0",
          "strh r12, [r10, 0xB8]",
          "rsc r12, r0, 0xC000003F",
          "adc r0, r12, 0xC5",
          "ldrh r12, [r10, 0xFA]",
          "bic r12, r12, r0",
          "strh r12, [r10, 0xFA]"
        ]
      }
    ]
  },
  {
    "number": 48,
    "title": "Respawn Snorlax",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/RespawnSnorlax.txt",
        "source": [
          "@@ title = \"Respawn Snorlax\"",
          "@@ author = \"Sleipnir (ported by glu8716)\"",
          "@@ exit = \"GrabACEExit\"",
          "route = 12",
          "flag = route == 12 ? 0x054 : 0x080",
          "flag_offset = 0xB256 - ((flag >> 3) & ~0x01)",
          "flag_mask   = 0x0001 << (flag & 0x0F)",
          "@@",
          "sub  r11, pc, {flag_offset} ?",
          "mov  r12, {flag_mask} ?",
          "bic  r0, r12, 0x00",
          "ldrh r12, [r11]",
          "bic  r12, r12, r0",
          "strh r12, [r11]"
        ]
      }
    ]
  },
  {
    "number": 49,
    "title": "Revive Fossils (Bootstrapped)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/ReviveFossils.txt",
        "source": [
          "@@ title = \"Revive Fossils (Bootstrapped)\"",
          "@@ author = \"Sleipnir (ported by glu8716)\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "; This code requires a Box 14 exit code for grab ACE.",
          "; IMPORTANT: use only after reviving original fossils; revive non-amber fossils before Old Amber.",
          " ",
          "@@",
          "sub  r11, pc, 0xB208 ?",
          "mov  r12, 0x000C ?",
          "bic  r0, r12, 0x00",
          "ldrh r12, [r11]",
          "bic  r12, r12, r0",
          "0xE0ACC000",
          "strh r12, [r11]",
          "mov  r12, 0x7000 ?",
          "bic  r0, r12, 0x00",
          "ldrh r12, [r11, 0x0E]",
          "bic  r12, r12, r0",
          "strh r12, [r11, 0x0E]"
        ]
      }
    ]
  },
  {
    "number": 50,
    "title": "Re-enable Single Use Move Tutors",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/EnableTutors.txt",
        "source": [
          "@@ title = \"Re-enable Single Use Move Tutors (Bootstrapped)\"",
          "@@ author = \"Sleipnir\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "; This code requires a Box 14 exit code for grab ACE.",
          "; It can be found here:",
          "; https://pomeg-letterbombers.github.io/pokemon-ace-notes/frlg/exit-codes/box-14-exit/",
          "; After executing, all single-use Move Tutors will be usable again.",
          "; It doesn't matter whether they have been used before or not.",
          " ",
          "@@",
          "0xE3A1B0EE  ; mov r12, 0xEE",
          "sbc r0,r11,0xEC",
          "0xE3B0CCFF ; mov r12,0xC000003F",
          "sbc r10,pc,0xB300",
          "bic r12,r12,0xC8000",
          "ldrh r11, [r10, 0xFD]",
          "bic r11,r11,r0",
          "strh r11, [r10, 0xFD]",
          "adc r12,r12,0xC000003F",
          "adc r0,r12,0xC0",
          "adc r10,r10,0x30",
          "0xE5BAC0C9 ; ldrt r12, [r10, C9]!",
          "bic r12,r12,r0",
          "sbc r11, pc, 0x2E",
          "sbc r0, r11, 0xFF",
          "0xE5AAC000 ;strt r12, [r10]"
        ]
      }
    ]
  },
  {
    "number": 51,
    "title": "Read Pokemon IVEA field",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "French",
          "German",
          "Spanish",
          "Italian"
        ],
        "path": "pkmn/ReadIvea.txt",
        "source": [
          "@@ title = \"Read IVEA field\"",
          "@@ author = \"final / Papa Jefé / Blisy\"",
          "@@ exit = \"ROM_BX_lr_Box10_Grab\"",
          " ",
          "pid = 0x00000000",
          "tid = 0",
          "sid = 0",
          "out_atk = 0",
          "out_def = 0",
          "out_spa = 0",
          "out_spd = 0",
          " ",
          "pmod = pid % 24",
          "misc_substructure_position = \\",
          "    pmod == 18 | pmod == 19 | pmod == 20 | pmod == 21 | \\",
          "    pmod == 22 | pmod == 23 ? 0 : \\",
          "    pmod == 4  | pmod == 5  | pmod == 10 | pmod == 11 | \\",
          "    pmod == 16 | pmod == 17 ? 1 : \\",
          "    pmod == 1  | pmod == 3  | pmod == 7  | pmod == 9  | \\",
          "    pmod == 13 | pmod == 15 ? 2 : 3",
          "misc_offset = 0xC * misc_substructure_position",
          "target = 0x20 + misc_offset + 4",
          "otid = (tid << 0) | (sid << 16)",
          "encryption_key = pid ^ otid",
          "cur_encoded_ivea ?= (out_atk <<  0) | (out_def <<  8) \\",
          "                  | (out_spa << 16) | (out_spd << 24)",
          "hp_iv   ?= ((cur_encoded_ivea ^ encryption_key) >>  0) & 0x1f",
          "atk_iv  ?= ((cur_encoded_ivea ^ encryption_key) >>  5) & 0x1f",
          "def_iv  ?= ((cur_encoded_ivea ^ encryption_key) >> 10) & 0x1f",
          "spe_iv  ?= ((cur_encoded_ivea ^ encryption_key) >> 15) & 0x1f",
          "spa_iv  ?= ((cur_encoded_ivea ^ encryption_key) >> 20) & 0x1f",
          "spd_iv  ?= ((cur_encoded_ivea ^ encryption_key) >> 25) & 0x1f",
          "is_egg  ?= ((cur_encoded_ivea ^ encryption_key) >> 30) &    1",
          "ability ?= ((cur_encoded_ivea ^ encryption_key) >> 31) &    1",
          " ",
          "@@",
          " ",
          "MOVS    r12, #0x2f00000",
          "ADCS    r10, r12, #0xe3000",
          "ADCS    r10, r10, #0xff0",
          "ADCS    r11, r10, #0x294",
          "LDRB    r12, [r10], #{0x294 + target}",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xbe]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xc0]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xc4]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xc6]"
        ]
      },
      {
        "selections": [
          "English Switch",
          "French Switch",
          "German Switch",
          "Spanish Switch",
          "Italian Switch"
        ],
        "path": "pkmn/ReadIvea_SWITCH.txt",
        "source": [
          "@@ title = \"Read IVEA field\"",
          "@@ author = \"final / Papa Jefé / Blisy\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "pid = 0x00000000",
          "tid = 0",
          "sid = 0",
          "out_atk = 0",
          "out_def = 0",
          "out_spa = 0",
          "out_spd = 0",
          " ",
          "pmod = pid % 24",
          "misc_substructure_position = \\",
          "    pmod == 18 | pmod == 19 | pmod == 20 | pmod == 21 | \\",
          "    pmod == 22 | pmod == 23 ? 0 : \\",
          "    pmod == 4  | pmod == 5  | pmod == 10 | pmod == 11 | \\",
          "    pmod == 16 | pmod == 17 ? 1 : \\",
          "    pmod == 1  | pmod == 3  | pmod == 7  | pmod == 9  | \\",
          "    pmod == 13 | pmod == 15 ? 2 : 3",
          "misc_offset = 0xC * misc_substructure_position",
          "target = 0x20 + misc_offset + 4",
          "otid = (tid << 0) | (sid << 16)",
          "encryption_key = pid ^ otid",
          "cur_encoded_ivea ?= (out_atk <<  0) | (out_def <<  8) \\",
          "                  | (out_spa << 16) | (out_spd << 24)",
          "hp_iv   ?= ((cur_encoded_ivea ^ encryption_key) >>  0) & 0x1f",
          "atk_iv  ?= ((cur_encoded_ivea ^ encryption_key) >>  5) & 0x1f",
          "def_iv  ?= ((cur_encoded_ivea ^ encryption_key) >> 10) & 0x1f",
          "spe_iv  ?= ((cur_encoded_ivea ^ encryption_key) >> 15) & 0x1f",
          "spa_iv  ?= ((cur_encoded_ivea ^ encryption_key) >> 20) & 0x1f",
          "spd_iv  ?= ((cur_encoded_ivea ^ encryption_key) >> 25) & 0x1f",
          "is_egg  ?= ((cur_encoded_ivea ^ encryption_key) >> 30) &    1",
          "ability ?= ((cur_encoded_ivea ^ encryption_key) >> 31) &    1",
          " ",
          "@@",
          " ",
          "MOVS    r12, #0x2f00000",
          "ADCS    r10, r12, #0xe3000",
          "ADCS    r10, r10, #0xff0",
          "ADCS    r11, r10, #0x290",
          "LDRB    r12, [r10], #{0x290 + target}",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xbe]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xc0]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xc4]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xc6]"
        ]
      }
    ]
  },
  {
    "number": 52,
    "title": "Read EVs field",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "French",
          "German",
          "Spanish",
          "Italian"
        ],
        "path": "pkmn/ReadEvs.txt",
        "source": [
          "@@ title = \"Read EVs field\"",
          "@@ author = \"final / Papa Jefé / Blisy\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "pid = 0x00000000",
          "tid = 0",
          "sid = 0",
          "out_hp  = 0",
          "out_atk = 0",
          "out_def = 0",
          "out_spa = 0",
          "out_spd = 0",
          "out_spe = 0",
          " ",
          "pmod = pid % 24",
          "ev_substructure_position = \\",
          "    pmod == 12 | pmod == 13 | pmod == 14 | pmod == 15 | \\",
          "    pmod == 16 | pmod == 17 ? 0 : \\",
          "    pmod == 2  | pmod == 3  | pmod == 8  | pmod == 9  | \\",
          "    pmod == 22 | pmod == 23 ? 1 : \\",
          "    pmod == 0  | pmod == 5  | pmod == 6  | pmod == 11 | \\",
          "    pmod == 19 | pmod == 21 ? 2 : 3",
          "ev_offset = 0xC * ev_substructure_position",
          "target = 0x20 + ev_offset",
          "otid = (tid << 0) | (sid << 16)",
          "encryption_key = pid ^ otid",
          "hp  ?= ((encryption_key >>  0) ^ out_hp ) & 0xff",
          "atk ?= ((encryption_key >>  8) ^ out_atk) & 0xff",
          "def ?= ((encryption_key >> 16) ^ out_def) & 0xff",
          "spe ?= ((encryption_key >> 24) ^ out_spe) & 0xff",
          "spa ?= ((encryption_key >>  0) ^ out_spa) & 0xff",
          "spd ?= ((encryption_key >>  8) ^ out_spd) & 0xff",
          "cur_encoded_evs1 ?= (out_hp  << 0) | (out_atk << 8)",
          "cur_encoded_evs2 ?= (out_def << 0) | (out_spe << 8)",
          "cur_encoded_evs3 ?= (out_spa << 0) | (out_spd << 8)",
          " ",
          "@@",
          " ",
          "MOVS    r12, #0x2f00000",
          "ADCS    r10, r12, #0xe4000",
          "ADCS    r11, r10, #0x284",
          "LDRB    r12, [r10, #{0x284 + target + 0}]",
          "STRH    r12, [r11, #0xba]",
          "STRH    r12, [r11, #0xbc]",
          "LDRB    r12, [r10, #{0x284 + target + 1}]",
          "STRH    r12, [r11, #0xbe]",
          "LDRB    r12, [r10, #{0x284 + target + 2}]",
          "STRH    r12, [r11, #0xc0]",
          "LDRB    r12, [r10, #{0x284 + target + 3}]",
          "STRH    r12, [r11, #0xc2]",
          "LDRB    r12, [r10, #{0x284 + target + 4}]",
          "STRH    r12, [r11, #0xc4]",
          "LDRB    r12, [r10, #{0x284 + target + 5}]",
          "STRH    r12, [r11, #0xc6]"
        ]
      },
      {
        "selections": [
          "English Switch",
          "French Switch",
          "German Switch",
          "Spanish Switch",
          "Italian Switch"
        ],
        "path": "pkmn/ReadEvs_SWITCH.txt",
        "source": [
          "@@ title = \"Read EVs field\"",
          "@@ author = \"final / Papa Jefé / Blisy\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "pid = 0x00000000",
          "tid = 0",
          "sid = 0",
          "out_hp  = 0",
          "out_atk = 0",
          "out_def = 0",
          "out_spa = 0",
          "out_spd = 0",
          "out_spe = 0",
          " ",
          "pmod = pid % 24",
          "ev_substructure_position = \\",
          "    pmod == 12 | pmod == 13 | pmod == 14 | pmod == 15 | \\",
          "    pmod == 16 | pmod == 17 ? 0 : \\",
          "    pmod == 2  | pmod == 3  | pmod == 8  | pmod == 9  | \\",
          "    pmod == 22 | pmod == 23 ? 1 : \\",
          "    pmod == 0  | pmod == 5  | pmod == 6  | pmod == 11 | \\",
          "    pmod == 19 | pmod == 21 ? 2 : 3",
          "ev_offset = 0xC * ev_substructure_position",
          "target = 0x20 + ev_offset",
          "otid = (tid << 0) | (sid << 16)",
          "encryption_key = pid ^ otid",
          "hp  ?= ((encryption_key >>  0) ^ out_hp ) & 0xff",
          "atk ?= ((encryption_key >>  8) ^ out_atk) & 0xff",
          "def ?= ((encryption_key >> 16) ^ out_def) & 0xff",
          "spe ?= ((encryption_key >> 24) ^ out_spe) & 0xff",
          "spa ?= ((encryption_key >>  0) ^ out_spa) & 0xff",
          "spd ?= ((encryption_key >>  8) ^ out_spd) & 0xff",
          "cur_encoded_evs1 ?= (out_hp  << 0) | (out_atk << 8)",
          "cur_encoded_evs2 ?= (out_def << 0) | (out_spe << 8)",
          "cur_encoded_evs3 ?= (out_spa << 0) | (out_spd << 8)",
          " ",
          "@@",
          " ",
          "MOVS    r12, #0x2f00000",
          "ADCS    r10, r12, #0xe3000",
          "ADCS    r10, r10, #0xff0",
          "ADCS    r11, r10, #0x290",
          "LDRB    r12, [r10, #{0x290 + target + 0}]",
          "STRH    r12, [r11, #0xba]",
          "STRH    r12, [r11, #0xbc]",
          "LDRB    r12, [r10, #{0x290 + target + 1}]",
          "STRH    r12, [r11, #0xbe]",
          "LDRB    r12, [r10, #{0x290 + target + 2}]",
          "STRH    r12, [r11, #0xc0]",
          "LDRB    r12, [r10, #{0x290 + target + 3}]",
          "STRH    r12, [r11, #0xc2]",
          "LDRB    r12, [r10, #{0x290 + target + 4}]",
          "STRH    r12, [r11, #0xc4]",
          "LDRB    r12, [r10, #{0x290 + target + 5}]",
          "STRH    r12, [r11, #0xc6]"
        ]
      }
    ]
  },
  {
    "number": 53,
    "title": "Read contest stats field",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "French",
          "German",
          "Spanish",
          "Italian"
        ],
        "path": "pkmn/ReadContestStats.txt",
        "source": [
          "@@ title = \"Read Contest stats\"",
          "@@ author = \"final / Papa Jefé / Blisy\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "pid = 0x00000000",
          "tid = 0",
          "sid = 0",
          "out_hp  = 0",
          "out_atk = 0",
          "out_def = 0",
          "out_spa = 0",
          "out_spd = 0",
          "out_spe = 0",
          " ",
          "pmod = pid % 24",
          "ev_substructure_position = \\",
          "    pmod == 12 | pmod == 13 | pmod == 14 | pmod == 15 | \\",
          "    pmod == 16 | pmod == 17 ? 0 : \\",
          "    pmod == 2  | pmod == 3  | pmod == 8  | pmod == 9  | \\",
          "    pmod == 22 | pmod == 23 ? 1 : \\",
          "    pmod == 0  | pmod == 5  | pmod == 6  | pmod == 11 | \\",
          "    pmod == 19 | pmod == 21 ? 2 : 3",
          "ev_offset = 0xC * ev_substructure_position",
          "target = 0x20 + ev_offset + 6",
          "otid = (tid << 0) | (sid << 16)",
          "encryption_key = pid ^ otid",
          "cool   ?= ((encryption_key >> 16) ^ out_hp ) & 0xff",
          "beauty ?= ((encryption_key >> 24) ^ out_atk) & 0xff",
          "cute   ?= ((encryption_key >>  0) ^ out_def) & 0xff",
          "smart  ?= ((encryption_key >>  8) ^ out_spe) & 0xff",
          "tough  ?= ((encryption_key >> 16) ^ out_spa) & 0xff",
          "feel   ?= ((encryption_key >> 24) ^ out_spd) & 0xff",
          "cur_encoded_1 ?= (out_hp  << 0) | (out_atk << 8)",
          "cur_encoded_2 ?= (out_def << 0) | (out_spe << 8)",
          "cur_encoded_3 ?= (out_spa << 0) | (out_spd << 8)",
          " ",
          "@@",
          " ",
          "MOVS    r12, #0x2f00000",
          "ADCS    r10, r12, #0xe3000",
          "ADCS    r10, r10, #0xff0",
          "ADCS    r11, r10, #0x294",
          "LDRB    r12, [r10], #{0x294 + target}",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xba]",
          "STRH    r12, [r11, #0xbc]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xbe]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xc0]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xc2]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xc4]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xc6]"
        ]
      },
      {
        "selections": [
          "English Switch",
          "French Switch",
          "German Switch",
          "Spanish Switch",
          "Italian Switch"
        ],
        "path": "pkmn/ReadContestStats_SWITCH.txt",
        "source": [
          "@@ title = \"Read Contest stats\"",
          "@@ author = \"final / Papa Jefé / Blisy\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "pid = 0x00000000",
          "tid = 0",
          "sid = 0",
          "out_hp  = 0",
          "out_atk = 0",
          "out_def = 0",
          "out_spa = 0",
          "out_spd = 0",
          "out_spe = 0",
          " ",
          "pmod = pid % 24",
          "ev_substructure_position = \\",
          "    pmod == 12 | pmod == 13 | pmod == 14 | pmod == 15 | \\",
          "    pmod == 16 | pmod == 17 ? 0 : \\",
          "    pmod == 2  | pmod == 3  | pmod == 8  | pmod == 9  | \\",
          "    pmod == 22 | pmod == 23 ? 1 : \\",
          "    pmod == 0  | pmod == 5  | pmod == 6  | pmod == 11 | \\",
          "    pmod == 19 | pmod == 21 ? 2 : 3",
          "ev_offset = 0xC * ev_substructure_position",
          "target = 0x20 + ev_offset + 6",
          "otid = (tid << 0) | (sid << 16)",
          "encryption_key = pid ^ otid",
          "cool   ?= ((encryption_key >> 16) ^ out_hp ) & 0xff",
          "beauty ?= ((encryption_key >> 24) ^ out_atk) & 0xff",
          "cute   ?= ((encryption_key >>  0) ^ out_def) & 0xff",
          "smart  ?= ((encryption_key >>  8) ^ out_spe) & 0xff",
          "tough  ?= ((encryption_key >> 16) ^ out_spa) & 0xff",
          "feel   ?= ((encryption_key >> 24) ^ out_spd) & 0xff",
          "cur_encoded_1 ?= (out_hp  << 0) | (out_atk << 8)",
          "cur_encoded_2 ?= (out_def << 0) | (out_spe << 8)",
          "cur_encoded_3 ?= (out_spa << 0) | (out_spd << 8)",
          " ",
          "@@",
          " ",
          "MOVS    r12, #0x2f00000",
          "ADCS    r10, r12, #0xe3000",
          "ADCS    r10, r10, #0xff0",
          "ADCS    r11, r10, #0x290",
          "LDRB    r12, [r10], #{0x290 + target}",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xba]",
          "STRH    r12, [r11, #0xbc]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xbe]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xc0]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xc2]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xc4]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xc6]"
        ]
      }
    ]
  },
  {
    "number": 54,
    "title": "Read Pokemon Pokerus field",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "French",
          "German",
          "Spanish",
          "Italian"
        ],
        "path": "pkmn/ReadPkrus.txt",
        "source": [
          "@@ title = \"Read Pokérus field\"",
          "@@ author = \"final / Papa Jefé / Blisy\"",
          "@@ exit = \"ROM_BX_lr_Box6_Grab\"",
          " ",
          "pid = 0x0",
          "tid = 0",
          "out_atk = 0",
          "pmod = pid % 24",
          "misc_substructure_position = \\",
          "    pmod == 18 | pmod == 19 | pmod == 20 | pmod == 21 | \\",
          "    pmod == 22 | pmod == 23 ? 0 : \\",
          "    pmod == 4  | pmod == 5  | pmod == 10 | pmod == 11 | \\",
          "    pmod == 16 | pmod == 17 ? 1 : \\",
          "    pmod == 1  | pmod == 3  | pmod == 7  | pmod == 9  | \\",
          "    pmod == 13 | pmod == 15 ? 2 : 3",
          "misc_offset = 0xC * misc_substructure_position",
          "target = 0x20 + misc_offset",
          "encryption_key = pid ^ tid",
          "cur_encoded_pkrs ?= out_atk",
          "cur_pkrs         ?= (encryption_key ^ out_atk) & 0xff",
          "pokerus_days   ?= cur_pkrs & 0xf",
          "pokerus_strain ?= cur_pkrs >> 4",
          " ",
          "@@",
          " ",
          "MOVS    r12, #0x2f00000",
          "ADCS    r10, r12, #0xe4000",
          "ADCS    r11, r10, #0x284",
          "LDRB    r12, [r10, #{0x284 + target}]",
          "STRH    r12, [r11, #0xbe]"
        ]
      },
      {
        "selections": [
          "English Switch",
          "French Switch",
          "German Switch",
          "Spanish Switch",
          "Italian Switch"
        ],
        "path": "pkmn/ReadPkrus_SWITCH.txt",
        "source": [
          "@@ title = \"Read Pokérus field\"",
          "@@ author = \"final / Papa Jefé / Blisy\"",
          "@@ exit = \"BIOS_BX_lr_Box6_Grab\"",
          " ",
          "pid = 0x0",
          "tid = 0",
          "out_atk = 0",
          "pmod = pid % 24",
          "misc_substructure_position = \\",
          "    pmod == 18 | pmod == 19 | pmod == 20 | pmod == 21 | \\",
          "    pmod == 22 | pmod == 23 ? 0 : \\",
          "    pmod == 4  | pmod == 5  | pmod == 10 | pmod == 11 | \\",
          "    pmod == 16 | pmod == 17 ? 1 : \\",
          "    pmod == 1  | pmod == 3  | pmod == 7  | pmod == 9  | \\",
          "    pmod == 13 | pmod == 15 ? 2 : 3",
          "misc_offset = 0xC * misc_substructure_position",
          "target = 0x20 + misc_offset",
          "encryption_key = pid ^ tid",
          "cur_encoded_pkrs ?= out_atk",
          "cur_pkrs         ?= (encryption_key ^ out_atk) & 0xff",
          "pokerus_days   ?= cur_pkrs & 0xf",
          "pokerus_strain ?= cur_pkrs >> 4",
          " ",
          "@@",
          " ",
          "MOVS    r12, #0x2f00000",
          "ADCS    r10, r12, #0xe3000",
          "ADCS    r10, r10, #0xff0",
          "ADCS    r11, r10, #0x290",
          "LDRB    r12, [r10, #{0x290 + target}]",
          "STRH    r12, [r11, #0xbe]"
        ]
      }
    ]
  },
  {
    "number": 55,
    "title": "Read Pokemon ribbons and obedience field",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "French",
          "German",
          "Spanish",
          "Italian"
        ],
        "path": "pkmn/ReadRibbonsAndObedience.txt",
        "source": [
          "@@ title = \"Read ribbons and obedience field\"",
          "@@ author = \"final / Papa Jefé / Blisy\"",
          "@@ exit = \"ROM_BX_lr_Box10_Grab\"",
          " ",
          "pid = 0x0",
          "tid = 0",
          "sid = 0",
          "out_atk = 0",
          "out_def = 0",
          "out_spa = 0",
          "out_spd = 0",
          " ",
          "pmod = pid % 24",
          "misc_substructure_position = \\",
          "    pmod == 18 | pmod == 19 | pmod == 20 | pmod == 21 | \\",
          "    pmod == 22 | pmod == 23 ? 0 : \\",
          "    pmod == 4  | pmod == 5  | pmod == 10 | pmod == 11 | \\",
          "    pmod == 16 | pmod == 17 ? 1 : \\",
          "    pmod == 1  | pmod == 3  | pmod == 7  | pmod == 9  | \\",
          "    pmod == 13 | pmod == 15 ? 2 : 3",
          "misc_offset = 0xC * misc_substructure_position",
          "target = 0x20 + misc_offset + 8",
          "otid = (tid << 0) | (sid << 16)",
          "encryption_key = pid ^ otid",
          "ribbons_obedience  = (out_atk <<  0) | (out_def <<  8) \\",
          "                   | (out_spa << 16) | (out_spd << 24)",
          "cur_ribbons   ?= (ribbons_obedience ^ encryption_key) & 0x7fffffff",
          "cur_obedience ?= (ribbons_obedience ^ encryption_key) >> 31",
          " ",
          "@@",
          " ",
          "MOVS    r12, #0x2f00000",
          "ADCS    r10, r12, #0xe3000",
          "ADCS    r10, r10, #0xff0",
          "ADCS    r11, r10, #0x294",
          "LDRB    r12, [r10], #{0x294 + target}",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xbe]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xc0]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xc4]",
          "LDRB    r12, [r10], r14, ASR #27",
          "STRH    r12, [r11, #0xc6]"
        ]
      },
      {
        "selections": [
          "English Switch",
          "French Switch",
          "German Switch",
          "Spanish Switch",
          "Italian Switch"
        ],
        "path": "pkmn/ReadRibbonsAndObedience_SWITCH.txt",
        "source": [
          "@@ title = \"Read ribbons and obedience field\"",
          "@@ author = \"final / Papa Jefé / Blisy\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "pid = 0x0",
          "tid = 0",
          "sid = 0",
          "out_atk = 0",
          "out_def = 0",
          "out_spa = 0",
          "out_spd = 0",
          "pmod = pid % 24",
          "misc_substructure_position = \\",
          "    pmod == 18 | pmod == 19 | pmod == 20 | pmod == 21 | pmod == 22 | pmod == 23 ? 0 : \\",
          "    pmod == 4 | pmod == 5 | pmod == 10 | pmod == 11 | pmod == 16 | pmod == 17 ? 1 : \\",
          "    pmod == 1 | pmod == 3 | pmod == 7 | pmod == 9 | pmod == 13 | pmod == 15 ? 2 : 3",
          "misc_offset = 0xC * misc_substructure_position",
          "target = 0x20 + misc_offset + 8",
          "otid = (tid << 0) | (sid << 16)",
          "encryption_key = pid ^ otid",
          "ribbons_obedience = (out_atk << 0) | (out_def << 8) | (out_spa << 16) | (out_spd << 24)",
          "cur_ribbons ?= (ribbons_obedience ^ encryption_key) & 0x7fffffff",
          "cur_obedience ?= (ribbons_obedience ^ encryption_key) >> 31",
          "@@",
          "MOVS r12, #0x2f00000",
          "ADCS r10, r12, #0xe3000",
          "ADCS r10, r10, #0xff0",
          "ADCS r11, r10, #0x290",
          "LDRB r12, [r10], #{0x290 + target}",
          "LDRB r12, [r10], r14, ASR #27",
          "STRH r12, [r11, #0xbe]",
          "LDRB r12, [r10], r14, ASR #27",
          "STRH r12, [r11, #0xc0]",
          "LDRB r12, [r10], r14, ASR #27",
          "STRH r12, [r11, #0xc4]",
          "LDRB r12, [r10], r14, ASR #27",
          "STRH r12, [r11, #0xc6]"
        ]
      }
    ]
  },
  {
    "number": 56,
    "title": "Change species",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "pkmn/ChangeSpecies.txt",
        "source": [
          "@@ title = \"Change species\"",
          "@@ author = \"E-Sh4rk\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "; THIS CODE NEEDS A BOX 14 EXIT CODE:",
          ";   https://pomeg-letterbombers.github.io/pokemon-ace-notes/frlg-box-14-exit/",
          " ",
          "inaccurate_emu = 0",
          "pid = 0",
          "tid = 0",
          "sid = 0",
          "cur_species = 0 @input:species",
          "new_species = 0 @input:species",
          " ",
          "pmod = pid % 24",
          "growth_substructure_position = \\",
          "    pmod == 0  | pmod == 1  | pmod == 2  | pmod == 3  | \\",
          "    pmod == 4  | pmod == 5 ? 0 : \\",
          "    pmod == 6  | pmod == 7  | pmod == 12 | pmod == 13 | \\",
          "    pmod == 18 | pmod == 19 ? 1 : \\",
          "    pmod == 8  | pmod == 10 | pmod == 14 | pmod == 16 | \\",
          "    pmod == 20 | pmod == 22 ? 2 : 3",
          "otid = tid + (sid << 16)",
          "key = pid ^ otid",
          "encoded_species = (new_species ^ key) & 0xFFFF",
          "offset = 32 + 12*growth_substructure_position",
          "checksum_diff = new_species - cur_species",
          " ",
          "@@",
          " ",
          "sbc r11, r15, #0x2940",
          "LDRH r12, [r11, {inaccurate_emu ? 0x15 : 0x13}]",
          "ADC r12, r12, {checksum_diff & 0xFFFF} ?",
          "STRH r12, [r11, {inaccurate_emu ? 0x15 : 0x13}]",
          "movs r12, {encoded_species} ?",
          "adc r11, r11, {offset-(inaccurate_emu?7:9)} ?",
          "strh r12, [r11, 0]!"
        ]
      }
    ]
  },
  {
    "number": 57,
    "title": "Change experience",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "pkmn/ChangeExp.txt",
        "source": [
          "@@ title = \"Change experience\"",
          "@@ author = \"leo60228\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "; THIS CODE NEEDS A BOX 14 EXIT CODE:",
          "; https://pomeg-letterbombers.github.io/pokemon-ace-notes/frlg-box-14-exit/",
          " ",
          "pid = 0",
          "tid = 0",
          "sid = 0",
          "cur_exp = 0",
          "new_exp = 0",
          "inaccurate_emu = 0",
          "pmod = pid % 24",
          "growth_substructure_position = \\",
          "    pmod == 0  | pmod == 1  | pmod == 2  | pmod == 3  | \\",
          "    pmod == 4  | pmod == 5 ? 0 : \\",
          "    pmod == 6  | pmod == 7  | pmod == 12 | pmod == 13 | \\",
          "    pmod == 18 | pmod == 19 ? 1 : \\",
          "    pmod == 8  | pmod == 10 | pmod == 14 | pmod == 16 | \\",
          "    pmod == 20 | pmod == 22 ? 2 : 3",
          "otid = tid + (sid << 16)",
          "key = pid ^ otid",
          "encoded_exp = new_exp ^ key",
          "offset = 32 + 12*growth_substructure_position + 4",
          "checksum_diff = ((new_exp & 0xFFFF) + (new_exp >> 16)) - ((cur_exp & 0xFFFF) + (cur_exp >> 16))",
          " ",
          "@@",
          "sbc r11, r15, #0x2940",
          "LDRH r12, [r11, {inaccurate_emu ? 0x15 : 0x13}]",
          "ADC r12, r12, {checksum_diff & 0xFFFF} ?",
          "STRH r12, [r11, {inaccurate_emu ? 0x15 : 0x13}]",
          "movs r12, {encoded_exp} ?",
          "adc r11, r11, {offset-(inaccurate_emu?7:9)} ?",
          "str r12, [r11, 0]!"
        ]
      }
    ]
  },
  {
    "number": 58,
    "title": "Change IVs and ability",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "pkmn/ChangeIvs.txt",
        "source": [
          "@@ title = \"Change IVs and ability\"",
          "@@ author = \"E-Sh4rk\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "inaccurate_emu = 0",
          "pid = 0",
          "tid = 0",
          "sid = 0",
          "new_hp = 31",
          "new_atk = 31",
          "new_def = 31",
          "new_speed = 31",
          "new_spe_atk = 31",
          "new_spe_def = 31",
          "new_ability = 0",
          "cur_encoded_ivea = 0",
          "cur_hp = 0",
          "cur_atk = 0",
          "cur_def = 0",
          "cur_speed = 0",
          "cur_spe_atk = 0",
          "cur_spe_def = 0",
          "cur_ability = 0",
          "cur_is_egg = 0",
          "otid = tid + (sid << 16)",
          "key = pid ^ otid",
          "cur_ivea_computed = (cur_ability << 31) | (cur_is_egg << 30) | cur_hp | (cur_atk << 5) | (cur_def << 10) | \\",
          "           (cur_speed << 15) | (cur_spe_atk << 20) | (cur_spe_def << 25)",
          "cur_ivea = cur_encoded_ivea == 0 ? cur_ivea_computed : cur_encoded_ivea ^ key",
          "new_is_egg = (cur_ivea >> 30) & 1",
          "new_ivea = (new_ability << 31) | (new_is_egg << 30) | new_hp | (new_atk << 5) | (new_def << 10) | \\",
          "           (new_speed << 15) | (new_spe_atk << 20) | (new_spe_def << 25)",
          "new_encoded_ivea = new_ivea ^ key",
          "pmod = pid % 24",
          "misc_substructure_position = \\",
          "    pmod == 18 | pmod == 19 | pmod == 20 | pmod == 21 | \\",
          "    pmod == 22 | pmod == 23 ? 0 : \\",
          "    pmod == 4  | pmod == 5  | pmod == 10 | pmod == 11 | \\",
          "    pmod == 16 | pmod == 17 ? 1 : \\",
          "    pmod == 1  | pmod == 3  | pmod == 7  | pmod == 9  | \\",
          "    pmod == 13 | pmod == 15 ? 2 : 3",
          "offset = 32 + 12*misc_substructure_position + 4",
          "checksum_diff = ((new_ivea & 0xFFFF) + (new_ivea >> 16)) - ((cur_ivea & 0xFFFF) + (cur_ivea >> 16))",
          " ",
          "@@",
          "sbc r11, r15, #0x2940",
          "LDRH r12, [r11, {inaccurate_emu ? 0x15 : 0x13}]",
          "ADC r12, r12, {checksum_diff & 0xFFFF} ?",
          "STRH r12, [r11, {inaccurate_emu ? 0x15 : 0x13}]",
          "movs r12, {new_encoded_ivea} ?",
          "adc r11, r11, {offset-7} ?",
          "str r12, [r11, 0]!"
        ]
      }
    ]
  },
  {
    "number": 59,
    "title": "Change EVs",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "pkmn/ChangeEvs.txt",
        "source": [
          "@@ title = \"Change EVs\"",
          "@@ author = \"E-Sh4rk\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "; THIS CODE NEEDS A BOX 14 EXIT CODE:",
          ";   https://pomeg-letterbombers.github.io/pokemon-ace-notes/frlg-box-14-exit/",
          " ",
          "; This code changes the EVs of the pokemon in Box 10 Slot 19.",
          "; Stat changes due to the EV change will be applied immediately, as opposed to requiring a level up.",
          "; the current stat parameters below represent the current EVs the pokemon has in the corresponding stat, NOT the value of the stat itself.",
          "inaccurate_emu = 0",
          "pid = 0",
          "tid = 0",
          "sid = 0",
          "new_hp = 0",
          "new_atk = 0",
          "new_def = 0",
          "new_speed = 0",
          "new_spe_atk = 0",
          "new_spe_def = 0",
          "cur_encoded_evs1 = 0",
          "cur_encoded_evs2 = 0",
          "cur_encoded_evs3 = 0",
          "cur_hp = 0",
          "cur_atk = 0",
          "cur_def = 0",
          "cur_speed = 0",
          "cur_spe_atk = 0",
          "cur_spe_def = 0",
          "otid = tid + (sid << 16)",
          "key = pid ^ otid",
          "cur_evs1_computed = cur_hp | (cur_atk << 8)",
          "cur_evs2_computed = cur_def| (cur_speed << 8)",
          "cur_evs3_computed = cur_spe_atk | (cur_spe_def << 8)",
          "cur_evs1 = cur_encoded_evs1 == 0 ? cur_evs1_computed : cur_encoded_evs1 ^ (key & 0xFFFF)",
          "cur_evs2 = cur_encoded_evs2 == 0 ? cur_evs2_computed : cur_encoded_evs2 ^ (key >> 16)",
          "cur_evs3 = cur_encoded_evs3 == 0 ? cur_evs3_computed : cur_encoded_evs3 ^ (key & 0xFFFF)",
          "new_evs1 = new_hp | (new_atk << 8)",
          "new_evs2 = new_def| (new_speed << 8)",
          "new_evs3 = new_spe_atk | (new_spe_def << 8)",
          "new_encoded_evs1 = new_evs1 ^ (key & 0xFFFF)",
          "new_encoded_evs2 = new_evs2 ^ (key >> 16)",
          "new_encoded_evs3 = new_evs3 ^ (key & 0xFFFF)",
          "pmod = pid % 24",
          "ev_substructure_position = \\",
          "    pmod == 12 | pmod == 13 | pmod == 14 | pmod == 15 | \\",
          "    pmod == 16 | pmod == 17 ? 0 : \\",
          "    pmod == 2  | pmod == 3  | pmod == 8  | pmod == 9  | \\",
          "    pmod == 22 | pmod == 23 ? 1 : \\",
          "    pmod == 0  | pmod == 5  | pmod == 6  | pmod == 11 | \\",
          "    pmod == 19 | pmod == 21 ? 2 : 3",
          "base_offset = inaccurate_emu ? -7 : -9",
          "offset = base_offset + 32 + 12*ev_substructure_position",
          "checksum_diff = (new_evs1 + new_evs2 + new_evs3) - (cur_evs1 + cur_evs2 + cur_evs3)",
          " ",
          "@@",
          "sbc r11, r15, #0x2940",
          "LDRH r12, [r11, {base_offset + 28}]",
          "ADC r12, r12, {checksum_diff & 0xFFFF} ?",
          "STRH r12, [r11, {base_offset + 28}]",
          "movs r12, {new_encoded_evs1 + (new_encoded_evs2 << 16)} ?",
          "adc r11, r11, {offset} ?",
          "str r12, [r11, 0]!",
          "movs r12, {new_encoded_evs3} ?",
          "strh r12, [r11, 4]"
        ]
      }
    ]
  },
  {
    "number": 60,
    "title": "Change contest stats",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "pkmn/ChangeCSs.txt",
        "source": [
          "@@ title = \"Change contest stats\"",
          "@@ author = \"E-Sh4rk\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "; THIS CODE NEEDS A BOX 14 EXIT CODE:",
          ";   https://pomeg-letterbombers.github.io/pokemon-ace-notes/frlg-box-14-exit/",
          " ",
          "; The Pokemon must be located in Box 10 Slot 19.",
          " ",
          "inaccurate_emu = 0 ; Set to 1 if you are using an emulator < mgba 0.9",
          "pid = 0",
          "tid = 0            ; TID of the original trainer",
          "sid = 0            ; SID of the original trainer",
          "new_coolness = 255",
          "new_beauty = 255",
          "new_cuteness = 255",
          "new_smartness = 255",
          "new_toughness = 255",
          "new_feel = 255",
          "; You must set either the variables cur_encoded_evsX (use the code \"Read contest stats field\" to determine their values)...",
          "cur_encoded_1 = 0",
          "cur_encoded_2 = 0",
          "cur_encoded_3 = 0",
          "; ... OR the variables cur_coolness,cur_beauty,cur_cuteness,cur_smartness,cur_toughness,cur_feel",
          "cur_coolness = 0",
          "cur_beauty = 0",
          "cur_cuteness = 0",
          "cur_smartness = 0",
          "cur_toughness = 0",
          "cur_feel = 0",
          " ",
          "; DO NOT MODIFY THE PARAMETERS BELOW",
          "otid = tid + (sid << 16)",
          "key = pid ^ otid",
          " ",
          "cur_1_computed = cur_coolness | (cur_beauty << 8)",
          "cur_2_computed = cur_cuteness| (cur_smartness << 8)",
          "cur_3_computed = cur_toughness | (cur_feel << 8)",
          " ",
          "cur_1 = cur_encoded_1 == 0 ? cur_1_computed : cur_encoded_1 ^ (key >> 16)",
          "cur_2 = cur_encoded_2 == 0 ? cur_2_computed : cur_encoded_2 ^ (key & 0xFFFF)",
          "cur_3 = cur_encoded_3 == 0 ? cur_3_computed : cur_encoded_3 ^ (key >> 16)",
          " ",
          "new_1 = new_coolness | (new_beauty << 8)",
          "new_2 = new_cuteness| (new_smartness << 8)",
          "new_3 = new_toughness | (new_feel << 8)",
          "new_encoded_1 = new_1 ^ (key >> 16)",
          "new_encoded_2 = new_2 ^ (key & 0xFFFF)",
          "new_encoded_3 = new_3 ^ (key >> 16)",
          " ",
          "pmod = pid % 24",
          "ev_substructure_position = \\",
          "    pmod == 12 | pmod == 13 | pmod == 14 | pmod == 15 | \\",
          "    pmod == 16 | pmod == 17 ? 0 : \\",
          "    pmod == 2  | pmod == 3  | pmod == 8  | pmod == 9  | \\",
          "    pmod == 22 | pmod == 23 ? 1 : \\",
          "    pmod == 0  | pmod == 5  | pmod == 6  | pmod == 11 | \\",
          "    pmod == 19 | pmod == 21 ? 2 : 3",
          "base_offset = inaccurate_emu ? -7 : -9",
          "offset = base_offset + 32 + 12*ev_substructure_position + 6",
          "checksum_diff = (new_1 + new_2 + new_3) - (cur_1 + cur_2 + cur_3)",
          " ",
          "@@",
          " ",
          "sbc r11, r15, #0x2940          ; r11 = &Box10Slot19 + 9",
          " ",
          "LDRH r12, [r11, {base_offset + 28}]       ; Load checksum",
          "ADC r12, r12, {checksum_diff & 0xFFFF} ?",
          "STRH r12, [r11, {base_offset + 28}]       ; Write checksum",
          " ",
          "movs r12, {new_encoded_1} ?",
          "adc r11, r11, {offset} ?",
          "strh r12, [r11], 2",
          " ",
          "movs r12, {new_encoded_2 + (new_encoded_3 << 16)} ?",
          "str r12, [r11, 0]!"
        ]
      }
    ]
  },
  {
    "number": 61,
    "title": "Change Pokerus and Origin Data",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "pkmn/ChangePokerusOrigin.txt",
        "source": [
          "@@ title = \"Change Pokerus and Origin Data\"",
          "@@ author = \"Shao\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "; THIS CODE NEEDS A BOX 14 EXIT CODE:",
          ";   https://pomeg-letterbombers.github.io/pokemon-ace-notes/frlg-box-14-exit/",
          " ",
          "; The Pokemon to modify the data of must be located in Box 10 Slot 19.",
          " ",
          "inaccurate_emu =    0",
          "pid =               0",
          "tid =               0",
          "sid =               0",
          " ",
          "cur_loc =           0x0F",
          "new_loc =           0xFF",
          " ",
          "cur_met_lvl =         31",
          "new_met_lvl =        127",
          " ",
          "cur_origin_game =      3",
          "new_origin_game =     15",
          " ",
          "cur_ball =             1",
          "new_ball =             4",
          " ",
          "cur_ot_gender =        0",
          "new_ot_gender =        1",
          " ",
          "cur_encoded_pkrs = 0x100",
          "cur_pkrs =          0x00",
          "new_pkrs =          0x00",
          " ",
          "otid = tid + (sid << 16)",
          "key = pid ^ otid",
          "cur_pkrs = cur_encoded_pkrs == 0x100 ? cur_pkrs : cur_encoded_pkrs ^ (key & 255)",
          "new_field = new_pkrs | (new_loc << 8) | ((new_met_lvl & 127) << 16) |\\",
          "            ((new_origin_game & 15) << 23) | ((new_ball & 15) << 27) |\\",
          "            ((new_ot_gender & 1) << 31)",
          "cur_field = cur_pkrs | (cur_loc << 8) | ((cur_met_lvl & 127) << 16) |\\",
          "            ((cur_origin_game & 15) << 23) | ((cur_ball & 15) << 27) |\\",
          "            ((cur_ot_gender & 1) << 31)",
          "new_encoded_field = new_field ^ key",
          " ",
          "pmod = pid % 24",
          "misc_substructure_position = \\",
          "    pmod == 18 | pmod == 19 | pmod == 20 | pmod == 21 | \\",
          "    pmod == 22 | pmod == 23 ? 0 : \\",
          "    pmod == 4  | pmod == 5  | pmod == 10 | pmod == 11 | \\",
          "    pmod == 16 | pmod == 17 ? 1 : \\",
          "    pmod == 1  | pmod == 3  | pmod == 7  | pmod == 9  | \\",
          "    pmod == 13 | pmod == 15 ? 2 : 3",
          "offset = 32 + 12*misc_substructure_position",
          " ",
          "checksum_diff = ((new_field & 0xFFFF) + (new_field >> 16)) - ((cur_field & 0xFFFF) + (cur_field >> 16))",
          " ",
          "@@",
          " ",
          "sbc r11, r15, #0x2940",
          "LDRH r12, [r11, {inaccurate_emu ? 0x15 : 0x13}]",
          "ADC r12, r12, {checksum_diff & 0xFFFF} ?",
          "STRH r12, [r11, {inaccurate_emu ? 0x15 : 0x13}]",
          "movs r12, {new_encoded_field} ?",
          "adc r11, r11, {offset-7} ?",
          "str r12, [r11, 0]!"
        ]
      }
    ]
  },
  {
    "number": 62,
    "title": "Change ribbons and obedience",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "pkmn/ChangeRibbonsObedience.txt",
        "source": [
          "@@ title = \"Change ribbons and obedience\"",
          "@@ author = \"E-Sh4rk\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "; THIS CODE NEEDS A BOX 14 EXIT CODE:",
          ";   https://pomeg-letterbombers.github.io/pokemon-ace-notes/frlg-box-14-exit/",
          " ",
          "; The Pokemon must be located in Box 10 Slot 19.",
          " ",
          "inaccurate_emu = 0",
          "pid = 0",
          "tid = 0",
          "sid = 0",
          "new_ribbons = 0xFC924",
          "new_obedience = 0",
          "cur_ribbons = 0",
          "cur_obedience = 0",
          " ",
          "otid = tid + (sid << 16)",
          "key = pid ^ otid",
          "cur_field = (cur_obedience << 31) | (cur_ribbons & 0x7FFFFFFF)",
          "new_field = (new_obedience << 31) | (new_ribbons & 0x7FFFFFFF)",
          "new_encoded_field = new_field ^ key",
          " ",
          "pmod = pid % 24",
          "misc_substructure_position = \\",
          "    pmod == 18 | pmod == 19 | pmod == 20 | pmod == 21 | \\",
          "    pmod == 22 | pmod == 23 ? 0 : \\",
          "    pmod == 4  | pmod == 5  | pmod == 10 | pmod == 11 | \\",
          "    pmod == 16 | pmod == 17 ? 1 : \\",
          "    pmod == 1  | pmod == 3  | pmod == 7  | pmod == 9  | \\",
          "    pmod == 13 | pmod == 15 ? 2 : 3",
          "offset = 32 + 12*misc_substructure_position + 8",
          " ",
          "checksum_diff = ((new_field & 0xFFFF) + (new_field >> 16)) - ((cur_field & 0xFFFF) + (cur_field >> 16))",
          " ",
          "@@",
          " ",
          "sbc r11, r15, #0x2940",
          "LDRH r12, [r11, {inaccurate_emu ? 0x15 : 0x13}]",
          "ADC r12, r12, {checksum_diff & 0xFFFF} ?",
          "STRH r12, [r11, {inaccurate_emu ? 0x15 : 0x13}]",
          "movs r12, {new_encoded_field} ?",
          "adc r11, r11, {offset-7} ?",
          "str r12, [r11, 0]!"
        ]
      }
    ]
  },
  {
    "number": 63,
    "title": "Generate egg with any PID",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "pkmn/PIDEggFromNothing.txt",
        "source": [
          "@@ title = \"Generate egg with any PID\"",
          "@@ author = \"final\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "inaccurate_emu = 0",
          "species = 0 @input:species",
          "pid = 0x0",
          "pmod = pid % 24",
          "growth_substructure_position = \\",
          "    pmod == 0 | pmod == 1 | pmod == 2 | pmod == 3 | pmod == 4 | pmod == 5 ? 0 : \\",
          "    pmod == 6 | pmod == 7 | pmod == 12 | pmod == 13 | pmod == 18 | pmod == 19 ? 1 : \\",
          "    pmod == 8 | pmod == 10 | pmod == 14 | pmod == 16 | pmod == 20 | pmod == 22 ? 2 : 3",
          "misc_substructure_position = \\",
          "    pmod == 18 | pmod == 19 | pmod == 20 | pmod == 21 | pmod == 22 | pmod == 23 ? 0 : \\",
          "    pmod == 4 | pmod == 5 | pmod == 10 | pmod == 11 | pmod == 16 | pmod == 17 ? 1 : \\",
          "    pmod == 1 | pmod == 3 | pmod == 7 | pmod == 9 | pmod == 13 | pmod == 15 ? 2 : 3",
          "growth_offset = 0x1C + (12 * growth_substructure_position)",
          "misc_offset = 0x1C + (12 * misc_substructure_position)",
          "@@",
          "SBC r11, pc, #0x2F40",
          "MOV r12, { pid } ?",
          "STR r12, [r11, #{!!inaccurate_emu ? 0xA9 : 0xA7}]!",
          "STR r12, [r11, lr, ASR #25]!",
          "MOVS r12, { species } ?",
          "STRH r12, [r11, { growth_offset }]",
          "ADC r12, #0xC4000",
          "STRH r12, [r11, #0x18]",
          "MOVS r12, #0xC4000",
          "STRH r12, [r11, { misc_offset + 6 }]"
        ]
      }
    ]
  },
  {
    "number": 64,
    "title": "Change Flag",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/ChangeFlag.txt",
        "source": [
          "@@ title = \"Change Flag\"",
          "@@ author = \"Adrichu00 | Final\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; WARNING: This code modifies r0",
          " ",
          "; Full list of flags: https://github.com/pret/pokefirered/blob/master/include/constants/flags.h",
          "flag  = 0x000",
          "value = 0          ; 0 for clear, 1 for set",
          "inaccurate_emu = 0 ; Set to 1 if you are using an emulator < mgba 0.9",
          "; Multiple Flags",
          ";   This halfword (2 bytes) will be bitwise ORed with the flag_mask, changing",
          ";   also those flags. Keep in mind that this value has to be 2-byte-aligned in",
          ";   memory. Only flags within the same halfword as the target flag can be",
          ";   modified. Your flag above doesn't need to be added (1 << (flag & 0x0F)).",
          ";   Setting this parameter to 0 just changes the target flag",
          " ",
          "multi_flag = 0x0000",
          "; For example:",
          ";   In order to clear FLAG_FOUGHT_MEWTWO, FLAG_FOUGHT_MOLTRES,",
          ";   FLAG_FOUGHT_ARTICUNO and FLAG_FOUGHT_ZAPDOS (flags 0x2BC to 0x2BF), you can",
          ";   set the parameters to:",
          ";     flag = 0x2BC",
          ";     value = 0",
          ";     multi_flag = 0xE000 ; or 0xF000",
          " ",
          "; Do not modify these:",
          "flag_offset = (inaccurate_emu? 0xB254: 0xB256) - ((flag >> 3) & ~0x01)",
          "flag_mask   = (0x0001 << (flag & 0x0F)) | (multi_flag & 0xFFFF)",
          " ",
          "@@",
          "; r11 = &gSaveBlock1Ptr->flags[(flag >> 3) & ~0x01]",
          "SUB  r11, pc, {flag_offset} ?",
          "MOV  r12, {flag_mask} ?",
          "BIC  r0, r12, 0x00",
          "LDRH r12, [r11]                 ; Load Current Value",
          "BIC  r12, r12, r0",
          "{value? 0xE0ACC000: 0x00000000} ; ADC r12, r12, r0",
          "STRH r12, [r11]                 ; Store Updated Value"
        ]
      }
    ]
  },
  {
    "number": 65,
    "title": "Change Variable",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/ChangeVar.txt",
        "source": [
          "@@ title = \"Change Variable\"",
          "@@ author = \"Adrichu00\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; Full list of vars: https://github.com/pret/pokefirered/blob/master/include/constants/vars.h",
          "; This code won't work with special variables (0x80XX)",
          "; It will work just with normal variables (0x40XX)",
          "var   = 0x00       ; You can use just the lower byte of the var id",
          "value = 0x0000     ; From 0x0000 to 0xFFFF",
          "inaccurate_emu = 0 ; Set to 1 if you are using an emulator < mgba 0.9",
          "; Do not modify this",
          "var_offset = (inaccurate_emu? 0xB134: 0xB136) - ((var & 0xFF) << 1)",
          " ",
          "@@",
          " ",
          "SUB r11, pc, {var_offset} ? ; r11 = &gSaveBlock1Ptr->vars[var]",
          "MOV r12, {value} ?          ; r12 = value",
          "STRH r12, [r11]             ; gSaveBlock1Ptr->vars[var] = value"
        ]
      }
    ]
  },
  {
    "number": 66,
    "title": "Change Weather",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/ChangeWeather.txt",
        "source": [
          "@@ title = \"Change Weather\"",
          "@@ author = \"Sleipnir17 (ported by Adrichu00)\"",
          "@@ exit = \"GrabACEExit\"",
          " ",
          "; Notes: after executing this code the weather of the map you're on will change",
          "; into the one you chose (it depends on box 2 name). You can use the code",
          "; anywhere, including indoors and underwater. The effect of this code will last",
          "; until you change map. Unused weathers are available.",
          "; You can check the list of possible weathers at:",
          "; https://github.com/pret/pokefirered/blob/4f5fe2a27941770cb1d7c33fcc1fd4c9495838af/include/constants/weather.h#L4",
          "weather = 0x00",
          " ",
          "inaccurate_emu = 0 ; Set to 1 if you are using an emulator < mgba 0.9",
          " ",
          "@@",
          " ",
          "SBC r11, r15, 0xC100",
          "SBC r11, r11, 0xC6",
          "MOV r12, {weather & 0xFF} ?",
          "STRB r12, [r11, {inaccurate_emu? 0xC2: 0xC0}]"
        ]
      }
    ]
  },
  {
    "number": 67,
    "title": "Change Pokémon data (grab ACE)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "Japanese 1.0",
          "Japanese 1.1"
        ],
        "path": "pkmn/ChangePokemonData_JPN.txt",
        "source": [
          "@@ title = \"Change Pokémon data (JPN, Thumb)\"",
          "@@ author = \"final / Adrichu00 / Mettrich / Shao / Papa Jefé\"",
          "@@ exit = null",
          " ",
          "// This ACE code is written in Thumb.",
          "// It must be executed with a Thumb ACE species (like 0xFFC9).",
          " ",
          "partySlot = 1  // partySlot starts at 1",
          "field     = 11",
          "dataArg   = 1  // new value of field",
          " ",
          "// Do not touch the below parameters.",
          " ",
          "dataArg0 = (dataArg >>  0) & 0xff",
          "dataArg1 = (dataArg >>  8) & 0xff",
          "dataArg2 = (dataArg >> 16) & 0xff",
          "dataArg3 = (dataArg >> 24) & 0xff",
          " ",
          "dataArgBase0   = dataArg0 > 0xb6 && dataArg0 <= 0xb9 ? 0xb6 \\",
          "    : dataArg0 > 0xee && dataArg0 <= 0xff ? 0xee \\",
          "    : dataArg0",
          "dataArgOffset0 = dataArg0 > 0xb6 && dataArg0 <= 0xb9 ? dataArg0 - 0xb6 \\",
          "    : dataArg0 > 0xee && dataArg0 <= 0xff ? dataArg0 - 0xee \\",
          "    : 0",
          "dataArgBase1   = dataArg1 > 0xb6 && dataArg1 <= 0xb9 ? 0xb6 \\",
          "    : dataArg1 > 0xee && dataArg1 <= 0xff ? 0xee \\",
          "    : dataArg1",
          "dataArgOffset1 = dataArg1 > 0xb6 && dataArg1 <= 0xb9 ? dataArg1 - 0xb6 \\",
          "    : dataArg1 > 0xee && dataArg1 <= 0xff ? dataArg1 - 0xee \\",
          "    : 0",
          "dataArgBase2   = dataArg2 > 0xb6 && dataArg2 <= 0xb9 ? 0xb6 \\",
          "    : dataArg2 > 0xee && dataArg2 <= 0xff ? 0xee \\",
          "    : dataArg2",
          "dataArgOffset2 = dataArg2 > 0xb6 && dataArg2 <= 0xb9 ? dataArg2 - 0xb6 \\",
          "    : dataArg2 > 0xee && dataArg0 <= 0xff ? dataArg2 - 0xee \\",
          "    : 0",
          "dataArgBase3   = dataArg3 > 0xb6 && dataArg3 <= 0xb9 ? 0xb6 \\",
          "    : dataArg3 > 0xee && dataArg3 <= 0xff ? 0xee \\",
          "    : dataArg3",
          "dataArgOffset3 = dataArg3 > 0xb6 && dataArg3 <= 0xb9 ? dataArg3 - 0xb6 \\",
          "    : dataArg3 > 0xee && dataArg3 <= 0xff ? dataArg3 - 0xee \\",
          "    : 0",
          " ",
          "dataArgBase   = dataArg == 0 ?  1 \\",
          "    : (dataArgBase3 << 24) | (dataArgBase2 << 16) \\",
          "    | (dataArgBase1 <<  8) | (dataArgBase0 <<  0)",
          "dataArgOffset = dataArg == 0 ? -1 \\",
          "    : (dataArgOffset3 << 24) | (dataArgOffset2 << 16) \\",
          "    | (dataArgOffset1 <<  8) | (dataArgOffset0 <<  0)",
          " ",
          "fieldWord      = (field + 1 & 0xff) | 0xffffff00",
          "targetAddress  = 0x020241e4 + (partySlot - 1) * 100 - 0x10",
          " ",
          "SetMonDataAddrJAP0 = 0x0803fa71",
          "SetMonDataAddrJAP1 = 0x0803f9dd",
          "SetMonDataAddr     = SetMonDataAddr{LANG} - 0x1000",
          " ",
          "@@",
          " ",
          "0xA00FB540",
          "0x3010C80F",
          "0x189B31FF",
          "0xE000A21F",
          "0x6013FFFF",
          "0x3603A605",
          "0xD0FF46B6",
          "0x26804B06",
          "0xFFFFE000",
          "0x199B0176",
          "0xFFFF4718",
          "0x200051FF",
          "0xFFFFBD40",
          "0x5151FFFF",
          "{ SetMonDataAddr }",
          "0x51FFFFFF",
          "{ targetAddress }",
          "{ fieldWord }",
          "{ dataArgBase }",
          "{ dataArgOffset }"
        ]
      }
    ]
  },
  {
    "number": 68,
    "title": "Run script via GlobalScriptContext",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.0",
          "English 1.1",
          "French",
          "Italian",
          "German",
          "Spanish"
        ],
        "path": "misc/RunScriptViaGlobalScriptContext.txt",
        "source": [
          "@@ title = \"Run script via GlobalScriptContext\"",
          "@@ author = \"final and Mettrich\"",
          "@@ exit = \"ROM_BX_lr_Box10_Grab\"",
          "@@ filler4 = 0xffffffff",
          " ",
          "// This code inserts a custom script pointer into the global script",
          "// context (and also sets some other stuff) that will run as soon as",
          "// you return to the overworld.",
          "// Script addresses from \"Run script via NPC\" should work here.",
          "// Trigger ACE, then return to the overworld. The script should run immediately.",
          " ",
          "script_address = 0x0",
          " ",
          "@@",
          "; `ctx` refers to sGlobalScriptContext",
          "MOV     r10, #0x3000000",
          "MOV     r11, #0xbd00",
          "BIC     r11, r11, #0x3fc00",
          "STRB    r11, [r10, #0xea8]!",
          "STRH    r11, [r10, #8]!",
          "MOV     r12, #{script_address} ?",
          "STR     r12, [r10, r11, ASR #5]!"
        ]
      }
    ]
  },
  {
    "number": 69,
    "title": "Teleport anywhere (Bootstrapped)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.0",
          "English 1.1",
          "French",
          "Italian",
          "German",
          "Spanish"
        ],
        "path": "misc/Warp.txt",
        "source": [
          "@@ title = \"Teleport anywhere\"",
          "@@ author = \"final, Theocatic and Mettrich\"",
          "@@ exit = \"Bootstrapped\"",
          "@@ filler4 = 0xffffffff",
          "// This code requires a Box 14 exit code for grab ACE.",
          "// The teleportation will occur as soon as you log off Bill’s PC.",
          "// The map list can be found here: https://pastebin.com/peDhNbEt",
          " ",
          "map_id = 0x0003",
          "warp = 0",
          "x = 0",
          "y = 0",
          "script0 = ((warp & 0xff) << 24) | ((map_id & 0xffff) << 8) | 0x39",
          "script1 = ((y & 0xffff) << 16) | (x & 0xffff)",
          "@@",
          "MOV r12, #0x3000000",
          "ADC r11, r4, #0x300",
          "STR r11, [r12, #0xeb8]!",
          "MOV r12, #{script0} ?5",
          "STR r12, [r11, #0]!",
          "MOV r12, #{script1} ?5",
          "STR r12, [r11, r14, ASR #25]!",
          "MOV r12, #0xfc000002",
          "STRB r12, [r11, r14, ASR #25]"
        ]
      },
      {
        "selections": [
          "English Switch",
          "French Switch",
          "Italian Switch",
          "German Switch",
          "Spanish Switch"
        ],
        "path": "misc/Warp_SWITCH.txt",
        "source": [
          "@@ title = \"Teleport anywhere\"",
          "@@ author = \"final, Theocatic and Mettrich\"",
          "@@ exit = \"Bootstrapped\"",
          "@@ filler4 = 0xffffffff",
          " ",
          "// This code requires a Box 14 exit code for grab ACE.",
          "// The teleportation will occur as soon as you log off Bill’s PC.",
          "// The map list can be found here: https://pastebin.com/peDhNbEt",
          " ",
          "map_id = 0x0003",
          "warp = 0",
          "x = 0",
          "y = 0",
          "script0 = ((warp & 0xff) << 24) | ((map_id & 0xffff) << 8) | 0x39",
          "script1 = ((y & 0xffff) << 16) | (x & 0xffff)",
          " ",
          "@@",
          "MOV     r12, #0x3000000",
          "ADC     r11, r4, #0x300",
          "STR     r11, [r12, #0xfb8]!",
          "MOV     r12, #{script0} ?5",
          "STR     r12, [r11, #0]!",
          "MOV     r12, #{script1} ?5",
          "STR     r12, [r11, r14, ASR #25]!",
          "MOV     r12, #0xfc000002",
          "STRB    r12, [r11, r14, ASR #25]"
        ]
      }
    ]
  },
  {
    "number": 70,
    "title": "Change Pokémon PID or TID (Bootstrapped)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.0",
          "English 1.1"
        ],
        "path": "pkmn/ChangePIDTID_ENG.txt",
        "source": [
          "@@ title = \"Change Pokémon PID or TID\"",
          "@@ author = \"Mettrich and final\"",
          "@@ exit = \"Bootstrapped\"",
          "@@ filler0 = 0xbbbbbbbb",
          "@@ filler1 = 0xbbbbbbff",
          "@@ filler2 = 0xbbbbffff",
          "@@ filler3 = 0xbbffffff",
          "@@ filler4 = 0xffffffff",
          " ",
          "option = 1",
          "aligned_pc = 0",
          "pid = 0",
          "tid = 0",
          "sid = 0",
          "otid = ((sid & 0xffff) << 16) | (tid & 0xffff)",
          "ENG0 = 0",
          "ENG1 = 1",
          "rev = {LANG}",
          "@@",
          "SBC r10, pc, #0x2f40",
          "ADC r0, r10, #{0xa9 - (!aligned_pc << 1)}",
          "MOV r12, #{option ? otid : pid} ? 5",
          "MOV r11, #0x3fc00",
          "STR r12, [r10, #{0xa9 - (!aligned_pc << 1) + (!!option << 2)}]!",
          "ADCS r12, r11, #0x8000003",
          "SBC r12, #{rev > 0 ? 0x2e8 : 0x2fc}",
          "SBC r12, #0xc",
          "0xffffffff",
          "MOV r11, #0x3fc",
          "ADCGTS lr, pc, sp, LSR #29",
          "BICS pc, r11, #0x290",
          "0xffffffff",
          "0xbbffffff",
          "0xffffffff",
          "0xffffffff",
          "LDR lr, [sp, r0, ASR #29]!",
          "ADCS sp, sp, #3"
        ]
      }
    ]
  },
  {
    "number": 71,
    "title": "Get National Dex via NPC",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/NationalDexViaNPC.txt",
        "source": [
          "@@ title = \"Get National Dex via NPC\"",
          "@@ author = \"Adrichu00 / Papa Jefe / Theocatic / final\"",
          "@@ exit = \"ROM_BX_lr_Box10_Grab\"",
          " ",
          "// WARNING: After using this code, the second round of the E4 will be activated.",
          "// If you want to fight in the first round, you have to disable the national dex",
          "// and trades with Hoenn games. In order to do so, run \"Change Flag\" code with",
          "// flag = 0x840, value = 0, multi_flag = 0x0011.",
          "// Run this code in Viridian Pokemon Center.",
          "// Perform the GrabACE Swap, then exit the PC.",
          "// Speak to the Old Man below the PC, you should hear a single beep sound, and no text appears.",
          "// Check Pokedex. National Dex should now be enabled, and Johto evolutions should work.",
          "// This code also enables trading with Hoenn games.",
          " ",
          "NPC = 2 // sets which NPC on the map to run though. NPC 1, 2 and 3 are usable.",
          "NPCOffset = 0x1A5 + (NPC * 0x18)",
          " ",
          "@@",
          " ",
          "SBC r10, pc, #0x0000BA00",
          "ADC r11, r4, #0x00000300",
          "STR r11, [r10, {NPCOffset}]!",
          "MOV r12, #0x29400000",
          "SBC r12, r12, #0x003B8000",
          "SBC r12, r12, #0x00031000",
          "SBC r12, r12, #0x000000D8",
          "STR r12, [r11]!",
          "ADC r12, r12, #0x0000A600",
          "SBC r12, r12, #0x00000CE0",
          "STR r12, [r11, lr, ASR #0x19]!"
        ]
      }
    ]
  },
  {
    "number": 72,
    "title": "Fateful Mew Battle at Daycare (Bootstrapped)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "pkmn/FatefulMew_Universal.txt",
        "source": [
          "@@ title = \"Fateful Mew Battle at Daycare (Bootstrapped)\"",
          "@@ author = \"Adrichu00 and PapaJefe\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "@@",
          " ",
          "SBC r10, pc, #0xBA00",
          "0xE3E2C2C7",
          "ADC  r11, r4, #0x03FC",
          "STR  r11, [r10, #0x1BD]!",
          "ADC  r12, r12, #0x04000003",
          "0xE3FFA6E5",
          "ADC  r12, r12, #0x03800000",
          "ADC  r12, r12, #0x0000037C",
          "ADC  r12, r12, #0x000000A4",
          "BIC r10, r10, #0xFC000003",
          "STR  r12, [r11]!",
          "0xC0C0FFFF",
          "ADCS r12, r10, #0x000A8000",
          "ADC  r12, r12, #0x0000A200",
          "ADC  r12, r12, #0x00000304",
          "STR  r12, [r11, lr, ASR #0x19]!",
          "ADC  r12, r12, #0x000FF000",
          "ADC r12, r12, #0x00370000",
          "SBC r12, r12, #0x0000DC00",
          "SBC r12, r12, #0x000000D9",
          "STR  r12, [r11, lr, ASR #0x19]!"
        ]
      }
    ]
  },
  {
    "number": 73,
    "title": "Make any Pokémon Shiny",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "French",
          "German",
          "Spanish",
          "Italian"
        ],
        "path": "pkmn/MakeMonShiny.txt",
        "source": [
          "@@ title = \"Make any Pokémon shiny\"",
          "@@ author = \"Mettrich, final, Adrichu00 and PapaJefe\"",
          "@@ exit = null",
          "@@ fill = false",
          "@@ filler1 = 0xBBBBBBFF",
          "@@ filler2 = 0xBBBBFFFF",
          "@@ filler3 = 0xBBFFFFFF",
          "@@ filler4 = 0xFFFFFFFF",
          " ",
          "inaccurate_emu = 0",
          "offset_eng0 = 0x0305",
          "offset_eng1 = 0x02F1",
          "offset_fra  = 0x042D",
          "offset_ita  = 0x0419",
          "offset_ger  = 0x0405",
          "offset_spa  = 0x0419",
          "offset = offset_{lang}",
          "@@",
          "SBCS r10, pc, 0x2F40",
          "ADC  r0, r10, {0xA8 - (!inaccurate_emu << 1)}",
          "MOV  r12, 0x03FC00",
          "SBCS r12, r12, 0xF8000002",
          "SUB  r12, r12, {offset} ?",
          "MOV  r11, 0x03FC",
          "0xE2BFE100",
          "BIC  pc, r11, 0x0290",
          "LDR  lr, [sp, lr, ASR 0x1D]!",
          "ADCS sp, sp, 0x03",
          "LDR  r11, [r10, {0xA9 - (!inaccurate_emu << 1)}]!",
          "BIC  r0, r0, 0xFF",
          "STR  r11, [r10, lr, ASR 0x19]!",
          "MOV  pc, 0x0354"
        ]
      },
      {
        "selections": [
          "English Switch",
          "French Switch",
          "German Switch",
          "Spanish Switch",
          "Italian Switch"
        ],
        "path": "pkmn/MakeMonShiny_SWITCH.txt",
        "source": [
          "@@ title = \"Make any Pokémon shiny\"",
          "@@ author = \"Mettrich, final, Adrichu00 and PapaJefe\"",
          "@@ exit = null",
          "@@ fill = false",
          "@@ filler1 = 0xBBBBBBFF",
          "@@ filler2 = 0xBBBBFFFF",
          "@@ filler3 = 0xBBFFFFFF",
          "@@ filler4 = 0xFFFFFFFF",
          " ",
          "offset_eng = 0x34A3",
          "offset_fra = 0x341B",
          "offset_ita = 0x340B",
          "offset_ger = 0x341F",
          "offset_spa = 0x340B",
          "offset = offset_{langnr}",
          "@@",
          "SBCS r10, pc, 0x2F40",
          "ADC  r0, r10, 0xA6",
          "MOV  r12, 0x03FC00",
          "SBCS r12, r12, 0xF8000002",
          "ADD  r12, r12, {offset} ?",
          "MOV  r11, 0x03FC",
          "0xE2BFE100",
          "BIC  pc, r11, 0x0290",
          "LDR  lr, [sp, lr, ASR 0x1D]!",
          "ADCS sp, sp, 0x03",
          "LDR  r11, [r10, 0xA7]!",
          "BIC  r0, r0, 0xFF",
          "STRGT r11, [r10, lr, ASR 0x19]!",
          "MOV  pc, 0x0354"
        ]
      },
      {
        "selections": [
          "Japanese 1.0",
          "Japanese 1.1"
        ],
        "path": "pkmn/MakeMonShinyGRABJP1.txt",
        "source": [
          "@@ title = \"Make any Pokémon shiny\"",
          "@@ author = \"Mettrich, final, Adrichu00 and PapaJefe (JPN Port)\"",
          "@@ exit = null",
          "@@ fill = false",
          "@@ filler1 = 0x46C0E7FF",
          "@@ filler2 = 0x46C0FFFF",
          "@@ filler3 = 0xE7FF46C0",
          "@@ filler4 = 0xFFFFE000",
          "@@",
          "0x3B80462B",
          "0x3304681B",
          "0xE0016818",
          "0x40486859",
          "0x0C124602",
          "0x04124042",
          "0x60594051",
          "0xE0013320",
          "0x68182104",
          "0x60184050",
          "0x68183304",
          "0x60184050",
          "0xE0013304",
          "0x40506818",
          "0x33046018",
          "0xD1E43901",
          "0x47704040"
        ]
      }
    ]
  },
  {
    "number": 74,
    "title": "Complete Kanto Pokédex (Bootstrapped)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/CompleteKantoDex.txt",
        "source": [
          "@@ title = \"Complete Kanto Dex\"",
          "@@ author = \"Adrichu00 (Based on Sleipnir's code)\"",
          "@@ exit = \"Bootstrapped\"",
          "@@ filler1 = 0x000000FF",
          "@@ filler2 = 0x0000FFFF",
          "@@ filler3 = 0x00FFFFFF",
          "@@ filler4 = 0xFFFFFFFF",
          " ",
          "// THIS CODE NEEDS A BOX 14 EXIT CODE:",
          "// https://pomeg-letterbombers.github.io/pokemon-ace-notes/frlg-box-14-exit/",
          "// This code registers all species from 1 to 150",
          " ",
          "@@",
          "MOVS  r10, #0xE1000000",
          "SBC  r11, pc, #0xD100",
          "MOV  r12, #0xC000003F",
          "BIC  r11, r11, #0xB0000003",
          "STRH r12, [r11, #0x5E]",
          "STRH r12, [r11, #0x92]",
          "SBC  r11, r11, #0x2A40",
          "ADC  r11, r11, #0x3FC0",
          "STRH r12, [r11, #0x51]",
          "ADC  r11, r11, #0x3440",
          "STRH r12, [r11, #0x30]",
          "ADC  r11, r11, #0x000B",
          "SBC  r11, r11, #0x0A10",
          "SBC  r11, r11, #0x3FC0",
          "MVN  r12, #0x00",
          "SBCS r10, r10, #0x0C000000",
          "0xDAFFFFEB"
        ]
      }
    ]
  },
  {
    "number": 75,
    "title": "Complete National Pokédex (Bootstrapped)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/CompleteNationalDex.txt",
        "source": [
          "@@ title = \"Complete National Dex\"",
          "@@ author = \"Adrichu00 (Based on Sleipnir's code)\"",
          "@@ exit = \"Bootstrapped\"",
          "@@ filler1 = 0x000000FF",
          "@@ filler2 = 0x0000FFFF",
          "@@ filler3 = 0x00FFFFFF",
          "@@ filler4 = 0xFFFFFFFF",
          " ",
          "// THIS CODE NEEDS A BOX 14 EXIT CODE:",
          "// https://pomeg-letterbombers.github.io/pokemon-ace-notes/frlg-box-14-exit/",
          "// This code registers all species except Jirachi and Deoxys",
          " ",
          "@@",
          "MOVS  r10, #0xD5000000",
          "SBC  r11, pc, #0xD100",
          "BIC  r11, r11, #0xFC000003",
          "MVN  r12, #0x00",
          "STRH r12, [r11, #0x4C]",
          "STRH r12, [r11, #0x80]",
          "SBC  r11, r11, #0x2A40",
          "ADC  r11, r11, #0x3FC0",
          "STRH r12, [r11, #0x3F]",
          "ADC  r11, r11, #0x3440",
          "STRH r12, [r11, #0x1E]",
          "SBC  r11, r11, #0x0E40",
          "SBC  r11, r11, #0x3B80",
          "0xB0000000",
          "SBCS r10, r10, #0x03B80000",
          "0xDAFFFFEB"
        ]
      }
    ]
  },
  {
    "number": 76,
    "title": "Complete the full Pokédex (Bootstrapped)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/CompleteThePokedex.txt",
        "source": [
          "@@ title = \"Complete the Pokédex (Bootstrapped)\"",
          "@@ author = \"ComplexRobot\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "; Requires the Box 14 Exit Code (Bootstrap) setup:",
          "; https://pomeg-letterbombers.github.io/pokemon-ace-notes/frlg-box-14-exit/",
          "; Completes the entire Pokédex, including the National Dex",
          " ",
          "aligned_pc = 0",
          "pc_base = 0x02029310 + 0x8344 + (aligned_pc ? 0 : 2)",
          "dex_start = 0x02024584 + 0x018 + 0x10",
          "offset_0 = 0x4b",
          "seen_1_offset = 0x02025528 + 0x5f8 - (dex_start - offset_0)",
          "seen_2_offset = seen_1_offset + 0x3a18 - 0x5f8",
          "offset_1 = seen_1_offset - 0x1582",
          "offset_2 = seen_2_offset - (0x1582 + 0x3401)",
          " ",
          "@@",
          "MVN r12, #0",
          "SBCS r11, pc, #{pc_base - dex_start + 12 - 1 + offset_0}",
          "MOV r10, #0xff0",
          "SBC r10, r10, #0xb10",
          "STRH r12, [r11, #{offset_0}]",
          "STRH r12, [r11, #{offset_0 + 52}]",
          "ADC r11, r11, #0xac0",
          "ADC r11, r11, #0xac0",
          "STRH r12, [r11, #{offset_1}]",
          "ADCS r11, r11, #0x3400",
          "STRH r12, [r11, #{offset_2}]",
          "SBCS r11, r11, #0xe00",
          "SBC r11, r11, #0x3b80",
          "SBCS r10, r10, #0x30",
          "BGT #{-19 * 4}"
        ]
      }
    ]
  },
  {
    "number": 77,
    "title": "Get All Poké Balls, TMs and Berries (Bootstrapped)",
    "games": [
      "firered",
      "leafgreen"
    ],
    "variants": [
      {
        "selections": [
          "English 1.1",
          "English 1.0",
          "English Switch",
          "French",
          "French Switch",
          "German",
          "German Switch",
          "Spanish",
          "Spanish Switch",
          "Italian",
          "Italian Switch"
        ],
        "path": "misc/GetAllBallsTmsBerries.txt",
        "source": [
          "@@ title = \"Get All Poké Balls, TMs and Berries (Bootstrapped)\"",
          "@@ author = \"ComplexRobot\"",
          "@@ exit = \"Bootstrapped\"",
          " ",
          "; Requires the Box 14 Exit Code (Bootstrap) setup:",
          "; https://pomeg-letterbombers.github.io/pokemon-ace-notes/frlg-box-14-exit/",
          "; Fills a pocket with ×952 of every item of that pocket",
          "; WARNING: Overwrites everything in that pocket",
          " ",
          "pocket = 0",
          "m = pocket",
          "pc_base = 0x2029310 + 0x8344 + 2",
          "pokeballs = 0x2025528 + 0x430",
          "tms = 0x2025528 + 0x464",
          "berries = 0x2025528 + 0x54c",
          "encryption_key = 0x2024584 + 0xf20",
          "offset_0 = 0x348",
          "offset_1 = !(m - 2) ? 0xff0 : 0x3fc",
          "offset_2 = !(m - 2) ? -(berries - encryption_key - offset_1) : !(m - 1) ? (tms - encryption_key - offset_1 - 2) : (pokeballs - encryption_key - offset_1 - 2)",
          "offset_3 = !(m - 2) ? 0x378 : !(m - 1) ? 0xed0 : 0",
          "offset_4 = !(m - 2) ? 0x3fc : !(m - 1) ? 0xff0 : 0",
          "loop_count_init = !(m - 2) ? 0xa10 : !(m - 1) ? 0xae0 : 0xa200",
          "loop_count_dec = !(m - 2) ? 0x3b : !(m - 1) ? 0x30 : 0xd80",
          " ",
          "@@",
          "ADCS r11, pc, #{offset_0}",
          "SBCS r11, #{pc_base - encryption_key + 8 - 1 + offset_0 + 0xff}",
          "LDR r0, [r11, #0xff]!",
          "MOV r12, r0, LSL #16",
          "MOVS r0, #0",
          "BICLE r10, r12, #0x3b80000",
          "{!(m - 2) ? 0xD2EBBEA2 : !(m - 1) ? 0xD2ABB0EA : 0xD2ABB0B6}",
          "RSCLE r12, #0x3b80000",
          "{!(m - 2) ? 0xD2EBBEFF : 0xD2ABBFFF}",
          "ADCLE r12, r10, ROR #31",
          "BICLE r12, #0x3",
          "{!(m - 2) ? 0xD2CCCFDE : !(m - 1) ? 0xD2CCCEED : 0xBBFFFFFF}",
          "MOVLE r10, #{loop_count_init}",
          "ADCGT r12, #0",
          "ADCLE r12, #{offset_4}",
          "SBCS r10, #{loop_count_dec}",
          "SBCLT pc, #0",
          "STRT r12, [r11], lr, LSR #25",
          "BGT #{-16 * 4}",
          "MOVS r11, #0xca"
        ]
      }
    ]
  }
];

const FRLG_SELECTIONS = {
  "English 1.1": ["en", "1.1", "eng1"], "English 1.0": ["en", "1.0", "eng0"],
  "French": ["fr", null, "fra"], "German": ["de", null, "ger"],
  "Spanish": ["es", null, "spa"], "Italian": ["it", null, "ita"],
  "Japanese 1.1": ["ja", "1.1", "jap1"], "Japanese 1.0": ["ja", "1.0", "jap0"],
  "English Switch": ["en", "1.1", "eng10"], "French Switch": ["fr", "1.1", "fra10"],
  "German Switch": ["de", "1.1", "ger10"], "Spanish Switch": ["es", "1.1", "spa10"],
  "Italian Switch": ["it", "1.1", "ita10"], "Japanese Switch": ["ja", "1.1", "jap10"],
};
window.ACE_CUSTOM_CONTENT.codes.push(...FRLG_SOURCE_ARCHIVE.map((entry) => {
  const variants = {};
  for (const source of entry.variants) for (const selection of source.selections) {
    const [language, revision, generatorLanguage] = FRLG_SELECTIONS[selection] || [];
    if (!language) throw new Error("Unknown FRLG selection: " + selection);
    const platform = selection.endsWith(" Switch") ? "switch" : null;
    const revisions = revision ? [revision] : ["1.0", "1.1"];
    for (const game of entry.games) for (const selectedRevision of revisions)
      for (const selectedPlatform of platform ? [platform] : ["accurate", "inaccurate"]) {
        const key = [game, language, selectedPlatform, selectedRevision].join("|");
        if (variants[key]) throw new Error("Duplicate FRLG mapping: " + entry.number + " " + key);
        variants[key] = {
          generatorSource: source.source,
          generatorLanguage,
          generatorGame: game === "firered" ? "fr" : "lg",
          sourcePath: source.path,
        };
      }
  }
  const firstSource = entry.variants[0].source;
  const author = firstSource.find((line) => /^@@ author\s*=/.test(line))?.match(/"([^"]+)"/)?.[1] || "E-Sh4rk contributors";
  const category = entry.variants[0].path.startsWith("rng/") ? "RNG"
    : entry.variants[0].path.startsWith("pkmn/") ? "Pokémon" : "Events & items";
  return {
    id: "frlg-generator-" + String(entry.number).padStart(3, "0"),
    title: entry.title,
    author,
    addedOn: "2026-09-13",
    summary: "Standard box names are shown for your selected FRLG setup. Edit source values and regenerate only if you need a custom result.",
    category,
    difficulty: "Advanced",
    games: entry.games,
    languages: [...new Set(Object.keys(variants).map((key) => key.split("|")[1]))],
    platforms: [...new Set(Object.keys(variants).map((key) => key.split("|")[2]))],
    revisions: [...new Set(Object.keys(variants).map((key) => key.split("|")[3]))],
    tags: ["FRLG", "CodeGenerator source"],
    parameters: [],
    generatorEngine: "eshark-frlg",
    rawBoxNames: true,
    sourcePlatformValues: { accurate: 0, inaccurate: 1 },
    variants,
    source: { label: "E-Sh4rk FRLG CodeGenerator", url: "https://e-sh4rk.github.io/CodeGenerator/index_frlg.html" },
    requirements: ["Use the matching FireRed/LeafGreen ACE setup and execution method specified by this source."],
    instructions: ["Read the source comments for setup requirements and warnings, including any Box 14 exit code.", "For custom values, edit the assignments near the top of the source and generate again.", "Enter the exact displayed names in the matching boxes and follow the source's ACE method."],
  };
}));
