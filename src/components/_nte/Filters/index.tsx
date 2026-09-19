// Component imports
import NTECharacterFilters from "./CharacterFilters";
import NTEWeaponFilters from "./WeaponFilters";
import RarityStars from "@/components/RarityStars";

// Helper imports
import { createFilterButtons } from "@/components/Filters";
import { combatRoleNames, combatRoles } from "@/data/nte/combatRoles";
import { elements, weapons, rarities } from "@/data/nte/common";
import { weaponSubStats, NTEWeaponSubStat } from "@/data/nte/weaponStats";
import { useMaterialsCategory } from "@/helpers/materials";

// Type imports
import type { FilterGroupsProps, FilterGroups } from "@/types/filters";

export { NTECharacterFilters, NTEWeaponFilters };

export function nteFilters({
    key,
    hideUnreleasedContent = false,
}: FilterGroupsProps): FilterGroups {
    const getMaterialCategory = useMaterialsCategory(hideUnreleasedContent).nte;

    return {
        element: {
            name: "Esper Type",
            tag: "element",
            buttons: createFilterButtons({
                items: elements,
                url: "nte/icons/elements",
            }),
        },
        weaponType: {
            name: "Arc Type",
            tag: "weaponType",
            buttons: createFilterButtons({
                items: weapons,
                url: "nte/icons/arcs",
            }),
        },
        rarity: {
            name: "Rarity",
            tag: "rarity",
            buttons: rarities
                .slice(0, key === "nte/characters" ? -3 : -2)
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
        combatRoles: {
            name: "Combat Roles",
            tag: "combatRoles",
            buttons: createFilterButtons({
                items: combatRoleNames,
                url: "nte/icons/tags",
                getURL: (item: string) => {
                    const tag = combatRoles.find((tag) => tag.name === item);
                    return tag
                        ? tag.icon.split("/").slice(-1)[0]
                        : "_common/images/Unknown";
                },
            }),
            option: {
                type: "matchAll",
                tag: "_combatRoles",
                text: "If toggled, will filter espers that only have all selected combat roles.",
            },
        },
        subStat: {
            name: "Substat",
            tag: "subStat",
            buttons: createFilterButtons({
                items: Object.keys(weaponSubStats).slice(1),
                url: "nte/icons/stat-icons",
                getTooltip: (item: NTEWeaponSubStat) =>
                    weaponSubStats[item].title,
            }),
        },
        skillMat: {
            name: "Skill Material",
            tag: "skillMat",
            buttons: createFilterButtons({
                items: getMaterialCategory("skill")
                    .filter((material) => material.rarity === 1)
                    .map((material) => material.tag || ""),
                url: "nte/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("skill").find(
                        (material) => material.tag === `${item}3`,
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("skill").find(
                        (material) => material.tag === item,
                    );
                    return mat ? `${mat.name}` : "";
                },
            }),
            customMaterial: {
                rarities: [2, 3, 4],
            },
        },
        weaponMat: {
            name: "Weapon Material",
            tag: "weaponMat",
            buttons: createFilterButtons({
                items: getMaterialCategory("weapon")
                    .filter((material) => material.rarity === 1)
                    .map((material) => material.tag || ""),
                url: "nte/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("weapon").find(
                        (material) => material.tag === `${item}3`,
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("weapon").find(
                        (material) => material.tag === item,
                    );
                    return mat ? `${mat.name}` : "";
                },
            }),
            customMaterial: {
                rarities: [2, 3, 4],
            },
        },
        commonMat: {
            name: "Common Material",
            tag: "commonMat",
            buttons: createFilterButtons({
                items: getMaterialCategory("common")
                    .filter((material) => !material.rarity)
                    .map((material) => material.tag || ""),
                url: "nte/materials",
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
            customMaterial: {
                rarities: [2, 3, 4],
            },
        },
        bossMat: {
            name: "Boss Material",
            tag: "bossMat",
            buttons: createFilterButtons({
                items: getMaterialCategory("boss").map(
                    (material) => material.tag || "",
                ),
                url: "nte/materials",
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
                    return mat
                        ? `${mat.name}${mat.source ? ` (${mat.source})` : ""}`
                        : "";
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
                items: getMaterialCategory("weekly")
                    .filter((material) => material.id.toString().endsWith("01"))
                    .map((material) => material.tag || ""),
                url: "nte/materials",
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
            customMaterial: {
                rarities: [5],
            },
        },
    };
}
