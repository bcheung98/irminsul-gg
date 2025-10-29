import { BaseSyntheticEvent } from "react";

// Component imports
import RarityStars from "@/components/RarityStars";

// Helper imports
import { objectKeys } from "@/utils";
import { createFilterButtons } from "@/helpers/filters";
import { useMaterialsCategory } from "@/helpers/materials";
import { elements, rarities, weapons } from "@/data/genshin/common";
import { characterAscensionStats } from "./characterAscensionStats";

// Type imports
import { Filters, FilterGroupsProps, FilterGroups } from "@/types";
import {
    GenshinElement,
    GenshinRarity,
    GenshinWeaponType,
} from "@/types/genshin";
import { CharacterAscensionStat } from "@/types/genshin/character";

export function genshinFilters<T extends Filters>({
    filters,
    setFilters,
}: FilterGroupsProps<T>): FilterGroups {
    const getMaterialCategory = useMaterialsCategory().genshin;

    return {
        element: {
            name: "Element",
            value: filters.element,
            buttons: createFilterButtons({
                items: elements,
                url: "genshin/elements",
            }),
            onChange: (_: BaseSyntheticEvent, newValues: GenshinElement[]) =>
                setFilters({ ...filters, element: newValues }),
        },
        weaponType: {
            name: "Weapon",
            value: filters.weaponType,
            buttons: createFilterButtons({
                items: weapons,
                url: "genshin/weapons/icons",
            }),
            onChange: (_: BaseSyntheticEvent, newValues: GenshinWeaponType[]) =>
                setFilters({ ...filters, weaponType: newValues }),
        },
        rarity: {
            name: "Rarity",
            value: filters.rarity,
            buttons: rarities.slice(0, -3).map((rarity) => ({
                value: rarity,
                label: <RarityStars rarity={rarity} variant="h6" />,
            })),
            onChange: (_: BaseSyntheticEvent, newValues: GenshinRarity[]) =>
                setFilters({ ...filters, rarity: newValues }),
            padding: "4px 8px",
        },
        ascStat: {
            name: "Ascension Stat",
            value: filters.ascStat,
            buttons: createFilterButtons({
                items: objectKeys(characterAscensionStats).slice(1),
                url: "genshin/icons/ascension_stats",
            }),
            onChange: (
                _: BaseSyntheticEvent,
                newValues: CharacterAscensionStat[]
            ) => setFilters({ ...filters, ascStat: newValues }),
        },
        talentBook: {
            name: "Talent Book",
            value: filters.talentBook,
            buttons: createFilterButtons({
                items: getMaterialCategory("talent")
                    .filter((material) => material.rarity === 4)
                    .map((material) => material.tag || ""),
                url: "genshin/materials/talent",
                getTooltip: (item) => {
                    const mat = getMaterialCategory("talent").find(
                        (material) => material.tag === item
                    );
                    return mat ? `${mat.name} (${mat.source})` : "";
                },
            }),
            onChange: (_: BaseSyntheticEvent, newValues: string[]) =>
                setFilters({ ...filters, talentBook: newValues }),
            width: "128px",
        },
    };
}
