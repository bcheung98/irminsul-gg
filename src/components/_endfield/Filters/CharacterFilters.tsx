import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useSettingsStore } from "@/stores";
import {
    endfieldCharacterFilters,
    useFilterStore,
} from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";

// Type imports
import { Filters } from "@/types";
import {
    EndfieldClass,
    EndfieldElement,
    EndfieldRarity,
    EndfieldWeaponType,
} from "@/types/endfield";

export interface EndfieldCharacterFilterState extends Filters {
    element: EndfieldElement[];
    specialty: EndfieldClass[];
    weaponType: EndfieldWeaponType[];
    rarity: EndfieldRarity[];
}

export default function CharacterFilters() {
    const game = useGameTag();
    const key = "endfield/characters";

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent,
    );

    const { setFilterState, clearFilterState } = useFilterStore();
    const filters = useFilterStore(useShallow((state) => state[key]));
    const actions = filterActions(
        key,
        endfieldCharacterFilters,
        filters,
        clearFilterState,
    );

    const { element, specialty, weaponType, rarity } = filterGroups({
        key,
        filters,
        setFilters: setFilterState,
        hideUnreleasedContent,
    })[game];

    return (
        <FilterRoot
            actions={actions}
            filters={[element, specialty, weaponType, rarity]}
        />
    );
}
