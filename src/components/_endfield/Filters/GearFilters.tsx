import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useSettingsStore } from "@/stores";
import { endfieldGearFilters, useFilterStore } from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";

// Type imports
import { Filters } from "@/types";
import { EndfieldRarity } from "@/types/endfield";
import { EndfieldGearType } from "@/types/endfield/gear";
import { GearStat } from "@/data/endfield/gearStats";

export interface EndfieldGearFilterState extends Filters {
    type: EndfieldGearType[];
    set: number[];
    rarity: EndfieldRarity[];
    attributes: GearStat[];
    _attributes: string[];
}

export default function GearFilters() {
    const game = useGameTag();
    const key = "endfield/gear";

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent,
    );

    const { setFilterState, clearFilterState } = useFilterStore();
    const filters = useFilterStore(useShallow((state) => state[key]));
    const actions = filterActions(
        key,
        endfieldGearFilters,
        filters,
        clearFilterState,
    );

    const { type, set, attributes, rarity } = filterGroups({
        key,
        filters,
        setFilters: setFilterState,
        hideUnreleasedContent,
    })[game];

    return (
        <FilterRoot
            actions={actions}
            filters={[type, set, attributes, rarity]}
        />
    );
}
