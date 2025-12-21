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
        case "id":
            res = res.sort((a, b) => sortBy(a.id, b.id, !reverse));
            break;
        case "name":
            res = res.sort((a, b) => {
                const { ai, bi } = getNames(a, b);
                return (
                    ai.localeCompare(bi) ||
                    sortBy(
                        SpecialtyMap[b.specialty],
                        SpecialtyMap[a.specialty],
                        reverse
                    ) ||
                    sortBy(b.id, a.id, "specialty" in a)
                );
            });
            if (reverse) {
                res = res.reverse();
            }
            break;
        case "rarity":
            res = res.sort((a, b) => {
                return (
                    sortBy(a.rarity, b.rarity, reverse) ||
                    sortBy(
                        SpecialtyMap[b.specialty],
                        SpecialtyMap[a.specialty]
                    ) ||
                    sortBy(a.id, b.id, true)
                );
            });
            break;
        case "specialty":
            res = res.sort(
                (a, b) =>
                    sortBy(
                        SpecialtyMap[b.specialty],
                        SpecialtyMap[a.specialty],
                        reverse
                    ) ||
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(b.id, a.id)
            );
            break;
        case "turf":
        case "dirt":
        case "sprint":
        case "mile":
        case "medium":
        case "long":
        case "front":
        case "pace":
        case "late":
        case "end":
            res = res.sort((a, b) => {
                let key = "";
                switch (value) {
                    case "turf":
                    case "dirt":
                        key = "surface";
                        break;
                    case "sprint":
                    case "mile":
                    case "medium":
                    case "long":
                        key = "distance";
                        break;
                    case "front":
                    case "pace":
                    case "late":
                    case "end":
                    default:
                        key = "strategy";
                        break;
                }
                const a1 = a.aptitude[key][value];
                const a2 = b.aptitude[key][value];
                const { ai, bi } = getNames(a, b);
                return (
                    sortBy(a1, a2, !reverse) ||
                    sortBy(a.rarity, b.rarity, reverse) ||
                    sortBy(bi, ai)
                );
            });
            break;
        case "skillName":
            res = res.sort((a, b) =>
                (a.name.global || a.name.jp).localeCompare(
                    b.name.global || b.name.jp
                )
            );
            if (reverse) {
                res = res.reverse();
            }
            break;
        case "skillRarity":
            res = res.sort(
                (a, b) =>
                    sortBy(a.rarity, b.rarity, reverse) || sortBy(b.id, a.id)
            );
            break;
        case "skillType":
            res = res.sort(
                (a, b) => sortBy(b.icon, a.icon, reverse) || sortBy(b.id, a.id)
            );
            break;
        case "release":
            res = res.sort((a, b) => {
                const d1 = new DateObject(a.release.jp).date.getTime();
                const d2 = new DateObject(b.release.jp).date.getTime();
                return (
                    sortBy(d1, d2, reverse) ||
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(
                        SpecialtyMap[b.specialty],
                        SpecialtyMap[a.specialty]
                    ) ||
                    sortBy(a.id, b.id, true)
                );
            });
            break;
    }
    return res;
}

export enum SpecialtyMap {
    "Speed",
    "Stamina",
    "Power",
    "Guts",
    "Wit",
    "Pal",
    "Group",
}

function getNames(a: any, b: any) {
    const ai = a.displayName || a.name || "";
    const bi = b.displayName || b.name || "";
    return { ai, bi };
}
