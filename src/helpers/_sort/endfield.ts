import {
    nameSort,
    raritySort,
    orderedPropertySort,
    propertySort,
    releaseSort,
    sortItems,
    versionSort,
    getItemName,
    statPropertyNameSort,
} from "@/helpers/_sort";
import { sortBy } from "@/utils";
import { elements, weapons, opClasses } from "@/data/endfield/common";
import { gearSets } from "@/data/endfield/gearSets";

// Type imports
import type { Item } from "@/types";
import type { SortHandlers, SortProps } from "@/helpers/_sort";

const gearSetNames = new Map(gearSets.map((set) => [set.id, set.displayName]));

const endfieldSortHandlers: SortHandlers = {
    name: nameSort,
    rarity: raritySort,
    element: orderedPropertySort("element", elements),
    weaponType: orderedPropertySort("weaponType", weapons),
    specialty: orderedPropertySort("specialty", opClasses),
    nation: propertySort("faction"),
    baseATK: statPropertyNameSort("atk"),
    release: releaseSort,
    version: versionSort(),
    set: (a, b, reverse) => {
        const aSet = gearSetNames.get(a.set) ?? "zzzz";
        const bSet = gearSetNames.get(b.set) ?? "zzzz";
        return (
            sortBy(b.rarity, a.rarity, !reverse) ||
            sortBy(aSet, bSet, !reverse) ||
            sortBy(a.type, b.type, !reverse) ||
            sortBy(a.id, b.id)
        );
    },
    type: (a, b, reverse) =>
        sortBy(b.type, a.type, reverse) ||
        sortBy(b.rarity, a.rarity, !reverse) ||
        sortBy(getItemName(b), getItemName(a), reverse),
};

export default function sortEndfieldItems<T extends Item>(props: SortProps<T>) {
    return sortItems(endfieldSortHandlers, props);
}
