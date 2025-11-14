"use server";

import { Filters } from "@/types";

export async function filterItems<T extends Record<string, any>>(
    items: T[],
    filters?: Filters,
    searchValue = ""
) {
    if (!filters) return items;
    if (filters.element.length > 0) {
        items = items.filter((item) => filters.element.includes(item.element));
    }
    if (filters.weaponType.length > 0) {
        items = items.filter((item) =>
            filters.weaponType.includes(item.weaponType)
        );
    }
    if (filters.rarity.length > 0) {
        items = items.filter((item) => filters.rarity.includes(item.rarity));
    }
    if (filters.ascStat.length > 0) {
        items = items.filter((item) =>
            filters.ascStat.includes(item.stats.ascensionStat)
        );
    }
    if (filters.talentBook.length > 0) {
        items = items.filter((item) =>
            filters.talentBook.includes(`${item.materials.talent}3`)
        );
    }
    if (filters.commonMat.length > 0) {
        items = items.filter((item) =>
            filters.commonMat.includes(item.materials.common)
        );
    }
    if (filters.bossMat.length > 0) {
        items = items.filter((item) =>
            filters.bossMat.includes(item.materials.boss)
        );
    }
    if (filters.weeklyBossMat.length > 0) {
        items = items.filter((item) =>
            filters.weeklyBossMat.includes(item.materials.weekly)
        );
    }
    if (filters.localMat.length > 0) {
        items = items.filter((item) =>
            filters.localMat.includes(item.materials.local)
        );
    }
    if (filters.nation.length > 0) {
        items = items.filter((item) => filters.nation.includes(item.nation));
    }
    if (searchValue) {
        items = items.filter(
            (item) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                item.fullName.toLowerCase().includes(searchValue.toLowerCase())
        );
    }

    return items;
}
