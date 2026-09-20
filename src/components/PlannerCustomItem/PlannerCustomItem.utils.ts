import { matchSorter } from "match-sorter";
import { sortBy } from "@/utils";

import type { MaterialRow } from "./PlannerCustomItem.types";
import type { GameNoUma, Item } from "@/types";
import type { FilterGroup } from "@/types/filters";
import type { PlannerItemData, PlannerType } from "@/types/planner";
import type { CustomMaterials } from "@/components/PlannerMaterials/PlannerMaterials.utils";

const CUSTOM_ITEM_ID_START = 999999990;

export function createCustomItem(
    game: GameNoUma,
    type: PlannerType,
    groups: FilterGroup[],
): Item {
    const item: Item = {
        custom: true,
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

export function createCustomItemId(items: PlannerItemData[]) {
    const ids = items
        .map((item) => item.id)
        .filter((id) => id >= CUSTOM_ITEM_ID_START);

    return ids.length ? Math.max(...ids) + 1 : CUSTOM_ITEM_ID_START;
}

export function createCustomItemName(items: PlannerItemData[], label: string) {
    const name = `Custom ${label}`;

    const names = new Set(items.map((item) => item.displayName));

    if (!names.has(name)) {
        return name;
    }

    let index = 1;

    while (names.has(`${name} (${index})`)) {
        index++;
    }

    return `${name} (${index})`;
}

export function getPlannerCustomMaterials(items: PlannerItemData[]): CustomMaterials {
    return items.reduce<CustomMaterials>((materials, item) => {
        Object.assign(materials, item.customMaterials);
        return materials;
    }, {});
}

export function filterPlannerMaterialOptions(
    options: MaterialRow[],
    searchValue: string,
) {
    if (searchValue === "") return options;
    return matchSorter(options, searchValue, {
        keys: ["title", "value"],
        threshold: matchSorter.rankings.WORD_STARTS_WITH,
    }).sort((a, b) => sortBy(b.title.toString(), a.title.toString()));
}
