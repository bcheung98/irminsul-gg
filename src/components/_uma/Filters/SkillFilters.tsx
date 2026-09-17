// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { umaSkillFilters } from "@/stores/useFilterStore";

// Type imports
import type { Filters } from "@/types/filters";
import type { UmaRarity } from "@/types/uma";

export interface UmaSkillFilterState extends Filters {
    conditions: string[];
    skillRarity: UmaRarity[];
}

export default function SkillFilters() {
    const game = "uma";
    const key = "uma/skills";

    const { conditions, skillRarity } = useFilterGroups(game, {
        key,
    });

    return (
        <FilterRoot
            initialState={umaSkillFilters}
            filterKey={key}
            filters={[conditions, skillRarity]}
        />
    );
}
