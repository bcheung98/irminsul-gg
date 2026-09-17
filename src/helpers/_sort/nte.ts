import {
    nameSort,
    raritySort,
    orderedPropertySort,
    propertySort,
    releaseSort,
    sortItems,
    versionSort,
    subStatSort,
    statPropertyNameSort,
} from "@/helpers/_sort";
import { elements, weapons } from "@/data/nte/common";
import { subStats } from "@/data/nte/weaponStats";

// Type imports
import type { NTEWeapon } from "@/types/nte";
import type { Item } from "@/types";
import type { SortHandlers, SortProps } from "@/helpers/_sort";

const nteSortHandlers: SortHandlers = {
    name: nameSort,
    rarity: raritySort,
    element: orderedPropertySort("element", elements),
    weaponType: orderedPropertySort("weaponType", weapons),
    baseATK: statPropertyNameSort("atk"),
    subStat: subStatSort<NTEWeapon>(getSubStatLabel),
    nation: propertySort("faction"),
    release: releaseSort,
    version: versionSort(),
};

function getSubStatLabel(weapon: NTEWeapon, reverse: boolean) {
    const atk = weapon.stats.atk;
    const subStat = weapon.stats.subStat;
    const token = reverse ? "" : "z";
    return subStat
        ? `${subStat} ${subStats[atk][subStat]?.slice(-1)[0]}`
        : token;
}

export default function sortNTEItems<T extends Item>(props: SortProps<T>) {
    return sortItems(nteSortHandlers, props);
}
