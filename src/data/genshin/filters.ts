import { BaseSyntheticEvent } from "react";
import { createFilterButtons } from "../../helpers/filters";
import { elements, weapons } from "@/data/genshin/common";
import { Filters, FilterGroupsProps, FilterGroups } from "@/types";
import { GenshinElement, GenshinWeaponType } from "@/types/genshin";

export function genshinFilters<T extends Filters>({
    filters,
    setFilters,
}: FilterGroupsProps<T>): FilterGroups {
    return {
        element: {
            name: "Element",
            value: filters.element,
            buttons: createFilterButtons(elements, "genshin/elements"),
            onChange: (_: BaseSyntheticEvent, newValues: GenshinElement[]) =>
                setFilters({ ...filters, element: newValues }),
        },
        weapon: {
            name: "Weapon",
            value: filters.weapon,
            buttons: createFilterButtons(weapons, "weapons/icons"),
            onChange: (_: BaseSyntheticEvent, newValues: GenshinWeaponType[]) =>
                setFilters({ ...filters, weaponType: newValues }),
        },
    };
}
