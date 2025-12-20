// Helper imports
import { objectKeys } from "@/utils";
import { createFilterButtons } from "@/helpers/filters";
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
import { Filters, FilterGroupsProps, FilterGroups } from "@/types";
import { ZZZElement, ZZZFaction, ZZZRarity, ZZZWeaponType } from "@/types/zzz";

export function zzzFilters<T extends Filters>({
    key,
    filters,
    setFilters,
    hideUnreleasedContent = false,
}: FilterGroupsProps<T>): FilterGroups {
    const getMaterialCategory = useMaterialsCategory(hideUnreleasedContent).zzz;

    return {
        element: {
            name: "Attribute",
            value: filters.element,
            buttons: createFilterButtons({
                items: elements,
                url: "zzz/elements",
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: ZZZElement[]) =>
                setFilters(key, "element", newValues),
        },
        weaponType: {
            name: "Specialty",
            value: filters.weaponType,
            buttons: createFilterButtons({
                items: weapons,
                url: "zzz/icons/specialties",
            }),
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: ZZZWeaponType[]
            ) => setFilters(key, "weaponType", newValues),
        },
        attackType: {
            name: "Attack Type",
            value: filters.attackType,
            buttons: createFilterButtons({
                items: attackTypes,
                url: "zzz/icons/attack-types",
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: ZZZFaction[]) =>
                setFilters(key, "attackType", newValues),
        },
        rarity: {
            name: "Rank",
            value: filters.rarity,
            buttons: createFilterButtons({
                items: rarities.slice(0, key === "zzz/characters" ? -3 : -2),
                url:
                    key === "zzz/characters"
                        ? "zzz/ranks/agent"
                        : "zzz/ranks/item",
                getURL: (item: ZZZRarity) => rarityMap[item],
                getTooltip: () => "",
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: ZZZRarity[]) =>
                setFilters(key, "rarity", newValues),
        },
        subStat: {
            name: "Advanced Stat",
            value: filters.subStat,
            buttons: createFilterButtons({
                items: objectKeys(weaponSubStats),
                url: "zzz/icons/stat-icons",
                getTooltip: (item: ZZZWeaponSubStat) =>
                    weaponSubStats[item].title,
            }),
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: ZZZWeaponSubStat[]
            ) => setFilters(key, "subStat", newValues),
        },
        bossMat: {
            name: "Expert Challenge Material",
            value: filters.bossMat,
            buttons: createFilterButtons({
                items: getMaterialCategory("boss").map(
                    (material) => material.tag || ""
                ),
                url: "zzz/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("boss").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("boss").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.name} (${mat.source})` : "";
                },
                imgFormat: "gif",
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "bossMat", newValues),
        },
        weeklyBossMat: {
            name: "Notorious Hunt Material",
            value: filters.weeklyBossMat,
            buttons: createFilterButtons({
                items: getMaterialCategory("weekly").map(
                    (material) => material.tag || ""
                ),
                url: "zzz/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("weekly").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("weekly").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.name} (${mat.source})` : "";
                },
                imgFormat: "gif",
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "weeklyBossMat", newValues),
        },
        nation: {
            name: "Faction",
            value: filters.nation,
            buttons: createFilterButtons({
                items: factions,
                url: "zzz/factions",
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: ZZZFaction[]) =>
                setFilters(key, "nation", newValues),
        },
    };
}
