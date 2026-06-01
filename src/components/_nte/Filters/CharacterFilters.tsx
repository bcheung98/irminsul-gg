import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useSettingsStore } from "@/stores";
import { useFilterStore, nteCharacterFilters } from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";

// Type imports
import { Filters } from "@/types";
import { NTEElement, NTERarity, NTEWeaponType } from "@/types/nte";

export interface NTECharacterFilterState extends Filters {
    element: NTEElement[];
    weaponType: NTEWeaponType[];
    rarity: NTERarity[];
    combatRoles: string[];
    _combatRoles: string[];
    skillMat: string[];
    commonMat: string[];
    bossMat: string[];
    weeklyBossMat: string[];
}

export default function CharacterFilters() {
    const game = useGameTag();
    const key = "nte/characters";

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent,
    );

    const { setFilterState, clearFilterState } = useFilterStore();
    const filters = useFilterStore(useShallow((state) => state[key]));
    const actions = filterActions(
        key,
        nteCharacterFilters,
        filters,
        clearFilterState,
    );

    const {
        element,
        weaponType,
        rarity,
        combatRoles,
        skillMat,
        commonMat,
        bossMat,
        weeklyBossMat,
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
                combatRoles,
                skillMat,
                commonMat,
                bossMat,
                weeklyBossMat,
            ]}
        />
    );
}
