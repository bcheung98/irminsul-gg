import { SkillKeyword } from "@/types/skill";

export const skillKeywords: SkillKeyword[] = [
    {
        tag: "action advanced",
        name: "Action advanced",
        description:
            "Reduces the target's waiting interval before the next action.",
    },
    {
        tag: "action delayed",
        name: "Action delayed",
        description:
            "Increases the target's waiting interval before the next action.",
    },
    {
        tag: "additional dmg",
        name: "Additional DMG",
        description:
            "Causes the target being hit to take extra DMG, which is not considered an attack.",
    },
    {
        tag: "aha",
        name: "Aha",
        description:
            'When taking action, triggers an Aha Instant and causes units capable of using Elation Skills to each use their Elation Skill 1 time. If there are no units capable of using Elation Skills when Aha takes action, Aha will use "Let There Be Laughter."<br />The Aha Instant lasts until the final Elation Skill finishes this time.<br />When the Aha Instant ends, participating characters gain the "Certified Banger" state for the Punchline points taken into account this time, lasting for 2 turns.',
    },
    {
        tag: "backup",
        name: "Backup",
        description:
            "Enemies cannot actively target backup units. Allies' Blast-type abilities cannot Blast to backup units.",
    },
    {
        tag: "base chance",
        name: "Base Chance",
        description:
            "The base chance of applying debuffs to targets hit.<br />The final probability is affected by the attacker's Effect Hit Rate and enemy targets' Effect RES.",
    },
    {
        tag: "break dmg",
        name: "Break DMG",
        description:
            "Break DMG increases with higher Break Effect, higher target max Toughness, and higher character levels.<br />Break DMG cannot CRIT hit and is not affected by DMG Boost effects.",
    },
    {
        tag: "buff",
        name: "Buff",
        description:
            "Can buff combat ability for a period of time, which can be dispelled unless otherwise specified.",
    },
    {
        tag: "certified banger",
        name: "Certified Banger",
        description:
            'Characters participating in the Aha Instant obtain the "Certified Banger" state, and Punchline from the current Aha Instant are taken into account for this state, lasting for 2 turns. Ability effects and Elation DMG produced by the "Certified Banger" state are calculated based on the Punchline points taken into account.<br />Punchlines taken into account for multiple "Certified Banger" states are combined for calculation.<br />The duration of each "Certified Banger" state is calculated independently.',
    },
    {
        tag: "continuous effect",
        name: "Continuous Effect",
        description: "Includes buffs, debuffs, and other effects.",
    },
    {
        tag: "counter",
        name: "Counter",
        description:
            "An effect that automatically triggers when the target is attacked, which unleashes an extra attack on the attacker.<br />Counter is also considered a follow-up attack.",
    },
    {
        tag: "crowd control debuff",
        name: "Crowd Control debuff",
        description:
            "Freeze, Entanglement, Imprisonment, Dominated, Outrage, Strong Reverberation, Alien Dream, Snarelock, Terrified.",
    },
    {
        tag: "debuff",
        name: "Debuff",
        description:
            "Debuffs are negative status effects that render units weaker. Unless otherwise specified, debuffs can be dispelled.",
    },
    {
        tag: "departed",
        name: "Departed",
        description:
            "Ally units in the Departed state cannot be designated as ability targets and will not appear in the Action Order.",
    },
    {
        tag: "distribute",
        name: "Distribute",
        description:
            "Before DMG is calculated, distribute a part of the attacking unit's DMG to another target (or multiple other targets), with the target hit by the attack taking the rest of the DMG. DMG distributed to other targets cannot be distributed again.",
    },
    {
        tag: "downed state",
        name: "Downed State",
        description:
            "An ally will be incapacitated once their HP is reduced to 0.",
    },
    {
        tag: "elation dmg",
        name: "Elation DMG",
        description:
            "The more Punchline points taken into account, the higher the Elation and Character Level, and thus higher the Elation DMG dealt.<br />Elation DMG is not affected by DMG Boost effects.",
    },
    {
        tag: "extra turn",
        name: "Extra Turn",
        description:
            "Gain 1 extra turn that won't expend your remaining turns when taking action.<br />During this extra turn, no Ultimate can be used.",
    },
    {
        tag: "fixed chance",
        name: "Fixed Chance",
        description: "Fixed chance will not be affected by any factor.",
    },
    {
        tag: "follow up attack",
        name: "Follow-up ATK",
        description:
            "Unleashes an extra attack on the target. This effect is triggered automatically when requirements are met.",
    },
    {
        tag: "joint attack",
        name: "Joint ATK",
        description:
            "Multiple targets respectively use attacks on enemy targets in one action.",
    },
    {
        tag: "out of bounds",
        name: "Out-of-Bounds",
        description:
            "Neither allies nor enemies can actively select Out-of-Bounds units.",
    },
    {
        tag: "punchline",
        name: "Punchline",
        description:
            "Punchline is shared by the whole team. When dealing Elation DMG, the more Punchline points taken into account, the higher the Elation DMG.",
    },
    {
        tag: "res pen",
        name: "RES PEN",
        description:
            "When dealing DMG, ignore a part of the enemy target's resistance to the corresponding damage type.",
    },
    {
        tag: "summon",
        name: "Summon Memosprite",
        description:
            "Summon the memosprite to the field. If the memosprite is already on the field, dispels all Crowd Control debuffs the memosprite is afflicted with.",
    },
    {
        tag: "super break dmg",
        name: "Super Break DMG",
        description:
            "Super Break DMG increases with higher Break Effect, higher Toughness Reduction of the attack, and higher character levels.<br />Super Break DMG cannot CRIT hit and is not affected by DMG Boost effects.",
    },
    {
        tag: "territory",
        name: "Territory",
        description:
            "Territory effects are unique in the battle. While it exists, other abilities with Territory effects cannot be used.",
    },
    {
        tag: "true dmg",
        name: "True DMG",
        description:
            "Non-Type DMG that is not affected by any effects. This DMG is not considered as using 1 attack.",
    },
    {
        tag: "weakness break state",
        name: "Weakness Break State",
        description:
            "When enemy targets' Toughness is reduced to 0, they will enter the Weakness Break State, which delays their actions.",
    },
];
