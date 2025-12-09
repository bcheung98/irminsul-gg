import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useSettingsStore, useFilterStore } from "@/stores";
import { wuwaWeaponFilters } from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";
import { WuWaWeaponSubStat } from "@/data/wuwa/weaponStats";

// Type imports
import { Filters } from "@/types";
import { WuWaRarity, WuWaWeaponType } from "@/types/wuwa";

export interface WuWaWeaponFilterState extends Filters {
    weaponType: WuWaWeaponType[];
    rarity: WuWaRarity[];
    subStat: WuWaWeaponSubStat[];
    forgeryMat: string[];
    commonMat: string[];
}

export default function WeaponFilters() {
    const game = useGameTag();
    const key = "wuwa/weapons";

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const { setFilterState, clearFilterState } = useFilterStore();
    const filters = useFilterStore(useShallow((state) => state[key]));
    const actions = filterActions(
        key,
        wuwaWeaponFilters,
        filters,
        clearFilterState
    );

    const { weaponType, rarity, subStat, forgeryMat, commonMat } = filterGroups(
        {
            key,
            filters,
            setFilters: setFilterState,
            hideUnreleasedContent,
        }
    )[game];

    return (
        <FilterRoot
            actions={actions}
            filters={[weaponType, rarity, subStat, forgeryMat, commonMat]}
        />
    );
}
