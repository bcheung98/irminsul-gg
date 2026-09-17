// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { nteCharacterFilters } from "@/stores/useFilterStore";

// Type imports
import type { Filters } from "@/types/filters";
import type { NTEElement, NTERarity, NTEWeaponType } from "@/types/nte";

export interface NTECharacterFilterState extends Filters {
    element: NTEElement[];
    weaponType: NTEWeaponType[];
    rarity: NTERarity[];
    combatRoles: string[];
    _combatRoles: string[];
    skillMat: string[];
    commonMat: string[];
    bossMat: string[];
    weeklyBossMat: string[];
}

export default function CharacterFilters() {
    const game = "nte";
    const key = "nte/characters";

    const {
        element,
        weaponType,
        rarity,
        combatRoles,
        skillMat,
        commonMat,
        bossMat,
        weeklyBossMat,
    } = useFilterGroups(game, {
        key,
    });

    return (
        <FilterRoot
            initialState={nteCharacterFilters}
            filterKey={key}
            filters={[
                element,
                weaponType,
                rarity,
                combatRoles,
                skillMat,
                commonMat,
                bossMat,
                weeklyBossMat,
            ]}
        />
    );
}
