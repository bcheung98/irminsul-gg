import { SortProps } from "@/helpers/sort";
import DateObject from "@/helpers/dates";
import { sortBy } from "@/utils";
import {
    baseATKScaling,
    EndfieldWeaponBaseATK,
} from "@/data/endfield/weaponStats";
import { gearSets } from "@/data/endfield/gearSets";

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
                        EndfieldElementMap[b.element],
                        EndfieldElementMap[a.element],
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
                        EndfieldWeaponMap[b.weaponType],
                        EndfieldWeaponMap[a.weaponType],
                        reverse,
                    ) ||
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(bi, ai)
                );
            });
            break;
        case "specialty":
            items = items.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return (
                    sortBy(
                        EndfieldSpecialtyMap[b.specialty],
                        EndfieldSpecialtyMap[a.specialty],
                        reverse,
                    ) ||
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(bi, ai)
                );
            });
            break;
        case "nation":
            items = items.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return sortBy(b.faction, a.faction, reverse) || sortBy(bi, ai);
            });
            break;
        case "baseATK":
            items = items.sort((a, b) => {
                const atkA =
                    baseATKScaling[a.stats.atk as EndfieldWeaponBaseATK].slice(
                        -1,
                    )[0];
                const atkB =
                    baseATKScaling[b.stats.atk as EndfieldWeaponBaseATK].slice(
                        -1,
                    )[0];
                return (
                    sortBy(atkA, atkB, reverse) ||
                    sortBy(b.displayName, a.displayName)
                );
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
        case "set":
            items = items.sort((a, b) => {
                const ai =
                    gearSets.find((set) => set.id === a.set)?.displayName ||
                    "zzzz";
                const bi =
                    gearSets.find((set) => set.id === b.set)?.displayName ||
                    "zzzz";
                return (
                    sortBy(b.rarity, a.rarity, !reverse) ||
                    sortBy(ai, bi, !reverse) ||
                    sortBy(a.type, b.type, !reverse) ||
                    sortBy(a.id, b.id)
                );
            });
            break;
        case "type":
            items = items.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return (
                    sortBy(b.type, a.type, reverse) ||
                    sortBy(b.rarity, a.rarity, !reverse) ||
                    sortBy(bi, ai, reverse)
                );
            });
            break;
    }

    return items;
}

export enum EndfieldElementMap {
    "Physical",
    "Cryo",
    "Electric",
    "Heat",
    "Nature",
}
export enum EndfieldWeaponMap {
    "Sword",
    "Great Sword",
    "Polearm",
    "Handcannon",
    "Arts Unit",
}
export enum EndfieldSpecialtyMap {
    "Guard",
    "Caster",
    "Striker",
    "Vanguard",
    "Defender",
    "Supporter",
}

function getNames(a: any, b: any) {
    const ai = a.displayName || a.name || "";
    const bi = b.displayName || b.name || "";
    return { ai, bi };
}
