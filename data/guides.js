window.ACE_BUILTIN_GUIDES = [
  {
    id: "emerald-ace-setup",
    type: "interactive-setup",
    title: "ACE Setup guide for Emerald",
    summary: "Set up ACE from the in-game trades through a verified stable ACE species.",
    category: "Setup",
    difficulty: "Advanced",
    introduction: "This guide takes you step by step through setting up ACE in an Emerald save file on console or emulator.",
    sourceNote: "Adapted from the Ultimate ACE Setup guide for Emerald. The experimental curtain/pixel section is intentionally omitted.",
    phases: [
      {
        title: "Before you start",
        shortTitle: "Preparation",
        objective: "Confirm that your game and save are suitable, and understand what the setup will change.",
        sections: [
          {
            title: "What ACE does",
            paragraphs: [
              "ACE is short for Arbitrary Code Execution. With the help of a glitch species, it allows you to manipulate the game's memory by executing codes from your PC boxes.",
              "You can complete this before beating the game once you can obtain Pomeg Berries from the Berry Master's house on Route 123. However, completing the Elite Four first is strongly recommended because the Battle Tower cloning glitch makes retries much faster.",
            ],
          },
          {
            title: "Game and hardware requirements",
            bullets: [
              "Any Emerald language can be used.",
              "Use an original Emerald ROM or cartridge whenever possible.",
              "A dry internal battery does not prevent the glitch or codes from working.",
              "Fake copies may work, but ACE codes depend on specific memory layouts and therefore cannot be guaranteed.",
              "Make a backup of your save before beginning.",
            ],
            note: "Most consoles work, but some consoles and emulators have compatibility problems. Use the website setup selector and troubleshooting information for your exact platform.",
          },
        ],
        image: "Suggested image: an overview showing the required game, Pomeg Berry, DOTS, and PLUSES.",
        checks: ["I have backed up my save.", "I am using a supported Emerald version.", "I understand that later steps intentionally corrupt PC data."],
      },
      {
        title: "Obtain DOTS and PLUSES",
        shortTitle: "In-game trades",
        objective: "Obtain the exact traded Pokémon required for the setup and prepare PLUSES.",
        sections: [
          {
            title: "Get DOTS",
            paragraphs: [
              "Catch a Ralts on Route 102 and trade it for the in-game traded Seedot named DOTS in Rustboro City. You cannot use a random Seedot and rename it; it must be this exact traded Pokémon.",
              "Put DOTS in the PC immediately to avoid gaining experience. Its level does not matter, but its HP and Attack EVs must be zero before the controlled training later.",
            ],
            note: "If DOTS has already gained experience, use Pomeg Berries for HP and Kelpsy Berries for Attack until the game says each stat cannot be lowered further. Evolution into Nuzleaf or Shiftry is fine if those EVs are reset.",
          },
          {
            title: "Alternative to DOTS",
            paragraphs: ["You may instead trade a Bagon from Meteor Falls for the in-game Horsea named SEASOR in Pacifidlog Town. It works like DOTS as long as it has not gained experience from battles."],
          },
          {
            title: "Get and prepare PLUSES",
            paragraphs: [
              "Obtain a Volbeat from Route 117 and trade it for the in-game Plusle named PLUSES in Fortree City. Volbeat has a 1% encounter rate. If you find Illumise first, breed it with Ditto; each egg has a 50% chance to hatch into Volbeat.",
              "In Lilycove City, use the Move Deleter to remove every move from PLUSES except Growl. Previous experience on PLUSES does not matter.",
              "Buy HP Up vitamins on the third floor of Lilycove Department Store. Four is enough for most non-Japanese versions; obtain about twelve for Japanese versions.",
            ],
          },
        ],
        image: "Suggested image: the Rustboro DOTS trade and Fortree PLUSES trade locations.",
        checks: ["I have the exact in-game traded DOTS or a clean SEASOR.", "My DOTS/SEASOR has zero HP and Attack EVs.", "PLUSES knows only Growl.", "I have the required HP Up vitamins."],
      },
      {
        title: "Clone backups and EV train DOTS",
        shortTitle: "Clone & EV train",
        objective: "Create safe retry copies, then give DOTS the exact HP and Attack EV values for your language.",
        sections: [
          {
            title: "Clone DOTS and PLUSES safely",
            paragraphs: ["At the Battle Frontier, clone clean copies of DOTS and PLUSES. Keep the originals somewhere memorable, such as Box 9. The clones allow you to restart if the EV training is wrong."],
            bullets: [
              "Deposit or move the Pokémon or item you want to clone into the PC.",
              "Make sure there is room in your party to withdraw it later.",
              "Save the game manually. Do not use an emulator save state.",
              "Withdraw the Pokémon or items from the PC.",
              "Talk to the nearest Battle Tower attendant and choose Level 50 or Open Level. Agree to the first save. When the large save prompt appears, press B, then soft reset with A+B+Start+Select.",
            ],
            warning: "Be careful not to reverse clone and delete important Pokémon. Deposit first, save, and only then withdraw when performing a normal clone.",
          },
          {
            title: "Choose the correct EV target",
            bullets: [
              "English, French, Italian, German, and Spanish: exactly 17 HP EVs and 6 Attack EVs.",
              "Japanese: exactly 95 HP EVs and 8 Attack EVs. The resulting Japanese species is 0x085F.",
            ],
            note: "EVs are not the visible stat numbers. There is no easy way to inspect the exact EV total, so count every defeated Pokémon carefully and ensure DOTS does not have Pokérus.",
          },
          {
            title: "Non-Japanese training: 6 Attack and 17 HP EVs",
            bullets: [
              "Put a strong Pokémon first in the party and give DOTS the Exp. Share.",
              "Inside Mt. Pyre, faint exactly 6 Shuppet. Use a reliable move's remaining PP to help count.",
              "Immediately remove the Exp. Share.",
              "Catch one additional Shuppet for the Pomeg Berry setup; do not count this caught Shuppet as a defeated Pokémon.",
              "Heal in Verdanturf Town to restore PP, enter Rusturf Tunnel, give DOTS one HP Up, and equip the Exp. Share again.",
              "Faint exactly 7 Whismur, then immediately remove the Exp. Share. DOTS now has 17 HP EVs and 6 Attack EVs.",
            ],
            warning: "Pokérus doubles battle EVs and will ruin these numbers. Make sure it is not present on DOTS or spreading through the party.",
          },
          {
            title: "Japanese training adjustment",
            paragraphs: ["Use the same controlled method, but adjust the training to reach exactly 95 HP EVs and 8 Attack EVs. HP Up adds 10 HP EVs at a time; Shuppet grants 1 Attack EV and Whismur grants 1 HP EV without Pokérus."],
          },
        ],
        image: "Suggested image: EV target table plus Mt. Pyre and Rusturf Tunnel encounter examples.",
        checks: ["I cloned clean retry copies before training.", "I used the target for my game language.", "DOTS did not have Pokérus.", "I removed the Exp. Share immediately after each target was reached."],
      },
      {
        title: "Arrange the PC and prepare Shuppet",
        shortTitle: "PC & party setup",
        objective: "Arrange the corruption targets in Boxes 1–2 and prepare a three-Pokémon party for the Pomeg Berry glitch.",
        sections: [
          {
            title: "Prepare the PC",
            paragraphs: [
              "Obtain a Pomeg Berry from Route 123 near the Berry Master's house or west of Fortree City. If none remain, save in front of the Berry Master and reset until he gives one.",
              "Clone the EV-trained DOTS together with PLUSES and arrange them in Box 2 exactly as shown in the guide image. Move every unrelated Pokémon out of Boxes 1 and 2.",
              "The extra PLUSES at the top helps guarantee ghost data during corruption. That ghost data will later let you verify the DOTS egg species.",
            ],
          },
          {
            title: "Prepare the party",
            bullets: [
              "Bring exactly three Pokémon: the caught Shuppet, a Pokémon that knows Fly, and a weak Pokémon.",
              "Faint the weak Pokémon in battle, then end the battle and fly to Oldale Town.",
              "Arrange the party as: Slot 1 fainted Pokémon, Slot 2 Shuppet, and the Pokémon with Fly in the last slot.",
              "Use HP Up on Shuppet until its total HP increases to an odd number. Even if its HP was already odd, continue until HP Up causes the next odd total.",
              "Enter a wild battle, use Curse, flee, enter another battle, use Curse again, and flee. Shuppet should now have 1 HP.",
              "Save the game here. Do not save again until the correct DOTS egg has been produced and checked.",
            ],
          },
        ],
        image: "Required image placeholder: exact Box 2 DOTS/PLUSES layout and the three possible ghost-data slots.",
        checks: ["Boxes 1 and 2 contain no unrelated Pokémon.", "The DOTS and PLUSES clones match the required layout.", "My party order is correct.", "Shuppet has 1 HP.", "I saved before beginning corruption."],
      },
      {
        title: "Corrupt DOTS into the ACE egg",
        shortTitle: "Corruption loop",
        objective: "Repeat the controlled corruption until Box 2 contains the correct regular Egg in a Nest Ball.",
        sections: [
          {
            title: "Know the retry odds",
            paragraphs: ["The post-Elite Four setup has a 7/32 chance—roughly 22%—of producing the desired result on each attempt. Most attempts produce Bad Eggs. Reset to the save from the previous phase whenever the attempt fails."],
          },
          {
            title: "Perform one attempt",
            bullets: [
              "Enter a wild battle, switch from Shuppet to the flying Pokémon, then run away.",
              "Enter the Pokémon Center and deposit the flying Pokémon into Box 3 or later.",
              "Return to the grass and use a Pomeg Berry on Shuppet. Confirm that it faints. If its HP becomes a question mark, use any Potion and it should faint.",
              "Enter another battle. A Decamark should appear.",
              "Choose Pokémon, open the summary of either party Pokémon, close it, and press B again so you can scroll beyond the visible party.",
              "Hold Up for about 2 seconds, return to the battle, and choose Run.",
              "You should white out and respawn at the Pokémon Center.",
            ],
            warning: "Holding Up much longer than about 2 seconds can corrupt unrelated save data. Do not save after an attempt unless the result is correct and the save has been checked.",
          },
          {
            title: "Check the result",
            paragraphs: [
              "Open the PC and inspect Box 2. The target is a regular Egg—not a Bad Egg—in a Nest Ball, with Pokérus. A regular Egg in a Premier Ball is more common but will not work.",
              "If the correct Egg is not present, reset the game and repeat the attempt. If it is present, check your Bag, Trainer Card, and Pokédex for unexpected corruption before continuing. A strange party sprite can usually be fixed by entering a battle.",
            ],
            warning: "Do not hatch the Egg yet. Hatching executes the current box-name code; with no valid code it may crash, and saving somewhere unsafe could cause a soft lock before you reach a PC.",
          },
        ],
        image: "Suggested image: comparison of the correct regular Nest Ball Egg, a Bad Egg, and the incorrect Premier Ball Egg.",
        checks: ["I obtained a regular Egg in a Nest Ball with Pokérus.", "My Bag, Trainer Card, and Pokédex look normal.", "I have not hatched the Egg or saved in an unsafe place."],
      },
      {
        title: "Verify the Egg and clean the PC",
        shortTitle: "Verify & clean",
        objective: "Use ghost data to verify the species, then remove Bad Eggs and corruption leftovers.",
        sections: [
          {
            title: "Check the DOTS egg species",
            paragraphs: [
              "Before saving or executing any code, use the ghost data in Box 2 to verify that DOTS was EV trained correctly.",
              "Swap Shuppet with one of the invisible ghost eggs in Box 2, then use that ghost egg to swap with the flying Pokémon. Take the DOTS egg as well. Your party should contain the ghost-data Bad Egg and the DOTS egg.",
              "Move the DOTS egg to the first party slot, fly to Slateport City, enter the Pokémon Fan Club, and ask the interviewer about the DOTS egg. Compare the displayed sequence with the reference image for your language.",
            ],
            warning: "If the sequence is wrong, the EV training was incorrect. Reset and restart from a clean cloned DOTS. Reverse clone and delete every incorrectly trained copy first so it cannot be reused by accident.",
          },
          {
            title: "Remove Bad Eggs with reverse cloning",
            bullets: [
              "Withdraw the Bad Eggs from the PC.",
              "Save the game.",
              "Deposit the Bad Eggs back into the PC.",
              "Talk to the Battle Tower attendant, accept the first save prompt, cancel the second, and soft reset.",
              "Repeat until all Bad Eggs are gone.",
              "Clone the verified good DOTS egg as a backup and move the good eggs to Box 3 or later.",
            ],
          },
          {
            title: "Clear corruption leftovers",
            paragraphs: [
              "To overwrite ghost data in Boxes 1 and 2, pick up a full box of normal Pokémon with Select, hold A from one corner to the opposite corner, and place the selected Pokémon into Boxes 1 and 2. You may place any ghost Pokémon you want removed there first.",
              "Finally, move all Pokémon out of Boxes 11–14. For normal ACE codes, always keep the last row of Box 11 and all of Boxes 12–14 empty.",
            ],
          },
        ],
        image: "Required image placeholder: the exact Slateport interviewer sequence for each supported language.",
        checks: ["The Slateport interviewer sequence matches the reference.", "All Bad Eggs have been reverse cloned away.", "I cloned the verified good Egg.", "The last row of Box 11 and all of Boxes 12–14 are empty."],
      },
      {
        title: "Create the stable ACE species",
        shortTitle: "Stable species",
        objective: "Execute the first box-name code and create the stable species used for future ACE codes.",
        sections: [
          {
            title: "Prepare the first code",
            paragraphs: [
              "Japanese versions can hatch the verified Egg directly into the stable species used for codes. Non-Japanese versions first use a box-name code to create a stable or metastable ACE species.",
              "Use the Stable ACE species code in this site's ACE Codes tab for your exact language and platform. The English 0x410e code creates the stable species in Box 10, Slot 19. Other languages may create a different stable or metastable species.",
            ],
            bullets: [
              "Keep Box 10, Slot 19 empty.",
              "Keep the last row of Box 11 and all of Boxes 12–14 empty unless your language's code explicitly requires a bootstrap there.",
              "Changing the Box 1 wallpaper before renaming boxes can make it easier to remember where Box 1 is.",
              "Select the correct console/accurate-emulator or old/inaccurate-emulator version of the code.",
              "Enter every box name exactly, then save directly in front of the PC.",
            ],
          },
          {
            title: "Execute by hatching",
            paragraphs: [
              "Keep the verified DOTS egg in your party and hatch it, using the Mach Bike to speed up the process. It should hatch into a question-mark/Decamark species and offer a nickname. Press B; attempting to nickname it may crash the game.",
              "If the game freezes or crashes as the Egg hatches, soft reset and recheck uppercase and lowercase letters, spaces, and visually similar characters. Leading and internal spaces matter; trailing spaces do not.",
            ],
            note: "Pay special attention to lowercase l, uppercase I, the number 1, g, q, left and right quotation marks, uppercase O, and zero. Online ACE codes often display spaces as underscores.",
          },
          {
            title: "Remove the unstable hatch",
            paragraphs: ["After a successful hatch, do not open the new glitch species' summary. Move it to the first party slot, open the PC using Deposit, and delete it without scrolling away. Then check Box 10, Slot 19 for the new stable ACE species."],
          },
        ],
        image: "Suggested image: the matching Stable ACE species code card and the Box 10, Slot 19 location.",
        checks: ["I selected the code for my exact language and platform.", "Box 10, Slot 19 and the execution area are clear.", "The code executed without crashing.", "I deleted the unstable hatch safely.", "The stable species appeared in its expected slot."],
      },
    ],
  },
];
