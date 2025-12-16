import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import { umaSupportFilters, useFilterStore } from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";

// Type imports
import { Filters } from "@/types";
import { UmaRarity, UmaSpecialty } from "@/types/uma";

export interface UmaSupportFilterState extends Filters {
    specialty: UmaSpecialty[];
    rarity: UmaRarity[];
}

export default function SupportFilters() {
    const game = useGameTag();
    const key = "uma/supports";

    const { setFilterState, clearFilterState } = useFilterStore();
    const filters = useFilterStore(useShallow((state) => state[key]));
    const actions = filterActions(
        key,
        umaSupportFilters,
        filters,
        clearFilterState
    );

    const { specialty, rarity } = filterGroups({
        key,
        filters,
        setFilters: setFilterState,
    })[game];

    return <FilterRoot actions={actions} filters={[specialty, rarity]} />;
}
