import { SortProps } from "@/helpers/sort";
import DateObject from "@/helpers/dates";
import { objectKeys, sortBy } from "@/utils";
import { characterAscensionStats } from "@/data/genshin/characterAscensionStats";

export default function sortItems<T extends Record<string, any>>({
    items,
    value,
    reverse,
}: SortProps<T>) {
    let res = [...items];
    switch (value) {
        case "name":
            res = res.sort((a, b) => {
                const ai = a.fullName || a.displayName || a.name;
                const bi = b.fullName || b.displayName || b.name;
                return ai.localeCompare(bi);
            });
            if (reverse) {
                res = res.reverse();
            }
            break;
        case "rarity":
            res = res.sort(
                (a, b) =>
                    sortBy(a.rarity, b.rarity, reverse) ||
                    sortBy(b.fullName, a.fullName)
            );
            break;
        case "element":
            res = res.sort(
                (a, b) =>
                    sortBy(
                        GenshinElementMap[b.element],
                        GenshinElementMap[a.element],
                        reverse
                    ) ||
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(b.fullName, a.fullName)
            );
            break;
        case "weaponType":
            res = res.sort(
                (a, b) =>
                    sortBy(
                        GenshinWeaponMap[b.weaponType],
                        GenshinWeaponMap[a.weaponType],
                        reverse
                    ) ||
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(b.fullName, a.fullName)
            );
            break;
        case "ascensionStat":
            const keys = objectKeys(characterAscensionStats);
            res = res.sort(
                (a, b) =>
                    sortBy(
                        keys.indexOf(b.stats.ascensionStat),
                        keys.indexOf(a.stats.ascensionStat),
                        reverse
                    ) || sortBy(b.fullName, a.fullName)
            );
            break;
        case "nation":
            res = res.sort(
                (a, b) =>
                    sortBy(b.nation, a.nation, reverse) ||
                    sortBy(b.fullName, a.fullName)
            );
            break;
        case "release":
            res = res.sort((a, b) => {
                const ai = new DateObject(a.release.date).date.getTime();
                const bi = new DateObject(b.release.date).date.getTime();
                return (
                    sortBy(ai, bi, reverse) ||
                    sortBy(b.rarity, a.rarity, !reverse) ||
                    sortBy(b.fullName, a.fullName, !reverse)
                );
            });
            break;
    }

    return res;
}

export enum GenshinElementMap {
    "Pyro",
    "Hydro",
    "Electro",
    "Cryo",
    "Anemo",
    "Geo",
    "Dendro",
}

export enum GenshinWeaponMap {
    "Sword",
    "Claymore",
    "Polearm",
    "Bow",
    "Catalyst",
}
