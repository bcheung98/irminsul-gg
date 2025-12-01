import { SortProps } from "@/helpers/sort";
import DateObject from "@/helpers/dates";
import { sortBy } from "@/utils";

export default function sortItems<T extends Record<string, any>>({
    items,
    value,
    reverse,
}: SortProps<T>) {
    let res = [...items];
    switch (value) {
        case "name":
            res = res.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return ai.localeCompare(bi);
            });
            if (reverse) {
                res = res.reverse();
            }
            break;
        case "rarity":
            res = res.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return sortBy(a.rarity, b.rarity, reverse) || sortBy(bi, ai);
            });
            break;
        case "element":
            res = res.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return (
                    sortBy(
                        HSRElementMap[b.element],
                        HSRElementMap[a.element],
                        reverse
                    ) ||
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(bi, ai)
                );
            });
            break;
        case "weaponType":
            res = res.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return (
                    sortBy(
                        HSRWeaponMap[b.weaponType],
                        HSRWeaponMap[a.weaponType],
                        reverse
                    ) ||
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(bi, ai)
                );
            });
            break;
        case "nation":
            res = res.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return sortBy(b.world, a.world, reverse) || sortBy(bi, ai);
            });
            break;
        case "release":
            res = res.sort((a, b) => {
                const d1 = new DateObject(a.release.date).date.getTime();
                const d2 = new DateObject(b.release.date).date.getTime();
                const { ai, bi } = getNames(a, b);
                return (
                    sortBy(d1, d2, reverse) ||
                    sortBy(b.rarity, a.rarity, !reverse) ||
                    sortBy(bi, ai, !reverse)
                );
            });
            break;
        case "version":
            res = res.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return (
                    sortBy(a.release.version, b.release.version, reverse) ||
                    sortBy(b.rarity, a.rarity, !reverse) ||
                    sortBy(bi, ai, !reverse)
                );
            });
            break;
        case "HP":
            res = res.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return (
                    sortBy(a.stats.hp, b.stats.hp, !reverse) ||
                    sortBy(b.rarity, a.rarity, reverse) ||
                    sortBy(bi, ai, !reverse)
                );
            });
            break;
        case "ATK":
            res = res.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return (
                    sortBy(a.stats.atk, b.stats.atk, !reverse) ||
                    sortBy(b.rarity, a.rarity, reverse) ||
                    sortBy(bi, ai, !reverse)
                );
            });
            break;
        case "DEF":
            res = res.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return (
                    sortBy(a.stats.def, b.stats.def, !reverse) ||
                    sortBy(b.rarity, a.rarity, reverse) ||
                    sortBy(bi, ai, !reverse)
                );
            });
            break;
    }

    return res;
}

export enum HSRElementMap {
    "Physical",
    "Fire",
    "Ice",
    "Lightning",
    "Wind",
    "Quantum",
    "Imaginary",
}
export enum HSRWeaponMap {
    "Destruction",
    "Hunt",
    "Erudition",
    "Harmony",
    "Nihility",
    "Preservation",
    "Abundance",
    "Remembrance",
}

function getNames(a: any, b: any) {
    const ai = a.displayName || a.name || "";
    const bi = b.displayName || b.name || "";
    return { ai, bi };
}
