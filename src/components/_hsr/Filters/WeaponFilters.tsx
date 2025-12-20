import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useSettingsStore, useFilterStore } from "@/stores";
import { hsrWeaponFilters } from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";

// Type imports
import { Filters } from "@/types";
import { HSRRarity, HSRWeaponType } from "@/types/hsr";

export interface HSRWeaponFilterState extends Filters {
    weaponType: HSRWeaponType[];
    rarity: HSRRarity[];
    calyxMat: string[];
    commonMat: string[];
}

export default function WeaponFilters() {
    const game = useGameTag();
    const key = "hsr/weapons";

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const { setFilterState, clearFilterState } = useFilterStore();
    const filters = useFilterStore(useShallow((state) => state[key]));
    const actions = filterActions(
        key,
        hsrWeaponFilters,
        filters,
        clearFilterState
    );

    const { weaponType, rarity, calyxMat, commonMat } = filterGroups({
        key,
        filters,
        setFilters: setFilterState,
        hideUnreleasedContent,
    })[game];

    return (
        <FilterRoot
            actions={actions}
            filters={[weaponType, rarity, calyxMat, commonMat]}
        />
    );
}
