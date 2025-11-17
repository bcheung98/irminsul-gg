import { GameData } from "@/types";
import {
    getGenshinBackgroundColor,
    getGenshinRarityColor,
} from "./genshin/rarityColors";

export function useRarityColors(): GameData<(rarity?: number) => string> {
    return {
        genshin: getGenshinRarityColor,
        hsr: function (rarity?: number): string {
            throw new Error("Function not implemented.");
        },
        wuwa: function (rarity?: number): string {
            throw new Error("Function not implemented.");
        },
        zzz: function (rarity?: number): string {
            throw new Error("Function not implemented.");
        },
        uma: function (rarity?: number): string {
            throw new Error("Function not implemented.");
        },
    };
}

export function useBackgroundRarityColors(): GameData<
    (rarity: number, opacity?: number) => string
> {
    return {
        genshin: getGenshinBackgroundColor,
        hsr: function (rarity?: number): string {
            throw new Error("Function not implemented.");
        },
        wuwa: function (rarity?: number): string {
            throw new Error("Function not implemented.");
        },
        zzz: function (rarity?: number): string {
            throw new Error("Function not implemented.");
        },
        uma: function (rarity?: number): string {
            throw new Error("Function not implemented.");
        },
    };
}
