// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { genshinCharacterFilters } from "@/stores/useFilterStore";

// Type imports
import type { Filters } from "@/types/filters";
import type {
    GenshinElement,
    GenshinNation,
    GenshinRarity,
    GenshinWeaponType,
} from "@/types/genshin";
import type { CharacterAscensionStat } from "@/types/genshin/character";

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
    const game = "genshin";
    const key = "genshin/characters";

    const {
        element,
        weaponType,
        rarity,
        ascStat,
        talentBook,
        commonMat,
        bossMat,
        weeklyBossMat,
        localMat,
        nation,
    } = useFilterGroups(game, {
        key,
    });

    return (
        <FilterRoot
            initialState={genshinCharacterFilters}
            filterKey={key}
            filters={[
                element,
                weaponType,
                rarity,
                ascStat,
                talentBook,
                commonMat,
                bossMat,
                weeklyBossMat,
                localMat,
                nation,
            ]}
        />
    );
}
