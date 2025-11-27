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
> = (set, get) => ({
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
        const hidden = [...get()["genshin/hidden"]];
        !hidden.includes(id)
            ? hidden.push(id)
            : hidden.splice(hidden.indexOf(id), 1);
        return set(() => ({ "genshin/hidden": hidden }));
    },
});
