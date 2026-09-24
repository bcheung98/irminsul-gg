import { useEffect, useMemo } from "react";

// Component imports
import MaterialGrid from "@/components/MaterialGrid";

// Helper imports
import { useGameTag } from "@/context";
import { usePlannerStore } from "@/stores";
import { usePlannerCardData } from "@/components/PlannerCardRoot/PlannerCard.utils";
import { getMaterialCosts } from "./PlannerMaterials.utils";

// Type imports
import type { GameNoUma } from "@/types";

export default function PlannerMaterials() {
    const game = useGameTag() as GameNoUma;

    const updateTotalCosts = usePlannerStore(
        (state) => state[`${game}/updateTotalCosts`],
    );

    const item = usePlannerCardData();
    if (!item) throw new Error("Item not found");

    const materialCosts = useMemo(
        () => getMaterialCosts(game, item),
        [game, item],
    );

    useEffect(() => {
        updateTotalCosts(item.id, materialCosts);
    }, [JSON.stringify(item.values)]);

    return (
        <MaterialGrid
            costs={materialCosts}
            customMaterials={item.customMaterials}
        />
    );
}
