// Component imports
import HSRCharacterFilters from "./CharacterFilters";
import HSRWeaponFilters from "./WeaponFilters";
import RarityStars from "@/components/RarityStars";

// Helper imports
import { createFilterButtons } from "@/components/Filters";
import { elements, weapons, rarities, worlds } from "@/data/hsr/common";
import { useMaterialsCategory } from "@/helpers/materials";

// Type imports
import type { FilterGroupsProps, FilterGroups } from "@/types/filters";

export { HSRCharacterFilters, HSRWeaponFilters };

export function hsrFilters({
    key,
    hideUnreleasedContent = false,
}: FilterGroupsProps): FilterGroups {
    const getMaterialCategory = useMaterialsCategory(hideUnreleasedContent).hsr;

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
                items: getMaterialCategory("calyx")
                    .filter((material) => !material.rarity)
                    .map((material) => material.tag || ""),
                url: "hsr/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("calyx").find(
                        (material) => material.tag === `${item}3`,
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("calyx").find(
                        (material) => material.tag === item,
                    );
                    return mat ? `${mat.name}` : "";
                },
            }),
        },
        commonMat: {
            name: "Common Material",
            tag: "commonMat",
            buttons: createFilterButtons({
                items: getMaterialCategory("common")
                    .filter((material) => !material.rarity)
                    .map((material) => material.tag || ""),
                url: "hsr/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("common").find(
                        (material) => material.tag === `${item}3`,
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("common").find(
                        (material) => material.tag === item,
                    );
                    return mat ? `${mat.name}` : "";
                },
            }),
        },
        bossMat: {
            name: "Boss Material",
            tag: "bossMat",
            buttons: createFilterButtons({
                items: getMaterialCategory("boss").map(
                    (material) => material.tag || "",
                ),
                url: "hsr/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("boss").find(
                        (material) => material.tag === item,
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("boss").find(
                        (material) => material.tag === item,
                    );
                    return mat ? `${mat.name}` : "";
                },
            }),
        },
        weeklyBossMat: {
            name: "Weekly Boss Material",
            tag: "weeklyBossMat",
            buttons: createFilterButtons({
                items: getMaterialCategory("weekly").map(
                    (material) => material.tag || "",
                ),
                url: "hsr/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("weekly").find(
                        (material) => material.tag === item,
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("weekly").find(
                        (material) => material.tag === item,
                    );
                    return mat ? `${mat.name} (${mat.source})` : "";
                },
            }),
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
