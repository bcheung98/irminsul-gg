import type { StateCreator } from "zustand";
import {
    getCompletedMaterialKey,
    type CompletedMaterialKey,
    type CombinedPlannerSlice,
    type GamePlannerSlice,
    type PlannerSlice,
} from "../usePlannerStore";

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
    "nte/completed": [],
    "nte/setItems": function (items) {
        return set({
            "nte/items": items,
        });
    },
    "nte/deleteItem": function (id) {
        return set((state) => {
            const totalCosts = state["nte/totalCost"];

            // Remove the deleted item's costs.
            const { [id]: _deleted, ...remainingCosts } = totalCosts;

            // Collect every material still needed by remaining items,
            // including hidden items.
            const remainingMaterials = new Set<CompletedMaterialKey>();

            for (const costs of Object.values(remainingCosts)) {
                for (const [category, materials] of Object.entries(costs)) {
                    for (const [materialID, amount] of Object.entries(
                        materials,
                    )) {
                        if (amount > 0) {
                            remainingMaterials.add(
                                getCompletedMaterialKey(category, materialID),
                            );
                        }
                    }
                }
            }

            return {
                "nte/items": state["nte/items"].filter(
                    (item) => item.id !== id,
                ),
                "nte/hidden": state["nte/hidden"].filter(
                    (itemID) => itemID !== id,
                ),
                "nte/totalCost": remainingCosts,
                "nte/completed": state["nte/completed"].filter((key) =>
                    remainingMaterials.has(key),
                ),
            };
        });
    },
    "nte/setItemValues": function ({ id, skillKey, values }) {
        const items = get()["nte/items"];

        if (items.length === 0) return;

        const index = items.findIndex((item) => item.id === id);

        if (index === -1) {
            throw new Error(`Could not find item with ID ${id}`);
        }

        return set({
            "nte/items": items.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          values: {
                              ...item.values,
                              [skillKey]: values,
                          },
                      }
                    : item,
            ),
        });
    },
    "nte/setHiddenItems": function (id) {
        const hidden = get()["nte/hidden"];

        return set({
            "nte/hidden": hidden.includes(id)
                ? hidden.filter((itemID) => itemID !== id)
                : [...hidden, id],
        });
    },
    "nte/updateTotalCosts": function (id, costs) {
        const itemIDs = new Set(get()["nte/items"].map((item) => item.id));

        const totalCosts = Object.fromEntries(
            Object.entries(get()["nte/totalCost"]).filter(([itemID]) =>
                itemIDs.has(Number(itemID)),
            ),
        );

        if (id !== undefined && costs !== undefined) {
            totalCosts[id] = costs;
        }

        return set({
            "nte/totalCost": totalCosts,
        });
    },
    "nte/toggleCompleted": function (key) {
        const completed = get()["nte/completed"];

        return set({
            "nte/completed": completed.includes(key)
                ? completed.filter((value) => value !== key)
                : [...completed, key],
        });
    },
});
