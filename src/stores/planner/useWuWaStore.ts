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
> = (set, get) => ({
    "wuwa/totalCost": {},
    "wuwa/items": [],
    "wuwa/hidden": [],
    "wuwa/setItems": function (items) {
        return set((state) => ({
            ...state,
            ["wuwa/items"]: items,
        }));
    },
    "wuwa/setItemValues": function ({ id, skillKey, values }) {
        const items = get()["wuwa/items"];
        if (items.length > 0) {
            const index = items.findIndex((item) => item.id === id);
            if (index === -1) {
                throw new Error(`Could not find item with ID ${id}`);
            }
            items[index].values[skillKey] = values;
            return set((state) => ({
                ...state,
                ["wuwa/items"]: items,
            }));
        }
    },
    "wuwa/setHiddenItems": function (id) {
        const hidden = get()["wuwa/hidden"];
        !hidden.includes(id)
            ? hidden.push(id)
            : hidden.splice(hidden.indexOf(id), 1);
        return set(() => ({ "wuwa/hidden": hidden }));
    },
    "wuwa/updateTotalCosts": function (id, costs) {
        const totalCosts = get()["wuwa/totalCost"];
        const itemIDs = get()["wuwa/items"].map((item) => item.id);
        Object.keys(totalCosts).forEach((costID) => {
            if (!itemIDs.includes(costID)) {
                delete totalCosts[costID];
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
            ["wuwa/totalCost"]: totalCosts,
        }));
    },
});
