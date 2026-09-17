// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { hsrWeaponFilters } from "@/stores/useFilterStore";

// Type imports
import type { Filters } from "@/types/filters";
import type { HSRRarity, HSRWeaponType } from "@/types/hsr";

export interface HSRWeaponFilterState extends Filters {
    weaponType: HSRWeaponType[];
    rarity: HSRRarity[];
    calyxMat: string[];
    commonMat: string[];
}

export default function WeaponFilters() {
    const game = "hsr";
    const key = "hsr/weapons";

    const { weaponType, rarity, calyxMat, commonMat } = useFilterGroups(game, {
        key,
    });

    return (
        <FilterRoot
            initialState={hsrWeaponFilters}
            filterKey={key}
            filters={[weaponType, rarity, calyxMat, commonMat]}
        />
    );
}
