// Component imports
import MaterialGrid from "@/components/MaterialGrid";
import Text from "@/components/Text";

// Helper imports
import { useGameTag } from "@/context";
import { usePlannerStore } from "@/stores";
import { objectKeys } from "@/utils";

// Type imports
import { GameNoUma } from "@/types";
import { CostValue } from "@/types/costs";

export default function PlannerTotalCost() {
    const game = useGameTag() as GameNoUma;

    const store = usePlannerStore();
    const hiddenItems = store[`${game}/hidden`];
    const totalCosts = store[`${game}/totalCost`];

    const materialCosts: Record<string, CostValue> = {};
    Object.entries(totalCosts).forEach(([itemID, costs]) => {
        if (!hiddenItems.includes(Number(itemID))) {
            Object.entries(costs).forEach(([key, value]) => {
                if (materialCosts[key] === undefined) {
                    materialCosts[key] = {};
                }
                Object.entries(value).forEach(([material, cost]) => {
                    if (materialCosts[key][Number(material)] === undefined) {
                        materialCosts[key][Number(material)] = 0;
                    }
                    materialCosts[key][Number(material)] += cost;
                });
            });
        }
    });

    return objectKeys(materialCosts).length > 0 ? (
        <MaterialGrid costs={materialCosts} />
    ) : (
        <Text weight="highlight" sx={{ px: 4 }}>
            Its empty here...
        </Text>
    );
}
