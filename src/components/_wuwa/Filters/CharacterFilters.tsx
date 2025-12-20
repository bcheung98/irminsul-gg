import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useSettingsStore } from "@/stores";
import { wuwaCharacterFilters, useFilterStore } from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";

// Type imports
import { Filters } from "@/types";
import { WuWaElement, WuWaRarity, WuWaWeaponType } from "@/types/wuwa";

export interface WuWaCharacterFilterState extends Filters {
    element: WuWaElement[];
    weaponType: WuWaWeaponType[];
    rarity: WuWaRarity[];
    combatRoles: string[];
    _combatRoles: string[];
    forgeryMat: string[];
    commonMat: string[];
    localMat: string[];
    bossMat: string[];
    weeklyBossMat: string[];
}

export default function CharacterFilters() {
    const game = useGameTag();
    const key = "wuwa/characters";

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const { setFilterState, clearFilterState } = useFilterStore();
    const filters = useFilterStore(useShallow((state) => state[key]));
    const actions = filterActions(
        key,
        wuwaCharacterFilters,
        filters,
        clearFilterState
    );

    const {
        element,
        weaponType,
        rarity,
        combatRoles,
        forgeryMat,
        commonMat,
        localMat,
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
                forgeryMat,
                commonMat,
                localMat,
                bossMat,
                weeklyBossMat,
            ]}
        />
    );
}
