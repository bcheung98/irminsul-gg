// Component imports
import MaterialGrid from "@/components/MaterialGrid";
import Text from "@/components/Text";

// Helper imports
import { useGameTag } from "@/context";
import { usePlannerStore } from "@/stores";
import { objectKeys } from "@/utils";

// Type imports
import type { GameNoUma } from "@/types";
import type { CostValue } from "@/types/costs";
import type { CustomMaterials } from "@/types/materials";

export default function PlannerTotalCost() {
    const game = useGameTag() as GameNoUma;

    const store = usePlannerStore();

    const totalCosts = store[`${game}/totalCost`];
    const items = store[`${game}/items`];
    const hiddenItems = store[`${game}/hidden`];

    const customMaterials = items.reduce<CustomMaterials>(
        (customMaterials, item) => {
            Object.assign(customMaterials, item.customMaterials);
            return customMaterials;
        },
        {},
    );

    const materialCosts: Record<string, CostValue> = {};
    Object.entries(totalCosts).forEach(([itemID, costs]) => {
        if (!hiddenItems.includes(Number(itemID))) {
            Object.entries(costs).forEach(([key, value]) => {
                if (materialCosts[key] === undefined) {
                    materialCosts[key] = {};
                }
                Object.entries(value).forEach(([material, cost]) => {
                    if (materialCosts[key][material] === undefined) {
                        materialCosts[key][material] = 0;
                    }
                    materialCosts[key][material] += cost;
                });
            });
        }
    });

    return objectKeys(materialCosts).length > 0 ? (
        <MaterialGrid costs={materialCosts} customMaterials={customMaterials} />
    ) : (
        <Text weight="highlight" sx={{ px: 4 }}>
            Its empty here...
        </Text>
    );
}
