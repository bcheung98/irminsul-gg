import { SkillKeyword } from "@/types/skill";

export const skillKeywords: SkillKeyword[] = [
    {
        tag: "elevation",
        name: "Elevation",
        description:
            "Special DMG Boost effect. It is calculated independently of other DMG Boost effects.",
    },
    {
        tag: "polestar field",
        name: "Polestar Field",
        description:
            'When Stellar-Conduct is triggered, the surrounding area will transform into a <span class="text-highlight">Polestar Field</span> for a short period of time, and when inside a Polestar Field, certain characters will enter the <span class="text-highlight">Radiance: Stellar-Conduct</span> state, which grants various skill buffs.',
    },
    {
        tag: "radiance stellar glimmer",
        name: "Radiance: Stellar Glimmer",
        description:
            '<span class="text-highlight">Radiance: Stellar-Conduct</span> and <span class="text-highlight">Radiance: Stellar Swirl</span> are both considered <span class="text-highlight">Radiance: Stellar Glimmer</span> states.<br />Characters can only be affected by one Radiance state at any one time, and where more than one state can be triggered, <span class="text-highlight">Radiance: Stellar-Conduct</span> shall apply first.',
    },
];
