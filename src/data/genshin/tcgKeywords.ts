import { SkillKeyword } from "@/types/skill";
import {
    Melt,
    Vaporize,
    Overloaded,
    Burning,
    Crystallize,
    Swirl,
    ElectroCharged,
    Frozen,
    Bloom,
    Superconduct,
    Quicken,
} from "./tcgReactions";

export const tcgKeywords: SkillKeyword[] = [
    // Elements
    {
        tag: "physical",
        name: "Physical DMG",
        icon: "genshin/tcg/icons/elements/Physical",
        description:
            "Physical DMG will not apply any Elements, nor can it engage in Elemental Reactions.",
    },
    {
        tag: "piercing",
        name: "Piercing DMG",
        description:
            "Piercing DMG cannot be increased by any bonuses, but cannot be defended against using Shields or DMG Immunity either.",
    },
    {
        tag: "pyro",
        name: `<span class="text-pyro">Pyro DMG</span>`,
        icon: "genshin/tcg/icons/elements/Pyro",
        description: `Applies Icon_Pyro Pyro and can trigger the following Elemental Reactions:<br />
            ${Melt({ element: "Pyro" })}<br />
            ${Vaporize({ element: "Pyro" })}<br />
            ${Overloaded({ element: "Pyro" })}<br />
            ${Burning({ element: "Pyro" })}`,
    },
    {
        tag: "pyro reaction",
        name: `<span class="text-pyro">Pyro-Related Reactions</span>`,
        icon: "genshin/tcg/icons/elements/Pyro",
        description: `
            ${Melt({ element: "Pyro" })}<br />
            ${Vaporize({ element: "Pyro" })}<br />
            ${Overloaded({ element: "Pyro" })}<br />
            ${Burning({ element: "Pyro" })}<br />
            ${Crystallize({ element: "Pyro" })}<br />
            ${Swirl({ element: "Pyro" })}<br />`,
    },
    {
        tag: "hydro",
        name: `<span class="text-hydro">Hydro DMG</span>`,
        icon: "genshin/tcg/icons/elements/Hydro",
        description: `Applies Icon_Hydro Hydro and can trigger the following Elemental Reactions:<br />
            ${Vaporize({ element: "Hydro" })}<br />
            ${ElectroCharged({ element: "Hydro" })}<br />
            ${Frozen({ element: "Hydro" })}<br />
            ${Bloom({ element: "Hydro" })}`,
    },
    {
        tag: "hydro reaction",
        name: `<span class="text-hydro">Hydro-Related Reactions</span>`,
        icon: "genshin/tcg/icons/elements/Hydro",
        description: `
            ${Vaporize({ element: "Hydro" })}<br />
            ${ElectroCharged({ element: "Hydro" })}<br />
            ${Frozen({ element: "Hydro" })}<br />
            ${Bloom({ element: "Hydro" })}}<br />
            ${Crystallize({ element: "Hydro" })}<br />
            ${Swirl({ element: "Hydro" })}<br />`,
    },
    {
        tag: "hydro application",
        name: `<span class="text-hydro">Hydro Application</span>`,
        icon: "genshin/tcg/icons/elements/Hydro",
        description: `When Icon_Hydro Hydro is applied without dealing any DMG, the Elemental Reaction triggered will ignore DMG-dealing effects:<br />
            ${Vaporize({ element: "Hydro", application: true })}<br />
            ${ElectroCharged({
                element: "Hydro",
                application: true,
            })}<br />
            ${Frozen({ element: "Hydro", application: true })}<br />
            ${Bloom({ element: "Hydro", application: true })}`,
    },
    {
        tag: "electro",
        name: `<span class="text-electro">Electro DMG</span>`,
        icon: "genshin/tcg/icons/elements/Electro",
        description: `Applies Icon_Electro Electro and can trigger the following Elemental Reactions:<br />
            ${Overloaded({ element: "Electro" })}<br />
            ${Superconduct({ element: "Electro" })}<br />
            ${ElectroCharged({ element: "Electro" })}<br />
            ${Quicken({ element: "Electro" })}`,
    },
    {
        tag: "electro reaction",
        name: `<span class="text-electro">Electro-Related Reactions</span>`,
        icon: "genshin/tcg/icons/elements/Electro",
        description: `
            ${Overloaded({ element: "Electro" })}<br />
            ${Superconduct({ element: "Electro" })}<br />
            ${ElectroCharged({ element: "Electro" })}<br />
            ${Quicken({ element: "Electro" })}<br />
            ${Crystallize({ element: "Electro" })}<br />
            ${Swirl({ element: "Electro" })}<br />`,
    },
    {
        tag: "electro application",
        name: `<span class="text-electro">Electro Application</span>`,
        icon: "genshin/tcg/icons/elements/Electro",
        description: `When Icon_Electro Electro is applied without dealing any DMG, the Elemental Reactions triggered will ignore DMG-dealing effects:<br />
            ${Overloaded({
                element: "Electro",
                application: true,
            })}<br />
            ${Superconduct({
                element: "Electro",
                application: true,
            })}<br />
            ${ElectroCharged({
                element: "Electro",
                application: true,
            })}<br />
            ${Quicken({ element: "Electro", application: true })}`,
    },
    {
        tag: "cryo",
        name: `<span class="text-cryo">Cryo DMG</span>`,
        icon: "genshin/tcg/icons/elements/Cryo",
        description: `Applies Icon_Cryo Cryo and can trigger the following Elemental Reactions:<br />
            ${Melt({ element: "Cryo" })}<br />
            ${Superconduct({ element: "Cryo" })}<br />
            ${Frozen({ element: "Cryo" })}`,
    },
    {
        tag: "cryo reaction",
        name: `<span class="text-cryo">Cryo-Related Reactions</span>`,
        icon: "genshin/tcg/icons/elements/Cryo",
        description: `
            ${Frozen({ element: "Cryo" })}<br />
            ${Melt({ element: "Cryo" })}<br />
            ${Superconduct({ element: "Cryo" })}<br />
            ${Swirl({ element: "Cryo" })}<br />
            ${Crystallize({ element: "Cryo" })}`,
    },
    {
        tag: "anemo",
        name: `<span class="text-anemo">Anemo DMG</span>`,
        icon: "genshin/tcg/icons/elements/Anemo",
        description: `Reacts with Elements if they are already applied:<br />
            ${Swirl({ element: "Pyro" })}<br />
            ${Swirl({ element: "Hydro" })}<br />
            ${Swirl({ element: "Electro" })}<br />
            ${Swirl({ element: "Cryo" })}`,
    },
    {
        tag: "anemo reaction",
        name: `<span class="text-anemo">Anemo-Related Reactions</span>`,
        icon: "genshin/tcg/icons/elements/Anemo",
        description: `
            ${Swirl({ element: "Pyro" })}<br />
            ${Swirl({ element: "Hydro" })}<br />
            ${Swirl({ element: "Electro" })}<br />
            ${Swirl({ element: "Cryo" })}`,
    },
    {
        tag: "geo",
        name: `<span class="text-geo">Geo DMG</span>`,
        icon: "genshin/tcg/icons/elements/Geo",
        description: `Reacts with Elements if they are already applied:<br />
            ${Crystallize({ element: "Pyro" })}<br />
            ${Crystallize({ element: "Hydro" })}<br />
            ${Crystallize({ element: "Electro" })}<br />
            ${Crystallize({ element: "Cryo" })}`,
    },
    {
        tag: "geo application",
        name: `<span class="text-geo">Geo Application</span>`,
        icon: "genshin/tcg/icons/elements/Geo",
        description: `When Geo is applied without dealing any DMG, the Elemental Reaction triggered will ignore DMG-dealing effects:<br />
            ${Crystallize({
                element: "Pyro",
                application: true,
            })}<br />
            ${Crystallize({
                element: "Hydro",
                application: true,
            })}<br />
            ${Crystallize({
                element: "Electro",
                application: true,
            })}<br />
            ${Crystallize({ element: "Cryo", application: true })}`,
    },
    {
        tag: "dendro",
        name: `<span class="text-dendro">Dendro DMG</span>`,
        icon: "genshin/tcg/icons/elements/Dendro",
        description: `Applies Icon_Dendro Dendro and can trigger the following Elemental Reactions:<br />
            ${Bloom({ element: "Dendro" })}<br />
            ${Burning({ element: "Dendro" })}<br />
            ${Quicken({ element: "Dendro" })}`,
    },
    {
        tag: "dendro reaction",
        name: `<span class="text-dendro">Dendro-Related Reactions</span>`,
        icon: "genshin/tcg/icons/elements/Dendro",
        description: `
            ${Bloom({ element: "Dendro" })}<br />
            ${Burning({ element: "Dendro" })}<br />
            ${Quicken({ element: "Dendro" })}`,
    },

    // Dice
    {
        tag: "omni element",
        name: "Omni Element",
        icon: "genshin/tcg/icons/dice_alt/O",
        description: `The Omni Element can be considered as any kind of element, and can be used to pay for costs of various kinds.`,
    },
    {
        tag: "unaligned element",
        name: "Unaligned Element",
        icon: "genshin/tcg/icons/dice_alt/U",
        description: `You may use Elemental Dice of any element to pay this type of cost.`,
    },
    {
        tag: "pyro element",
        name: `<span class="text-highlight">Pyro</span>`,
        icon: "genshin/tcg/icons/dice_alt/P",
        description: `Spend the Icon_PyroDice <span class="text-pyro">Pyro</span> Dice you have rolled to pay for this cost.<br />
            (Icon_OmniDice Omni Dice may also be used to pay for this.)`,
    },
    {
        tag: "energy",
        name: "Energy",
        icon: "genshin/tcg/icons/dice_alt/N",
        description: `Characters must consume Icon_Energy Energy to use their Elemental Bursts.<br />
            When characters use an Elemental Skill or a Normal Attack, they will gain 1 Icon_Energy Energy.`,
    },

    // Combat
    {
        tag: "charged attack",
        name: "Charged Attack",
        description: `Before your Action Phase, should the total number of your Elemental Dice be even, your Normal Attack will be considered a Charged Attack.`,
    },
    {
        tag: "plunging attack",
        name: "Plunging Attack",
        description: `After a character is switched in to be the Active Character, should their next Combat Action within this Round be a Normal Attack, it will be considered a Plunging Attack for the instance.`,
    },
    {
        tag: "elemental burst",
        name: "Elemental Burst",
        description:
            "When the character's Icon_Energy Energy is maxed out, you can consume that Icon_Energy Energy to use a powerful Elemental Burst.",
    },
    {
        tag: "passive",
        name: "Passive Skill",
        description:
            "This Skill is constantly in effect and does not need to be activated.",
    },
    {
        tag: "technique",
        name: "Technique",
        icon: "genshin/tcg/icons/subtypes/Technique",
        description: `When the active character is equipped with a Icon_Technique <span class="text-description">Technique</span> card, they can use the corresponding Icon_Technique <span class="text-description">Technique</span>.<br />
            Using a Icon_Technique <span class="text-description">Technique</span> counts as a Combat Action. If the character is unable to use Skills due to conditions like Frozen, Petrification, or Stun, they are also unable to use the Icon_Technique <span class="text-description">Technique</span>.<br />
            Using a Icon_Technique <span class="text-description">Technique</span> is not considered as using a Skill. Therefore, it cannot trigger effects such as "After using a skill" or "After the character triggers an Elemental Reaction." Damage dealt by using a Icon_Technique <span class="text-description">Technique</span> is not considered Damage dealt by the character.`,
    },
    {
        tag: "shield",
        name: "Shield",
        icon: "genshin/tcg/icons/Shield",
        description: `This Shield will be consumed to protect the character who equips it from DMG.`,
    },

    // Actions
    {
        tag: "combat action",
        name: "Combat Action",
        description: `After you finish 1 Combat Action, it will be your opponent's turn.<br />
            <span class="text-primary">Playing a card from your Hand with this rule is also a Combat Action rather than a Fast Action</span>.`,
    },
    {
        tag: "fast action",
        name: "Fast Action",
        description: `You can continue with other actions after conducting 1 Fast action.<br />
            Only after conducting 1 Combat Action will the turn pass over to your opponent.`,
    },
    {
        tag: "prepare",
        name: "Prepare Skill",
        description: `Some Skills cannot be used directly. Instead they need to be <span class="text-primary">prepared</span> over a certain number of turns.<br />
            When it is a certain player's turn, and this player's active character is currently <span class="text-primary">preparing</span> a Skill, this player's turn will be skipped. If the Skill has finished being <span class="text-primary">prepared</span>, the character will directly use that Skill at this time. (Skills that require <span class="text-primary">preparing</span> cannot activate effects triggered by "using a Skill")<br />
            Only active characters can <span class="text-primary">prepare</span> Skills, and if an active character who is <span class="text-primary">preparing</span> a Skill gets switched off-field, their <span class="text-primary">preparation</span> will be interrupted.`,
    },

    // Terms
    {
        tag: "duration",
        name: "Duration (Rounds)",
        description: `Each time you reach the end of a Round, <span class="text-primary">Duration (Rounds)</span> -1.<br />
            This card will be discarded immediately once <span class="text-primary">Duration (Rounds)</span> runs out.`,
    },
    {
        tag: "usages",
        name: "Usage(s)",
        description: `After this card's effect is triggered, 1 <span class="text-primary">Usage</span> of it will be consumed.<br />
            This card will be discarded immediately once it has 0 <span class="text-primary">Usages</span> remaining.`,
    },
    {
        tag: "immunity to defeat",
        name: "Immunity to Defeat",
        description: `Certain effects will grant characters an <span class="text-primary">immunity to being defeated</span> when their HP hits 0, and will heal them for a certain amount thereafter.<br />
            When this occurs, characters will not be regarded as having experienced a <span class="text-primary">defeat</span>.<br />
            (Hence, their attached equipment and statuses will not be removed, and their Energy will remain uncleared.)`,
    },
    {
        tag: "char closest to current active char",
        name: "Character Closest to Your Current Active Character",
        description: `The opposing "character closest to your current active character" is the opposing character whose position is closest to that of your active character.<br />
            If multiple such characters exist, the one with the foremost position will be viewed as being "closest".`,
    },
    {
        tag: "discard",
        name: "Discard",
        description: `Use Action Cards or Character Skill effects to Discard Action Cards from Hand or Deck.`,
    },
    {
        tag: "tune",
        name: "Tune",
        description: `Discard Action Cards from Hand to initiate Elemental Tuning.`,
    },
    {
        tag: "select",
        name: "Select",
        description: `Select 1 card from a specific number of cards and activate its effects.`,
    },
    {
        tag: "satiated",
        name: "Satiated",
        description: `You cannot consume more Icon_Food Food this Round`,
    },
    {
        tag: "adventure",
        name: "Adventure",
        description: `<span class="tooltip-select">Select</span> 1 available adventure spot to create.<br />If you already have an adventure spot, its Adventure Experience will be increased by 1.`,
    },

    // Misc
    {
        tag: "bountiful core",
        name: "Bountiful Core",
        description:
            '<span class="text-primary">End Phase:</span> Deal 2 Icon_Dendro <span class="tooltip-dendro">Dendro DMG</span>.<br /><span class="tooltip-usages">Usage(s):</span> <span class="text-primary">1</span> (Can stack, max 3 stacks)<br /><span class="text-primary">When you declare the end of your Round:</span> If this summon has at least 2 Usages remaining, deal 2 Icon_Dendro <span class="tooltip-dendro">Dendro DMG</span>. (Consumes <span class="text-primary">Usages</span>)',
    },
];
