// Helper imports
import { costs } from "@/helpers/costs";

// Type imports
import type { GameNoUma } from "@/types";
import type { CostValue } from "@/types/costs";
import type { PlannerItemData } from "@/types/planner";

export function getMaterialCosts(game: GameNoUma, item: PlannerItemData) {
    let costItem = item;

    const type = "element" in costItem ? "characters" : "weapons";

    // Special case for Exaiphanes Blade
    if (game === "genshin" && type === "weapons" && costItem.id === 11521) {
        return {};
    }

    // Add elemental gemstones to Genshin character materials
    if (game === "genshin" && type === "characters") {
        costItem = {
            ...costItem,
            materials: {
                ...costItem.materials,
                gemstone: costItem.name.includes("Traveler")
                    ? "Diamond"
                    : costItem.element || "",
            },
        };
    }

    // HSR Trailblazer is a 5-star but uses 4-star costs
    if (
        game === "hsr" &&
        type === "characters" &&
        costItem.name.startsWith("Trailblazer")
    ) {
        costItem = {
            ...costItem,
            rarity: 4,
        };
    }

    // Get material costs for each source based on current input values
    const costSourceMap = Object.entries(costItem.values).map(
        ([key, value]) => {
            let costKey;
            let skillKey = key;
            let length = 0;

            // Character/weapon level
            if (key === "level") {
                costKey =
                    type === "characters" ? "characterLevel" : "weaponLevel";
            }

            // Character skills
            else if (
                ["attack", "skill", "ultimate", "combo", "elation"].includes(
                    key,
                )
            ) {
                costKey = "characterSkill";
            }

            // HSR Memosprites
            else if (key === "memo-skill" || key === "memo-talent") {
                costKey = "characterMemosprite";
            }

            // HSR character trace nodes
            else if (key.startsWith("trace")) {
                costKey =
                    value.type === "main"
                        ? "characterTraceMain"
                        : "characterTraceSmall";
                skillKey = `${value.skillKey}`;
            }

            // WuWa character bonus stat nodes
            else if (key.startsWith("node")) {
                costKey =
                    value.type === "main"
                        ? "characterPassive"
                        : "characterBonusStat";
                skillKey = `${value.skillKey}`;
            }

            // ZZZ Core Skill
            else if (game === "zzz" && key === "core") {
                costKey = "characterCoreSkill";
            }

            // Endfield character nodes
            else if (game === "endfield" && key.startsWith("outfitting")) {
                costKey = "characterOutfitting";
            } else if (game === "endfield" && key.startsWith("attribute")) {
                costKey = "characterAttribute";
            } else if (game === "endfield" && key.startsWith("baseSkill")) {
                costKey = "characterBaseSkill";
            } else if (game === "endfield" && key.startsWith("talent")) {
                costKey = "characterTalent";
            }

            // NTE character passives
            else if (game === "nte" && key.startsWith("passive")) {
                costKey = "characterPassive";
            } else if (game === "nte" && key.startsWith("life")) {
                costKey = "characterLifeSkill";
                if (costItem.lifeSkills)
                    length =
                        costItem.lifeSkills[Number(skillKey.slice(-1)) - 1];
            }
            // Default fallback
            else {
                costKey = "characterSkill";
            }

            return costs[game][costKey]({
                ...value,
                ...costItem,
                withXP: true,
                skillKey,
                length,
            });
        },
    );

    // Calculate costs for all materials
    const materialCosts: Record<string, CostValue> = {};

    for (const source of costSourceMap) {
        for (const [key, value] of Object.entries(source)) {
            const category = (materialCosts[key] ??= {});

            for (const [material, cost] of Object.entries(value)) {
                category[material] = (category[material] ?? 0) + cost;
            }
        }
    }

    return materialCosts;
}
