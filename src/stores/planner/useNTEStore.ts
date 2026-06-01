import {
    CombinedPlannerSlice,
    GamePlannerSlice,
    PlannerSlice,
} from "../usePlannerStore";
import { StateCreator } from "zustand";

export type NTEPlannerSlice = GamePlannerSlice<"nte", PlannerSlice>;

export const createNTESlice: StateCreator<
    CombinedPlannerSlice,
    [["zustand/persist", unknown]],
    [],
    NTEPlannerSlice
> = (set, get) => ({
    "nte/totalCost": {},
    "nte/items": [],
    "nte/hidden": [],
    "nte/setItems": function (items) {
        return set((state) => ({
            ...state,
            ["nte/items"]: items,
        }));
    },
    "nte/setItemValues": function ({ id, skillKey, values }) {
        const items = get()["nte/items"];
        if (items.length > 0) {
            const index = items.findIndex((item) => item.id === id);
            if (index === -1) {
                throw new Error(`Could not find item with ID ${id}`);
            }
            items[index].values[skillKey] = values;
            return set((state) => ({
                ...state,
                ["nte/items"]: items,
            }));
        }
    },
    "nte/setHiddenItems": function (id) {
        const hidden = get()["nte/hidden"];
        !hidden.includes(id)
            ? hidden.push(id)
            : hidden.splice(hidden.indexOf(id), 1);
        return set(() => ({ "nte/hidden": hidden }));
    },
    "nte/updateTotalCosts": function (id, costs) {
        const totalCosts = get()["nte/totalCost"];
        const itemIDs = get()["nte/items"].map((item) => item.id);
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
            ["nte/totalCost"]: totalCosts,
        }));
    },
});
