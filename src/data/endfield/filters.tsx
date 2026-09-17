// Component imports
import RarityStars from "@/components/RarityStars";

// Helper imports
import { splitJoin, toTitleCase } from "@/utils";
import { createFilterButtons } from "@/components/Filters";
import {
    elements,
    gearTypes,
    opClasses,
    rarities as endfieldRarities,
    weapons,
} from "./common";
import { gearSets, nonSetGear } from "./gearSets";
import { gearStats } from "./gearStats";

// Type imports
import type { FilterGroups, FilterGroupsProps } from "@/types/filters";
import type { FilterState } from "@/stores/useFilterStore";

export function endfieldFilters({ key }: FilterGroupsProps): FilterGroups {
    const rarities = ((key: keyof FilterState) => {
        switch (key) {
            case "endfield/characters":
                return endfieldRarities.slice(0, 3);
            case "endfield/weapons":
                return endfieldRarities.slice(0, 4);
            case "endfield/gear":
                return endfieldRarities.slice(1, 6);
            default:
                return endfieldRarities.slice(0, 3);
        }
    })(key);

    return {
        element: {
            name: "Element",
            tag: "element",
            buttons: createFilterButtons({
                items: elements,
                url: "endfield/elements",
            }),
        },
        specialty: {
            name: "Class",
            tag: "specialty",
            buttons: createFilterButtons({
                items: opClasses,
                url: "endfield/classes",
            }),
        },
        weaponType: {
            name: "Weapon",
            tag: "weaponType",
            buttons: createFilterButtons({
                items: weapons,
                url: "endfield/skills",
                getURL: (item: string) => `Attack_${splitJoin(item)}`,
            }),
        },
        rarity: {
            name: "Rarity",
            tag: "rarity",
            buttons: rarities.map((rarity) => ({
                value: rarity,
                label: (
                    <RarityStars rarity={rarity} useRarityColor variant="h6" />
                ),
            })),
            padding: "4px 8px",
        },
        type: {
            name: "Type",
            tag: "type",
            buttons: createFilterButtons({
                items: gearTypes.map((type) => type.toLowerCase()),
                url: "endfield/icons/gear",
                getURL: (item: string) => item.toLowerCase(),
                getTooltip: (item: string) => toTitleCase(item),
            }),
        },
        set: {
            name: "Set",
            tag: "set",
            buttons: [...gearSets, ...nonSetGear]
                .sort((a, b) => a.displayName.localeCompare(b.displayName))
                .map((set) => ({
                    value: set.id,
                    label: set.displayName,
                })),
            padding: "4px 8px",
        },
        attributes: {
            name: "Attributes",
            tag: "attributes",
            buttons: Object.entries(gearStats)
                .slice(1)
                .map(([value, details]) => ({
                    value,
                    label: details.title,
                })),
            padding: "4px 8px",
            option: {
                type: "matchAll",
                tag: "_attributes",
                text: "If toggled, will filter gear that only have all selected attributes.",
            },
        },
    };
}
