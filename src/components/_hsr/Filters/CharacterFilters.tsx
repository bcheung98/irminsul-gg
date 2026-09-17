// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { hsrCharacterFilters } from "@/stores/useFilterStore";

// Type imports
import type { Filters } from "@/types/filters";
import type {
    HSRElement,
    HSRRarity,
    HSRWeaponType,
    HSRWorld,
} from "@/types/hsr";

export interface HSRCharacterFilterState extends Filters {
    element: HSRElement[];
    weaponType: HSRWeaponType[];
    rarity: HSRRarity[];
    calyxMat: string[];
    commonMat: string[];
    bossMat: string[];
    weeklyBossMat: string[];
    nation: HSRWorld[];
}

export default function CharacterFilters() {
    const game = "hsr";
    const key = "hsr/characters";

    const {
        element,
        weaponType,
        rarity,
        calyxMat,
        commonMat,
        bossMat,
        weeklyBossMat,
        nation,
    } = useFilterGroups(game, {
        key,
    });

    return (
        <FilterRoot
            initialState={hsrCharacterFilters}
            filterKey={key}
            filters={[
                element,
                weaponType,
                rarity,
                calyxMat,
                commonMat,
                bossMat,
                weeklyBossMat,
                nation,
            ]}
        />
    );
}
