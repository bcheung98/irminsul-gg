import { GenshinCharacter, GenshinWeapon } from "@/types/genshin";
import { StateCreator } from "zustand";

export interface GenshinSlice {
    totalCost: Record<string, any>;
    genshinSetCharacters: (characters: GenshinCharacter[]) => void;
    genshinSetWeapons: (weapons: GenshinWeapon[]) => void;
    genshinUpdateCharacterCosts: () => void;
    genshinUpdateWeaponCosts: () => void;
}

export const createGenshinSlice: StateCreator<
    GenshinSlice,
    [],
    [],
    GenshinSlice
> = (set) => ({
    totalCost: {},
    genshinSetCharacters: function (characters) {
        return set(() => ({}));
    },
    genshinSetWeapons: function (weapons) {
        return set(() => ({}));
    },
    genshinUpdateCharacterCosts: function () {
        return set(() => ({}));
    },
    genshinUpdateWeaponCosts: function () {
        return set(() => ({}));
    },
});
