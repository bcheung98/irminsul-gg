import { Dispatch, SetStateAction } from "react";
import TextLabel from "@/components/TextLabel";
import { FilterButtons, Filters } from "@/types";

export function createFilterButtons<T extends string | number>({
    items,
    url,
    label,
}: {
    items: readonly T[];
    url?: string;
    label?: React.ReactNode;
}): FilterButtons[] {
    return items.map((item) => ({
        value: item,
        icon: url && (
            <TextLabel
                icon={`${url}/${item}`}
                iconProps={{
                    size: 32,
                    padding: "4px",
                    tooltip: !label ? `${item}` : "",
                }}
                title={label}
            />
        ),
    }));
}

export function filterActions<T>(
    initialState: T,
    filters: Filters,
    setFilters: Dispatch<SetStateAction<T>>
) {
    return {
        clearFilters: () => setFilters(initialState),
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
