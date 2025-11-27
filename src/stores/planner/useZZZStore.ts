import {
    CombinedPlannerSlice,
    GamePlannerSlice,
    PlannerSlice,
} from "../usePlannerStore";
import { StateCreator } from "zustand";

export type ZZZPlannerSlice = GamePlannerSlice<"zzz", PlannerSlice>;

export const createZZZSlice: StateCreator<
    CombinedPlannerSlice,
    [["zustand/persist", unknown]],
    [],
    ZZZPlannerSlice
> = (set) => ({
    "zzz/totalCost": {},
    "zzz/characters": [],
    "zzz/weapons": [],
    "zzz/hidden": [],
    "zzz/setCharacters": function (characters) {
        return set(() => ({}));
    },
    "zzz/setWeapons": function (weapons) {
        return set(() => ({}));
    },
    "zzz/updateCharacterCosts": function () {
        return set(() => ({}));
    },
    "zzz/updateWeaponCosts": function () {
        return set(() => ({}));
    },
    "zzz/updateTotalCosts": function () {
        return set(() => ({}));
    },
    "zzz/toggleHidden": function (id) {
        return set(() => ({}));
    },
});
