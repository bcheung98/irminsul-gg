// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { nteWeaponFilters } from "@/stores/useFilterStore";
import { NTEWeaponSubStat } from "@/data/nte/weaponStats";

// Type imports
import type { Filters } from "@/types/filters";
import type { NTEWeaponType, NTERarity } from "@/types/nte";

export interface NTEWeaponFilterState extends Filters {
    weaponType: NTEWeaponType[];
    rarity: NTERarity[];
    subStat: NTEWeaponSubStat[];
    weaponMat: string[];
}

export default function WeaponFilters() {
    const game = "nte";
    const key = "nte/weapons";

    const { weaponType, rarity, subStat, weaponMat } = useFilterGroups(game, {
        key,
    });

    return (
        <FilterRoot
            initialState={nteWeaponFilters}
            filterKey={key}
            filters={[weaponType, rarity, subStat, weaponMat]}
        />
    );
}
