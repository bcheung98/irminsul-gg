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
    if (
        game === "hsr" &&
        type === "characters" &&
        item.name.startsWith("Trailblazer")
    ) {
        item.rarity = 4;
    }

    // Get material costs for each source based on current input values
    const costSourceMap = Object.entries(item.values).map(([key, value]) => {
        let costKey;
        let skillKey = key;
        if (key.startsWith("trace")) {
            costKey =
                value.type === "main"
                    ? "characterTraceMain"
                    : "characterTraceSmall";
            skillKey = `${value.skillKey}`;
        } else if (key.startsWith("node")) {
            costKey =
                value.type === "main"
                    ? "characterPassive"
                    : "characterBonusStat";
            skillKey = `${value.skillKey}`;
        } else {
            switch (key) {
                case "level":
                    costKey =
                        type === "characters"
                            ? "characterLevel"
                            : "weaponLevel";
                    break;
                case "memo-skill":
                case "memo-talent":
                    costKey = "characterMemosprite";
                    break;
                case "core":
                    costKey = "characterCoreSkill";
                    break;
                case "attack":
                case "skill":
                case "ultimate":
                default:
                    costKey = "characterSkill";
            }
        }

        return costs[game][costKey]({
            ...value,
            ...item,
            withXP: true,
            skillKey,
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
