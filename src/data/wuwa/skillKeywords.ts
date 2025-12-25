import { SkillKeyword } from "@/types/skill";

export const skillKeywords: SkillKeyword[] = [
    {
        tag: "vibration strength",
        name: "Vibration Strength",
        description:
            'When the Vibration Strength is depleted, the enemy is <span class="text-highlight">Immobilized</span> and cannot take any action for a period of time.',
    },
    {
        tag: "negative status",
        name: "Negative Status",
        description:
            'Includes <span class="text-spectro">Spectro Frazzle</span>, <span class="text-havoc">Havoc Bane</span>, <span class="text-fusion">Fusion Burst</span>, <span class="text-glacio">Glacio Chafe</span>, <span class="text-electro">Electro Flare</span> and <span class="text-aero">Aero Erosion</span>.',
    },
    {
        tag: "negative status dmg",
        name: "Negative Status DMG",
        description:
            'Includes <span class="text-spectro">Spectro Frazzle DMG</span>, <span class="text-havoc">Havoc Bane DMG</span>, <span class="text-fusion">Fusion Burst DMG</span>, <span class="text-glacio">Glacio Chafe DMG</span>, <span class="text-electro">Electro Flare DMG</span> and <span class="text-aero">Aero Erosion DMG</span>.',
    },
    {
        tag: "havoc bane",
        name: "Havoc Bane",
        description:
            "<ul><li>While Havoc Bane lasts, the DEF of the inflicted target is reduced.</li><li>Havoc Bane stacks up to 3 times by default. Each stack reduces the target's DEF by 2%.</li></ul>",
    },
    {
        tag: "fusion burst",
        name: "Fusion Burst",
        description:
            '<ul><li>When Fusion Burst is stacked to its max, all stacks will be removed to trigger an <span class="text-highlight">explosion</span>, dealing <span class="text-fusion">Fusion DMG</span> around the target.</li><li>Fusion Burst stacks up to 10 times by default. The higher the stacks, the more DMG dealt.</li></ul>',
    },
    {
        tag: "spectro frazzle",
        name: "Spectro Frazzle",
        description:
            '<ul><li>While Spectro Frazzle lasts, it deals periodic <span class="text-spectro">Spectro DMG</span> to the target. The target loses 1 stack of the effect with each instance of damage.</li><li>The DMG of Spectro Frazzle scales with its stacks.</li></ul>',
    },
    {
        tag: "electro flare",
        name: "Electro Flare",
        description:
            '<ul><li>While Electro Flare lasts, it deals periodic <span class="text-electro">Eletro DMG</span> to the target. The target loses half of the effect stacks with each instance of damage.</li><li>At maximum stacks of Electro Flare, any new stack inflicted becomes stackable Electro Rage.</li><li>Electro Rage increases the DMG dealt by the next Electro Flare trigger. This effect is removed once triggered.</li><li>Electro Flare and Electro Rage stack up to 10 times by default. The higher the stacks, the more DMG dealt.</li></ul>',
    },
    {
        tag: "electro rage",
        name: "Electro Rage",
        description:
            "Electro Rage increases the damage dealt by the next Electro Flare. This effect is removed once triggered.",
    },
    {
        tag: "glacio chafe",
        name: "Glacio Chafe",
        description:
            '<ul><li>Glacio Chafe deals <span class="text-glacio">Glacio DMG</span> when being inflicted on the target.</li><li>Each stack of Glacio Chafe reduces the target\'s movement speed.</li><li>When Glacio Chafe is stacked to its max, the target will be <span class="text-highlight">frozen</span>, and all stacks of Glacio Chafe will be removed. Struggle to accelerate your recovery from the frozen state.</li><li>Glacio Chafe stacks up to 10 times by default. The higher the stacks, the more DMG dealt, and the longer <span class="text-highlight">frozen</span> duration.</li></ul>',
    },
    {
        tag: "aero erosion",
        name: "Aero Erosion",
        description:
            '<ul><li>While Aero Erosion lasts, it deals periodic <span class="text-aero">Aero DMG</span> to the target.</li><li>The DMG of Aero Erosion scales with its stacks.</li></ul>',
    },
    {
        tag: "tune break",
        name: "Tune Break",
        description:
            'When the target\'s <span class="text-highlight">Off-Tune Level</span> is maxed, they enter the <span class="text-highlight">Mistune</span> state:<br />The active Resonator in the team may perform <span class="text-highlight">Tune Break Skill</span> on the target, dealing DMG and causing the target to leave the <span class="text-highlight">Mistune</span> state.<br />If the target is of the Common Class, Resonators in the team may directly deal <span class="text-highlight">Tune Break DMG</span> with some of their regular skills on hit. The target leaves the <span class="text-highlight">Mistune</span> state afterward.',
    },
    {
        tag: "tune rupture shifting",
        name: "Tune Rupture - Shifting",
        description:
            'Certain Resonators can inflict <span class="text-highlight">Tune Rupture - Shifting</span> on the target. During this state, if the affected target is hit by <span class="text-highlight">Tune Break</span>, their <span class="text-highlight">Tune Rupture - Shifting</span> state is replaced with <span class="text-highlight">Tune Rupture - Interfered</span>.',
    },
    {
        tag: "tune rupture interfered",
        name: "Tune Rupture - Interfered",
        description:
            'A target enters this state when they are hit by <span class="text-highlight">Tune Break</span> under the <span class="text-highlight">Tune Rupture - Shifting</span> state. Resonators who can respond to <span class="text-highlight">Tune Rupture - Interfered</span> cause additional effects when attacking targets in this state.',
    },
    {
        tag: "tune strain shifting",
        name: "Tune Strain - Shifting",
        description:
            'Certain Resonators can inflict <span class="text-highlight">Tune Strain - Shifting</span> on the target. During this state, if the affected target is hit by <span class="text-highlight">Tune Break</span>, their <span class="text-highlight">Tune Strain - Shifting</span> state is replaced with <span class="text-highlight">Tune Strain - Interfered</span>.',
    },
    {
        tag: "tune strain interfered",
        name: "Tune Strain - Interfered",
        description:
            'A target enters this state when they are hit by <span class="text-highlight">Tune Break</span> under the <span class="text-highlight">Tune Strain - Shifting</span> state. Resonators who can respond to <span class="text-highlight">Tune Strain - Interfered</span> cause additional effects when attacking targets in this state.',
    },
];
