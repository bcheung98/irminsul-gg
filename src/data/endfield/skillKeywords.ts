import { SkillKeyword } from "@/types/skill";

export const skillKeywords: SkillKeyword[] = [
    {
        tag: "final strike",
        name: "Final Strike",
        description:
            'Final Strike is the last sequence of basic attack. When the controlled Operator\'s Final Strike hits the enemy, it also deals <span class="text-header">Stagger</span> and restores some Skill Points (SP).',
    },
    {
        tag: "debuff consume",
        name: "Debuff Consumption",
        description:
            'Various Physical and Arts debuffs can be ended early. For example, Icon_Crush <span class="text-physical">Crush</span> consumes Icon_Vulnerable <span class="text-physical">Vulnerable</span> debuffs, while Icon_Combustion <span class="text-heat">Combustion</span> consumes <span class="text-highlight">Arts Infliction</span> debuffs.',
    },
    {
        tag: "sp return",
        name: "SP Return",
        description:
            'After spending SP and meeting certain criteria, some of the SP spent will be returned.<br>SP Return is not "SP Recovery" and does not activate SP Recovery-triggered effects. Spending returned SP does not gain Ultimate Energy.',
    },
    {
        tag: "status level",
        name: "Status Level",
        description:
            'Status Level is the number of <span class="text-physical">Vulnerable</span> or <span class="text-highlight">Arts Infliction</span> stacks (max 4) <u>consumed</u> when triggering a <span class="text-physical">Physical Status</span> or <span class="text-highlight">Arts Reactions</span>. The higher the <span class="text-highlight">Status Level</span>, the stronger the resulting <span class="text-physical">Physical Status</span> or <span class="text-highlight">Arts Reactions</span>.',
    },
    {
        tag: "physical status",
        name: "Physical Status",
        description:
            'Physical Statuses refer to physical debuffs applied to the enemy. They include: Icon_Lift <span class="text-physical">Lifted</span>, Icon_KnockDown <span class="text-physical">Knocked Down</span>, Icon_Crush <span class="text-physical">Crushed</span>, and Icon_Breach <span class="text-physical">Breached</span>.',
    },
    {
        tag: "lift",
        name: "Physical Status: Lift",
        description:
            'Applies Icon_Vulnerable <span class="text-physical">Vulnerable</span> on an enemy. If the enemy is already Icon_Vulnerable <span class="text-physical">Vulnerable</span>, then add 1 stack of Icon_Vulnerable <span class="text-physical">Vulnerable</span>, and deal <span class="text-physical">Physical DMG</span> and <span class="text-header">Stagger</span>.',
    },
    {
        tag: "knock down",
        name: "Physical Status: Knock Down",
        description:
            'Applies Icon_Vulnerable <span class="text-physical">Vulnerable</span> on an enemy. If the enemy is already Icon_Vulnerable <span class="text-physical">Vulnerable</span>, then add 1 stack of Icon_Vulnerable <span class="text-physical">Vulnerable</span>, and deal <span class="text-physical">Physical DMG</span> and <span class="text-header">Stagger</span>.',
    },
    {
        tag: "crush",
        name: "Physical Status: Crush",
        description:
            'Applies Icon_Vulnerable <span class="text-physical">Vulnerable</span> on an enemy. If the enemy is already Icon_Vulnerable <span class="text-physical">Vulnerable</span>, then consume all Icon_Vulnerable <span class="text-physical">Vulnerable</span> stacks and deal massive <span class="text-physical">Physical DMG</span>.',
    },
    {
        tag: "breach",
        name: "Physical Status: Breach",
        description:
            'Applies Icon_Vulnerable <span class="text-physical">Vulnerable</span> on an enemy. If the enemy is already Icon_Vulnerable <span class="text-physical">Vulnerable</span>, then consume all Icon_Vulnerable <span class="text-physical">Vulnerable</span> stacks, deal <span class="text-physical">Physical DMG</span>, and temporariliy increase the <span class="text-physical">Physical DMG</span> taken by the enemy.',
    },
    {
        tag: "vulnerable",
        name: "Vulnerable",
        description:
            'Hitting an enemy for the first time with a skill with <span class="text-physical">Physical Status</span> applies Icon_Vulnerable <span class="text-physical">Vulnerable</span> instead of the actual Physical Status.<br>A <span class="text-physical">Vulnerable</span> enemy can be Icon_Lift <span class="text-physical">Lifted</span> and Icon_KnockDown <span class="text-physical">Knocked Down</span> to add more Vulnerable stacks (up to 4). Hitting a Vulnerable enemy with Icon_Crush <span class="text-physical">Crush</span> or Icon_Breach <span class="text-physical">Breach</span> will <u>consume</u> the Vulnerable stacks.',
    },
    {
        tag: "arts infliction",
        name: "Arts Infliction",
        description:
            '<span class="text-highlight">Arts Inflictions</span> are special Arts debuff inflicted upon the enemy. There are 4 Elements of Arts Inflctions: Icon_HeatInfliction <span class="text-heat">Heat Infliction</span>, Icon_ElectricInfliction <span class="text-electric">Electric Infliction</span>, Icon_CryoInfliction <span class="text-cryo">Cryo Infliction</span>, and Icon_NatureInfliction <span class="text-nature">Nature Infliction</span>.<br>Up to 4 stacks of <span class="text-highlight">Arts Inflictions</span> of the same Element can be applied.',
    },
    {
        tag: "arts reaction",
        name: "Arts Reaction",
        description:
            '<span class="text-highlight">Arts Reactions</span> are Arts debuffs that can be applied to the enemy. They include: Icon_Combustion <span class="text-heat">Combustion</span>, Icon_Electrification <span class="text-electric">Electrification</span>, Icon_Solidification <span class="text-cryo">Solidification</span>, and Icon_Corrosion <span class="text-nature">Corrosion</span>.',
    },
    {
        tag: "arts burst",
        name: "Arts Burst",
        description:
            '<span class="text-highlight">Arts Bursts</span> are triggered by stacking <span class="text-highlight">Arts Inflictions</span> of the same Elements. They include: <span class="text-heat">Heat Burst</span>, <span class="text-electric">Electric Burst</span>, <span class="text-cryo">Cryo Burst</span>, and <span class="text-nature">Nature Burst</span>.',
    },
    {
        tag: "arts amp",
        name: "Arts Amp",
        description:
            'Arts Amped targets temporarily deal more <span class="text-highlight">Arts DMG</span>. The number represents the degree of increase. Effects of the same type can stack.',
    },
    {
        tag: "electric infliction",
        name: "Arts Infliction: Electric",
        description:
            'Icon_ElectricInfliction <span class="text-electric">Electric Infliction</span> is a type of <span class="text-highlight">Arts Infliction</span>.<br>Up to 4 stacks of Icon_ElectricInfliction <span class="text-electric">Electric Infliction</span> can be applied and stacking triggers <span class="text-electric">Electric Burst</span>.<br>A <span class="text-highlight">non-Electric Infliction</span> (Icon_HeatInfliction/Icon_CryoInfliction/Icon_NatureInfliction) + Icon_ElectricInfliction <span class="text-electric">Electric Infliction</span> = Icon_Electrification <span class="text-electric">Electrification</span>',
    },
    {
        tag: "heat infliction",
        name: "Arts Infliction: Heat",
        description:
            'Icon_HeatInfliction <span class="text-heat">Heat Infliction</span> is a type of <span class="text-highlight">Arts Infliction</span>.<br>Up to 4 stacks of Icon_HeatInfliction <span class="text-heat">Heat Infliction</span> can be applied and stacking triggers <span class="text-heat">Heat Burst</span>.<br>A <span class="text-highlight">non-Heat Infliction</span> (Icon_ElectricInfliction/Icon_CryoInfliction/Icon_NatureInfliction) + Icon_HeatInfliction <span class="text-heat">Heat Infliction</span> = Icon_Combustion <span class="text-heat">Combustion</span>',
    },
    {
        tag: "cryo infliction",
        name: "Arts Infliction: Cryo",
        description:
            'Icon_CryoInfliction <span class="text-cryo">Cryo Infliction</span> is a type of <span class="text-highlight">Arts Infliction</span>.<br>Up to 4 stacks of Icon_CryoInfliction <span class="text-cryo">Cryo Infliction</span> can be applied and stacking triggers <span class="text-cryo">Cryo Burst</span>.<br>A <span class="text-highlight">non-Cryo Infliction</span> (Icon_HeatInfliction/Icon_ElectricInfliction/Icon_NatureInfliction) + Icon_CryoInfliction <span class="text-cryo">Cryo Infliction</span> = Icon_Solidification <span class="text-cryo">Solidification</span>',
    },
    {
        tag: "nature infliction",
        name: "Arts Infliction: Nature",
        description:
            'Icon_NatureInfliction <span class="text-nature">Nature Infliction</span> is a type of <span class="text-highlight">Arts Infliction</span>.<br>Up to 4 stacks of Icon_NatureInfliction <span class="text-nature">Nature Infliction</span> can be applied and stacking triggers <span class="text-nature">Nature Burst</span>.<br>A <span class="text-highlight">non-Nature Infliction</span> (Icon_HeatInfliction/Icon_ElectricInfliction/Icon_CryoInfliction) + Icon_NatureInfliction <span class="text-nature">Nature Infliction</span> = Icon_Corrosion <span class="text-nature">Corrosion</span>',
    },
    {
        tag: "electrification",
        name: "Arts Reaction: Electrification",
        description:
            'An enemy with Icon_Electrification <span class="text-electric">Electrification</span> takes more <span class="text-highlight">Arts DMG</span>.<br />Icon_Electrification <span class="text-electric">Electrification</span> = A <span class="text-highlight">non-Electric Infliction</span> (Icon_HeatInfliction/Icon_CryoInfliction/Icon_NatureInfliction) + Icon_ElectricInfliction <span class="text-electric">Electric Infliction</span>',
    },
    {
        tag: "combustion",
        name: "Arts Reaction: Combustion",
        description:
            'An enemy with Icon_Combustion <span class="text-heat">Combustion</span> takes <span class="text-heat">Heat DMG</span> over time.<br />Icon_Combustion <span class="text-heat">Combustion</span> = A <span class="text-highlight">non-Heat Infliction</span> (Icon_ElectricInfliction/Icon_CryoInfliction/Icon_NatureInfliction) + Icon_HeatInfliction <span class="text-heat">Heat Infliction</span>',
    },
    {
        tag: "solidification",
        name: "Arts Reaction: Solidification",
        description:
            'An enemy with Icon_Solidification <span class="text-cryo">Solidification</span> cannot move, and applying Icon_Vulnerable <span class="text-physical">Vulnerable</span> or a <span class="text-physical">Physical Status</span> to the enemy triggers the Icon_Shatter <span class="text-cryo">Shatter</span> effect.<br />Icon_Solidification <span class="text-cryo">Solidification</span> = A <span class="text-highlight">non-Cryo Infliction</span> (Icon_HeatInfliction/Icon_ElectricInfliction/Icon_NatureInfliction) + Icon_CryoInfliction <span class="text-cryo">Cryo Infliction</span>',
    },
    {
        tag: "amp",
        name: "Amp",
        description:
            "Amped targets deal more DMG of the Element it is Amped for. The number represents the degree of increase. Effects of the same type can stack.",
    },
    {
        tag: "cryo amp",
        name: "Cryo Amp",
        description:
            'Cryo Amped targets temporarily deal more <span class="text-cryo">Cryo DMG</span>. The number represents the degree of increase. Effects of the same type can stack.',
    },
    {
        tag: "electric amp",
        name: "Electric Amp",
        description:
            'Electric Amped targets temporarily deal more <span class="text-electric">Electric DMG</span>. The number represents the degree of increase. Effects of the same type can stack.',
    },
    {
        tag: "heat amp",
        name: "Heat Amp",
        description:
            'Heat Amped targets temporarily deal more <span class="text-heat">Heat DMG</span>. The number represents the degree of increase. Effects of the same type can stack.',
    },
    {
        tag: "nature amp",
        name: "Nature Amp",
        description:
            'Nature Amped targets temporarily deal more <span class="text-nature">Nature DMG</span>. The number represents the degree of increase. Effects of the same type can stack.',
    },
    {
        tag: "shield",
        name: "Shield",
        description:
            "The Shield can absorb damage while it is active. Some Shields may only absorb specific type(s) of DMG.",
    },
    {
        tag: "protection",
        name: "Protect",
        description:
            "Protected targets temporarily take reduced DMG. The number represents the degree of reduction. When there are multiple effects of the same type, only the most powerful applies.",
    },
    {
        tag: "dispel",
        name: "Dispel",
        description: "This removes specific debuffs from the Operator.",
    },
    {
        tag: "link",
        name: "Link",
        description:
            "Next Battle Skill or Ultimate cast by the team consumes the Link buff and deals more DMG, with Battle Skills getting a higher increase. Effects of the same type can stacks, but with diminishing returns.",
    },
    {
        tag: "physical susceptibility",
        name: "Physical Susceptibility",
        description:
            'Physical Susceptible targets temporarily take more <span class="text-physical">Physical DMG</span>. The number represents the degree of increase. Effects of the same type can stack.',
    },
    {
        tag: "cryo susceptibility",
        name: "Cryo Susceptibility",
        description:
            'Cryo Susceptible targets temporarily take more <span class="text-cryo">Cryo DMG</span>. The number represents the degree of increase. Effects of the same type can stack.',
    },
    {
        tag: "electric susceptibility",
        name: "Electric Susceptibility",
        description:
            'Electric Susceptible targets temporarily take more <span class="text-electric">Electric DMG</span>. The number represents the degree of increase. Effects of the same type can stack.',
    },
    {
        tag: "heat susceptibility",
        name: "Heat Susceptibility",
        description:
            'Heat Susceptible targets temporarily take more <span class="text-heat">Heat DMG</span>. The number represents the degree of increase. Effects of the same type can stack.',
    },
    {
        tag: "nature susceptibility",
        name: "Nature Susceptibility",
        description:
            'Nature Susceptible targets temporarily take more <span class="text-nature">Nature DMG</span>. The number represents the degree of increase. Effects of the same type can stack.',
    },
    {
        tag: "arts susceptibility",
        name: "Arts Susceptibility",
        description:
            "Arts Susceptible targets temporarily take more <span class=text-highlight>Arts DMG</span>. The number represents the degree of increase. Effects of the same type can stack.",
    },
    {
        tag: "slow",
        name: "Slow",
        description:
            "Slowed targets temporarily suffer movement speed reduction. The number represents the degree of reduction. When there are multiple effects of the same type, only the most powerful applies.",
    },
    {
        tag: "stagger node",
        name: "Stagger Node",
        description:
            'Some powerful enemies have <span class="text-header">Stagger Nodes</span>. Deal enough <span class="text-header">Stagger</span> to reach the <span class="text-header">Stagger Nodes</span> to interrupt such enemies and make them stumble.',
    },
    {
        tag: "shatter",
        name: "Shatter",
        description:
            'To an enemy with active Icon_Solidification <span class="text-cryo">Solidification</span>, applying Icon_Vulnerable <span class="text-physical">Vulnerable</span> or <span class="text-physical">Physical Status</span> effects will <span class="tooltip" data-tag="debuff consume">consume</span> the Icon_Solidification <span class="text-cryo">Solidification</span> to trigger Shatter that deals massive <span class="text-physical">Physical DMG</span>',
    },
    {
        tag: "dmg type",
        name: "DMG Type",
        description:
            'Damage can be divided into <span class="text-physical">Physical DMG</span>, <span class="text-highlight">Arts DMG</span>, and <span class="text-aether">Æther DMG</span>.<br><span class="text-highlight">Arts DMG</span> can be further divided into <span class="text-heat">Heat DMG</span>, <span class="text-electric">Electric DMG</span>, <span class="text-cryo">Cryo DMG</span>, and <span class="text-nature">Nature DMG</span>.',
    },
    {
        tag: "weaken",
        name: "Weaken",
        description:
            "Weakened targets temporarily deal reduced DMG. THe number represents the degree of reduction. Effects of the seame type can stack non-linearly.",
    },
    {
        tag: "originium crystal",
        name: "Originium Crystal",
        description:
            "The Endministrator's Combo Skill attaches Originium Crystals to enemies and immobilizes them.",
    },
];
