// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { umaCharacterFilters } from "@/stores/useFilterStore";

// Type imports
import type { Filters } from "@/types/filters";
import type { UmaAptitude, UmaRarity } from "@/types/uma";

export interface UmaCharacterFilterState extends Filters {
    aptitude: UmaAptitude[];
    rarity: UmaRarity[];
}

export default function CharacterFilters() {
    const game = "uma";
    const key = "uma/characters";

    const { aptitude, rarity } = useFilterGroups(game, {
        key,
    });

    return (
        <FilterRoot
            initialState={umaCharacterFilters}
            filterKey={key}
            filters={[aptitude, rarity]}
        />
    );
}
