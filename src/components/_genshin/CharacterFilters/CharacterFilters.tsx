import { useEffect, useState } from "react";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import { genshinFilters, useFilterStore } from "@/stores/useFilterStore";
import { filterActions } from "@/helpers/filters";
import { filterGroups } from "@/data/filters";

// Type imports
import { Filters } from "@/types";
import {
    GenshinElement,
    GenshinNation,
    GenshinRarity,
    GenshinWeaponType,
} from "@/types/genshin";
import { CharacterAscensionStat } from "@/types/genshin/character";

export interface GenshinCharacterFilterState extends Filters {
    element: GenshinElement[];
    weaponType: GenshinWeaponType[];
    rarity: GenshinRarity[];
    ascStat: CharacterAscensionStat[];
    talentBook: string[];
    commonMat: string[];
    bossMat: string[];
    weeklyBossMat: string[];
    localMat: string[];
    nation: GenshinNation[];
}

export default function CharacterFilters() {
    const game = useGameTag();

    const { setFilterState } = useFilterStore();
    const [filters, setFilters] = useState(genshinFilters);
    const actions = filterActions(genshinFilters, filters, setFilters);

    const { element, weaponType, rarity } = filterGroups({
        filters,
        setFilters,
    })[game];

    useEffect(() => {
        setFilterState("genshin/character", filters);
    }, [filters]);

    return (
        <FilterRoot actions={actions} filters={[element, weaponType, rarity]} />
    );
}
