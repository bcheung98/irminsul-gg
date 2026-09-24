import type { StateCreator } from "zustand";
import {
    getCompletedMaterialKey,
    type CompletedMaterialKey,
    type CombinedPlannerSlice,
    type GamePlannerSlice,
    type PlannerSlice,
} from "../usePlannerStore";

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
    "zzz/completed": [],
    "zzz/setItems": function (items) {
        return set({
            "zzz/items": items,
        });
    },
    "zzz/deleteItem": function (id) {
        return set((state) => {
            const totalCosts = state["zzz/totalCost"];

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
                "zzz/items": state["zzz/items"].filter(
                    (item) => item.id !== id,
                ),
                "zzz/hidden": state["zzz/hidden"].filter(
                    (itemID) => itemID !== id,
                ),
                "zzz/totalCost": remainingCosts,
                "zzz/completed": state["zzz/completed"].filter((key) =>
                    remainingMaterials.has(key),
                ),
            };
        });
    },
    "zzz/setItemValues": function ({ id, skillKey, values }) {
        const items = get()["zzz/items"];

        if (items.length === 0) return;

        const index = items.findIndex((item) => item.id === id);

        if (index === -1) {
            throw new Error(`Could not find item with ID ${id}`);
        }

        return set({
            "zzz/items": items.map((item) =>
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
    "zzz/setHiddenItems": function (id) {
        const hidden = get()["zzz/hidden"];

        return set({
            "zzz/hidden": hidden.includes(id)
                ? hidden.filter((itemID) => itemID !== id)
                : [...hidden, id],
        });
    },
    "zzz/updateTotalCosts": function (id, costs) {
        const itemIDs = new Set(get()["zzz/items"].map((item) => item.id));

        const totalCosts = Object.fromEntries(
            Object.entries(get()["zzz/totalCost"]).filter(([itemID]) =>
                itemIDs.has(Number(itemID)),
            ),
        );

        if (id !== undefined && costs !== undefined) {
            totalCosts[id] = costs;
        }

        return set({
            "zzz/totalCost": totalCosts,
        });
    },
    "zzz/toggleCompleted": function (key) {
        const completed = get()["zzz/completed"];

        return set({
            "zzz/completed": completed.includes(key)
                ? completed.filter((value) => value !== key)
                : [...completed, key],
        });
    },
});
