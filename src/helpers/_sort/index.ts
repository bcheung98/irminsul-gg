import DateObject from "@/helpers/dates";
import { sortBy } from "@/utils";
import type { Item } from "@/types";
import type { GallerySettings } from "@/stores/useGalleryStore";

// =========================== Types ===========================

export type SortParams = Omit<GallerySettings, "view">;
export interface SortProps<T extends Item> {
    items: T[];
    value: string;
    reverse: boolean;
}
export type SortHandler = (a: Item, b: Item, reverse: boolean) => number;
export type SortHandlers = Record<string, SortHandler>;

// =========================== Core ===========================

export function sortItems<T extends Item>(
    handlers: SortHandlers,
    { items, value, reverse }: SortProps<T>,
): T[] {
    const handler = handlers[value];
    if (!handler) return items;
    return items.toSorted((a, b) => handler(a, b, reverse));
}

// =========================== Accessors ===========================

export function getItemName(item: Item): string {
    if (typeof item.displayName === "string") {
        return item.displayName;
    }
    if (typeof item.name === "string") {
        return item.name;
    }
    return "";
}

// =========================== Basic sorts ===========================

export const nameSort: SortHandler = (a, b, reverse) => {
    const result = getItemName(a).localeCompare(getItemName(b));
    return reverse ? -result : result;
};

export const raritySort: SortHandler = (a, b, reverse) =>
    sortBy(a.rarity, b.rarity, reverse) ||
    sortBy(getItemName(b), getItemName(a));

export const releaseSort: SortHandler = (a, b, reverse) => {
    const aDate = new DateObject(a.release.date).date.getTime();
    const bDate = new DateObject(b.release.date).date.getTime();
    return (
        sortBy(aDate, bDate, reverse) ||
        sortBy(b.rarity, a.rarity, !reverse) ||
        sortBy(getItemName(b), getItemName(a), !reverse)
    );
};

// =========================== Property sorts ===========================

export function propertySort(property: string): SortHandler {
    return (a, b, reverse) =>
        sortBy(b[property], a[property], reverse) ||
        sortBy(getItemName(b), getItemName(a));
}

export function propertySortById(property: string): SortHandler {
    return (a, b, reverse) =>
        sortBy(a[property], b[property], reverse) ||
        sortBy(a.id, b.id, reverse);
}

export function orderedPropertySort(
    property: string,
    order: readonly string[],
): SortHandler {
    return (a, b, reverse) =>
        sortBy(
            order.indexOf(b[property]),
            order.indexOf(a[property]),
            reverse,
        ) ||
        sortBy(a.rarity, b.rarity) ||
        sortBy(getItemName(b), getItemName(a));
}

// =========================== Stat sorts ===========================

export function statPropertySort(property: string): SortHandler {
    return (a, b, reverse) =>
        sortBy(a.stats[property], b.stats[property], !reverse) ||
        sortBy(b.rarity, a.rarity, reverse) ||
        sortBy(getItemName(b), getItemName(a), !reverse);
}

export function statPropertyNameSort(property: string): SortHandler {
    return (a, b, reverse) =>
        sortBy(a.stats[property], b.stats[property], reverse) ||
        sortBy(getItemName(b), getItemName(a));
}

export function orderedStatPropertySort(
    property: string,
    order: readonly string[],
): SortHandler {
    return (a, b, reverse) =>
        sortBy(
            order.indexOf(b.stats[property]),
            order.indexOf(a.stats[property]),
            reverse,
        ) || sortBy(getItemName(b), getItemName(a));
}

export function subStatSort<T extends Item>(
    getLabel: (item: T, reverse: boolean) => string,
): SortHandler {
    return (a, b, reverse) => {
        const ai = getLabel(a as T, reverse);
        const bi = getLabel(b as T, reverse);
        return (
            sortBy(bi, ai, reverse) || sortBy(getItemName(b), getItemName(a))
        );
    };
}

// =========================== Version sorts ===========================

const identity = (value: string) => value;

export function versionSort(
    normalize: (version: string) => string = identity,
): SortHandler {
    return (a, b, reverse) =>
        sortBy(
            normalize(a.release.version),
            normalize(b.release.version),
            reverse,
        ) ||
        sortBy(b.rarity, a.rarity, !reverse) ||
        sortBy(getItemName(b), getItemName(a), !reverse);
}

export function versionSortById(
    normalize: (version: string) => string = identity,
): SortHandler {
    return (a, b, reverse) =>
        sortBy(
            normalize(a.release.version),
            normalize(b.release.version),
            reverse,
        ) || sortBy(a.id, b.id, reverse);
}
