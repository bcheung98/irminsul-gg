import {
    CombinedPlannerSlice,
    GamePlannerSlice,
    PlannerSlice,
} from "../usePlannerStore";
import { StateCreator } from "zustand";

export type WuWaPlannerSlice = GamePlannerSlice<"wuwa", PlannerSlice>;

export const createWuWaSlice: StateCreator<
    CombinedPlannerSlice,
    [["zustand/persist", unknown]],
    [],
    WuWaPlannerSlice
> = (set) => ({
    "wuwa/totalCost": {},
    "wuwa/characters": [],
    "wuwa/weapons": [],
    "wuwa/hidden": [],
    "wuwa/setCharacters": function (characters) {
        return set(() => ({}));
    },
    "wuwa/setWeapons": function (weapons) {
        return set(() => ({}));
    },
    "wuwa/updateCharacterCosts": function () {
        return set(() => ({}));
    },
    "wuwa/updateWeaponCosts": function () {
        return set(() => ({}));
    },
    "wuwa/updateTotalCosts": function () {
        return set(() => ({}));
    },
    "wuwa/toggleHidden": function (id) {
        return set(() => ({}));
    },
});
