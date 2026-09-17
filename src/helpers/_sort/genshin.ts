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
    orderedStatPropertySort,
    propertySortById,
    versionSortById,
} from "@/helpers/_sort";
import { elements, weapons } from "@/data/genshin/common";
import { subStats } from "@/data/genshin/weaponStats";
import { characterAscensionStats } from "@/data/genshin/characterAscensionStats";
import { objectKeys } from "@/utils";

// Type imports
import type { GenshinWeapon } from "@/types/genshin/weapon";
import type { Item } from "@/types";
import type { SortHandlers, SortProps } from "@/helpers/_sort";

const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const genshinSortHandlers: SortHandlers = {
    name: nameSort,
    rarity: raritySort,
    element: orderedPropertySort("element", elements),
    weaponType: orderedPropertySort("weaponType", weapons),
    ascensionStat: orderedStatPropertySort(
        "ascensionStat",
        objectKeys(characterAscensionStats),
    ),
    baseATK: statPropertyNameSort("atk"),
    subStat: subStatSort<GenshinWeapon>(getSubStatLabel),
    nation: propertySort("nation"),
    release: releaseSort,
    version: versionSort(parseVersionNumber),
    "tcg-version": versionSortById(parseVersionNumber),
    "tcg-hp": propertySortById("hp"),
    "tcg-energy": propertySortById("cost"),
};

function getSubStatLabel(weapon: GenshinWeapon, reverse: boolean) {
    const atk = weapon.stats.atk;
    const subStat = weapon.stats.subStat;
    const token = reverse ? "" : "z";
    return subStat
        ? `${subStat} ${subStats[atk][subStat]?.slice(-1)[0]}`
        : token;
}

function parseVersionNumber(version: string) {
    if (version.startsWith("Luna")) {
        return `6.${NUMERALS.findIndex((i) => i === version.split(" ")[1])}`;
    } else {
        return version;
    }
}

export default function sortGenshinItems<T extends Item>(props: SortProps<T>) {
    return sortItems(genshinSortHandlers, props);
}
