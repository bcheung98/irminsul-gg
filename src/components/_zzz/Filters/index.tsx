// Component imports
import ZZZCharacterFilters from "./CharacterFilters";
import ZZZWeaponFilters from "./WeaponFilters";

// Helper imports
import { createFilterButtons } from "@/components/Filters";
import {
    elements,
    weapons,
    attackTypes,
    rarities,
    rarityMap,
    factions,
} from "@/data/zzz/common";
import { weaponSubStats, ZZZWeaponSubStat } from "@/data/zzz/weaponStats";
import { getMaterialResolvers } from "@/helpers/materials";
import { objectKeys } from "@/utils";

// Type imports
import type { FilterGroupsProps, FilterGroups } from "@/types/filters";
import type { ZZZRarity } from "@/types/zzz";

export { ZZZCharacterFilters, ZZZWeaponFilters };

export function zzzFilters({
    key,
    hideUnreleasedContent = false,
}: FilterGroupsProps): FilterGroups {
    const { getMaterial, getMaterialCategory } = getMaterialResolvers(
        "zzz",
        hideUnreleasedContent,
    );

    const bossMaterials = getMaterialCategory("boss").map(
        (material) => material.tag || "",
    );
    const weeklyBossMaterials = getMaterialCategory("weekly").map(
        (material) => material.tag || "",
    );

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
                items: bossMaterials,
                url: "zzz/materials",
                getURL: (item: string) => `${getMaterial(item).id}`,
                getTooltip: (item: string) => {
                    const mat = getMaterial(item);
                    return mat.source
                        ? `${mat.name} (${mat.source})`
                        : mat.name;
                },
                imgFormat: "gif",
            }),
            customMaterial: {
                rarities: [4],
            },
        },
        weeklyBossMat: {
            name: "Notorious Hunt Material",
            tag: "weeklyBossMat",
            buttons: createFilterButtons({
                items: weeklyBossMaterials,
                url: "zzz/materials",
                getURL: (item: string) => `${getMaterial(item).id}`,
                getTooltip: (item: string) => {
                    const mat = getMaterial(item);
                    return mat.source
                        ? `${mat.name} (${mat.source})`
                        : mat.name;
                },
                imgFormat: "gif",
            }),
            customMaterial: {
                rarities: [5],
            },
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
