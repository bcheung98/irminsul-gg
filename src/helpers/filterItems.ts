import { useSort } from "@/helpers/sort";
import { GallerySettings } from "@/stores/useGalleryStore";
import { Filters, Game } from "@/types";
import { EndfieldGearAttributes } from "@/types/endfield/gear";

export function filterItems<T extends Record<string, any>>(
    game: Game,
    items: T[],
    filters: Filters,
    searchValue = "",
    sort: Omit<GallerySettings, "view">,
) {
    if ("element" in filters && filters.element.length > 0) {
        items = items.filter((item) => filters.element.includes(item.element));
    }
    if ("weaponType" in filters && filters.weaponType.length > 0) {
        items = items.filter((item) =>
            filters.weaponType.includes(item.weaponType),
        );
    }
    if ("rarity" in filters && filters.rarity.length > 0) {
        items = items.filter((item) => filters.rarity.includes(item.rarity));
    }
    if ("ascStat" in filters && filters.ascStat.length > 0) {
        items = items.filter((item) =>
            filters.ascStat.includes(item.stats.ascensionStat),
        );
    }
    if ("subStat" in filters && filters.subStat.length > 0) {
        items = items.filter((item) =>
            filters.subStat.includes(item.stats.subStat),
        );
    }
    if ("talentBook" in filters && filters.talentBook.length > 0) {
        items = items.filter((item) =>
            filters.talentBook.includes(`${item.materials.talent}3`),
        );
    }
    if ("calyxMat" in filters && filters.calyxMat.length > 0) {
        items = items.filter((item) =>
            filters.calyxMat.includes(item.materials.calyx),
        );
    }
    if ("forgeryMat" in filters && filters.forgeryMat.length > 0) {
        items = items.filter((item) =>
            filters.forgeryMat.includes(item.materials.forgery),
        );
    }
    if ("skillMat" in filters && filters.skillMat.length > 0) {
        items = items.filter((item) =>
            filters.skillMat.includes(item.materials.skill),
        );
    }
    if ("weaponMat" in filters && filters.weaponMat.length > 0) {
        items = items.filter((item) =>
            filters.weaponMat.includes(item.materials.weapon),
        );
    }
    if ("commonMat" in filters && filters.commonMat.length > 0) {
        items = items.filter((item) =>
            filters.commonMat.includes(item.materials.common),
        );
    }
    if ("bossMat" in filters && filters.bossMat.length > 0) {
        items = items.filter((item) =>
            filters.bossMat.includes(item.materials.boss),
        );
    }
    if ("weeklyBossMat" in filters && filters.weeklyBossMat.length > 0) {
        items = items.filter((item) =>
            filters.weeklyBossMat.includes(item.materials.weekly),
        );
    }
    if ("localMat" in filters && filters.localMat.length > 0) {
        items = items.filter((item) =>
            filters.localMat.includes(item.materials.local),
        );
    }
    if (
        "weaponAscensionMat" in filters &&
        filters.weaponAscensionMat.length > 0
    ) {
        items = items.filter((item) =>
            filters.weaponAscensionMat.includes(item.materials.weapon),
        );
    }
    if ("eliteMat" in filters && filters.eliteMat.length > 0) {
        items = items.filter((item) =>
            filters.eliteMat.includes(item.materials.elite),
        );
    }
    if ("nation" in filters && filters.nation.length > 0) {
        items = items.filter((item) =>
            filters.nation.includes(item.world || item.nation || item.faction),
        );
    }
    if ("combatRoles" in filters && filters.combatRoles.length > 0) {
        if (filters._combatRoles.includes("true")) {
            items = items.filter((item) =>
                filters.combatRoles.every((role) =>
                    item.combatRoles.includes(role),
                ),
            );
        } else {
            items = items.filter((item) =>
                filters.combatRoles.some((role) =>
                    item.combatRoles.includes(role),
                ),
            );
        }
    }
    if ("echoRarity" in filters && filters.echoRarity.length > 0) {
        items = items.filter((item) =>
            filters.echoRarity.includes(item.rarity),
        );
    }
    if ("sonata" in filters && filters.sonata.length > 0) {
        if (filters._sonata.includes("true")) {
            items = items.filter((item) =>
                filters.sonata.every((sonata) => item.sonata.includes(sonata)),
            );
        } else {
            items = items.filter((item) =>
                filters.sonata.some((sonata) => item.sonata.includes(sonata)),
            );
        }
    }
    if ("attackType" in filters && filters.attackType.length > 0) {
        items = items.filter((item) =>
            filters.attackType.some((filter) =>
                item.attackType.includes(filter),
            ),
        );
    }
    if ("aptitude" in filters && filters.aptitude.length > 0) {
        items = items.filter((character) => {
            const aptitudes: string[] = [];
            Object.values(character.aptitude).forEach((values: any) =>
                Object.entries(values).forEach(
                    ([key, value]) => value === "A" && aptitudes.push(key),
                ),
            );
            return filters.aptitude.every((f) =>
                aptitudes.includes(`${f}`.toLocaleLowerCase()),
            );
        });
    }
    if ("specialty" in filters && filters.specialty.length > 0) {
        items = items.filter((item) =>
            filters.specialty.includes(item.specialty),
        );
    }
    if ("conditions" in filters && filters.conditions.length > 0) {
        items = items.filter((item) =>
            filters.conditions.every((skill) => item.tags.includes(skill)),
        );
    }
    if ("skillRarity" in filters && filters.skillRarity.length > 0) {
        items = items.filter((item) =>
            filters.skillRarity.includes(item.rarity),
        );
    }
    if ("tcg-element" in filters && filters["tcg-element"].length > 0) {
        items = items.filter((item) =>
            filters["tcg-element"].some((tag) => item.tags.includes(tag)),
        );
    }
    if ("tcg-weaponType" in filters && filters["tcg-weaponType"].length > 0) {
        items = items.filter((item) =>
            filters["tcg-weaponType"].some((tag) => item.tags.includes(tag)),
        );
    }
    if ("tcg-faction" in filters && filters["tcg-faction"].length > 0) {
        items = items.filter((item) =>
            filters["tcg-faction"].some((tag) => item.tags.includes(tag)),
        );
    }
    if ("tcg-group" in filters && filters["tcg-group"].length > 0) {
        items = items.filter((item) =>
            filters["tcg-group"].some((tag) => item.tags.includes(tag)),
        );
    }
    if ("type" in filters && filters.type.length > 0) {
        items = items.filter((item) => filters.type.includes(item.type));
    }
    if ("set" in filters && filters.set.length > 0) {
        items = items.filter((item) => filters.set.includes(item.set));
    }
    if ("attributes" in filters && filters.attributes.length > 0) {
        if (filters._attributes.includes("true")) {
            items = items.filter((item) =>
                filters.attributes.every((attr) =>
                    item.stats
                        .map((stat: EndfieldGearAttributes) => stat.stat)
                        .includes(attr),
                ),
            );
        } else {
            items = items.filter((item) =>
                filters.attributes.some((attr) =>
                    item.stats
                        .map((stat: EndfieldGearAttributes) => stat.stat)
                        .includes(attr),
                ),
            );
        }
    }

    if (searchValue) {
        items = items.filter((item) => {
            // Case for Uma skills
            if ("conditions" in item) {
                return (item.name.global || item.name.jp)
                    .toLocaleLowerCase()
                    .includes(searchValue.toLocaleLowerCase());
            }
            return (
                item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                (item.displayName || item.name)
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            );
        });
    }

    const value = sort.sortBy;
    const reverse = sort.sortDirection === "desc";

    items = useSort()[game]({ items, value, reverse });

    return items;
}
