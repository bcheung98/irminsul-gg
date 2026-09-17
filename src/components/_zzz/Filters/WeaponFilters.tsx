// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { zzzWeaponFilters } from "@/stores/useFilterStore";

// Type imports
import type { Filters } from "@/types/filters";
import type { ZZZRarity, ZZZWeaponType } from "@/types/zzz";
import type { ZZZWeaponSubStat } from "@/data/zzz/weaponStats";

export interface ZZZWeaponFilterState extends Filters {
    weaponType: ZZZWeaponType[];
    rarity: ZZZRarity[];
    subStat: ZZZWeaponSubStat[];
}

export default function WeaponFilters() {
    const game = "zzz";
    const key = "zzz/weapons";

    const { weaponType, rarity, subStat } = useFilterGroups(game, {
        key,
    });

    return (
        <FilterRoot
            initialState={zzzWeaponFilters}
            filterKey={key}
            filters={[weaponType, rarity, subStat]}
        />
    );
}
