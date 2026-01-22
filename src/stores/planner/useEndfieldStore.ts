import {
    CombinedPlannerSlice,
    GamePlannerSlice,
    PlannerSlice,
} from "../usePlannerStore";
import { StateCreator } from "zustand";

export type EndfieldPlannerSlice = GamePlannerSlice<"endfield", PlannerSlice>;

export const createEndfieldSlice: StateCreator<
    CombinedPlannerSlice,
    [["zustand/persist", unknown]],
    [],
    EndfieldPlannerSlice
> = (set, get) => ({
    "endfield/totalCost": {},
    "endfield/items": [],
    "endfield/hidden": [],
    "endfield/setItems": function (items) {
        return set((state) => ({
            ...state,
            ["endfield/items"]: items,
        }));
    },
    "endfield/setItemValues": function ({ id, skillKey, values }) {
        const items = get()["endfield/items"];
        if (items.length > 0) {
            const index = items.findIndex((item) => item.id === id);
            if (index === -1) {
                throw new Error(`Could not find item with ID ${id}`);
            }
            items[index].values[skillKey] = values;
            return set((state) => ({
                ...state,
                ["endfield/items"]: items,
            }));
        }
    },
    "endfield/setHiddenItems": function (id) {
        const hidden = get()["endfield/hidden"];
        !hidden.includes(id)
            ? hidden.push(id)
            : hidden.splice(hidden.indexOf(id), 1);
        return set(() => ({ "endfield/hidden": hidden }));
    },
    "endfield/updateTotalCosts": function (id, costs) {
        const totalCosts = get()["endfield/totalCost"];
        const itemIDs = get()["endfield/items"].map((item) => item.id);
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
            ["endfield/totalCost"]: totalCosts,
        }));
    },
});
