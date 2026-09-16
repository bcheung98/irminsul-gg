import { EndfieldGearSet } from "@/types/endfield/gear";

export const gearSets: EndfieldGearSet[] = [
    {
        id: 100,
        stringId: "wuling00",
        name: "AIC Fieldwork",
        displayName: "AIC Fieldwork",
        setEffect: {
            "3": '3-piece set effect: Wearers gain DMG Dealt <span class="text-value">+20%</span> for all types of DMG, <span class="text-value">+10%</span> DMG Reduction against all types of DMG, and Ultimate Gain Efficiency <span class="text-value">+10%</span>.',
        },
        levels: [60],
    },
    {
        id: 101,
        stringId: "stragi01",
        name: "AIC Heavy",
        displayName: "AIC Heavy",
        setEffect: {
            "3": 'Wearer\'s HP <span class="text-value">+500</span>. After the wearer defeats an enemy, the wearer restores <span class="text-value">100</span> HP. Effect trigger cooldown: <span class="text-value">5</span>s.',
        },
        levels: [28],
    },
    {
        id: 102,
        stringId: "wisdwill01",
        name: "AIC Light",
        displayName: "AIC Light",
        setEffect: {
            "3": 'Wearer\'s HP <span class="text-value">+500</span>. After the wearer defeats an enemy, the wearer gains ATK <span class="text-value">+20</span> for <span class="text-value">5</span>s.',
        },
        levels: [28],
    },
    {
        id: 103,
        stringId: "str01",
        name: "Armored MSGR",
        displayName: "Armored MSGR",
        setEffect: {
            "3": 'Wearer\'s Strength <span class="text-value">+50</span>. When the wearer\'s HP is below 50%, the wearer gains <span class="text-value">30%</span> DMG Reduction against all types of damage.',
        },
        levels: [36, 50],
    },
    {
        id: 104,
        stringId: "agi01",
        name: "Roving MSGR",
        displayName: "Roving MSGR",
        setEffect: {
            "3": 'Wearer\'s Agility <span class="text-value">+50</span>. When the wearer\'s HP is above 80%, <span class=\"text-physical\">Physical DMG</span> <span class="text-value">+20%</span>.',
        },
        levels: [36, 50],
    },
    {
        id: 105,
        stringId: "wisd01",
        name: "Mordvolt Insulation",
        displayName: "Mordvolt Insulation",
        setEffect: {
            "3": 'Wearer\'s Intellect <span class="text-value">+50</span>. When the wearer\'s HP is above 80%, <span class=\"text-highlight\">Arts DMG</span> <span class="text-value">+20%</span>.',
        },
        levels: [36, 50],
    },
    {
        id: 106,
        stringId: "will01",
        name: "Mordvolt Resistant",
        displayName: "Mordvolt Resistant",
        setEffect: {
            "3": 'Wearer\'s Will <span class="text-value">+50</span>. When the wearer\'s HP is below 50%, Treatment Effect <span class="text-value">+30%</span>.',
        },
        levels: [36, 50],
    },
    {
        id: 107,
        stringId: "atk01",
        name: "Aburrey's Legacy",
        displayName: "Aburrey's Legacy",
        setEffect: {
            "3": 'Wearer\'s Skill DMG <span class="text-value">+24%</span>. When the wearer casts a battle skill, combo skill, or ultimate, the wearer gains ATK <span class="text-value">+5%</span> for <span class="text-value">15</span>s. The buff from each of the three skill types is unique and does not stack with itself.',
        },
        levels: [50],
    },
    {
        id: 108,
        stringId: "usp01",
        name: "Catastrophe",
        displayName: "Catastrophe",
        setEffect: {
            "3": 'Wearer\'s Ultimate Gain Efficiency <span class="text-value">+20%</span>. The wearer casts a battle skill, the action <span class=\"tooltip\" data-tag=\"sp return\">returns</span> <span class="text-value">+50</span> SP. This effect only triggers 1 time per battle.',
        },
        levels: [50],
    },
    {
        id: 109,
        stringId: "phy01",
        name: "Swordmancer",
        displayName: "Swordmancer",
        setEffect: {
            "3": 'Wearer\'s Stagger Efficiency Bonus <span class="text-value">+20%</span>. After the wearer applies a <span class="tooltip-physical" data-tag="physical status">Physical Status</span>, the wearer also performs 1 hit that deals <span class="text-value">+250%</span> ATK of <span class=\"text-physical\">Physical DMG</span class=\"text-physical\"> and <span class="text-header">10</span> Stagger. Effect trigger cooldown: <span class="text-value">15</span>s.',
        },
        levels: [70],
    },
    {
        id: 110,
        stringId: "heal01",
        name: "LYNX",
        displayName: "LYNX",
        setEffect: {
            "3": 'Wearer\'s HP Treatment Efficiency <span class="text-value">+20%</span>. After the wearer gives HP treatment to an allied target, that target also gains <span class="text-value">+15%</span> DMG Reduction against all types of DMG for <span class="text-value">10</span>s. If the said treatment exceeds the target\'s Max HP, the target gains <span class="text-value">+30%</span> DMG Reduction against all types of DMG. The aforementioned effects cannot stack.',
        },
        levels: [70],
    },
    {
        id: 111,
        stringId: "poise01",
        name: "Ethertech",
        displayName: "Æthertech",
        setEffect: {
            "3": 'Wearer\'s ATK <span class="text-value">+8%</span>. After the wearer applies Icon_Vulnerable <span class=\"tooltip-physical\" data-tag=\"vulnerable\">Vulnerability</span>, the wearer gains <span class="text-physical">Physical DMG</span> <span class="text-value">+8%</span> for <span class="text-value">15</span>s. This effect can reach 4 stacks. If the target already has 4 stack(s) of Icon_Vulnerable <span class=\"tooltip-physical\" data-tag=\"vulnerable\">Vulnerability</span>, the wearer gains an additional <span class="text-physical">Physical DMG</span> <span class="text-value">+16%</span> for <span class="text-value">10</span>s. This effect cannot stack.',
        },
        levels: [70],
    },
    {
        id: 112,
        stringId: "attri01",
        name: "Bonekrusha",
        displayName: "Bonekrusha",
        setEffect: {
            "3": 'Wearer\'s ATK <span class="text-value">+15%</span>. When the wearer casts a combo skill, the wearer gains 1 stack of <span class=\"text-highlight\">Bonekrushing Smash</span> that grants the wearer\'s next battle skill DMG Dealt <span class="text-value">+30%</span>. <span class=\"text-highlight\">Bonekrushing Smash</span> can stack 2 time(s).',
        },
        levels: [70],
    },
    {
        id: 113,
        stringId: "pulse_cryst01",
        name: "Pulser Labs",
        displayName: "Pulser Labs",
        setEffect: {
            "3": 'Wearer\'s Arts Intensity <span class="text-value">+30</span>. After the wearer applies Icon_Electrification <span class="tooltip-electric" data-tag="electrification">Electrification</span>, the wearer gains <span class="text-electric">Electric DMG</span> <span class="text-value">+50%</span> for <span class="text-value">10s</span>. After the wearer applies Icon_Solidification <span class="tooltip-cryo" data-tag="solidification">Solidification</span>, the wearer gains <span class="text-cryo">Cryo DMG</span> <span class="text-value">+50%</span> for <span class="text-value">10</span>s. The aforementioned effects cannot stack.',
        },
        levels: [70],
    },
    {
        id: 114,
        stringId: "atb01",
        name: "Frontiers",
        displayName: "Frontiers",
        setEffect: {
            "3": 'Wearer\'s Combo Skill Cooldown Reduction <span class="text-value">+15%</span>. After the wearer\'s skill recovers SP, the team gains DMG <span class="text-value">+16%</span> for <span class="text-value">15</span>s. This effect cannot stack.',
        },
        levels: [70],
    },
    {
        id: 115,
        stringId: "fire_natr01",
        name: "Hot Work",
        displayName: "Hot Work",
        setEffect: {
            "3": 'Wearer\'s Arts Intensity <span class="text-value">+30</span>. After the wearer applies Icon_Combustion <span class=\"tooltip-heat\" data-tag=\"combustion\">Combustion</span>, the wearer gains <span class=\"text-heat\">Heat DMG</span> <span class="text-value">+50%</span> for <span class="text-value">10</span>s. After the wearer applies Icon_Corrosion <span class=\"tooltip-nature\" data-tag=\"corrosion\">Corrosion</span>, the wearer gains <span class=\"text-nature\">Nature DMG</span> <span class="text-value">+50%</span> for <span class="text-value">10</span>s. The aforementioned effects cannot stack.',
        },
        levels: [70],
    },
    {
        id: 116,
        stringId: "criti01",
        name: "MI Security",
        displayName: "MI Security",
        setEffect: {
            "3": 'Wearer\'s Critical Rate <span class="text-value">+5%</span>. After the wearer scores a critical hit, the wearer gains ATK <span class="text-value">+5%</span> for 5s. This effect can reach 5 stacks. At max stacks, grant an additional Critical Rate <span class="text-value">+5%</span>. This effect cannot stack.',
        },
        levels: [70],
    },
    {
        id: 117,
        stringId: "atk02",
        name: "Type 50 Yinglung",
        displayName: "Type 50 Yinglung",
        setEffect: {
            "3": 'Wearer\'s ATK <span class="text-value">+15%</span>. When any operator in the team casts a battle skill, the wearer gains 1 stack of <span class="text-highlight">Yinglung\'s Edge</span> that gives DMG <span class="text-value">+20%</span> to the wearer\'s next combo skill. <span class="text-highlight">Yinglung\'s Edge</span> can stack 3 time(s).',
        },
        levels: [70],
    },
    {
        id: 118,
        stringId: "burst01",
        name: "Tide Surge",
        displayName: "Tide Surge",
        setEffect: {
            "3": 'Wearer\'s Skill DMG Dealt <span class="text-value">+20%</span>. After the wearer applies 2 or more stacks of <span class=\"tooltip-highlight\" data-tag=\"arts infliction\">Arts Infliction</span> on the enemy, the wearer gains <span class=\"text-highlight\">Arts DMG Dealt</span> <span class="text-value">+35%</span> for <span class="text-value">15</span>s. This effect cannot stack.',
        },
        levels: [70],
    },
    {
        id: 119,
        stringId: "usp02",
        name: "Eternal Xiranite",
        displayName: "Eternal Xiranite",
        setEffect: {
            "3": 'Wearer\'s HP <span class="text-value">+1000</span>. After the wearer applies Icon_Amp <span class=\"tooltip-highlight\" data-tag=\"amp\">Amp</span>, Icon_Protect <span class=\"tooltip-highlight\" data-tag=\"protection\">Protected</span>, Icon_Susceptibility <span class=\"tooltip-highlight\" data-tag=\"susceptibility\">Susceptibility</span>, or Icon_Weaken <span class=\"tooltip-highlight\" data-tag=\"weaken\">Weakened</span>, other teammates gain DMG Dealt <span class="text-value">+16%</span> for <span class="text-value">15</span>s. This effect cannot stack.',
        },
        levels: [70],
    },
    {
        id: 120,
        stringId: "combo_cd01",
        name: "Qingbo",
        displayName: "Qingbo",
        setEffect: {
            "3": 'Wearer\'s Combo Skill Cooldown Reduction <span class="text-value">+15%</span>. When the wearer casts a combo skill, the wearer gains Skill DMG Dealt <span class="text-value">+20%</span> (for every skill) for 15s. This effect can reach 2 stacks. Duration of each stack is counted separately.',
        },
        levels: [70],
    },
    {
        id: 121,
        stringId: "expend_spell01",
        name: "Xiranflow",
        displayName: "Xiranflow",
        setEffect: {
            "3": 'Wearer\'s ATK <span class="text-value">+10%</span>. Whenever the wearer <span class="tooltip" data-tag="debuff consume">consumes</span> Icon_Electrification <span class="tooltip-electric" data-tag="electrification">Electrification</span> or Icon_Corrosion <span class="tooltip-nature" data-tag="corrosion">Corrosion</span>, the wearer gains a number of buff stacks equal to the <span class="tooltip-highlight" data-tag="status level">Status Level</span> of the Arts Reaction consumed, with each buff stack giving <span class="text-electric">Electric DMG Dealt</span> and <span class="text-nature">Nature DMG Dealt</span> <span class="text-value">+15%</span> for 25s. The number of buff stacks maxes out at 3 stacks. Duration of each stack is counted separately.',
        },
        levels: [70],
    },
    {
        id: 122,
        stringId: "crush_fracture",
        name: "Grizzled Edge",
        displayName: "Grizzled Edge",
        setEffect: {
            "3": 'Wearer\'s ATK <span class="text-value">+8%</span>. When the wearer applies Icon_Crush <span class="tooltip-physical" data-tag="crush">Crush</span> or Icon_Breach <span class="tooltip-physical" data-tag="breach">Breach</span>, the wearer gains <span class="text-physical">Physical DMG Dealt</span> <span class="text-value">+[6% × Max number of Icon_Vulnerable <span class="tooltip-physical" data-tag="vulnerable">Vulnerability</span> stacks <span class="tooltip-value" data-tag="debuff consume">consumed</span> from one enemy]</span> for 20s. If the target already has Icon_PhysicalSusceptibility <span class="tooltip-physical" data-tag="physical susceptibility">Physical Susceptibility</span>, is <span class="text-header">Staggered</span>, or has attached <span class="tooltip-highlight" data-tag="originium crystal">Originium Crystals</span>, increase the aforementioned buff to <span class="text-value">1.5</span> times. This buff cannot stack.',
        },
        levels: [70],
    },
    {
        id: 123,
        stringId: "spellburst",
        name: "Deep Rampart",
        displayName: "Deep Rampart",
        setEffect: {
            "3": 'Wearer\'s Arts DMG Dealt <span class="text-value">+16%</span>. When the wearer applies <span class="tooltip-nature" data-tag="nature burst">Nature Burst</span> or <span class="tooltip-cryo" data-tag="cryo burst">Cryo Burst</span>, the wearer gains Arts Intensity <span class="text-value">+16</span> for 20s. Max stacks for this effect: 3. Duration of each stack is counted separately. Effect only triggers once every 0.1s.',
        },
        levels: [70],
    },
];

export const nonSetGear: EndfieldGearSet[] = [
    {
        id: 1101,
        stringId: "t0_parts_tundra01",
        name: "Basic",
        displayName: "Basic",
        setEffect: {},
        levels: [10],
    },
    {
        id: 1201,
        stringId: "t1_parts_tundra01",
        name: "Miner Alpha",
        displayName: "Miner α",
        setEffect: {},
        levels: [20, 28],
    },
    {
        id: 1301,
        stringId: "t2_parts_tundra01",
        name: "Miner Beta",
        displayName: "Miner β",
        setEffect: {},
        levels: [36],
    },
    {
        id: 1401,
        stringId: "t3_parts_tundra01",
        name: "Miner Gamma",
        displayName: "Miner γ",
        setEffect: {},
        levels: [50],
    },
    {
        id: 1502,
        stringId: "t4_parts_wuling01",
        name: "Redeemer",
        displayName: "Redeemer",
        setEffect: {},
        levels: [70],
    },
    {
        id: 1503,
        stringId: "t4_parts_wuling02",
        name: "Rift Trekker",
        displayName: "Rift Trekker",
        setEffect: {},
        levels: [70],
    },
];
