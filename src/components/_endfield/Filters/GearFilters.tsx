// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { endfieldGearFilters } from "@/stores/useFilterStore";

// Type imports
import type { Filters } from "@/types/filters";
import type { EndfieldRarity } from "@/types/endfield";
import type { EndfieldGearType } from "@/types/endfield/gear";
import type { GearStat } from "@/data/endfield/gearStats";

export interface EndfieldGearFilterState extends Filters {
    type: EndfieldGearType[];
    set: number[];
    rarity: EndfieldRarity[];
    attributes: GearStat[];
    _attributes: string[];
}

export default function GearFilters() {
    const game = "endfield";
    const key = "endfield/gear";

    const { type, set, attributes, rarity } = useFilterGroups(game, {
        key,
    });

    return (
        <FilterRoot
            initialState={endfieldGearFilters}
            filterKey={key}
            filters={[type, set, attributes, rarity]}
        />
    );
}
