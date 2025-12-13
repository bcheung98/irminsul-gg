import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useSettingsStore } from "@/stores";
import { useFilterStore, zzzCharacterFilters } from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";

// Type imports
import { Filters } from "@/types";
import {
    ZZZAttackType,
    ZZZElement,
    ZZZFaction,
    ZZZRarity,
    ZZZWeaponType,
} from "@/types/zzz";

export interface ZZZCharacterFilterState extends Filters {
    element: ZZZElement[];
    weaponType: ZZZWeaponType[];
    attackType: ZZZAttackType[];
    rarity: ZZZRarity[];
    bossMat: string[];
    weeklyBossMat: string[];
    nation: ZZZFaction[];
}

export default function CharacterFilters() {
    const game = useGameTag();
    const key = "zzz/characters";

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const { setFilterState, clearFilterState } = useFilterStore();
    const filters = useFilterStore(useShallow((state) => state[key]));
    const actions = filterActions(
        key,
        zzzCharacterFilters,
        filters,
        clearFilterState
    );

    const {
        element,
        weaponType,
        attackType,
        rarity,
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
                attackType,
                rarity,
                bossMat,
                weeklyBossMat,
                nation,
            ]}
        />
    );
}
