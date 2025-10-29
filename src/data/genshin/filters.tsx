import { BaseSyntheticEvent } from "react";

// Component imports
import RarityStars from "@/components/RarityStars";

// Helper imports
import { objectKeys } from "@/utils";
import {
    createFilterButtons,
    createGroupedFilterButtons,
} from "@/helpers/filters";
import { useMaterialsCategory } from "@/helpers/materials";
import { elements, nations, rarities, weapons } from "@/data/genshin/common";
import { characterAscensionStats } from "./characterAscensionStats";

// Type imports
import { Filters, FilterGroupsProps, FilterGroups } from "@/types";
import {
    GenshinElement,
    GenshinNation,
    GenshinRarity,
    GenshinWeaponType,
} from "@/types/genshin";
import { CharacterAscensionStat } from "@/types/genshin/character";
import { GenshinMaterialCategory } from "@/types/genshin/materials";

export function genshinFilters<T extends Filters>({
    filters,
    setFilters,
}: FilterGroupsProps<T>): FilterGroups {
    const getMaterialCategory = useMaterialsCategory().genshin;

    function getGroupedMatNames(category: GenshinMaterialCategory) {
        const res: Record<string, string[]> = {};
        const materials = getMaterialCategory(category);
        materials.forEach((mat) => {
            if (mat.source) {
                res[mat.source] = [];
            }
        });
        materials.forEach((mat) => {
            if (mat.source) {
                res[mat.source].push(mat.name);
            }
        });
        return res;
    }

    return {
        element: {
            name: "Element",
            value: filters.element,
            buttons: createFilterButtons({
                items: elements,
                url: "genshin/elements",
            }),
            onChange: (_: BaseSyntheticEvent, newValues: GenshinElement[]) =>
                setFilters({ ...filters, element: newValues }),
        },
        weaponType: {
            name: "Weapon",
            value: filters.weaponType,
            buttons: createFilterButtons({
                items: weapons,
                url: "genshin/weapons/icons",
            }),
            onChange: (_: BaseSyntheticEvent, newValues: GenshinWeaponType[]) =>
                setFilters({ ...filters, weaponType: newValues }),
        },
        rarity: {
            name: "Rarity",
            value: filters.rarity,
            buttons: rarities.slice(0, -3).map((rarity) => ({
                value: rarity,
                label: <RarityStars rarity={rarity} variant="h6" />,
            })),
            onChange: (_: BaseSyntheticEvent, newValues: GenshinRarity[]) =>
                setFilters({ ...filters, rarity: newValues }),
            padding: "4px 8px",
        },
        ascStat: {
            name: "Ascension Stat",
            value: filters.ascStat,
            buttons: createFilterButtons({
                items: objectKeys(characterAscensionStats).slice(1),
                url: "genshin/icons/ascension_stats",
                getTooltip: (item: CharacterAscensionStat) =>
                    characterAscensionStats[item].title,
            }),
            onChange: (
                _: BaseSyntheticEvent,
                newValues: CharacterAscensionStat[]
            ) => setFilters({ ...filters, ascStat: newValues }),
        },
        talentBook: {
            name: "Talent Book",
            value: filters.talentBook,
            buttons: createFilterButtons({
                items: getMaterialCategory("talent")
                    .filter((material) => material.rarity === 4)
                    .map((material) => material.tag || ""),
                url: "genshin/materials/talent",
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("talent").find(
                        (material) => material.tag === item
                    );
                    return mat
                        ? `${mat.name.split(" ").slice(-1)[0]} (${mat.source})`
                        : "";
                },
            }),
            onChange: (_: BaseSyntheticEvent, newValues: string[]) =>
                setFilters({ ...filters, talentBook: newValues }),
            width: "128px",
        },
        commonMat: {
            name: "Common Material",
            value: filters.commonMat,
            buttons: createFilterButtons({
                items: getMaterialCategory("common")
                    .filter((material) => !material.rarity)
                    .map((material) => material.tag || ""),
                url: "genshin/materials/common",
                getURL: (item: string) => `${item}3`,
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("common").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.name}` : "";
                },
            }),
            onChange: (_: BaseSyntheticEvent, newValues: string[]) =>
                setFilters({ ...filters, commonMat: newValues }),
        },
        bossMat: {
            name: "Boss Material",
            value: filters.bossMat,
            buttons: createFilterButtons({
                items: getMaterialCategory("boss").map(
                    (material) => material.tag || ""
                ),
                url: "genshin/materials/boss",
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("boss").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.name} (${mat.source})` : "";
                },
            }),
            onChange: (_: BaseSyntheticEvent, newValues: string[]) =>
                setFilters({ ...filters, bossMat: newValues }),
        },
        weeklyBossMat: {
            name: "Weekly Boss Material",
            value: filters.weeklyBossMat,
            buttons: [],
            groupButtons: createGroupedFilterButtons({
                groupItems: getGroupedMatNames("weekly"),
                groupUrl: "genshin/bosses",
                url: "genshin/materials/weekly",
            }),
            onChange: (_: BaseSyntheticEvent, newValues: string[]) =>
                setFilters({ ...filters, weeklyBossMat: newValues }),
        },
        localMat: {
            name: "Local Specialty",
            value: filters.localMat,
            buttons: [],
            groupButtons: createGroupedFilterButtons({
                groupItems: getGroupedMatNames("local"),
                groupUrl: "genshin/nations",
                url: "genshin/materials/local",
            }),
            onChange: (_: BaseSyntheticEvent, newValues: string[]) =>
                setFilters({ ...filters, localMat: newValues }),
        },
        nation: {
            name: "Nation",
            value: filters.nation,
            buttons: createFilterButtons({
                items: nations,
                url: "genshin/nations",
            }),
            onChange: (_: BaseSyntheticEvent, newValues: GenshinNation[]) =>
                setFilters({ ...filters, nation: newValues }),
        },
    };
}
