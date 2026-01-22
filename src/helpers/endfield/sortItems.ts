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
            res = res.sort((a, b) => {
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
            res = res.sort((a, b) => {
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
