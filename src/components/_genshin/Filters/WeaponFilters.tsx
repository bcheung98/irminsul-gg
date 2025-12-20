import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useSettingsStore, useFilterStore } from "@/stores";
import { genshinWeaponFilters } from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";
import { GenshinWeaponSubStat } from "@/data/genshin/weaponStats";

// Type imports
import { Filters } from "@/types";
import { GenshinRarity, GenshinWeaponType } from "@/types/genshin";

export interface GenshinWeaponFilterState extends Filters {
    weaponType: GenshinWeaponType[];
    rarity: GenshinRarity[];
    subStat: GenshinWeaponSubStat[];
    weaponAscensionMat: string[];
    eliteMat: string[];
    commonMat: string[];
}

export default function WeaponFilters() {
    const game = useGameTag();
    const key = "genshin/weapons";

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const { setFilterState, clearFilterState } = useFilterStore();
    const filters = useFilterStore(useShallow((state) => state[key]));
    const actions = filterActions(
        key,
        genshinWeaponFilters,
        filters,
        clearFilterState
    );

    const {
        weaponType,
        rarity,
        subStat,
        weaponAscensionMat,
        eliteMat,
        commonMat,
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
                weaponType,
                rarity,
                subStat,
                weaponAscensionMat,
                eliteMat,
                commonMat,
            ]}
        />
    );
}
