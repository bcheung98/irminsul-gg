// Component imports
import RarityStars from "@/components/RarityStars";
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";

// MUI imports
import HelpIcon from "@mui/icons-material/Help";

// Helper imports
import { createFilterButtons } from "@/components/Filters";
import { useMaterialsCategory } from "@/helpers/materials";
import { isUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { echoClass, elements, rarities, weapons } from "@/data/wuwa/common";
import { combatRoleNames, combatRoles } from "./combatRoles";
import { weaponSubStats } from "./weaponStats";
import { sonataEffects } from "./sonataEffects";

// Type imports
import type { FilterGroups, FilterGroupsProps } from "@/types/filters";

export function wuwaFilters({
    key,
    hideUnreleasedContent = false,
}: FilterGroupsProps): FilterGroups {
    const getMaterialCategory = useMaterialsCategory(
        hideUnreleasedContent,
    ).wuwa;

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
                items: getMaterialCategory("forgery")
                    .filter((material) => !material.rarity)
                    .map((material) => material.tag || ""),
                url: "wuwa/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("forgery").find(
                        (material) => material.tag === `${item}4`,
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("forgery").find(
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
                url: "wuwa/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("common").find(
                        (material) => material.tag === `${item}4`,
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
        localMat: {
            name: "Ascension Material",
            tag: "localMat",
            buttons: createFilterButtons({
                items: getMaterialCategory("local").map(
                    (material) => material.tag || "",
                ),
                url: "wuwa/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("local").find(
                        (material) => material.tag === item,
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("local").find(
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
                url: "wuwa/materials",
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
        },
        weeklyBossMat: {
            name: "Weekly Boss Material",
            tag: "weeklyBossMat",
            buttons: createFilterButtons({
                items: getMaterialCategory("weekly").map(
                    (material) => material.tag || "",
                ),
                url: "wuwa/materials",
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
                    const sonata = sonataEffects.find(
                        (sonata) => sonata.id === item,
                    );
                    return sonata ? `${sonata.displayName}` : "";
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

function UniqueModeHelper({ text }: { text?: string }) {
    return (
        <>
            <Text variant="body2" weight="highlight">
                Match All
            </Text>
            <Tooltip title={text} arrow placement="top">
                <HelpIcon
                    sx={(theme) => ({
                        fontSize: "18px",
                        color: theme.drawer.color.primary,
                    })}
                />
            </Tooltip>
        </>
    );
}
