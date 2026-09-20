// Component imports
import WuWaCharacterFilters from "./CharacterFilters";
import WuWaWeaponFilters from "./WeaponFilters";
import WuWaEchoFilters from "./EchoFilters";
import RarityStars from "@/components/RarityStars";
import Text from "@/components/Text";

// Helper imports
import { createFilterButtons } from "@/components/Filters";
import { combatRoleNames, combatRoles } from "@/data/wuwa/combatRoles";
import { echoClass, elements, rarities, weapons } from "@/data/wuwa/common";
import { weaponSubStats } from "@/data/wuwa/weaponStats";
import { sonataEffects } from "@/data/wuwa/sonataEffects";
import { getMaterialResolvers } from "@/helpers/materials";
import { isUnreleasedContent } from "@/helpers/isUnreleasedContent";

// Type imports
import type { FilterGroups, FilterGroupsProps } from "@/types/filters";

export { WuWaCharacterFilters, WuWaWeaponFilters, WuWaEchoFilters };

export function wuwaFilters({
    key,
    hideUnreleasedContent = false,
}: FilterGroupsProps): FilterGroups {
    const { getMaterial, getMaterialCategory } = getMaterialResolvers(
        "wuwa",
        hideUnreleasedContent,
    );

    const forgeryMaterials = getMaterialCategory("forgery");
    const commonMaterials = getMaterialCategory("common");
    const localMaterials = getMaterialCategory("local");
    const bossMaterials = getMaterialCategory("boss");
    const weeklyBossMaterials = getMaterialCategory("weekly");

    let sonatas = [...sonataEffects];
    if (hideUnreleasedContent) {
        sonatas = sonatas.filter((sonata) =>
            isUnreleasedContent(sonata.release.version, "wuwa"),
        );
    }

    return {
        element: {
            name: "Attribute",
            tag: "element",
            buttons: createFilterButtons({
                items: elements,
                url: "wuwa/icons/elements",
            }),
        },
        weaponType: {
            name: "Weapon",
            tag: "weaponType",
            buttons: createFilterButtons({
                items: weapons,
                url: "wuwa/skills",
                getURL: (item: string) => `Attack_${item}`,
            }),
        },
        rarity: {
            name: "Rarity",
            tag: "rarity",
            buttons: rarities
                .slice(0, key === "wuwa/characters" ? -3 : undefined)
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
                url: "wuwa/icons/tags",
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
                text: "If toggled, will filter resonators that only have all selected combat roles.",
            },
        },
        subStat: {
            name: "Substat",
            tag: "subStat",
            buttons: createFilterButtons({
                items: weaponSubStats,
                url: "wuwa/icons/stat-icons",
            }),
        },
        forgeryMat: {
            name: "Forgery Material",
            tag: "forgeryMat",
            buttons: createFilterButtons({
                items: forgeryMaterials
                    .filter((material) => !material.rarity)
                    .map((material) => material.tag || ""),
                url: "wuwa/materials",
                getURL: (item: string) => `${getMaterial(`${item}4`).id}`,
                getTooltip: (item: string) => getMaterial(item).name,
            }),
            customMaterial: {
                rarities: [2, 3, 4, 5],
            },
        },
        commonMat: {
            name: "Common Material",
            tag: "commonMat",
            buttons: createFilterButtons({
                items: commonMaterials
                    .filter((material) => !material.rarity)
                    .map((material) => material.tag || ""),
                url: "wuwa/materials",
                getURL: (item: string) => `${getMaterial(`${item}4`).id}`,
                getTooltip: (item: string) => getMaterial(item).name,
            }),
            customMaterial: {
                rarities: [2, 3, 4, 5],
            },
        },
        localMat: {
            name: "Ascension Material",
            tag: "localMat",
            buttons: createFilterButtons({
                items: localMaterials.map((material) => material.tag || ""),
                url: "wuwa/materials",
                getURL: (item: string) => `${getMaterial(item).id}`,
                getTooltip: (item: string) => getMaterial(item).name,
            }),
            customMaterial: {
                rarities: [1],
            },
        },
        bossMat: {
            name: "Boss Material",
            tag: "bossMat",
            buttons: createFilterButtons({
                items: bossMaterials.map((material) => material.tag || ""),
                url: "wuwa/materials",
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
                items: weeklyBossMaterials.map(
                    (material) => material.tag || "",
                ),
                url: "wuwa/materials",
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
        echoRarity: {
            name: "Echo Class",
            tag: "echoRarity",
            buttons: rarities.slice(0, -1).map((rarity) => ({
                value: rarity,
                label: <Text variant="body2">{echoClass[`${rarity}`]}</Text>,
            })),
            padding: "4px 8px",
        },
        sonata: {
            name: "Sonata Effects",
            tag: "sonata",
            buttons: createFilterButtons({
                items: sonatas.map((sonata) => sonata.id),
                url: "wuwa/sonata",
                getTooltip: (item: number) => {
                    const sonata = sonatas.find((sonata) => sonata.id === item);
                    return sonata?.displayName ?? "";
                },
            }),
            option: {
                type: "matchAll",
                tag: "_sonata",
                text: "If toggled, will filter echoes that only have all selected sonata effects.",
            },
        },
    };
}
