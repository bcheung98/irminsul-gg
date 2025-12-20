import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";

import { umaSkillFilters, useFilterStore } from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";

// Type imports
import { Filters } from "@/types";
import { UmaRarity } from "@/types/uma";

export interface UmaSkillFilterState extends Filters {
    conditions: string[];
    skillRarity: UmaRarity[];
}

export default function SkillFilters() {
    const game = useGameTag();
    const key = "uma/skills";

    const { setFilterState, clearFilterState } = useFilterStore();
    const filters = useFilterStore(useShallow((state) => state[key]));
    const actions = filterActions(
        key,
        umaSkillFilters,
        filters,
        clearFilterState
    );

    const { conditions, skillRarity } = filterGroups({
        key,
        filters,
        setFilters: setFilterState,
    })[game];

    return <FilterRoot actions={actions} filters={[conditions, skillRarity]} />;
}
