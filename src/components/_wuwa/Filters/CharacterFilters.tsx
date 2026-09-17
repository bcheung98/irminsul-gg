// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { wuwaCharacterFilters } from "@/stores/useFilterStore";

// Type imports
import type { Filters } from "@/types/filters";
import type { WuWaElement, WuWaRarity, WuWaWeaponType } from "@/types/wuwa";

export interface WuWaCharacterFilterState extends Filters {
    element: WuWaElement[];
    weaponType: WuWaWeaponType[];
    rarity: WuWaRarity[];
    combatRoles: string[];
    _combatRoles: string[];
    forgeryMat: string[];
    commonMat: string[];
    localMat: string[];
    bossMat: string[];
    weeklyBossMat: string[];
}

export default function CharacterFilters() {
    const game = "wuwa";
    const key = "wuwa/characters";

    const {
        element,
        weaponType,
        rarity,
        combatRoles,
        forgeryMat,
        commonMat,
        localMat,
        bossMat,
        weeklyBossMat,
    } = useFilterGroups(game, {
        key,
    });

    return (
        <FilterRoot
            initialState={wuwaCharacterFilters}
            filterKey={key}
            filters={[
                element,
                weaponType,
                rarity,
                combatRoles,
                forgeryMat,
                commonMat,
                localMat,
                bossMat,
                weeklyBossMat,
            ]}
        />
    );
}
