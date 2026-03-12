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
    | "CRIT Rate"
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
    description?: string;
}

export const gearStats: Record<GearStat, GearStatInfo> = {
    DEF: {
        title: "DEF",
    },
    HP: {
        title: "HP",
    },
    ATK: {
        title: "Attack",
    },
    Strength: {
        title: "Strength",
    },
    Agility: {
        title: "Agility",
    },
    Intellect: {
        title: "Intellect",
    },
    Will: {
        title: "Will",
    },
    "Main Attribute Boost": {
        title: "Main Attribute Boost",
    },
    "Secondary Attribute Boost": {
        title: "Secondary Attribute Boost",
    },
    "CRIT Rate": {
        title: "Critical Rate",
    },
    "Arts DMG": {
        title: "Arts DMG Dealt Bonus",
    },
    "Arts Intensity": {
        title: "Arts Intensity",
    },
    "Ultimate Gain Efficiency": {
        title: "Ultimate Gain Efficiency",
    },
    "Treatment Efficiency": {
        title: "Treatment Efficiency",
    },
    "All Skill DMG": {
        title: "All Skill DMG Dealt Bonus",
    },
    "Basic Attack DMG": {
        title: "Basic Attack DMG Bonus",
    },
    "Battle Skill DMG": {
        title: "Battle Skill DMG Bonus",
    },
    "Combo Skill DMG": {
        title: "Combo Skill DMG Bonus",
    },
    "Ultimate DMG": {
        title: "Ultimate DMG Bonus",
    },
    "Final DMG Reduction": {
        title: "Final DMG Reduction",
    },
    "Physical DMG": {
        title: "Physical DMG Bonus",
    },
    "Cryo Electric DMG": {
        title: "Cryo and Electric DMG Dealt Bonus",
    },
    "Heat Nature DMG": {
        title: "Heat and Nature DMG Dealt Bonus",
    },
    "Stagger DMG": {
        title: "DMG Bonus vs. Staggered",
    },
};
