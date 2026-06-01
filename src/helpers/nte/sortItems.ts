import { SortProps } from "@/helpers/sort";
import DateObject from "@/helpers/dates";
import { sortBy } from "@/utils";
import { subStats } from "@/data/nte/weaponStats";
import { NTEWeapon } from "@/types/nte";

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
                        NTEElementMap[b.element],
                        NTEElementMap[a.element],
                        reverse,
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
                        NTEWeaponMap[b.weaponType],
                        NTEWeaponMap[a.weaponType],
                        reverse,
                    ) ||
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(bi, ai)
                );
            });
            break;
        case "subStat":
            res = res.sort((a, b) => {
                const ai = getSubStatLabel(a as unknown as NTEWeapon, reverse);
                const bi = getSubStatLabel(b as unknown as NTEWeapon, reverse);
                return (
                    sortBy(bi, ai, reverse) ||
                    sortBy(b.displayName, a.displayName)
                );
            });
            break;
        case "baseATK":
            res = res.sort(
                (a, b) =>
                    sortBy(a.stats.atk, b.stats.atk, reverse) ||
                    sortBy(b.displayName, a.displayName),
            );
            break;
        case "nation":
            res = res.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return sortBy(b.faction, a.faction, reverse) || sortBy(bi, ai);
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
    }

    return res;
}

export enum NTEElementMap {
    "Cosmos",
    "Anima",
    "Incantation",
    "Chaos",
    "Psyche",
    "Lakshana",
}

export enum NTEWeaponMap {
    "Solid",
    "Liquid",
    "Gas",
    "Plasma",
    "Synthesis",
}

function getNames(a: any, b: any) {
    const ai = a.displayName || a.name || "";
    const bi = b.displayName || b.name || "";
    return { ai, bi };
}

function getSubStatLabel(weapon: NTEWeapon, reverse: boolean) {
    const atk = weapon.stats.atk;
    const subStat = weapon.stats.subStat;
    const token = reverse ? "" : "z";
    return subStat
        ? `${subStat} ${subStats[atk][subStat]?.slice(-1)[0]}`
        : token;
}
