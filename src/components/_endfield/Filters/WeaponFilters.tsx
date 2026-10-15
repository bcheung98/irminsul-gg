// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { endfieldWeaponFilters } from "@/stores/useFilterStore";

// Type imports
import type { Filters } from "@/types/filters";
import type { EndfieldRarity, EndfieldWeaponType } from "@/types/endfield";

export interface EndfieldWeaponFilterState extends Filters {
    weaponType: EndfieldWeaponType[];
    rarity: EndfieldRarity[];
    mainAttr: string[];
    secondaryAttr: string[];
    essence: string[];
}

export default function WeaponFilters() {
    const game = "endfield";
    const key = "endfield/weapons";

    const { weaponType, rarity, mainAttr, secondaryAttr, essence } =
        useFilterGroups(game, {
            key,
        });

    return (
        <FilterRoot
            initialState={endfieldWeaponFilters}
            filterKey={key}
            filters={[weaponType, rarity, mainAttr, secondaryAttr, essence]}
        />
    );
}
