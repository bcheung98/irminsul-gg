export type GearStat =
    | "DEF"
    | "HP"
    | "ATK"
    | "Strength"
    | "Agility"
    | "Intellect"
    | "Will"
    | "Main Attribute Boost"
    | "Secondary Attribute Boost"
    | "Crit Rate"
    | "Arts DMG"
    | "Arts Intensity"
    | "Ultimate Gain Efficiency"
    | "Treatment Efficiency"
    | "All Skill DMG"
    | "Basic Attack DMG"
    | "Battle Skill DMG"
    | "Combo Skill DMG"
    | "Ultimate DMG"
    | "Final DMG Reduction"
    | "Physical DMG"
    | "Cryo Electric DMG"
    | "Heat Nature DMG"
    | "Stagger DMG";

interface GearStatInfo {
    title: string;
    icon?: string;
    description?: string;
}

export const gearStats: Record<GearStat, GearStatInfo> = {
    DEF: {
        title: "DEF",
        icon: "DEF",
    },
    HP: {
        title: "HP",
        icon: "HP",
    },
    ATK: {
        title: "Attack",
        icon: "ATK",
    },
    Strength: {
        title: "Strength",
        icon: "STR",
    },
    Agility: {
        title: "Agility",
        icon: "AGI",
    },
    Intellect: {
        title: "Intellect",
        icon: "INT",
    },
    Will: {
        title: "Will",
        icon: "WIL",
    },
    "Main Attribute Boost": {
        title: "Main Attribute Boost",
        icon: "Main Attribute Boost",
    },
    "Secondary Attribute Boost": {
        title: "Secondary Attribute Boost",
        icon: "Secondary Attribute Boost",
    },
    "Crit Rate": {
        title: "Critical Rate",
        icon: "Crit Rate",
    },
    "Arts DMG": {
        title: "Arts DMG Bonus",
        icon: "Arts DMG Bonus",
    },
    "Arts Intensity": {
        title: "Arts Intensity",
        icon: "Arts Intensity",
    },
    "Ultimate Gain Efficiency": {
        title: "Ultimate Gain Efficiency",
        icon: "Ultimate Gain Efficiency",
    },
    "Treatment Efficiency": {
        title: "Treatment Bonus",
        icon: "Treatment Bonus",
    },
    "All Skill DMG": {
        title: "All Skill DMG Bonus",
        icon: "Main Attribute Boost",
    },
    "Basic Attack DMG": {
        title: "Basic Attack DMG Bonus",
        icon: "Main Attribute Boost",
    },
    "Battle Skill DMG": {
        title: "Battle Skill DMG Bonus",
        icon: "Main Attribute Boost",
    },
    "Combo Skill DMG": {
        title: "Combo Skill DMG Bonus",
        icon: "Main Attribute Boost",
    },
    "Ultimate DMG": {
        title: "Ultimate DMG Bonus",
        icon: "Main Attribute Boost",
    },
    "Final DMG Reduction": {
        title: "Final DMG Reduction",
        icon: "DEF",
    },
    "Physical DMG": {
        title: "Physical DMG Bonus",
        icon: "Physical DMG Bonus",
    },
    "Cryo Electric DMG": {
        title: "Cryo and Electric DMG Bonus",
        icon: "Cryo Electric DMG Bonus",
    },
    "Heat Nature DMG": {
        title: "Heat and Nature DMG Bonus",
        icon: "Heat Nature DMG Bonus",
    },
    "Stagger DMG": {
        title: "DMG Bonus vs. Staggered",
        icon: "Stagger",
    },
};
