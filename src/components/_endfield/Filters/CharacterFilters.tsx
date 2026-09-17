// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { endfieldCharacterFilters } from "@/stores/useFilterStore";

// Type imports
import type { Filters } from "@/types/filters";
import type {
    EndfieldClass,
    EndfieldElement,
    EndfieldRarity,
    EndfieldWeaponType,
} from "@/types/endfield";

export interface EndfieldCharacterFilterState extends Filters {
    element: EndfieldElement[];
    specialty: EndfieldClass[];
    weaponType: EndfieldWeaponType[];
    rarity: EndfieldRarity[];
}

export default function CharacterFilters() {
    const game = "endfield";
    const key = "endfield/characters";

    const { element, specialty, weaponType, rarity } = useFilterGroups(game, {
        key,
    });

    return (
        <FilterRoot
            initialState={endfieldCharacterFilters}
            filterKey={key}
            filters={[element, specialty, weaponType, rarity]}
        />
    );
}
