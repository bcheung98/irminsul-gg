import { gameSorters } from "@/helpers/sort";
import type { SortParams } from "./_sort";
import type { Filters, Game, Item } from "@/types";
import type { EndfieldGearAttributes } from "@/types/endfield/gear";

/**
 * Filters, searches, and sorts a collection of items using the provided
 * gallery settings.
 *
 * @param game - The game the items belong to.
 * @param items - The items to transform.
 * @param filters - The filters to apply to the items.
 * @param searchValue - The value used to search item names.
 * @param sort - The sort settings to apply to the items.
 * @returns The filtered, searched, and sorted items.
 */
export function transformItems<T extends Item>(
    game: Game,
    items: T[],
    filters: Filters,
    searchValue = "",
    sort: SortParams,
): T[] {
    const filteredItems = filterItems(items, filters);
    const searchedItems = searchItems(filteredItems, searchValue);
    return gameSorters[game]({
        items: searchedItems,
        value: sort.sortBy,
        reverse: sort.sortDirection === "desc",
    });
}

function filterItems<T extends Item>(items: T[], filters: Filters) {
    const activeFilters = Object.entries(filters).filter(
        ([key, values]) => values.length > 0 && key in filterHandlers,
    );
    if (activeFilters.length === 0) {
        return items;
    }
    return items.filter((item) =>
        activeFilters.every(([key, values]) =>
            filterHandlers[key](item, values, filters),
        ),
    );
}

type FilterValues = Filters[string];

type FilterHandler = (
    item: Item,
    values: FilterValues,
    filters: Filters,
) => boolean;

function matchAll(filters: Filters, key: string) {
    return filters[`_${key}`]?.includes("true") ?? false;
}

function matchValues(
    selected: FilterValues,
    values: FilterValues,
    matchAll = false,
) {
    return matchAll
        ? selected.every((value) => values.includes(value))
        : selected.some((value) => values.includes(value));
}

function propertyFilter(key: string): FilterHandler {
    return (item, values) => values.includes(item[key]);
}

function materialFilter(key: string): FilterHandler {
    return (item, values) => values.includes(item.materials[key]);
}

const tagFilter: FilterHandler = (item, values) =>
    matchValues(values, item.tags);

function getAptitudes(item: Item): Set<string> {
    return new Set(
        Object.values(item.aptitude).flatMap((aptitude) =>
            Object.entries(aptitude as Record<string, string>)
                .filter(([, value]) => value === "A")
                .map(([key]) => key),
        ),
    );
}

const filterHandlers: Record<string, FilterHandler> = {
    // Properties
    element: propertyFilter("element"),
    weaponType: propertyFilter("weaponType"),
    rarity: propertyFilter("rarity"),
    specialty: propertyFilter("specialty"),
    skillRarity: propertyFilter("rarity"),
    type: propertyFilter("type"),
    set: propertyFilter("set"),
    echoRarity: propertyFilter("rarity"),

    // Stats
    ascStat: (item, values) => values.includes(item.stats.ascensionStat),
    subStat: (item, values) => values.includes(item.stats.subStat),

    // Materials
    talentBook: (item, values) => values.includes(`${item.materials.talent}3`),
    calyxMat: materialFilter("calyx"),
    forgeryMat: materialFilter("forgery"),
    skillMat: materialFilter("skill"),
    weaponMat: materialFilter("weapon"),
    commonMat: materialFilter("common"),
    bossMat: materialFilter("boss"),
    weeklyBossMat: materialFilter("weekly"),
    localMat: materialFilter("local"),
    weaponAscensionMat: materialFilter("weapon"),
    eliteMat: materialFilter("elite"),

    // Multi-value
    attackType: (item, values) => matchValues(values, item.attackType),
    combatRoles: (item, values, filters) =>
        matchValues(values, item.combatRoles, matchAll(filters, "combatRoles")),
    sonata: (item, values, filters) =>
        matchValues(values, item.sonata, matchAll(filters, "sonata")),
    aptitude: (item, values) => {
        const aptitudes = getAptitudes(item);
        return values.every((value) =>
            aptitudes.has(`${value}`.toLocaleLowerCase()),
        );
    },
    conditions: (item, values) => matchValues(values, item.tags, true),
    attributes: (item, values, filters) =>
        matchValues(
            values,
            item.stats.map((stat: EndfieldGearAttributes) => stat.stat),
            matchAll(filters, "attributes"),
        ),

    // Tags
    "tcg-element": tagFilter,
    "tcg-weaponType": tagFilter,
    "tcg-faction": tagFilter,
    "tcg-group": tagFilter,

    // Misc
    nation: (item, values) =>
        values.includes(item.world || item.nation || item.faction),
};

interface LocalizedName {
    global: string;
    jp: string;
    jpNative?: string;
}

function hasLocalizedName(item: Item): item is Item & { name: LocalizedName } {
    return (
        typeof item.name === "object" &&
        item.name !== null &&
        typeof item.name.global === "string" &&
        typeof item.name.jp === "string"
    );
}

function searchItems<T extends Item>(items: T[], searchValue: string) {
    const search = searchValue.trim().toLocaleLowerCase();
    if (!search) return items;
    return items.filter((item) => {
        // Case for Uma skills
        if (hasLocalizedName(item)) {
            return (
                item.name.global.toLocaleLowerCase().includes(search) ||
                item.name.jp.toLocaleLowerCase().includes(search) ||
                item.name.jpNative?.toLocaleLowerCase().includes(search)
            );
        }
        return (
            (typeof item.name === "string" &&
                item.name.toLocaleLowerCase().includes(search)) ||
            (typeof item.displayName === "string" &&
                item.displayName.toLocaleLowerCase().includes(search))
        );
    });
}
