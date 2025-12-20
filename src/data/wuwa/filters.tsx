// Component imports
import RarityStars from "@/components/RarityStars";
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";
import Switch from "@/components/Switch";
import Tooltip from "@/components/Tooltip";

// MUI imports
import HelpIcon from "@mui/icons-material/Help";

// Helper imports
import { createFilterButtons } from "@/helpers/filters";
import { useMaterialsCategory } from "@/helpers/materials";
import { echoClass, elements, rarities, weapons } from "@/data/wuwa/common";
import { combatRoleNames } from "./combatRoles";
import { WuWaWeaponSubStat, weaponSubStats } from "./weaponStats";
import { sonataEffects } from "./sonataEffects";
import { isUnreleasedContent } from "@/helpers/isUnreleasedContent";

// Type imports
import { Filters, FilterGroupsProps, FilterGroups } from "@/types";
import { WuWaElement, WuWaRarity, WuWaWeaponType } from "@/types/wuwa";

export function wuwaFilters<T extends Filters>({
    key,
    filters,
    setFilters,
    hideUnreleasedContent = false,
}: FilterGroupsProps<T>): FilterGroups {
    const getMaterialCategory = useMaterialsCategory(
        hideUnreleasedContent
    ).wuwa;

    let sonatas = [...sonataEffects];
    if (hideUnreleasedContent) {
        sonatas = sonatas.filter((sonata) =>
            isUnreleasedContent(sonata.release.version, "wuwa")
        );
    }

    return {
        element: {
            name: "Attribute",
            value: filters.element,
            buttons: createFilterButtons({
                items: elements,
                url: "wuwa/icons/elements",
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: WuWaElement[]) =>
                setFilters(key, "element", newValues),
        },
        weaponType: {
            name: "Weapon",
            value: filters.weaponType,
            buttons: createFilterButtons({
                items: weapons,
                url: "wuwa/skills",
                getURL: (item: string) => `Attack_${item}`,
            }),
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: WuWaWeaponType[]
            ) => setFilters(key, "weaponType", newValues),
        },
        rarity: {
            name: "Rarity",
            value: filters.rarity,
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
            onChange: (_: React.BaseSyntheticEvent, newValues: WuWaRarity[]) =>
                setFilters(key, "rarity", newValues),
            padding: "4px 8px",
        },
        combatRoles: {
            name: "Combat Roles",
            value: filters.combatRoles,
            buttons: createFilterButtons({
                items: combatRoleNames,
                url: "wuwa/icons/tags",
            }),
            toggle: (
                <FlexBox spacing={1} wrap>
                    <Switch
                        checked={filters._combatRoles?.includes("true")}
                        onChange={() => {
                            setFilters(
                                key,
                                "_combatRoles",
                                filters._combatRoles.includes("true")
                                    ? ["false"]
                                    : ["true"]
                            );
                        }}
                        size="small"
                    />
                    <UniqueModeHelper text="If toggled, will filter resonators that only have all selected combat roles." />
                </FlexBox>
            ),
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "combatRoles", newValues),
        },
        subStat: {
            name: "Substat",
            value: filters.subStat,
            buttons: createFilterButtons({
                items: weaponSubStats,
                url: "wuwa/icons/stat-icons",
            }),
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: WuWaWeaponSubStat[]
            ) => setFilters(key, "subStat", newValues),
        },
        forgeryMat: {
            name: "Forgery Material",
            value: filters.forgeryMat,
            buttons: createFilterButtons({
                items: getMaterialCategory("forgery")
                    .filter((material) => !material.rarity)
                    .map((material) => material.tag || ""),
                url: "wuwa/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("forgery").find(
                        (material) => material.tag === `${item}4`
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("forgery").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.name}` : "";
                },
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "forgeryMat", newValues),
        },
        commonMat: {
            name: "Common Material",
            value: filters.commonMat,
            buttons: createFilterButtons({
                items: getMaterialCategory("common")
                    .filter((material) => !material.rarity)
                    .map((material) => material.tag || ""),
                url: "wuwa/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("common").find(
                        (material) => material.tag === `${item}4`
                    );
                    return mat ? `${mat.id}` : "0";
                },
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
        localMat: {
            name: "Ascension Material",
            value: filters.localMat,
            buttons: createFilterButtons({
                items: getMaterialCategory("local").map(
                    (material) => material.tag || ""
                ),
                url: "wuwa/materials",
                getURL: (item: string) => {
                    const mat = getMaterialCategory("local").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.id}` : "0";
                },
                getTooltip: (item: string) => {
                    const mat = getMaterialCategory("local").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.name}` : "";
                },
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "localMat", newValues),
        },
        bossMat: {
            name: "Boss Material",
            value: filters.bossMat,
            buttons: createFilterButtons({
                items: getMaterialCategory("boss").map(
                    (material) => material.tag || ""
                ),
                url: "wuwa/materials",
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
                    return mat
                        ? `${mat.name}${mat.source ? ` (${mat.source})` : ""}`
                        : "";
                },
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "bossMat", newValues),
        },
        weeklyBossMat: {
            name: "Weekly Boss Material",
            value: filters.weeklyBossMat,
            buttons: createFilterButtons({
                items: getMaterialCategory("weekly").map(
                    (material) => material.tag || ""
                ),
                url: "wuwa/materials",
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
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "weeklyBossMat", newValues),
        },
        echoRarity: {
            name: "Echo Class",
            value: filters.echoRarity,
            buttons: rarities.slice(0, -1).map((rarity) => ({
                value: rarity,
                label: <Text variant="body2">{echoClass[`${rarity}`]}</Text>,
            })),
            onChange: (_: React.BaseSyntheticEvent, newValues: WuWaRarity[]) =>
                setFilters(key, "echoRarity", newValues),
            padding: "4px 8px",
        },
        sonata: {
            name: "Sonata Effects",
            value: filters.sonata,
            buttons: createFilterButtons({
                items: sonatas.map((sonata) => sonata.id),
                url: "wuwa/sonata",
                getTooltip: (item: number) => {
                    const sonata = sonataEffects.find(
                        (sonata) => sonata.id === item
                    );
                    return sonata ? `${sonata.displayName}` : "";
                },
            }),
            toggle: (
                <FlexBox spacing={1} wrap>
                    <Switch
                        checked={filters._sonata?.includes("true")}
                        onChange={() => {
                            setFilters(
                                key,
                                "_sonata",
                                filters._sonata.includes("true")
                                    ? ["false"]
                                    : ["true"]
                            );
                        }}
                        size="small"
                    />
                    <UniqueModeHelper text="If toggled, will filter echoes that only have all selected sonata effects." />
                </FlexBox>
            ),
            onChange: (_: React.BaseSyntheticEvent, newValues: number[]) =>
                setFilters(key, "sonata", newValues),
        },
    };
}

function UniqueModeHelper({ text }: { text?: string }) {
    return (
        <>
            <Text variant="body2" weight="highlight">
                Unique Mode
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
