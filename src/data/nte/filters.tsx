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
import { elements, rarities, weapons } from "@/data/nte/common";
import { combatRoleNames, combatRoles } from "./combatRoles";
import { NTEWeaponSubStat, weaponSubStats } from "./weaponStats";

// Type imports
import { Filters, FilterGroupsProps, FilterGroups } from "@/types";
import { NTEElement, NTERarity, NTEWeaponType } from "@/types/nte";

export function nteFilters<T extends Filters>({
    key,
    filters,
    setFilters,
    hideUnreleasedContent = false,
}: FilterGroupsProps<T>): FilterGroups {
    const getMaterialCategory = useMaterialsCategory(hideUnreleasedContent).nte;

    return {
        element: {
            name: "Element",
            value: filters.element,
            buttons: createFilterButtons({
                items: elements,
                url: "nte/icons/elements",
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: NTEElement[]) =>
                setFilters(key, "element", newValues),
        },
        weaponType: {
            name: "Arc Type",
            value: filters.weaponType,
            buttons: createFilterButtons({
                items: weapons,
                url: "nte/icons/arcs",
            }),
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: NTEWeaponType[],
            ) => setFilters(key, "weaponType", newValues),
        },
        rarity: {
            name: "Rarity",
            value: filters.rarity,
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
            onChange: (_: React.BaseSyntheticEvent, newValues: NTERarity[]) =>
                setFilters(key, "rarity", newValues),
            padding: "4px 8px",
        },
        combatRoles: {
            name: "Combat Roles",
            value: filters.combatRoles,
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
                                    : ["true"],
                            );
                        }}
                        size="small"
                    />
                    <UniqueModeHelper text="If toggled, will filter espers that only have all selected combat roles." />
                </FlexBox>
            ),
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "combatRoles", newValues),
        },
        subStat: {
            name: "Substat",
            value: filters.subStat,
            buttons: createFilterButtons({
                items: Object.keys(weaponSubStats).slice(1),
                url: "nte/icons/stat-icons",
                getTooltip: (item: NTEWeaponSubStat) =>
                    weaponSubStats[item].title,
            }),
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: NTEWeaponSubStat[],
            ) => setFilters(key, "subStat", newValues),
        },
        skillMat: {
            name: "Skill Material",
            value: filters.skillMat,
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
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "skillMat", newValues),
        },
        weaponMat: {
            name: "Weapon Material",
            value: filters.weaponMat,
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
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "weaponMat", newValues),
        },
        commonMat: {
            name: "Common Material",
            value: filters.commonMat,
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
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "commonMat", newValues),
        },
        bossMat: {
            name: "Boss Material",
            value: filters.bossMat,
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
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "bossMat", newValues),
        },
        weeklyBossMat: {
            name: "Weekly Boss Material",
            value: filters.weeklyBossMat,
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
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "weeklyBossMat", newValues),
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
