import type { Game } from "@/types";
import {
    getGenshinBackgroundColor,
    getGenshinRarityColor,
} from "./genshin/rarityColors";
import { getHSRBackgroundColor, getHSRRarityColor } from "./hsr/rarityColors";
import {
    getWuWaBackgroundColor,
    getWuWaRarityColor,
} from "./wuwa/rarityColors";
import { getZZZBackgroundColor, getZZZRarityColor } from "./zzz/rarityColors";
import { getUmaBackgroundColor, getUmaRarityColor } from "./uma/rarityColors";
import {
    getEndfieldBackgroundColor,
    getEndfieldRarityColor,
} from "./endfield/rarityColors";
import { getNTEBackgroundColor, getNTERarityColor } from "./nte/rarityColors";

export function getRarityColors(game: Game, rarity: number): string {
    switch (game) {
        case "genshin":
            return getGenshinRarityColor(rarity);
        case "hsr":
            return getHSRRarityColor(rarity);
        case "wuwa":
            return getWuWaRarityColor(rarity);
        case "zzz":
            return getZZZRarityColor(rarity);
        case "uma":
            return getUmaRarityColor(rarity);
        case "endfield":
            return getEndfieldRarityColor(rarity);
        case "nte":
            return getNTERarityColor(rarity);
    }
}

export function getBackgroundRarityColors(
    game: Game,
    rarity: number,
    opacity?: number,
): string {
    switch (game) {
        case "genshin":
            return getGenshinBackgroundColor(rarity, opacity);
        case "hsr":
            return getHSRBackgroundColor(rarity, opacity);
        case "wuwa":
            return getWuWaBackgroundColor(rarity, opacity);
        case "zzz":
            return getZZZBackgroundColor(rarity, opacity);
        case "uma":
            return getUmaBackgroundColor(rarity, opacity);
        case "endfield":
            return getEndfieldBackgroundColor(rarity, opacity);
        case "nte":
            return getNTEBackgroundColor(rarity, opacity);
    }
}
