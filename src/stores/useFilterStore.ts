import { create } from "zustand";
import { GenshinCharacterFilterState } from "@/components/_genshin/Filters/CharacterFilters";
import { GenshinWeaponFilterState } from "@/components/_genshin/Filters/WeaponFilters";

export interface FilterState {
    "genshin/characters": GenshinCharacterFilterState;
    "genshin/weapons": GenshinWeaponFilterState;
}

export type SetFilterState = (
    key: keyof FilterState,
    tag: string,
    filters: (string | number)[]
) => void;

export type ClearFilterState = (
    key: keyof FilterState,
    initialState: Record<string, (string | number)[]>
) => void;

export interface FilterActions {
    setFilterState: SetFilterState;
    clearFilterState: ClearFilterState;
}

export type FilterStore = FilterState & FilterActions;

export const genshinCharacterFilters: GenshinCharacterFilterState = {
    element: [],
    weaponType: [],
    rarity: [],
    ascStat: [],
    talentBook: [],
    commonMat: [],
    bossMat: [],
    weeklyBossMat: [],
    localMat: [],
    nation: [],
};

export const genshinWeaponFilters: GenshinWeaponFilterState = {
    weaponType: [],
    rarity: [],
    subStat: [],
    weaponAscensionMat: [],
    eliteMat: [],
    commonMat: [],
};

export const initialState: FilterState = {
    "genshin/characters": genshinCharacterFilters,
    "genshin/weapons": genshinWeaponFilters,
};

export const useFilterStore = create<FilterStore>((set) => ({
    ...initialState,
    setFilterState: function (key, tag, filters) {
        return set((state) => ({
            [`${key}`]: { ...state[key], [`${tag}`]: filters },
        }));
    },
    clearFilterState: function (key, initialState) {
        return set(() => ({ [`${key}`]: initialState }));
    },
}));
