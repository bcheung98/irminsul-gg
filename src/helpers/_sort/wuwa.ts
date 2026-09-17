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
    statPropertyNameSort,
} from "@/helpers/_sort";
import { sortBy } from "@/utils";
import { elements, weapons } from "@/data/wuwa/common";
import { subStats } from "@/data/wuwa/weaponStats";
import { sonataEffects } from "@/data/wuwa/sonataEffects";

// Type imports
import type { WuWaWeapon } from "@/types/wuwa";
import type { Item } from "@/types";
import type { SortHandlers, SortProps } from "@/helpers/_sort";

const sonataNames = new Map(
    sonataEffects.map((effect) => [effect.id, effect.displayName]),
);

const wuwaSortHandlers: SortHandlers = {
    name: nameSort,
    rarity: raritySort,
    element: orderedPropertySort("element", elements),
    weaponType: orderedPropertySort("weaponType", weapons),
    subStat: subStatSort<WuWaWeapon>(getSubStatLabel),
    baseATK: statPropertyNameSort("atk"),
    nation: propertySort("world"),
    release: releaseSort,
    sonata: (a, b, reverse) => {
        const s1 = a.sonata.map(getSonataLabel).join("|");
        const s2 = b.sonata.map(getSonataLabel).join("|");
        return (
            sortBy(s1, s2, !reverse) ||
            sortBy(a.rarity, b.rarity) ||
            sortBy(getItemName(b), getItemName(a))
        );
    },
    version: versionSort(),
};

function getSubStatLabel(weapon: WuWaWeapon, reverse: boolean) {
    const atk = weapon.stats.atk;
    const subStat = weapon.stats.subStat;
    const token = reverse ? "" : "z";
    return subStat
        ? `${subStat} ${subStats[atk][subStat]?.slice(-1)[0]}`
        : token;
}

function getSonataLabel(id: number) {
    return sonataNames.get(id) ?? "";
}

export default function sortWuWaItems<T extends Item>(props: SortProps<T>) {
    return sortItems(wuwaSortHandlers, props);
}
