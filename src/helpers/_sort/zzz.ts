import {
    nameSort,
    raritySort,
    orderedPropertySort,
    propertySort,
    releaseSort,
    sortItems,
    versionSort,
    subStatSort,
    getItemName,
} from "@/helpers/_sort";
import { sortBy } from "@/utils";
import { elements, weapons } from "@/data/zzz/common";
import { weaponSubStats } from "@/data/zzz/weaponStats";

// Type imports
import type { ZZZRarity, ZZZWeapon } from "@/types/zzz";
import type { Item } from "@/types";
import type { SortHandlers, SortProps } from "@/helpers/_sort";

const zzzSortHandlers: SortHandlers = {
    name: nameSort,
    rarity: raritySort,
    element: orderedPropertySort("element", elements),
    weaponType: orderedPropertySort("weaponType", weapons),
    attackType: propertySort("attackType"),
    subStat: subStatSort<ZZZWeapon>(getSubStatLabel),
    baseATK: (a, b, reverse) =>
        sortBy(a.stats.mainStat.value, b.stats.mainStat.value, reverse) ||
        sortBy(getItemName(b), getItemName(a)),
    nation: propertySort("faction"),
    release: releaseSort,
    version: versionSort(),
};

function getSubStatLabel(weapon: ZZZWeapon, reverse: boolean) {
    const subStat = weapon.stats.subStat;
    const token = reverse ? "" : "z";
    return subStat
        ? `${subStat} ${
              weaponSubStats[subStat].scaling[
                  weapon.rarity as Exclude<ZZZRarity, 2 | 1>
              ].slice(-1)[0]
          }`
        : token;
}

export default function sortZZZItems<T extends Item>(props: SortProps<T>) {
    return sortItems(zzzSortHandlers, props);
}
