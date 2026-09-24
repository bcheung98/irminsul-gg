import { useMemo } from "react";

// Helper imports
import { usePlannerStore } from "@/stores";

// Type imports
import type { GameNoUma } from "@/types";
import type { CostValue } from "@/types/costs";
import type { CustomMaterials } from "@/types/materials";

export function useTotalCosts(game: GameNoUma) {
    const totalCosts = usePlannerStore((state) => state[`${game}/totalCost`]);
    const items = usePlannerStore((state) => state[`${game}/items`]);
    const hiddenItems = usePlannerStore((state) => state[`${game}/hidden`]);

    const materialCosts = useMemo(() => {
        const result: Record<string, CostValue> = {};
        const hiddenIds = new Set(hiddenItems);

        for (const [itemID, costs] of Object.entries(totalCosts)) {
            if (hiddenIds.has(Number(itemID))) continue;

            for (const [key, value] of Object.entries(costs)) {
                const category = (result[key] ??= {});

                for (const [material, cost] of Object.entries(value)) {
                    category[material] = (category[material] ?? 0) + cost;
                }
            }
        }

        return result;
    }, [totalCosts, hiddenItems]);

    const customMaterials = useMemo(
        () =>
            items.reduce<CustomMaterials>((result, item) => {
                Object.assign(result, item.customMaterials);
                return result;
            }, {}),
        [items],
    );

    const count = Object.keys(materialCosts).length;

    return { materialCosts, customMaterials, count };
}
