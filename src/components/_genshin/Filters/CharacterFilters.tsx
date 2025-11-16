import { useShallow } from "zustand/react/shallow";

// Component imports
import FilterRoot from "@/components/Filters";

// Helper imports
import { useGameTag } from "@/context";
import {
    genshinCharacterFilters,
    useFilterStore,
} from "@/stores/useFilterStore";
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
    const key = "genshin/characters";

    const { setFilterState, clearFilterState } = useFilterStore();
    const filters = useFilterStore(useShallow((state) => state[key]));
    const actions = filterActions(
        key,
        genshinCharacterFilters,
        filters,
        clearFilterState
    );

    const groups = filterGroups({
        key,
        filters,
        setFilters: setFilterState,
    })[game];

    return <FilterRoot actions={actions} filters={Object.values(groups)} />;
}
