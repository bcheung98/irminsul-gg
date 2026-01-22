// Component imports
import RarityStars from "@/components/RarityStars";

// Helper imports
import { splitJoin } from "@/utils";
import { createFilterButtons } from "@/helpers/filters";
import { elements, opClasses, rarities, weapons } from "./common";

// Type imports
import { Filters, FilterGroupsProps, FilterGroups } from "@/types";
import {
    EndfieldClass,
    EndfieldElement,
    EndfieldRarity,
    EndfieldWeaponType,
} from "@/types/endfield";

export function endfieldFilters<T extends Filters>({
    key,
    filters,
    setFilters,
}: FilterGroupsProps<T>): FilterGroups {
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
            buttons: rarities
                .slice(0, key === "endfield/characters" ? 3 : 4)
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
                newValues: EndfieldRarity[],
            ) => setFilters(key, "rarity", newValues),
            padding: "4px 8px",
        },
    };
}
