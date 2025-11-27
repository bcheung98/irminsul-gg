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
    "wuwa/items": [],
    "wuwa/hidden": [],
    "wuwa/setItems": function (items) {
        return set(() => ({}));
    },
    "wuwa/updateItemCosts": function () {
        return set(() => ({}));
    },
    "wuwa/updateTotalCosts": function () {
        return set(() => ({}));
    },
    "wuwa/toggleHidden": function (id) {
        return set(() => ({}));
    },
});
