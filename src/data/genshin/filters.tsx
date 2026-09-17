// Component imports
import RarityStars from "@/components/RarityStars";

// Helper imports
import { objectKeys } from "@/utils";
import {
    createFilterButtons,
    createGroupedFilterButtons,
} from "@/components/Filters";
import { useMaterialsCategory } from "@/helpers/materials";
import { elements, nations, rarities, weapons } from "@/data/genshin/common";
import { characterAscensionStats } from "./characterAscensionStats";
import { GenshinWeaponSubStat, weaponSubStats } from "./weaponStats";
import { tcgActionCardSubTypes, tcgFactions, tcgWeaponTypes } from "./tcg";

// Type imports
import type { FilterGroups, FilterGroupsProps } from "@/types/filters";
import type { CharacterAscensionStat } from "@/types/genshin/character";
import type { GenshinMaterialCategory } from "@/types/genshin/materials";

export function genshinFilters({
    key,
    hideUnreleasedContent = false,
}: FilterGroupsProps): FilterGroups {
    const getMaterialCategory = useMaterialsCategory(
        hideUnreleasedContent,
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
                res[mat.source].push(mat.tag || mat.name);
            }
        });
        return res;
    }

    return {
        element: {
            name: "Element",
            tag: "element",
            buttons: createFilterButtons({
                items: elements,
                url: "genshin/elements",
            }),
        },
        weaponType: {
            name: "Weapon",
            tag: "weaponType",
            buttons: createFilterButtons({
                items: weapons,
                url: "genshin/skills",
                getURL: (item: string) => `Attack_${item}`,
            }),
        },
        rarity: {
            name: "Rarity",
            tag: "rarity",
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
            padding: "4px 8px",
        },
        ascStat: {
            name: "Ascension Stat",
            tag: "ascStat",
            buttons: createFilterButtons({
                items: objectKeys(characterAscensionStats).slice(1),
                url: "genshin/icons/stat-icons",
                getTooltip: (item: CharacterAscensionStat) =>
                    characterAscensionStats[item].title,
            }),
        },
        subStat: {
            name: "Substat",
            tag: "subStat",
            buttons: createFilterButtons({
                items: objectKeys(weaponSubStats).slice(1),
                url: "genshin/icons/stat-icons",
                getTooltip: (item: GenshinWeaponSubStat) =>
                    weaponSubStats[item].title,
            }),
        },
        talentBook: {
            name: "Talent Book",
            tag: "talentBook",
            buttons: createFilterButtons({
                items: getMaterialCategory("talent")
                    .filter((material) => material.rarity === 4)
                    .map((material) => material.tag || ""),
                url: "genshin/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("talent").find(
                        (material) => material.tag === item,
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("talent").find(
                        (material) => material.tag === item,
                    );
                    return mat
                        ? `${mat.name.split(" ").slice(-1)[0]} (${mat.source})`
                        : "";
                },
            }),
            width: "128px",
        },
        commonMat: {
            name: "Common Material",
            tag: "commonMat",
            buttons: createFilterButtons({
                items: getMaterialCategory("common")
                    .filter((material) => !material.rarity)
                    .map((material) => material.tag || ""),
                url: "genshin/materials",
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
                url: "genshin/materials",
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
            }),
        },
        weeklyBossMat: {
            name: "Weekly Boss Material",
            tag: "weeklyBossMat",
            buttons: [],
            groupButtons: createGroupedFilterButtons({
                groupItems: getGroupedMatNames("weekly"),
                groupUrl: "genshin/bosses",
                url: "genshin/materials",
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
                    return mat ? `${mat.name}` : "";
                },
            }),
        },
        localMat: {
            name: "Local Specialty",
            tag: "localMat",
            buttons: [],
            groupButtons: createGroupedFilterButtons({
                groupItems: getGroupedMatNames("local"),
                groupUrl: "genshin/nations",
                url: "genshin/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("local").find(
                        (material) => material.tag === item,
                    );
                    return mat ? `${mat.id}` : "0";
                },
            }),
        },
        weaponAscensionMat: {
            name: "Ascension Material",
            tag: "weaponAscensionMat",
            buttons: createFilterButtons({
                items: getMaterialCategory("weapon")
                    .filter((material) => material.rarity === undefined)
                    .map((material) => material.tag || ""),
                url: "genshin/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("weapon").find(
                        (material) => material.tag === `${item}4`,
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("weapon").find(
                        (material) => material.tag === item,
                    );
                    return mat ? `${mat.name} (${mat.source})` : "";
                },
            }),
            width: "128px",
        },
        eliteMat: {
            name: "Elite Material",
            tag: "eliteMat",
            buttons: createFilterButtons({
                items: getMaterialCategory("elite")
                    .filter((material) => !material.rarity)
                    .map((material) => material.tag || ""),
                url: "genshin/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("elite").find(
                        (material) => material.tag === `${item}3`,
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("elite").find(
                        (material) => material.tag === item,
                    );
                    return mat ? `${mat.name}` : "";
                },
            }),
        },
        nation: {
            name: "Nation",
            tag: "nation",
            buttons: createFilterButtons({
                items: nations,
                url: "genshin/nations",
            }),
        },
        "tcg-element": {
            name: "Element",
            tag: "tcg-element",
            buttons: createFilterButtons({
                items: elements,
                url: "genshin/elements",
            }),
        },
        "tcg-weaponType": {
            name: "Weapon",
            tag: "tcg-weaponType",
            buttons: createFilterButtons({
                items: tcgWeaponTypes,
                url: "genshin/tcg/icons/weapons",
            }),
        },
        "tcg-faction": {
            name: "Faction",
            tag: "tcg-faction",
            buttons: createFilterButtons({
                items: tcgFactions,
                url: "genshin/tcg/icons/factions",
            }),
        },
        "tcg-group": {
            name: "Group",
            tag: "tcg-group",
            buttons: createFilterButtons({
                items: tcgActionCardSubTypes,
                url: "genshin/tcg/icons/subtypes",
            }),
        },
    };
}
