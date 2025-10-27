import { create } from "zustand";
import { GenshinCharacterFilterState } from "@/components/_genshin/CharacterFilters";
import { Filters } from "@/types";

export interface FilterState {
    "genshin/character": GenshinCharacterFilterState;
}

export interface FilterActions {
    setFilterState: (key: keyof FilterState, filters: Filters) => void;
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
    setFilterState: function (key, filters) {
        return set(() => ({ [`${key}`]: filters }));
    },
}));
