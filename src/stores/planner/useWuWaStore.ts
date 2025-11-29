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
    "wuwa/setItemValues": function () {
        return set(() => ({}));
    },
    "wuwa/setHiddenItems": function (id) {
        return set(() => ({}));
    },
    "wuwa/updateTotalCosts": function () {
        return set(() => ({}));
    },
});
