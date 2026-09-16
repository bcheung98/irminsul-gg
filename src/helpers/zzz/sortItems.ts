import { SortProps } from "@/helpers/sort";
import DateObject from "@/helpers/dates";
import { sortBy } from "@/utils";
import { weaponSubStats } from "@/data/zzz/weaponStats";
import { ZZZRarity, ZZZWeapon } from "@/types/zzz";

export default function sortItems<T extends Record<string, any>>({
    items,
    value,
    reverse,
}: SortProps<T>) {
    switch (value) {
        case "name":
            items = items.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return ai.localeCompare(bi);
            });
            if (reverse) {
                items = items.reverse();
            }
            break;
        case "rarity":
            items = items.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return sortBy(a.rarity, b.rarity, reverse) || sortBy(bi, ai);
            });
            break;
        case "element":
            items = items.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return (
                    sortBy(
                        ZZZElementMap[b.element],
                        ZZZElementMap[a.element],
                        reverse,
                    ) ||
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(bi, ai)
                );
            });
            break;
        case "weaponType":
            items = items.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return (
                    sortBy(
                        ZZZWeaponMap[b.weaponType],
                        ZZZWeaponMap[a.weaponType],
                        reverse,
                    ) ||
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(bi, ai)
                );
            });
            break;
        case "attackType":
            items = items.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return (
                    sortBy(b.attackType[0], a.attackType[0], reverse) ||
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(bi, ai)
                );
            });
            break;
        case "subStat":
            items = items.sort((a, b) => {
                const ai = getSubStatLabel(
                    a as unknown as ZZZWeapon,
                    a.rarity,
                    reverse,
                );
                const bi = getSubStatLabel(
                    b as unknown as ZZZWeapon,
                    b.rarity,
                    reverse,
                );
                return (
                    sortBy(bi, ai, reverse) ||
                    sortBy(b.displayName, a.displayName)
                );
            });
            break;
        case "baseATK":
            items = items.sort(
                (a, b) =>
                    sortBy(
                        a.stats.mainStat.value,
                        b.stats.mainStat.value,
                        reverse,
                    ) || sortBy(b.displayName, a.displayName),
            );
            break;
        case "nation":
            items = items.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return sortBy(b.faction, a.faction, reverse) || sortBy(bi, ai);
            });
            break;
        case "release":
            items = items.sort((a, b) => {
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
            items = items.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return (
                    sortBy(a.release.version, b.release.version, reverse) ||
                    sortBy(b.rarity, a.rarity, !reverse) ||
                    sortBy(bi, ai, !reverse)
                );
            });
            break;
    }

    return items;
}

export enum ZZZElementMap {
    "Physical",
    "Fire",
    "Ice",
    "Electric",
    "Ether",
}

export enum ZZZWeaponMap {
    "Attack",
    "Stun",
    "Anomaly",
    "Defense",
    "Support",
    "Rupture",
    "Armorer",
}

function getNames(a: any, b: any) {
    const ai = a.displayName || a.name || "";
    const bi = b.displayName || b.name || "";
    return { ai, bi };
}

function getSubStatLabel(
    weapon: ZZZWeapon,
    rarity: Exclude<ZZZRarity, 2 | 1>,
    reverse: boolean,
) {
    const subStat = weapon.stats.subStat;
    const token = reverse ? "" : "z";
    return subStat
        ? `${subStat} ${weaponSubStats[subStat].scaling[rarity].slice(-1)[0]}`
        : token;
}
