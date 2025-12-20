import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import { umaCharacterFilters, useFilterStore } from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";

// Type imports
import { Filters } from "@/types";
import { UmaAptitude, UmaRarity } from "@/types/uma";

export interface UmaCharacterFilterState extends Filters {
    aptitude: UmaAptitude[];
    rarity: UmaRarity[];
}

export default function CharacterFilters() {
    const game = useGameTag();
    const key = "uma/characters";

    const { setFilterState, clearFilterState } = useFilterStore();
    const filters = useFilterStore(useShallow((state) => state[key]));
    const actions = filterActions(
        key,
        umaCharacterFilters,
        filters,
        clearFilterState
    );

    const { aptitude, rarity } = filterGroups({
        key,
        filters,
        setFilters: setFilterState,
    })[game];

    return <FilterRoot actions={actions} filters={[aptitude, rarity]} />;
}
