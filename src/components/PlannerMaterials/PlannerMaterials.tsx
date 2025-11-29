// Component imports
import MaterialCard from "@/components/MaterialCard";

// MUI imports
import Grid from "@mui/material/Grid";

// Helper imports
import { useGameTag } from "@/context";
import { costs } from "@/helpers/costs";
import { objectKeys } from "@/utils";
import { usePlannerCardData } from "../PlannerCardRoot/PlannerCard.utils";

// Type imports
import { GameNoUma } from "@/types";
import { CostValue } from "@/types/costs";

export default function PlannerMaterials() {
    const game = useGameTag() as GameNoUma;

    const item = usePlannerCardData();
    if (!item) throw new Error("Item not found");

    const type = "element" in item ? "characters" : "weapons";
    if (game === "genshin" && type === "characters") {
        item.materials = { ...item.materials, gemstone: item.element || "" };
    }

    const data = Object.entries(item.values).map(([key, value]) => {
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

    const materialCosts: Record<string, CostValue> = {};
    data.forEach((item) => {
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

    const materialArray: React.ReactNode[] = [];
    objectKeys(materialCosts).forEach((key) =>
        Object.entries(materialCosts[key]).forEach(
            ([material, cost]) =>
                cost &&
                materialArray.push(
                    <MaterialCard
                        key={Number(material)}
                        game={game}
                        material={Number(material)}
                        cost={cost}
                        size={56}
                    />
                )
        )
    );

    return (
        <Grid container spacing={2}>
            {materialArray.map((card) => card)}
        </Grid>
    );
}
