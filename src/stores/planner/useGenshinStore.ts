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
        return set((state) => ({
            ...state,
            ["genshin/items"]: items,
        }));
    },
    "genshin/setItemValues": function ({ id, skillKey, values }) {
        const items = get()["genshin/items"];
        if (items.length > 0) {
            const index = items.findIndex((item) => item.id === id);
            if (index === -1) {
                throw new Error(`Could not find item with ID ${id}`);
            }
            items[index].values[skillKey] = values;
            return set((state) => ({
                ...state,
                ["genshin/items"]: items,
            }));
        }
    },
    "genshin/setHiddenItems": function (id) {
        const hidden = get()["genshin/hidden"];
        !hidden.includes(id)
            ? hidden.push(id)
            : hidden.splice(hidden.indexOf(id), 1);
        return set(() => ({ "genshin/hidden": hidden }));
    },
    "genshin/updateTotalCosts": function (id, costs) {
        const totalCosts = get()["genshin/totalCost"];
        const itemIDs = get()["genshin/items"].map((item) => item.id);
        Object.keys(totalCosts).forEach((costID) => {
            if (!itemIDs.includes(Number(costID))) {
                delete totalCosts[Number(costID)];
            }
        });
        if (id !== undefined && costs !== undefined) {
            if (totalCosts[id] === undefined) {
                totalCosts[id] = {};
            }
            totalCosts[id] = costs;
        }
        return set((state) => ({
            ...state,
            ["genshin/totalCost"]: totalCosts,
        }));
    },
});
