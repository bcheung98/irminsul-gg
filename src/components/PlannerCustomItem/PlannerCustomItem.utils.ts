import { sortBy } from "@/utils";
import { matchSorter } from "match-sorter";
import type { MaterialRow } from "./PlannerCustomItem.types";
import type { GameNoUma, Item } from "@/types";
import type { FilterGroup } from "@/types/filters";
import type { PlannerType } from "@/types/planner";

export function createCustomItem(
    game: GameNoUma,
    type: PlannerType,
    groups: FilterGroup[],
): Item {
    const item: Item = {
        custom: true,
        id: 999999990,
        name: "",
        displayName: "",
        rarity: 0,
        materials: {},
        customMaterials: {},
        values: {},
        release: {
            version: "",
        },
    };

    for (const group of groups) {
        item[group.tag] = null;
    }

    if (game === "nte" && type === "characters") {
        item.lifeSkills = [5, 2];
    }

    return item;
}

export function filterOptions(options: MaterialRow[], searchValue: string) {
    if (searchValue === "") return options;
    return matchSorter(options, searchValue, {
        keys: ["title", "value"],
        threshold: matchSorter.rankings.WORD_STARTS_WITH,
    }).sort((a, b) => sortBy(b.title.toString(), a.title.toString()));
}
