// Component imports
import GenshinCharacterFilters from "./CharacterFilters";
import GenshinWeaponFilters from "./WeaponFilters";
import GenshinTCGFilters from "./TCGFilters";
import RarityStars from "@/components/RarityStars";

// Helper imports
import {
    createFilterButtons,
    createGroupedFilterButtons,
} from "@/components/Filters";
import { characterAscensionStats } from "@/data/genshin/characterAscensionStats";
import { elements, weapons, rarities, nations } from "@/data/genshin/common";
import {
    tcgWeaponTypes,
    tcgFactions,
    tcgActionCardSubTypes,
} from "@/data/genshin/tcg";
import {
    weaponSubStats,
    GenshinWeaponSubStat,
} from "@/data/genshin/weaponStats";
import { getMaterialResolvers } from "@/helpers/materials";
import { objectKeys } from "@/utils";

// Type imports
import type { FilterGroupsProps, FilterGroups } from "@/types/filters";
import type { CharacterAscensionStat } from "@/types/genshin/character";
import type { Material } from "@/types/materials";

export { GenshinCharacterFilters, GenshinWeaponFilters, GenshinTCGFilters };

export function genshinFilters({
    key,
    hideUnreleasedContent = false,
}: FilterGroupsProps): FilterGroups {
    const { getMaterial, getMaterialCategory } = getMaterialResolvers(
        "genshin",
        hideUnreleasedContent,
    );

    const talentMaterials = getMaterialCategory("talent")
        .filter((material) => material.rarity === 4)
        .map((material) => material.tag || "");

    const commonMaterials = getMaterialCategory("common")
        .filter((material) => !material.rarity)
        .map((material) => material.tag || "");

    const bossMaterials = getMaterialCategory("boss").map(
        (material) => material.tag || "",
    );

    const weeklyBossMaterials = getMaterialCategory("weekly");
    const localMaterials = getMaterialCategory("local");

    const weaponMaterials = getMaterialCategory("weapon")
        .filter((material) => !material.rarity)
        .map((material) => material.tag || "");

    const eliteMaterials = getMaterialCategory("elite")
        .filter((material) => !material.rarity)
        .map((material) => material.tag || "");

    function getGroupedMatNames(materials: Material[]) {
        const res: Record<string, string[]> = {};

        for (const mat of materials) {
            if (!mat.source) continue;

            (res[mat.source] ??= []).push(mat.tag || mat.name);
        }

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
                items: talentMaterials,
                url: "genshin/materials",
                getURL: (item: string) => `${getMaterial(item).id}`,
                getTooltip: (item: string) => {
                    const mat = getMaterial(item);
                    return `${mat.name.split(" ").slice(-1)[0]} (${mat.source})`;
                },
            }),
            width: "128px",
            customMaterial: {
                rarities: [2, 3, 4],
            },
        },
        commonMat: {
            name: "Common Material",
            tag: "commonMat",
            buttons: createFilterButtons({
                items: commonMaterials,
                url: "genshin/materials",
                getURL: (item: string) => `${getMaterial(`${item}3`).id}`,
                getTooltip: (item: string) => getMaterial(item).name,
            }),
            customMaterial: {
                rarities: [1, 2, 3],
            },
        },
        bossMat: {
            name: "Boss Material",
            tag: "bossMat",
            buttons: createFilterButtons({
                items: bossMaterials,
                url: "genshin/materials",
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
            buttons: [],
            groupButtons: createGroupedFilterButtons({
                groupItems: getGroupedMatNames(weeklyBossMaterials),
                groupUrl: "genshin/bosses",
                url: "genshin/materials",
                getURL: (item: string) => `${getMaterial(item).id}`,
                getTooltip: (item: string) => getMaterial(item).name,
            }),
            customMaterial: {
                rarities: [5],
            },
        },
        localMat: {
            name: "Local Specialty",
            tag: "localMat",
            buttons: [],
            groupButtons: createGroupedFilterButtons({
                groupItems: getGroupedMatNames(localMaterials),
                groupUrl: "genshin/nations",
                url: "genshin/materials",
                getURL: (item: string) => `${getMaterial(item).id}`,
            }),
            customMaterial: {
                rarities: [1],
            },
        },
        weaponAscensionMat: {
            name: "Ascension Material",
            tag: "weaponAscensionMat",
            buttons: createFilterButtons({
                items: weaponMaterials,
                url: "genshin/materials",
                getURL: (item: string) => `${getMaterial(`${item}4`).id}`,
                getTooltip: (item: string) => {
                    const mat = getMaterial(item);
                    return `${mat.name.split(" ").slice(-1)[0]} (${mat.source})`;
                },
            }),
            width: "128px",
            customMaterial: {
                rarities: [2, 3, 4, 5],
            },
        },
        eliteMat: {
            name: "Elite Material",
            tag: "eliteMat",
            buttons: createFilterButtons({
                items: eliteMaterials,
                url: "genshin/materials",
                getURL: (item: string) => `${getMaterial(`${item}3`).id}`,
                getTooltip: (item: string) => getMaterial(item).name,
            }),
            customMaterial: {
                rarities: [2, 3, 4],
            },
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
