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
> = (set, get) => ({
    "zzz/totalCost": {},
    "zzz/items": [],
    "zzz/hidden": [],
    "zzz/setItems": function (items) {
        return set((state) => ({
            ...state,
            ["zzz/items"]: items,
        }));
    },
    "zzz/setItemValues": function ({ id, skillKey, values }) {
        const items = get()["zzz/items"];
        if (items.length > 0) {
            const index = items.findIndex((item) => item.id === id);
            if (index === -1) {
                throw new Error(`Could not find item with ID ${id}`);
            }
            items[index].values[skillKey] = values;
            return set((state) => ({
                ...state,
                ["zzz/items"]: items,
            }));
        }
    },
    "zzz/setHiddenItems": function (id) {
        const hidden = get()["zzz/hidden"];
        !hidden.includes(id)
            ? hidden.push(id)
            : hidden.splice(hidden.indexOf(id), 1);
        return set(() => ({ "zzz/hidden": hidden }));
    },
    "zzz/updateTotalCosts": function (id, costs) {
        const totalCosts = get()["zzz/totalCost"];
        const itemIDs = get()["zzz/items"].map((item) => item.id);
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
            ["zzz/totalCost"]: totalCosts,
        }));
    },
});
