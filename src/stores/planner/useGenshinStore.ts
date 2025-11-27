import {
    CombinedPlannerSlice,
    GamePlannerSlice,
    PlannerSlice,
} from "../usePlannerStore";
import { StateCreator } from "zustand";

export type GenshinPlannerSlice = GamePlannerSlice<"genshin", PlannerSlice>;

export const createGenshinSlice: StateCreator<
    CombinedPlannerSlice,
    [["zustand/persist", unknown]],
    [],
    GenshinPlannerSlice
> = (set) => ({
    "genshin/totalCost": {},
    "genshin/characters": [],
    "genshin/weapons": [],
    "genshin/hidden": [],
    "genshin/setCharacters": function (characters) {
        return set(() => ({}));
    },
    "genshin/setWeapons": function (weapons) {
        return set(() => ({}));
    },
    "genshin/updateCharacterCosts": function () {
        return set(() => ({}));
    },
    "genshin/updateWeaponCosts": function () {
        return set(() => ({}));
    },
    "genshin/updateTotalCosts": function () {
        return set(() => ({}));
    },
    "genshin/toggleHidden": function (id) {
        return set(() => ({}));
    },
});
