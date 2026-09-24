import type { StateCreator } from "zustand";
import {
    getCompletedMaterialKey,
    type CompletedMaterialKey,
    type CombinedPlannerSlice,
    type GamePlannerSlice,
    type PlannerSlice,
} from "../usePlannerStore";

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
    "genshin/completed": [],
    "genshin/setItems": function (items) {
        return set({
            "genshin/items": items,
        });
    },
    "genshin/deleteItem": function (id) {
        return set((state) => {
            const totalCosts = state["genshin/totalCost"];

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
                "genshin/items": state["genshin/items"].filter(
                    (item) => item.id !== id,
                ),
                "genshin/hidden": state["genshin/hidden"].filter(
                    (itemID) => itemID !== id,
                ),
                "genshin/totalCost": remainingCosts,
                "genshin/completed": state["genshin/completed"].filter((key) =>
                    remainingMaterials.has(key),
                ),
            };
        });
    },
    "genshin/setItemValues": function ({ id, skillKey, values }) {
        const items = get()["genshin/items"];

        if (items.length === 0) return;

        const index = items.findIndex((item) => item.id === id);

        if (index === -1) {
            throw new Error(`Could not find item with ID ${id}`);
        }

        return set({
            "genshin/items": items.map((item) =>
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
    "genshin/setHiddenItems": function (id) {
        const hidden = get()["genshin/hidden"];

        return set({
            "genshin/hidden": hidden.includes(id)
                ? hidden.filter((itemID) => itemID !== id)
                : [...hidden, id],
        });
    },
    "genshin/updateTotalCosts": function (id, costs) {
        const itemIDs = new Set(get()["genshin/items"].map((item) => item.id));

        const totalCosts = Object.fromEntries(
            Object.entries(get()["genshin/totalCost"]).filter(([itemID]) =>
                itemIDs.has(Number(itemID)),
            ),
        );

        if (id !== undefined && costs !== undefined) {
            totalCosts[id] = costs;
        }

        return set({
            "genshin/totalCost": totalCosts,
        });
    },
    "genshin/toggleCompleted": function (key) {
        const completed = get()["genshin/completed"];

        return set({
            "genshin/completed": completed.includes(key)
                ? completed.filter((value) => value !== key)
                : [...completed, key],
        });
    },
});
