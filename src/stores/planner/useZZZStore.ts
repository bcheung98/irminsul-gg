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
    "zzz/items": [],
    "zzz/hidden": [],
    "zzz/setItems": function (items) {
        return set(() => ({}));
    },
    "zzz/updateItemCosts": function () {
        return set(() => ({}));
    },
    "zzz/updateTotalCosts": function () {
        return set(() => ({}));
    },
    "zzz/toggleHidden": function (id) {
        return set(() => ({}));
    },
});
