import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useSettingsStore, useGalleryStore } from "@/stores";
import { genshinTCGFilters, useFilterStore } from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";

// Type imports
import { Filters } from "@/types";
import { GenshinElement } from "@/types/genshin";
import {
    TCGActionCardSubType,
    TCGFaction,
    TCGWeaponType,
} from "@/types/genshin/tcg";

export interface GenshinTCGFilterState extends Filters {
    "tcg-element": GenshinElement[];
    "tcg-weaponType": TCGWeaponType[];
    "tcg-faction": TCGFaction[];
    "tcg-group": TCGActionCardSubType[];
}

export default function TCGFilters() {
    const game = useGameTag();
    const key = "genshin/tcg";

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const sortParams = useGalleryStore(useShallow((state) => state[key]));

    const { setFilterState, clearFilterState } = useFilterStore();
    const filters = useFilterStore(useShallow((state) => state[key]));
    const actions = filterActions(
        key,
        genshinTCGFilters,
        filters,
        clearFilterState
    );

    const {
        "tcg-element": element,
        "tcg-weaponType": weaponType,
        "tcg-faction": faction,
        "tcg-group": group,
    } = filterGroups({
        key,
        filters,
        setFilters: setFilterState,
        hideUnreleasedContent,
    })[game];

    const groups =
        sortParams.view === "icon" ? [element, weaponType, faction] : [group];

    useEffect(() => {
        clearFilterState(key, genshinTCGFilters);
    }, [sortParams.view]);

    return <FilterRoot actions={actions} filters={groups} />;
}
