import { useEffect, useState } from "react";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import { useFilterStore } from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";

// Type imports
import { Filters } from "@/types";
import {
    GenshinElement,
    GenshinRarity,
    GenshinWeaponType,
} from "@/types/genshin";
import { CharacterAscensionStat } from "@/types/genshin/character";

export interface GenshinCharacterFilterState extends Filters {
    element: GenshinElement[];
    weaponType: GenshinWeaponType[];
    rarity: GenshinRarity[];
    ascStat: CharacterAscensionStat[];
}

const initialState: GenshinCharacterFilterState = {
    element: [],
    weaponType: [],
    rarity: [],
    ascStat: [],
};

export default function CharacterFilters() {
    const game = useGameTag();

    const { setFilterState } = useFilterStore();
    const [filters, setFilters] = useState(initialState);
    const actions = filterActions(initialState, filters, setFilters);

    const { element } = filterGroups({ filters, setFilters })[game];

    useEffect(() => {
        setFilterState("genshin/character", filters);
    }, [filters]);

    return <FilterRoot actions={actions} filters={[element]} />;
}
