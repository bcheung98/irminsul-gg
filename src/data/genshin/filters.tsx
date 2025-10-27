import { BaseSyntheticEvent } from "react";
import { createFilterButtons } from "../../helpers/filters";
import { elements, rarities, weapons } from "@/data/genshin/common";
import { Filters, FilterGroupsProps, FilterGroups } from "@/types";
import {
    GenshinElement,
    GenshinRarity,
    GenshinWeaponType,
} from "@/types/genshin";
import RarityStars from "@/components/RarityStars";

export function genshinFilters<T extends Filters>({
    filters,
    setFilters,
}: FilterGroupsProps<T>): FilterGroups {
    return {
        element: {
            name: "Element",
            value: filters.element,
            buttons: createFilterButtons({
                items: elements,
                url: "genshin/elements",
            }),
            onChange: (_: BaseSyntheticEvent, newValues: GenshinElement[]) =>
                setFilters({ ...filters, element: newValues }),
        },
        weaponType: {
            name: "Weapon",
            value: filters.weaponType,
            buttons: createFilterButtons({
                items: weapons,
                url: "genshin/weapons/icons",
            }),
            onChange: (_: BaseSyntheticEvent, newValues: GenshinWeaponType[]) =>
                setFilters({ ...filters, weaponType: newValues }),
        },
        rarity: {
            name: "Rarity",
            value: filters.rarity,
            buttons: rarities.slice(0, -3).map((rarity) => ({
                value: rarity,
                label: <RarityStars rarity={rarity} />,
            })),
            onChange: (_: BaseSyntheticEvent, newValues: GenshinRarity[]) =>
                setFilters({ ...filters, rarity: newValues }),
            padding: "0px 8px",
        },
    };
}
