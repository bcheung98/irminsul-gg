import { GameData } from "@/types";
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

export function useRarityColors(): GameData<(rarity?: number) => string> {
    return {
        genshin: getGenshinRarityColor,
        hsr: getHSRRarityColor,
        wuwa: getWuWaRarityColor,
        zzz: getZZZRarityColor,
        uma: getUmaRarityColor,
        endfield: getEndfieldRarityColor,
    };
}

export function useBackgroundRarityColors(): GameData<
    (rarity: number, opacity?: number) => string
> {
    return {
        genshin: getGenshinBackgroundColor,
        hsr: getHSRBackgroundColor,
        wuwa: getWuWaBackgroundColor,
        zzz: getZZZBackgroundColor,
        uma: getUmaBackgroundColor,
        endfield: getEndfieldBackgroundColor,
    };
}
