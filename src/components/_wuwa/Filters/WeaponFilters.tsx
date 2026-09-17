// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { wuwaWeaponFilters } from "@/stores/useFilterStore";

// Type imports
import type { Filters } from "@/types/filters";
import type { WuWaRarity, WuWaWeaponType } from "@/types/wuwa";
import type { WuWaWeaponSubStat } from "@/data/wuwa/weaponStats";

export interface WuWaWeaponFilterState extends Filters {
    weaponType: WuWaWeaponType[];
    rarity: WuWaRarity[];
    subStat: WuWaWeaponSubStat[];
    forgeryMat: string[];
    commonMat: string[];
}

export default function WeaponFilters() {
    const game = "wuwa";
    const key = "wuwa/weapons";

    const { weaponType, rarity, subStat, forgeryMat, commonMat } =
        useFilterGroups(game, {
            key,
        });

    return (
        <FilterRoot
            initialState={wuwaWeaponFilters}
            filterKey={key}
            filters={[weaponType, rarity, subStat, forgeryMat, commonMat]}
        />
    );
}
