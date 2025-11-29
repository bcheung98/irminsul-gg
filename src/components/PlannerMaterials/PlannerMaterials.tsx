import { useEffect } from "react";

// Component imports
import MaterialGrid from "@/components/MaterialGrid";

// Helper imports
import { useGameTag } from "@/context";
import { costs } from "@/helpers/costs";
import { usePlannerStore } from "@/stores";
import { usePlannerCardData } from "../PlannerCardRoot/PlannerCard.utils";

// Type imports
import { GameNoUma } from "@/types";
import { CostValue } from "@/types/costs";

export default function PlannerMaterials() {
    const game = useGameTag() as GameNoUma;

    const updateTotalCosts = usePlannerStore()[`${game}/updateTotalCosts`];

    const item = usePlannerCardData();
    if (!item) throw new Error("Item not found");

    const type = "element" in item ? "characters" : "weapons";
    if (game === "genshin" && type === "characters") {
        item.materials = { ...item.materials, gemstone: item.element || "" };
    }

    // Get material costs for each source based on current input values
    const costSourceMap = Object.entries(item.values).map(([key, value]) => {
        let skillKey;
        switch (key) {
            case "level":
                skillKey =
                    type === "characters" ? "characterLevel" : "weaponLevel";
                break;
            case "attack":
            case "skill":
            case "burst":
            default:
                skillKey = "characterSkill";
        }
        return costs[game][skillKey]({
            ...value,
            withXP: true,
            materials: item.materials,
            rarity: item.rarity,
        });
    });

    // Calculate costs for all materials
    const materialCosts: Record<string, CostValue> = {};
    costSourceMap.forEach((item) => {
        Object.entries(item).forEach(([key, value]) => {
            if (materialCosts[key] === undefined) {
                materialCosts[key] = Object.fromEntries(
                    Object.entries(value).map(([material, cost]) => [
                        material,
                        cost,
                    ])
                );
            } else {
                Object.entries(value).forEach(([material, cost]) => {
                    materialCosts[key][Number(material)] += cost;
                });
            }
        });
    });

    useEffect(() => {
        updateTotalCosts(item.id, materialCosts);
    }, [JSON.stringify(item.values)]);

    return <MaterialGrid costs={materialCosts} />;
}
