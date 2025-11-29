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
> = (set, get) => ({
    "hsr/totalCost": {},
    "hsr/items": [],
    "hsr/hidden": [],
    "hsr/setItems": function (items) {
        return set((state) => ({
            ...state,
            ["hsr/items"]: items,
        }));
    },
    "hsr/setItemValues": function ({ id, skillKey, values }) {
        const items = get()["hsr/items"];
        if (items.length > 0) {
            const index = items.findIndex((item) => item.id === id);
            if (index === -1) {
                throw new Error(`Could not find item with ID ${id}`);
            }
            items[index].values[skillKey] = values;
            return set((state) => ({
                ...state,
                ["hsr/items"]: items,
            }));
        }
    },
    "hsr/setHiddenItems": function (id) {
        const hidden = get()["hsr/hidden"];
        !hidden.includes(id)
            ? hidden.push(id)
            : hidden.splice(hidden.indexOf(id), 1);
        return set(() => ({ "hsr/hidden": hidden }));
    },
    "hsr/updateTotalCosts": function (id, costs) {
        const totalCosts = get()["hsr/totalCost"];
        const itemIDs = get()["hsr/items"].map((item) => item.id);
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
            ["hsr/totalCost"]: totalCosts,
        }));
    },
});
