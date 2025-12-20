import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useSettingsStore } from "@/stores";
import { hsrCharacterFilters, useFilterStore } from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";

// Type imports
import { Filters } from "@/types";
import { HSRElement, HSRRarity, HSRWeaponType, HSRWorld } from "@/types/hsr";

export interface HSRCharacterFilterState extends Filters {
    element: HSRElement[];
    weaponType: HSRWeaponType[];
    rarity: HSRRarity[];
    calyxMat: string[];
    commonMat: string[];
    bossMat: string[];
    weeklyBossMat: string[];
    nation: HSRWorld[];
}

export default function CharacterFilters() {
    const game = useGameTag();
    const key = "hsr/characters";

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const { setFilterState, clearFilterState } = useFilterStore();
    const filters = useFilterStore(useShallow((state) => state[key]));
    const actions = filterActions(
        key,
        hsrCharacterFilters,
        filters,
        clearFilterState
    );

    const {
        element,
        weaponType,
        rarity,
        calyxMat,
        commonMat,
        bossMat,
        weeklyBossMat,
        nation,
    } = filterGroups({
        key,
        filters,
        setFilters: setFilterState,
        hideUnreleasedContent,
    })[game];

    return (
        <FilterRoot
            actions={actions}
            filters={[
                element,
                weaponType,
                rarity,
                calyxMat,
                commonMat,
                bossMat,
                weeklyBossMat,
                nation,
            ]}
        />
    );
}
