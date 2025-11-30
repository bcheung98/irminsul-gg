import TextLabel from "@/components/TextLabel";
import { FilterButtons, Filters, GroupFilterButtons } from "@/types";
import { ClearFilterState, FilterState } from "@/stores/useFilterStore";

interface CreateButtonProps {
    url?: string;
    groupUrl?: string;
    getURL?: (args?: any) => string;
    getTooltip?: (args?: any) => string;
    getLabel?: (args?: any) => string;
    endTag?: string;
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
    endTag = "",
}: CreateFilterButtonsProps<T>): FilterButtons[] {
    return items.map((item) => {
        const src = getURL !== undefined ? getURL(item) : item;
        return {
            value: item,
            icon: url && (
                <TextLabel
                    icon={`${url}/${src}${endTag}`}
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
    ...props
}: CreateGroupFilterButtonsProps<T>): GroupFilterButtons[] {
    return Object.entries(groupItems).map(([key, values]) => ({
        buttons: createFilterButtons({ items: values, ...props }),
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
