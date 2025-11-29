import { SortProps } from "@/helpers/sort";
import DateObject from "@/helpers/dates";
import { objectKeys, sortBy } from "@/utils";
import { characterAscensionStats } from "@/data/genshin/characterAscensionStats";
import { subStats } from "@/data/genshin/weaponStats";
import { GenshinWeapon } from "@/types/genshin/weapon";

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
                        GenshinElementMap[b.element],
                        GenshinElementMap[a.element],
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
                        GenshinWeaponMap[b.weaponType],
                        GenshinWeaponMap[a.weaponType],
                        reverse
                    ) ||
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(bi, ai)
                );
            });
            break;
        case "ascensionStat":
            const ascStatKeys = objectKeys(characterAscensionStats);
            res = res.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return (
                    sortBy(
                        ascStatKeys.indexOf(b.stats.ascensionStat),
                        ascStatKeys.indexOf(a.stats.ascensionStat),
                        reverse
                    ) || sortBy(bi, ai)
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
        case "subStat":
            res = res.sort((a, b) => {
                const ai = getSubStatLabel(
                    a as unknown as GenshinWeapon,
                    reverse
                );
                const bi = getSubStatLabel(
                    b as unknown as GenshinWeapon,
                    reverse
                );
                return (
                    sortBy(bi, ai, reverse) ||
                    sortBy(b.displayName, a.displayName)
                );
            });
            break;
        case "nation":
            res = res.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return sortBy(b.nation, a.nation, reverse) || sortBy(bi, ai);
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
                    sortBy(
                        parseVersionNumber(a.release.version),
                        parseVersionNumber(b.release.version),
                        reverse
                    ) ||
                    sortBy(b.rarity, a.rarity, !reverse) ||
                    sortBy(bi, ai, !reverse)
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

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

function parseVersionNumber(version: string) {
    if (version.startsWith("Luna")) {
        return `5.${
            numerals.findIndex((i) => i === version.split(" ")[1]) + 9
        }`;
    } else {
        return version;
    }
}

function getSubStatLabel(weapon: GenshinWeapon, reverse: boolean) {
    const atk = weapon.stats.atk;
    const subStat = weapon.stats.subStat;
    const token = reverse ? "" : "z";
    return subStat
        ? `${subStat} ${subStats[atk][subStat]?.slice(-1)[0]}`
        : token;
}

function getNames(a: any, b: any) {
    const ai = a.displayName || a.name || "";
    const bi = b.displayName || b.name || "";
    return { ai, bi };
}
