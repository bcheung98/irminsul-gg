import {
    CombinedPlannerSlice,
    GamePlannerSlice,
    PlannerSlice,
} from "../usePlannerStore";
import { StateCreator } from "zustand";

export type HSRPlannerSlice = GamePlannerSlice<"hsr", PlannerSlice>;

export const createHSRSlice: StateCreator<
    CombinedPlannerSlice,
    [["zustand/persist", unknown]],
    [],
    HSRPlannerSlice
> = (set) => ({
    "hsr/totalCost": {},
    "hsr/characters": [],
    "hsr/weapons": [],
    "hsr/hidden": [],
    "hsr/setCharacters": function (characters) {
        return set(() => ({}));
    },
    "hsr/setWeapons": function (weapons) {
        return set(() => ({}));
    },
    "hsr/updateCharacterCosts": function () {
        return set(() => ({}));
    },
    "hsr/updateWeaponCosts": function () {
        return set(() => ({}));
    },
    "hsr/updateTotalCosts": function () {
        return set(() => ({}));
    },
    "hsr/toggleHidden": function (id) {
        return set(() => ({}));
    },
});
