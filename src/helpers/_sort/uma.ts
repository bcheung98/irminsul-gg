import { sortItems, getItemName } from "@/helpers/_sort";
import { sortBy } from "@/utils";
import { specialties } from "@/data/uma/common";
import DateObject from "@/helpers/dates";

// Type imports
import type { UmaCharacterAptitudeCategory } from "@/types/uma/character";
import type { Item } from "@/types";
import type { SortHandler, SortHandlers, SortProps } from "@/helpers/_sort";

const umaSortHandlers: SortHandlers = {
    id: (a, b, reverse) => sortBy(a.id, b.id, !reverse),
    name: (a, b, reverse) => {
        const result =
            getItemName(a).localeCompare(getItemName(b)) ||
            (isSupport(a)
                ? sortBy(
                      specialties.indexOf(b.specialty),
                      specialties.indexOf(a.specialty),
                      // Keep specialty order the same when name order is reversed.
                      reverse,
                  )
                : 0) ||
            sortByUmaId(a, b);
        // Sort first, then reverse the entire array.
        return reverse ? -result : result;
    },
    rarity: (a, b, reverse) =>
        sortBy(a.rarity, b.rarity, reverse) ||
        sortBy(
            specialties.indexOf(b.specialty),
            specialties.indexOf(a.specialty),
        ) ||
        sortBy(a.id, b.id, true),
    specialty: (a, b, reverse) =>
        sortBy(
            specialties.indexOf(b.specialty),
            specialties.indexOf(a.specialty),
            reverse,
        ) ||
        sortBy(a.rarity, b.rarity) ||
        sortBy(b.id, a.id),
    turf: aptitudeSort("surface", "turf"),
    dirt: aptitudeSort("surface", "dirt"),
    sprint: aptitudeSort("distance", "sprint"),
    mile: aptitudeSort("distance", "mile"),
    medium: aptitudeSort("distance", "medium"),
    long: aptitudeSort("distance", "long"),
    front: aptitudeSort("strategy", "front"),
    pace: aptitudeSort("strategy", "pace"),
    late: aptitudeSort("strategy", "late"),
    end: aptitudeSort("strategy", "end"),
    skillName: (a, b, reverse) => {
        const result = getSkillName(a).localeCompare(getSkillName(b));
        return reverse ? -result : result;
    },
    skillRarity: (a, b, reverse) =>
        sortBy(a.rarity, b.rarity, reverse) || sortBy(b.id, a.id),
    skillType: (a, b, reverse) =>
        sortBy(b.icon, a.icon, reverse) || sortBy(b.id, a.id),
    release: (a, b, reverse) => {
        const aDate = new DateObject(a.release.jp).date.getTime();
        const bDate = new DateObject(b.release.jp).date.getTime();
        return (
            sortBy(aDate, bDate, reverse) ||
            sortBy(a.rarity, b.rarity) ||
            sortBy(
                specialties.indexOf(b.specialty),
                specialties.indexOf(a.specialty),
            ) ||
            sortBy(a.id, b.id, true)
        );
    },
};

function isSupport(item: Item) {
    return "specialty" in item;
}

function sortByUmaId(a: Item, b: Item) {
    return sortBy(b.id, a.id, isSupport(a));
}

function aptitudeSort(
    category: UmaCharacterAptitudeCategory,
    aptitude: string,
): SortHandler {
    return (a, b, reverse) =>
        sortBy(
            a.aptitude[category][aptitude],
            b.aptitude[category][aptitude],
            !reverse,
        ) ||
        sortBy(a.rarity, b.rarity, reverse) ||
        sortBy(getItemName(b), getItemName(a));
}

function getSkillName(item: Item): string {
    return item.name.global || item.name.jp;
}

export default function sortUmaItems<T extends Item>(props: SortProps<T>) {
    return sortItems(umaSortHandlers, props);
}
