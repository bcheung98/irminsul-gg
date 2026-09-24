import type { StateCreator } from "zustand";
import {
    getCompletedMaterialKey,
    type CompletedMaterialKey,
    type CombinedPlannerSlice,
    type GamePlannerSlice,
    type PlannerSlice,
} from "../usePlannerStore";

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
    "wuwa/completed": [],
    "wuwa/setItems": function (items) {
        return set({
            "wuwa/items": items,
        });
    },
    "wuwa/deleteItem": function (id) {
        return set((state) => {
            const totalCosts = state["wuwa/totalCost"];

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
                "wuwa/items": state["wuwa/items"].filter(
                    (item) => item.id !== id,
                ),
                "wuwa/hidden": state["wuwa/hidden"].filter(
                    (itemID) => itemID !== id,
                ),
                "wuwa/totalCost": remainingCosts,
                "wuwa/completed": state["wuwa/completed"].filter((key) =>
                    remainingMaterials.has(key),
                ),
            };
        });
    },
    "wuwa/setItemValues": function ({ id, skillKey, values }) {
        const items = get()["wuwa/items"];

        if (items.length === 0) return;

        const index = items.findIndex((item) => item.id === id);

        if (index === -1) {
            throw new Error(`Could not find item with ID ${id}`);
        }

        return set({
            "wuwa/items": items.map((item) =>
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
    "wuwa/setHiddenItems": function (id) {
        const hidden = get()["wuwa/hidden"];

        return set({
            "wuwa/hidden": hidden.includes(id)
                ? hidden.filter((itemID) => itemID !== id)
                : [...hidden, id],
        });
    },
    "wuwa/updateTotalCosts": function (id, costs) {
        const itemIDs = new Set(get()["wuwa/items"].map((item) => item.id));

        const totalCosts = Object.fromEntries(
            Object.entries(get()["wuwa/totalCost"]).filter(([itemID]) =>
                itemIDs.has(Number(itemID)),
            ),
        );

        if (id !== undefined && costs !== undefined) {
            totalCosts[id] = costs;
        }

        return set({
            "wuwa/totalCost": totalCosts,
        });
    },
    "wuwa/toggleCompleted": function (key) {
        const completed = get()["wuwa/completed"];

        return set({
            "wuwa/completed": completed.includes(key)
                ? completed.filter((value) => value !== key)
                : [...completed, key],
        });
    },
});
