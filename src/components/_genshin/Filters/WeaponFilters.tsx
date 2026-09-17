// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { genshinWeaponFilters } from "@/stores/useFilterStore";

// Type imports
import type { Filters } from "@/types/filters";
import type { GenshinRarity, GenshinWeaponType } from "@/types/genshin";
import type { GenshinWeaponSubStat } from "@/data/genshin/weaponStats";

export interface GenshinWeaponFilterState extends Filters {
    weaponType: GenshinWeaponType[];
    rarity: GenshinRarity[];
    subStat: GenshinWeaponSubStat[];
    weaponAscensionMat: string[];
    eliteMat: string[];
    commonMat: string[];
}

export default function WeaponFilters() {
    const game = "genshin";
    const key = "genshin/weapons";

    const {
        weaponType,
        rarity,
        subStat,
        weaponAscensionMat,
        eliteMat,
        commonMat,
    } = useFilterGroups(game, {
        key,
    });

    return (
        <FilterRoot
            initialState={genshinWeaponFilters}
            filterKey={key}
            filters={[
                weaponType,
                rarity,
                subStat,
                weaponAscensionMat,
                eliteMat,
                commonMat,
            ]}
        />
    );
}
