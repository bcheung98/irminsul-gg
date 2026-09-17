// Component imports
import FilterRoot, { useFilterGroups } from "@/components/Filters";

// Helper imports
import { zzzCharacterFilters } from "@/stores/useFilterStore";

// Type imports
import type { Filters } from "@/types/filters";
import type {
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
    const game = "zzz";
    const key = "zzz/characters";

    const {
        element,
        weaponType,
        attackType,
        rarity,
        bossMat,
        weeklyBossMat,
        nation,
    } = useFilterGroups(game, {
        key,
    });

    return (
        <FilterRoot
            initialState={zzzCharacterFilters}
            filterKey={key}
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
