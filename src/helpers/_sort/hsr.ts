import {
    nameSort,
    raritySort,
    orderedPropertySort,
    propertySort,
    releaseSort,
    sortItems,
    versionSort,
    statPropertySort,
} from "@/helpers/_sort";
import { elements, weapons } from "@/data/zzz/common";

// Type imports
import type { Item } from "@/types";
import type { SortHandlers, SortProps } from "@/helpers/_sort";

const hsrSortHandlers: SortHandlers = {
    name: nameSort,
    rarity: raritySort,
    element: orderedPropertySort("element", elements),
    weaponType: orderedPropertySort("weaponType", weapons),
    nation: propertySort("world"),
    release: releaseSort,
    version: versionSort(),
    HP: statPropertySort("hp"),
    ATK: statPropertySort("atk"),
    DEF: statPropertySort("def"),
};

export default function sortHSRItems<T extends Item>(props: SortProps<T>) {
    return sortItems(hsrSortHandlers, props);
}
