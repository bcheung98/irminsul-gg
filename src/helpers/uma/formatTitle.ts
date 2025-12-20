import { rarityMap } from "@/data/uma/common";
import { UmaCharacter, UmaSupport } from "@/types/uma";
import { UmaScenario } from "@/types/uma/scenario";

export function formatTitle(item?: UmaCharacter | UmaSupport | UmaScenario) {
    if (!item) return "";
    if ("aptitude" in item) {
        return formatCharacterTitle(item);
    } else if ("specialty" in item) {
        return formatSupportTitle(item);
    } else {
        return item.name;
    }
}

export function formatCharacterTitle(item?: UmaCharacter) {
    if (!item) return "";
    return `${item.name} (${item.outfit || "Original"})`;
}

export function formatSupportTitle(item?: UmaSupport) {
    if (!item) return "";
    return `${item.name} (${rarityMap[item.rarity]} ${item.specialty})`;
}
