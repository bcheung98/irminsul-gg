import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useSettingsStore, useFilterStore } from "@/stores";
import { zzzWeaponFilters } from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";
import { ZZZWeaponSubStat } from "@/data/zzz/weaponStats";

// Type imports
import { Filters } from "@/types";
import { ZZZRarity, ZZZWeaponType } from "@/types/zzz";

export interface ZZZWeaponFilterState extends Filters {
    weaponType: ZZZWeaponType[];
    rarity: ZZZRarity[];
    subStat: ZZZWeaponSubStat[];
}

export default function WeaponFilters() {
    const game = useGameTag();
    const key = "zzz/weapons";

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const { setFilterState, clearFilterState } = useFilterStore();
    const filters = useFilterStore(useShallow((state) => state[key]));
    const actions = filterActions(
        key,
        zzzWeaponFilters,
        filters,
        clearFilterState
    );

    const { weaponType, rarity, subStat } = filterGroups({
        key,
        filters,
        setFilters: setFilterState,
        hideUnreleasedContent,
    })[game];

    return (
        <FilterRoot actions={actions} filters={[weaponType, rarity, subStat]} />
    );
}
