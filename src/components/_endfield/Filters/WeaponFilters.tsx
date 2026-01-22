import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useSettingsStore } from "@/stores";
import { endfieldWeaponFilters, useFilterStore } from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";

// Type imports
import { Filters } from "@/types";
import { EndfieldRarity, EndfieldWeaponType } from "@/types/endfield";

export interface EndfieldWeaponFilterState extends Filters {
    weaponType: EndfieldWeaponType[];
    rarity: EndfieldRarity[];
}

export default function WeaponFilters() {
    const game = useGameTag();
    const key = "endfield/weapons";

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent,
    );

    const { setFilterState, clearFilterState } = useFilterStore();
    const filters = useFilterStore(useShallow((state) => state[key]));
    const actions = filterActions(
        key,
        endfieldWeaponFilters,
        filters,
        clearFilterState,
    );

    const { weaponType, rarity } = filterGroups({
        key,
        filters,
        setFilters: setFilterState,
        hideUnreleasedContent,
    })[game];

    return <FilterRoot actions={actions} filters={[weaponType, rarity]} />;
}
