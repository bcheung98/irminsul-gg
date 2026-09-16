// Component imports
import RarityStars from "@/components/RarityStars";
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";
import Switch from "@/components/Switch";
import Tooltip from "@/components/Tooltip";

// MUI imports
import HelpIcon from "@mui/icons-material/Help";

// Helper imports
import { splitJoin, toTitleCase } from "@/utils";
import { createFilterButtons } from "@/helpers/filters";
import { elements, gearTypes, opClasses, rarities, weapons } from "./common";
import { gearSets, nonSetGear } from "./gearSets";

// Type imports
import { Filters, FilterGroupsProps, FilterGroups } from "@/types";
import {
    EndfieldClass,
    EndfieldElement,
    EndfieldRarity,
    EndfieldWeaponType,
} from "@/types/endfield";
import { EndfieldGearType } from "@/types/endfield/gear";
import { FilterState } from "@/stores/useFilterStore";
import { GearStat, gearStats } from "./gearStats";

export function endfieldFilters<T extends Filters>({
    key,
    filters,
    setFilters,
}: FilterGroupsProps<T>): FilterGroups {
    const rarity: Partial<Record<keyof FilterState, number[]>> = {
        "endfield/characters": rarities.slice(0, 3),
        "endfield/weapons": rarities.slice(0, 4),
        "endfield/gear": rarities.slice(1, 6),
    };

    return {
        element: {
            name: "Element",
            value: filters.element,
            buttons: createFilterButtons({
                items: elements,
                url: "endfield/elements",
            }),
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: EndfieldElement[],
            ) => setFilters(key, "element", newValues),
        },
        specialty: {
            name: "Class",
            value: filters.specialty,
            buttons: createFilterButtons({
                items: opClasses,
                url: "endfield/classes",
            }),
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: EndfieldClass[],
            ) => setFilters(key, "specialty", newValues),
        },
        weaponType: {
            name: "Weapon",
            value: filters.weaponType,
            buttons: createFilterButtons({
                items: weapons,
                url: "endfield/skills",
                getURL: (item: string) => `Attack_${splitJoin(item)}`,
            }),
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: EndfieldWeaponType[],
            ) => setFilters(key, "weaponType", newValues),
        },
        rarity: {
            name: "Rarity",
            value: filters.rarity,
            buttons: rarity[key]!.map((rarity) => ({
                value: rarity,
                label: (
                    <RarityStars rarity={rarity} useRarityColor variant="h6" />
                ),
            })),
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: EndfieldRarity[],
            ) => setFilters(key, "rarity", newValues),
            padding: "4px 8px",
        },
        type: {
            name: "Type",
            value: filters.type,
            buttons: createFilterButtons({
                items: gearTypes.map((type) => type.toLowerCase()),
                url: "endfield/icons/gear",
                getURL: (item: string) => item.toLowerCase(),
                getTooltip: (item: string) => toTitleCase(item),
            }),
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: EndfieldGearType[],
            ) => setFilters(key, "type", newValues),
        },
        set: {
            name: "Set",
            value: filters.set,
            buttons: [...gearSets, ...nonSetGear]
                .sort((a, b) => a.displayName.localeCompare(b.displayName))
                .map((set) => ({
                    value: set.id,
                    label: set.displayName,
                })),
            onChange: (_: React.BaseSyntheticEvent, newValues: number[]) =>
                setFilters(key, "set", newValues),
            padding: "4px 8px",
        },
        attributes: {
            name: "Attributes",
            value: filters.attributes,
            buttons: Object.entries(gearStats)
                .slice(1)
                .map(([value, details]) => ({
                    value,
                    label: details.title,
                })),
            toggle: (
                <FlexBox spacing={1} wrap>
                    <Switch
                        checked={filters._attributes?.includes("true")}
                        onChange={() => {
                            setFilters(
                                key,
                                "_attributes",
                                filters._attributes.includes("true")
                                    ? ["false"]
                                    : ["true"],
                            );
                        }}
                        size="small"
                    />
                    <UniqueModeHelper text="If toggled, will filter gear that only have all selected attributes." />
                </FlexBox>
            ),
            onChange: (_: React.BaseSyntheticEvent, newValues: GearStat[]) =>
                setFilters(key, "attributes", newValues),
            padding: "4px 8px",
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
