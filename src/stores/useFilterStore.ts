import { create } from "zustand";
import { GenshinCharacterFilterState } from "@/components/_genshin/Filters/CharacterFilters";
import { GenshinWeaponFilterState } from "@/components/_genshin/Filters/WeaponFilters";
import { HSRCharacterFilterState } from "@/components/_hsr/Filters/CharacterFilters";
import { HSRWeaponFilterState } from "@/components/_hsr/Filters/WeaponFilters";
import { WuWaCharacterFilterState } from "@/components/_wuwa/Filters/CharacterFilters";
import { WuWaWeaponFilterState } from "@/components/_wuwa/Filters/WeaponFilters";
import { WuWaEchoFilterState } from "@/components/_wuwa/Filters/EchoFilters";
import { ZZZCharacterFilterState } from "@/components/_zzz/Filters/CharacterFilters";
import { ZZZWeaponFilterState } from "@/components/_zzz/Filters/WeaponFilters";

export interface FilterState {
    "genshin/characters": GenshinCharacterFilterState;
    "genshin/weapons": GenshinWeaponFilterState;
    "hsr/characters": HSRCharacterFilterState;
    "hsr/weapons": HSRWeaponFilterState;
    "wuwa/characters": WuWaCharacterFilterState;
    "wuwa/weapons": WuWaWeaponFilterState;
    "wuwa/echoes": WuWaEchoFilterState;
    "zzz/characters": ZZZCharacterFilterState;
    "zzz/weapons": ZZZWeaponFilterState;
    "uma/characters": {};
    "uma/weapons": {};
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

export const hsrCharacterFilters: HSRCharacterFilterState = {
    element: [],
    weaponType: [],
    rarity: [],
    calyxMat: [],
    commonMat: [],
    bossMat: [],
    weeklyBossMat: [],
    nation: [],
};

export const hsrWeaponFilters: HSRWeaponFilterState = {
    weaponType: [],
    rarity: [],
    calyxMat: [],
    commonMat: [],
};

export const wuwaCharacterFilters: WuWaCharacterFilterState = {
    element: [],
    weaponType: [],
    rarity: [],
    combatRoles: [],
    _combatRoles: ["true"],
    forgeryMat: [],
    commonMat: [],
    localMat: [],
    bossMat: [],
    weeklyBossMat: [],
};

export const wuwaWeaponFilters: WuWaWeaponFilterState = {
    weaponType: [],
    rarity: [],
    subStat: [],
    forgeryMat: [],
    commonMat: [],
};

export const wuwaEchoFilters: WuWaEchoFilterState = {
    echoRarity: [],
    sonata: [],
    _sonata: ["true"],
};

export const zzzCharacterFilters: ZZZCharacterFilterState = {
    element: [],
    weaponType: [],
    attackType: [],
    rarity: [],
    bossMat: [],
    weeklyBossMat: [],
    nation: [],
};

export const zzzWeaponFilters: ZZZWeaponFilterState = {
    weaponType: [],
    rarity: [],
    subStat: [],
};

export const initialState: FilterState = {
    "genshin/characters": genshinCharacterFilters,
    "genshin/weapons": genshinWeaponFilters,
    "hsr/characters": hsrCharacterFilters,
    "hsr/weapons": hsrWeaponFilters,
    "wuwa/characters": wuwaCharacterFilters,
    "wuwa/weapons": wuwaWeaponFilters,
    "wuwa/echoes": wuwaEchoFilters,
    "zzz/characters": zzzCharacterFilters,
    "zzz/weapons": zzzWeaponFilters,
    "uma/characters": {},
    "uma/weapons": {},
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
