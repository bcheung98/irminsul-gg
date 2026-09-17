// Helper imports
import { objectKeys } from "@/utils";
import { createFilterButtons } from "@/components/Filters";
import { useMaterialsCategory } from "@/helpers/materials";
import {
    attackTypes,
    elements,
    factions,
    rarities,
    rarityMap,
    weapons,
} from "@/data/zzz/common";
import { ZZZWeaponSubStat, weaponSubStats } from "./weaponStats";

// Type imports
import type { FilterGroups, FilterGroupsProps } from "@/types/filters";
import type { ZZZRarity } from "@/types/zzz";

export function zzzFilters({
    key,
    hideUnreleasedContent = false,
}: FilterGroupsProps): FilterGroups {
    const getMaterialCategory = useMaterialsCategory(hideUnreleasedContent).zzz;

    return {
        element: {
            name: "Attribute",
            tag: "element",
            buttons: createFilterButtons({
                items: elements,
                url: "zzz/elements",
            }),
        },
        weaponType: {
            name: "Specialty",
            tag: "weaponType",
            buttons: createFilterButtons({
                items: weapons,
                url: "zzz/icons/specialties",
            }),
        },
        attackType: {
            name: "Attack Type",
            tag: "attackType",
            buttons: createFilterButtons({
                items: attackTypes,
                url: "zzz/icons/attack-types",
            }),
        },
        rarity: {
            name: "Rank",
            tag: "rarity",
            buttons: createFilterButtons({
                items: rarities.slice(0, key === "zzz/characters" ? -3 : -2),
                url:
                    key === "zzz/characters"
                        ? "zzz/ranks/agent"
                        : "zzz/ranks/item",
                getURL: (item: ZZZRarity) => rarityMap[item],
                getTooltip: () => "",
            }),
        },
        subStat: {
            name: "Advanced Stat",
            tag: "subStat",
            buttons: createFilterButtons({
                items: objectKeys(weaponSubStats),
                url: "zzz/icons/stat-icons",
                getTooltip: (item: ZZZWeaponSubStat) =>
                    weaponSubStats[item].title,
            }),
        },
        bossMat: {
            name: "Expert Challenge Material",
            tag: "bossMat",
            buttons: createFilterButtons({
                items: getMaterialCategory("boss").map(
                    (material) => material.tag || "",
                ),
                url: "zzz/materials",
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
                    return mat ? `${mat.name} (${mat.source})` : "";
                },
                imgFormat: "gif",
            }),
        },
        weeklyBossMat: {
            name: "Notorious Hunt Material",
            tag: "weeklyBossMat",
            buttons: createFilterButtons({
                items: getMaterialCategory("weekly").map(
                    (material) => material.tag || "",
                ),
                url: "zzz/materials",
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
                imgFormat: "gif",
            }),
        },
        nation: {
            name: "Faction",
            tag: "nation",
            buttons: createFilterButtons({
                items: factions,
                url: "zzz/factions",
            }),
        },
    };
}
