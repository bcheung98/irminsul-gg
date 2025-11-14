import TextLabel from "@/components/TextLabel";
import { FilterButtons, Filters, GroupFilterButtons } from "@/types";
import { ClearFilterState, FilterState } from "@/stores/useFilterStore";

interface CreateButtonProps {
    url?: string;
    groupUrl?: string;
    getURL?: (args?: any) => string;
    getTooltip?: (args?: any) => string;
    getLabel?: (args?: any) => string;
}

interface CreateFilterButtonsProps<T extends string | number>
    extends CreateButtonProps {
    items: readonly T[];
}

export function createFilterButtons<T extends string | number>({
    items,
    url,
    getURL,
    getTooltip,
    getLabel,
}: CreateFilterButtonsProps<T>): FilterButtons[] {
    return items.map((item) => {
        const src = getURL !== undefined ? getURL(item) : item;
        return {
            value: item,
            icon: url && (
                <TextLabel
                    icon={`${url}/${src}`}
                    iconProps={{
                        size: 32,
                        padding: "4px",
                        tooltip:
                            getTooltip !== undefined
                                ? getTooltip(item)
                                : `${item}`,
                    }}
                    title={getLabel !== undefined && getLabel(item)}
                />
            ),
        };
    });
}

interface CreateGroupFilterButtonsProps<T extends string | number>
    extends CreateButtonProps {
    groupItems: Record<string, readonly T[]>;
}

export function createGroupedFilterButtons<T extends string | number>({
    groupItems,
    groupUrl,
    url,
}: CreateGroupFilterButtonsProps<T>): GroupFilterButtons[] {
    return Object.entries(groupItems).map(([key, values]) => ({
        buttons: createFilterButtons({ items: values, url }),
        icon: `${groupUrl}/${key}`,
        label: key,
    }));
}

export function filterActions(
    key: keyof FilterState,
    initialState: Record<string, (string | number)[]>,
    filters: Filters,
    clearFilters: ClearFilterState
) {
    return {
        clearFilters: () => clearFilters(key, initialState),
        activeFilters: Object.values(filters).flat().length > 0,
    };
}

export function filterItems<T extends Record<string, any>>(
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
