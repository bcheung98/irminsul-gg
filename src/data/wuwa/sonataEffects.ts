import { SonataEffect } from "@/types/wuwa/echo";

export const sonataEffects: SonataEffect[] = [
    {
        id: 1,
        name: "Freezing Frost",
        displayName: "Freezing Frost",
        setEffect: {
            "2": '<span class="text-glacio">Glacio DMG</span> +10%.',
            "5": '<span class="text-glacio">Glacio DMG</span> +10% after releasing Basic Attack or Heavy Attack. This effect stacks up to 3 times, each stack lasts 15s.',
        },
        release: {
            version: "1.0",
        },
    },
    {
        id: 2,
        name: "Molten Rift",
        displayName: "Molten Rift",
        setEffect: {
            "2": '<span class="text-fusion">Fusion DMG</span> +10%.',
            "5": '<span class="text-fusion">Fusion DMG</span> + 30% for 15s after releasing Resonance Skill.',
        },
        release: {
            version: "1.0",
        },
    },
    {
        id: 3,
        name: "Void Thunder",
        displayName: "Void Thunder",
        setEffect: {
            "2": '<span class="text-electro">Electro DMG</span> +10%.',
            "5": '<span class="text-electro">Electro DMG</span> +15% after releasing Heavy Attack or Resonance Skill. This effect stacks up to 2 times, each stack lasts 15s.',
        },
        release: {
            version: "1.0",
        },
    },
    {
        id: 4,
        name: "Sierra Gale",
        displayName: "Sierra Gale",
        setEffect: {
            "2": '<span class="text-aero">Aero DMG</span> +10%',
            "5": '<span class="text-aero">Aero DMG</span> +30% for 15s after releasing Intro Skill.',
        },
        release: {
            version: "1.0",
        },
    },
    {
        id: 5,
        name: "Celestial Light",
        displayName: "Celestial Light",
        setEffect: {
            "2": '<span class="text-spectro">Spectro DMG</span> + 10%.',
            "5": '<span class="text-spectro">Spectro DMG</span> + 30% for 15s after releasing Intro Skill.',
        },
        release: {
            version: "1.0",
        },
    },
    {
        id: 6,
        name: "Havoc Eclipse",
        displayName: "Havoc Eclipse",
        setEffect: {
            "2": '<span class="text-havoc">Havoc DMG</span> +10%.',
            "5": '<span class="text-havoc">Havoc DMG</span> +7.5% after releasing Basic Attack or Heavy Attack. This effect stacks up to 4 times, each stack lasts 15s.',
        },
        release: {
            version: "1.0",
        },
    },
    {
        id: 7,
        name: "Rejuvenating Glow",
        displayName: "Rejuvenating Glow",
        setEffect: {
            "2": "Healing Bonus +10%.",
            "5": "Increases the ATK of all party members by 15% for 30s upon healing allies.",
        },
        release: {
            version: "1.0",
        },
    },
    {
        id: 8,
        name: "Moonlit Clouds",
        displayName: "Moonlit Clouds",
        setEffect: {
            "2": "Energy Regen +10%.",
            "5": "After using Outro Skill, increases the ATK of the next Resonator by 22.5% for 15s.",
        },
        release: {
            version: "1.0",
        },
    },
    {
        id: 9,
        name: "Lingering Tunes",
        displayName: "Lingering Tunes",
        setEffect: {
            "2": "ATK +10%.",
            "5": "While on the field, ATK increases by 5% every 1.5s. This effect stacks up to 4 stacks. Outro Skill DMG +60%.",
        },
        release: {
            version: "1.0",
        },
    },
    {
        id: 10,
        name: "Frosty Resolve",
        displayName: "Frosty Resolve",
        setEffect: {
            "2": "Resonance Skill DMG +12%.",
            "5": 'Casting Resonance Liberation grants 30% <span class="text-glacio">Glacio DMG Bonus</span> and 30% Resonance Skill DMG Bonus for 6s.',
        },
        release: {
            version: "2.0",
        },
    },
    {
        id: 11,
        name: "Eternal Radiance",
        displayName: "Eternal Radiance",
        setEffect: {
            "2": '<span class="text-spectro">Spectro DMG</span> + 10%.',
            "5": 'Inflicting enemies with <span class="text-spectro">Spectro Frazzle</span> increases Crit. Rate by 20% for 15s. Attacking enemies with 10 stacks of <span class="text-spectro">Spectro Frazzle</span> grants 15% <span class="text-spectro">Spectro DMG Bonus</span> for 15s.',
        },
        release: {
            version: "2.0",
        },
    },
    {
        id: 12,
        name: "Midnight Veil",
        displayName: "Midnight Veil",
        setEffect: {
            "2": '<span class="text-havoc">Havoc DMG</span> +10%.',
            "5": 'Triggering Outro Skill deals additional 480% <span class="text-havoc">Havoc DMG</span> to surrounding enemies, and grants the incoming Resonator 15% <span class="text-havoc">Havoc DMG Bonus</span> fo 15s.',
        },
        release: {
            version: "2.0",
        },
    },
    {
        id: 13,
        name: "Empyrean Anthem",
        displayName: "Empyrean Anthem",
        setEffect: {
            "2": "Energy Regen +10%.",
            "5": "Increase the Resonator's Coordinated Attack DMG by 80%. Upon a critical hit of Coordinated Attack, increase the active Resonator's ATK by 20% for 4s.",
        },
        release: {
            version: "2.0",
        },
    },
    {
        id: 14,
        name: "Tidebreaking Courage",
        displayName: "Tidebreaking Courage",
        setEffect: {
            "2": "Energy Regen +10%.",
            "5": "The Resonator's ATK is increased by 15%. When reaching 250% Energy Regen, the Resonator gains 30% all Attribute DMG increase.",
        },
        release: {
            version: "2.0",
        },
    },
    {
        id: 15,
        name: "Gusts of Welkin",
        displayName: "Gusts of Welkin",
        setEffect: {
            "2": '<span class="text-aero">Aero DMG</span> +10%.',
            "5": 'Inflicting <span class="text-aero">Aero Erosion</span> upon enemies increases <span class="text-aero">Aero DMG</span> for all Resonators in the team by 15%, and for the Resonator triggering this effect by an additional 15%, lasting for 20s.',
        },
        release: {
            version: "2.3",
        },
    },
    {
        id: 16,
        name: "Windward Pilgrimage",
        displayName: "Windward Pilgrimage",
        setEffect: {
            "2": '<span class="text-aero">Aero DMG</span> +10%.',
            "5": 'Hitting a target with <span class="text-aero">Aero Erosion</span> increases Crit. Rate by 10% and grants <span class="text-aero">Aero DMG Bonus</span>, lasting for 10s.',
        },
        release: {
            version: "2.4",
        },
    },
    {
        id: 17,
        name: "Flaming Clawprint",
        displayName: "Flaming Clawprint",
        setEffect: {
            "2": '<span class="text-fusion">Fusion DMG</span> +10%.',
            "5": 'Casting Resonance Liberation increases <span class="text-fusion">Fusion DMG</span> of Resonators in the team by 15% and the caster\'s Resonance Liberation DMG by 20%, lasting for 35s.',
        },
        release: {
            version: "2.4",
        },
    },
    {
        id: 18,
        name: "Dream of the Lost",
        displayName: "Dream of the Lost",
        setEffect: {
            "3": "Holding 0 Resonance Energy increases Crit. Rate by 20% and grants 35% Echo Skill DMG Bonus.",
        },
        release: {
            version: "2.5",
        },
    },
    {
        id: 19,
        name: "Crown of Valor",
        displayName: "Crown of Valor",
        setEffect: {
            "3": "Upon gaining a Shield, increase the Resonator's ATK by 6% and Crit. DMG by 4% for 4s. This effect can be triggered once every 0.5s and stacks up to 5 times.",
        },
        release: {
            version: "2.6",
        },
    },
    {
        id: 20,
        name: "Law of Harmony",
        displayName: "Law of Harmony",
        setEffect: {
            "3": "Casting Echo Skill grants 30% Heavy Attack DMG Bonus to the caster for 4s. Additionally, all Resonators in the team gain 4% Echo Skill DMG Bonus for 30s, stacking up to 4 times. Echoes of the same name can only trigger this effect once. The record of Echo triggering this effect is cleared along with this effect. At 4 stacks, casting Echo Skill again resets the duration of this effect.",
        },
        release: {
            version: "2.6",
        },
    },
    {
        id: 21,
        name: "Flamewing's Shadow",
        displayName: "Flamewing's Shadow",
        setEffect: {
            "3": 'Dealing Echo Skill DMG increases Heavy Attack Crit. Rate by 20% for 6s. Dealing Heavy Attack DMG increases Echo Skill Crit. Rate by 20% for 6s. While both effects are active, gain 16% <span class="text-fusion">Fusion DMG Bonus</span>.',
        },
        release: {
            version: "2.7",
        },
    },
    {
        id: 22,
        name: "Thread of Severed Fate",
        displayName: "Thread of Severed Fate",
        setEffect: {
            "3": 'Inflicting <span class="text-havoc">Havoc Bane</span> increases the Resonator\'s ATK by 20% and grants 30% Resonance Liberation DMG Bonus for 5s.',
        },
        release: {
            version: "2.8",
        },
    },
    {
        id: 23,
        name: "Pact of Neonlight Leap",
        displayName: "Pact of Neonlight Leap",
        setEffect: {
            "2": '<span class="text-spectro">Spectro DMG</span> + 10%.',
            "5": "After casting Outro Skill, additionally increases ATK of the next Resonator entering with Intro Skill by 0.3% up to 15% for 15s or until the Resonator is switched out.",
        },
        release: {
            version: "3.0",
        },
    },
    {
        id: 24,
        name: "Halo of Starry Radiance",
        displayName: "Halo of Starry Radiance",
        setEffect: {
            "2": "Healing Bonus + 10%.",
            "5": "When a Resonator heals an ally, every 1% points of Off-Tune Buildup Rate grants 0.2% All-Attribute DMG Bonus to all Resonators in the team, up to 25% for 4s.",
        },
        release: {
            version: "3.0",
        },
    },
    {
        id: 25,
        name: "Rite of Gilded Revelation",
        displayName: "Rite of Gilded Revelation",
        setEffect: {
            "2": '<span class="text-spectro">Spectro DMG</span> + 10%.',
            "5": 'Dealing Basic Attack DMG increases <span class="text-spectro">Spectro DMG</span> by 10%, stacking up to 3 times for 5s. With 3 stacks, casting Resonance Liberation grants 40% Basic Attack DMG Bonus.',
        },
        release: {
            version: "3.0",
        },
    },
];
