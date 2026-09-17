// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { umaSupportFilters } from "@/stores/useFilterStore";

// Type imports
import type { Filters } from "@/types/filters";
import type { UmaRarity, UmaSpecialty } from "@/types/uma";

export interface UmaSupportFilterState extends Filters {
    specialty: UmaSpecialty[];
    rarity: UmaRarity[];
}

export default function SupportFilters() {
    const game = "uma";
    const key = "uma/supports";

    const { specialty, rarity } = useFilterGroups(game, {
        key,
    });

    return (
        <FilterRoot
            initialState={umaSupportFilters}
            filterKey={key}
            filters={[specialty, rarity]}
        />
    );
}
