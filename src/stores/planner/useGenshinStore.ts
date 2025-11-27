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
    "genshin/items": [],
    "genshin/hidden": [],
    "genshin/setItems": function (items) {
        return set(() => ({}));
    },
    "genshin/updateItemCosts": function () {
        return set(() => ({}));
    },
    "genshin/updateTotalCosts": function () {
        return set(() => ({}));
    },
    "genshin/toggleHidden": function (id) {
        return set(() => ({}));
    },
});
