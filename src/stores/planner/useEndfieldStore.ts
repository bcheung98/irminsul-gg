import type { StateCreator } from "zustand";
import {
    getCompletedMaterialKey,
    type CompletedMaterialKey,
    type CombinedPlannerSlice,
    type GamePlannerSlice,
    type PlannerSlice,
} from "../usePlannerStore";

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
    "endfield/completed": [],
    "endfield/setItems": function (items) {
        return set({
            "endfield/items": items,
        });
    },
    "endfield/deleteItem": function (id) {
        return set((state) => {
            const totalCosts = state["endfield/totalCost"];

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
                "endfield/items": state["endfield/items"].filter(
                    (item) => item.id !== id,
                ),
                "endfield/hidden": state["endfield/hidden"].filter(
                    (itemID) => itemID !== id,
                ),
                "endfield/totalCost": remainingCosts,
                "endfield/completed": state["endfield/completed"].filter(
                    (key) => remainingMaterials.has(key),
                ),
            };
        });
    },
    "endfield/setItemValues": function ({ id, skillKey, values }) {
        const items = get()["endfield/items"];

        if (items.length === 0) return;

        const index = items.findIndex((item) => item.id === id);

        if (index === -1) {
            throw new Error(`Could not find item with ID ${id}`);
        }

        return set({
            "endfield/items": items.map((item) =>
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
    "endfield/setHiddenItems": function (id) {
        const hidden = get()["endfield/hidden"];

        return set({
            "endfield/hidden": hidden.includes(id)
                ? hidden.filter((itemID) => itemID !== id)
                : [...hidden, id],
        });
    },
    "endfield/updateTotalCosts": function (id, costs) {
        const itemIDs = new Set(get()["endfield/items"].map((item) => item.id));

        const totalCosts = Object.fromEntries(
            Object.entries(get()["endfield/totalCost"]).filter(([itemID]) =>
                itemIDs.has(Number(itemID)),
            ),
        );

        if (id !== undefined && costs !== undefined) {
            totalCosts[id] = costs;
        }

        return set({
            "endfield/totalCost": totalCosts,
        });
    },
    "endfield/toggleCompleted": function (key) {
        const completed = get()["endfield/completed"];

        return set({
            "endfield/completed": completed.includes(key)
                ? completed.filter((value) => value !== key)
                : [...completed, key],
        });
    },
});
