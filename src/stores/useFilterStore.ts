import { create } from "zustand";
import { GenshinCharacterFilterState } from "@/components/_genshin/CharacterFilters";

export interface FilterState {
    "genshin/character": GenshinCharacterFilterState;
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

export const genshinFilters: GenshinCharacterFilterState = {
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

export const initialState: FilterState = {
    "genshin/character": genshinFilters,
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
