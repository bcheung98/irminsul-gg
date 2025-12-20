import { SortProps } from "@/helpers/sort";
import DateObject from "@/helpers/dates";
import { sortBy } from "@/utils";
import { subStats } from "@/data/wuwa/weaponStats";
import { sonataEffects } from "@/data/wuwa/sonataEffects";
import { WuWaWeapon } from "@/types/wuwa";

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
                        WuWaElementMap[b.element],
                        WuWaElementMap[a.element],
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
                        WuWaWeaponMap[b.weaponType],
                        WuWaWeaponMap[a.weaponType],
                        reverse
                    ) ||
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(bi, ai)
                );
            });
            break;
        case "subStat":
            res = res.sort((a, b) => {
                const ai = getSubStatLabel(a as unknown as WuWaWeapon, reverse);
                const bi = getSubStatLabel(b as unknown as WuWaWeapon, reverse);
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
                    sortBy(b.displayName, a.displayName)
            );
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
        case "sonata":
            res = res.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                const s1 = a.sonata
                    .map(
                        (id: number) =>
                            sonataEffects.find((effect) => effect.id === id)
                                ?.displayName
                    )
                    .join("|");
                const s2 = b.sonata
                    .map(
                        (id: number) =>
                            sonataEffects.find((effect) => effect.id === id)
                                ?.displayName
                    )
                    .join("|");
                return (
                    sortBy(s1, s2, !reverse) ||
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(bi, ai)
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

export enum WuWaElementMap {
    "Glacio",
    "Fusion",
    "Electro",
    "Aero",
    "Spectro",
    "Havoc",
}

export enum WuWaWeaponMap {
    "Sword",
    "Broadblade",
    "Gauntlet",
    "Pistols",
    "Rectifier",
}

function getNames(a: any, b: any) {
    const ai = a.displayName || a.name || "";
    const bi = b.displayName || b.name || "";
    return { ai, bi };
}

function getSubStatLabel(weapon: WuWaWeapon, reverse: boolean) {
    const atk = weapon.stats.atk;
    const subStat = weapon.stats.subStat;
    const token = reverse ? "" : "z";
    return subStat
        ? `${subStat} ${subStats[atk][subStat]?.slice(-1)[0]}`
        : token;
}
