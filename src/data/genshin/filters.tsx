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
import { GenshinWeaponSubStat, weaponSubStats } from "./weaponStats";

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
    key,
    filters,
    setFilters,
    hideUnreleasedContent = false,
}: FilterGroupsProps<T>): FilterGroups {
    const getMaterialCategory = useMaterialsCategory(
        hideUnreleasedContent
    ).genshin;

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
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: GenshinElement[]
            ) => setFilters(key, "element", newValues),
        },
        weaponType: {
            name: "Weapon",
            value: filters.weaponType,
            buttons: createFilterButtons({
                items: weapons,
                url: "genshin/weapons/icons",
            }),
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: GenshinWeaponType[]
            ) => setFilters(key, "weaponType", newValues),
        },
        rarity: {
            name: "Rarity",
            value: filters.rarity,
            buttons: rarities
                .slice(0, key === "genshin/characters" ? -3 : undefined)
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
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: GenshinRarity[]
            ) => setFilters(key, "rarity", newValues),
            padding: "4px 8px",
            width: "64px",
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
                _: React.BaseSyntheticEvent,
                newValues: CharacterAscensionStat[]
            ) => setFilters(key, "ascStat", newValues),
        },
        subStat: {
            name: "Substat",
            value: filters.subStat,
            buttons: createFilterButtons({
                items: objectKeys(weaponSubStats).slice(1),
                url: "genshin/icons/ascension_stats",
                getTooltip: (item: GenshinWeaponSubStat) =>
                    weaponSubStats[item].title,
            }),
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: GenshinWeaponSubStat[]
            ) => setFilters(key, "subStat", newValues),
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
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "talentBook", newValues),
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
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "commonMat", newValues),
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
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "bossMat", newValues),
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
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "weeklyBossMat", newValues),
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
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "localMat", newValues),
        },
        weaponAscensionMat: {
            name: "Ascension Material",
            value: filters.weaponAscensionMat,
            buttons: createFilterButtons({
                items: getMaterialCategory("weapon")
                    .filter((material) => material.rarity === undefined)
                    .map((material) => material.tag || ""),
                url: "genshin/materials/weapon",
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("weapon").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.name} (${mat.source})` : "";
                },
                endTag: "4",
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "weaponAscensionMat", newValues),
            width: "128px",
        },
        eliteMat: {
            name: "Elite Material",
            value: filters.eliteMat,
            buttons: createFilterButtons({
                items: getMaterialCategory("elite")
                    .filter((material) => !material.rarity)
                    .map((material) => material.tag || ""),
                url: "genshin/materials/elite",
                getURL: (item: string) => `${item}3`,
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("elite").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.name}` : "";
                },
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "eliteMat", newValues),
        },
        nation: {
            name: "Nation",
            value: filters.nation,
            buttons: createFilterButtons({
                items: nations,
                url: "genshin/nations",
            }),
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: GenshinNation[]
            ) => setFilters(key, "nation", newValues),
        },
    };
}
