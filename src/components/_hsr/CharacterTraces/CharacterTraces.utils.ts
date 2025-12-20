import { BonusStat } from "@/types/hsr/character";

export function formatCharacterBonusStats(stat: BonusStat) {
    if (stat.endsWith("DMG Boost")) {
        const element = stat.split(" ")[0];
        return `<span class="text-${element.toLowerCase()}">${element} DMG</span>`;
    } else {
        return stat;
    }
}

export function formatCharacterBonusStatTitle(stat: BonusStat) {
    switch (stat) {
        case "HP":
        case "ATK":
        case "DEF":
        case "SPD":
        case "CRIT Rate":
        case "CRIT DMG":
        case "Effect RES":
        case "Effect Hit Rate":
            return `${stat} Boost`;
        case "Break Effect":
            return "Break Boost";
        case "Physical DMG Boost":
        case "Fire DMG Boost":
        case "Ice DMG Boost":
        case "Lightning DMG Boost":
        case "Wind DMG Boost":
        case "Quantum DMG Boost":
        case "Imaginary DMG Boost":
            return `DMG Boost: ${stat.split(" ")[0]}`;
        default:
            return "";
    }
}

export function formatCharacterBonusStatDescription(
    stat: BonusStat,
    value: string
) {
    switch (stat) {
        case "HP":
        case "ATK":
        case "DEF":
        case "SPD":
        case "CRIT Rate":
        case "CRIT DMG":
        case "Effect RES":
        case "Effect Hit Rate":
        case "Break Effect":
            return `${stat} increases by ${value}`;
        case "Physical DMG Boost":
        case "Fire DMG Boost":
        case "Ice DMG Boost":
        case "Lightning DMG Boost":
        case "Wind DMG Boost":
        case "Quantum DMG Boost":
        case "Imaginary DMG Boost":
            return `<span class="text-${stat.split(" ")[0].toLowerCase()}">${
                stat.split(" ")[0]
            } DMG</span> increases by ${value}`;
        default:
            return "";
    }
}
