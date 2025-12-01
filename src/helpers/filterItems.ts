import { useSort } from "@/helpers/sort";
import { GallerySettings } from "@/stores/useGalleryStore";
import { Filters, Game } from "@/types";

export function filterItems<T extends Record<string, any>>(
    game: Game,
    items: T[],
    filters: Filters,
    searchValue = "",
    sort: Omit<GallerySettings, "view">
) {
    let res = [...items];
    if ("element" in filters && filters.element.length > 0) {
        res = res.filter((item) => filters.element.includes(item.element));
    }
    if ("weaponType" in filters && filters.weaponType.length > 0) {
        res = res.filter((item) =>
            filters.weaponType.includes(item.weaponType)
        );
    }
    if ("rarity" in filters && filters.rarity.length > 0) {
        res = res.filter((item) => filters.rarity.includes(item.rarity));
    }
    if ("ascStat" in filters && filters.ascStat.length > 0) {
        res = res.filter((item) =>
            filters.ascStat.includes(item.stats.ascensionStat)
        );
    }
    if ("subStat" in filters && filters.subStat.length > 0) {
        res = res.filter((item) =>
            filters.subStat.includes(item.stats.subStat)
        );
    }
    if ("talentBook" in filters && filters.talentBook.length > 0) {
        res = res.filter((item) =>
            filters.talentBook.includes(`${item.materials.talent}3`)
        );
    }
    if ("calyxMat" in filters && filters.calyxMat.length > 0) {
        res = res.filter((item) =>
            filters.calyxMat.includes(item.materials.calyx)
        );
    }
    if ("commonMat" in filters && filters.commonMat.length > 0) {
        res = res.filter((item) =>
            filters.commonMat.includes(item.materials.common)
        );
    }
    if ("bossMat" in filters && filters.bossMat.length > 0) {
        res = res.filter((item) =>
            filters.bossMat.includes(item.materials.boss)
        );
    }
    if ("weeklyBossMat" in filters && filters.weeklyBossMat.length > 0) {
        res = res.filter((item) =>
            filters.weeklyBossMat.includes(item.materials.weekly)
        );
    }
    if ("localMat" in filters && filters.localMat.length > 0) {
        res = res.filter((item) =>
            filters.localMat.includes(item.materials.local)
        );
    }
    if (
        "weaponAscensionMat" in filters &&
        filters.weaponAscensionMat.length > 0
    ) {
        res = res.filter((item) =>
            filters.weaponAscensionMat.includes(item.materials.weapon)
        );
    }
    if ("eliteMat" in filters && filters.eliteMat.length > 0) {
        res = res.filter((item) =>
            filters.eliteMat.includes(item.materials.elite)
        );
    }
    if ("nation" in filters && filters.nation.length > 0) {
        res = res.filter((item) =>
            filters.nation.includes(item.world || item.nation)
        );
    }
    if (searchValue) {
        res = res.filter(
            (item) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                item.displayName
                    ?.toLowerCase()
                    .includes(searchValue.toLowerCase())
        );
    }

    const value = sort.sortBy;
    const reverse = sort.sortDirection === "desc";

    res = useSort()[game]({ items: res, value, reverse });

    return res;
}
