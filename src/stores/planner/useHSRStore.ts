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
    "hsr/items": [],
    "hsr/hidden": [],
    "hsr/setItems": function (items) {
        return set(() => ({}));
    },
    "hsr/updateItemCosts": function () {
        return set(() => ({}));
    },
    "hsr/updateTotalCosts": function () {
        return set(() => ({}));
    },
    "hsr/toggleHidden": function (id) {
        return set(() => ({}));
    },
});
