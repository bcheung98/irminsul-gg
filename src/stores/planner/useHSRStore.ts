import type { StateCreator } from "zustand";
import {
    getCompletedMaterialKey,
    type CompletedMaterialKey,
    type CombinedPlannerSlice,
    type GamePlannerSlice,
    type PlannerSlice,
} from "../usePlannerStore";

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
    "hsr/completed": [],
    "hsr/setItems": function (items) {
        return set({
            "hsr/items": items,
        });
    },
    "hsr/deleteItem": function (id) {
        return set((state) => {
            const totalCosts = state["hsr/totalCost"];

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
                "hsr/items": state["hsr/items"].filter(
                    (item) => item.id !== id,
                ),
                "hsr/hidden": state["hsr/hidden"].filter(
                    (itemID) => itemID !== id,
                ),
                "hsr/totalCost": remainingCosts,
                "hsr/completed": state["hsr/completed"].filter((key) =>
                    remainingMaterials.has(key),
                ),
            };
        });
    },
    "hsr/setItemValues": function ({ id, skillKey, values }) {
        const items = get()["hsr/items"];

        if (items.length === 0) return;

        const index = items.findIndex((item) => item.id === id);

        if (index === -1) {
            throw new Error(`Could not find item with ID ${id}`);
        }

        return set({
            "hsr/items": items.map((item) =>
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
    "hsr/setHiddenItems": function (id) {
        const hidden = get()["hsr/hidden"];

        return set({
            "hsr/hidden": hidden.includes(id)
                ? hidden.filter((itemID) => itemID !== id)
                : [...hidden, id],
        });
    },
    "hsr/updateTotalCosts": function (id, costs) {
        const itemIDs = new Set(get()["hsr/items"].map((item) => item.id));

        const totalCosts = Object.fromEntries(
            Object.entries(get()["hsr/totalCost"]).filter(([itemID]) =>
                itemIDs.has(Number(itemID)),
            ),
        );

        if (id !== undefined && costs !== undefined) {
            totalCosts[id] = costs;
        }

        return set({
            "hsr/totalCost": totalCosts,
        });
    },
    "hsr/toggleCompleted": function (key) {
        const completed = get()["hsr/completed"];

        return set({
            "hsr/completed": completed.includes(key)
                ? completed.filter((value) => value !== key)
                : [...completed, key],
        });
    },
});
