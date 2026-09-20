// Component imports
import HSRCharacterFilters from "./CharacterFilters";
import HSRWeaponFilters from "./WeaponFilters";
import RarityStars from "@/components/RarityStars";

// Helper imports
import { createFilterButtons } from "@/components/Filters";
import { elements, weapons, rarities, worlds } from "@/data/hsr/common";
import { getMaterialResolvers } from "@/helpers/materials";

// Type imports
import type { FilterGroupsProps, FilterGroups } from "@/types/filters";

export { HSRCharacterFilters, HSRWeaponFilters };

export function hsrFilters({
    key,
    hideUnreleasedContent = false,
}: FilterGroupsProps): FilterGroups {
    const { getMaterial, getMaterialCategory } = getMaterialResolvers(
        "hsr",
        hideUnreleasedContent,
    );

    const calyxMaterials = getMaterialCategory("calyx")
        .filter((material) => !material.rarity)
        .map((material) => material.tag || "");

    const commonMaterials = getMaterialCategory("common")
        .filter((material) => !material.rarity)
        .map((material) => material.tag || "");

    const bossMaterials = getMaterialCategory("boss").map(
        (material) => material.tag || "",
    );

    const weeklyBossMaterials = getMaterialCategory("weekly").map(
        (material) => material.tag || "",
    );

    return {
        element: {
            name: "Combat Type",
            tag: "element",
            buttons: createFilterButtons({
                items: elements,
                url: "hsr/elements",
            }),
        },
        weaponType: {
            name: "Path",
            tag: "weaponType",
            buttons: createFilterButtons({
                items: weapons,
                url: "hsr/paths",
            }),
        },
        rarity: {
            name: "Rarity",
            tag: "rarity",
            buttons: rarities
                .slice(0, key === "hsr/characters" ? -3 : undefined)
                .map((rarity) => ({
                    value: rarity,
                    label: (
                        <RarityStars
                            rarity={rarity}
                            useRarityColor
                            variant="h6"
                        />
                    ),
                })),

            padding: "4px 8px",
        },
        calyxMat: {
            name: "Calyx Material",
            tag: "calyxMat",
            buttons: createFilterButtons({
                items: calyxMaterials,
                url: "hsr/materials",
                getURL: (item: string) => `${getMaterial(`${item}3`).id}`,
                getTooltip: (item: string) => getMaterial(item).name,
            }),
            customMaterial: {
                rarities: [2, 3, 4],
            },
        },
        commonMat: {
            name: "Common Material",
            tag: "commonMat",
            buttons: createFilterButtons({
                items: commonMaterials,
                url: "hsr/materials",
                getURL: (item: string) => `${getMaterial(`${item}3`).id}`,
                getTooltip: (item: string) => getMaterial(item).name,
            }),
            customMaterial: {
                rarities: [2, 3, 4],
            },
        },
        bossMat: {
            name: "Boss Material",
            tag: "bossMat",
            buttons: createFilterButtons({
                items: bossMaterials,
                url: "hsr/materials",
                getURL: (item: string) => `${getMaterial(item).id}`,
                getTooltip: (item: string) => {
                    const mat = getMaterial(item);
                    return mat.source
                        ? `${mat.name} (${mat.source})`
                        : mat.name;
                },
            }),
            customMaterial: {
                rarities: [4],
            },
        },
        weeklyBossMat: {
            name: "Weekly Boss Material",
            tag: "weeklyBossMat",
            buttons: createFilterButtons({
                items: weeklyBossMaterials,
                url: "hsr/materials",
                getURL: (item: string) => `${getMaterial(item).id}`,
                getTooltip: (item: string) => {
                    const mat = getMaterial(item);
                    return mat.source
                        ? `${mat.name} (${mat.source})`
                        : mat.name;
                },
            }),
            customMaterial: {
                rarities: [4],
            },
        },
        nation: {
            name: "World",
            tag: "nation",
            buttons: createFilterButtons({
                items: worlds,
                url: "hsr/factions",
            }),
        },
    };
}
