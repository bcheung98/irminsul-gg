// Component imports
import FilterActions from "./FilterActions";
import FilterList from "./FilterList";
import FilterSort from "./FilterSort";
import TextLabel from "@/components/TextLabel";

// MUI imports
import Stack from "@mui/material/Stack";

// Type imports
import type {
    CreateFilterButtonsProps,
    CreateGroupFilterButtonsProps,
    FiltersProps,
} from "./Filters.types";
import type { FilterButtons, GroupFilterButtons } from "@/types/filters";

export default function Filters({
    initialState,
    filterKey,
    filters,
}: FiltersProps) {
    return (
        <Stack spacing={2}>
            <Stack spacing={2}>
                <FilterActions
                    initialState={initialState}
                    filterKey={filterKey}
                />
                <FilterList filterKey={filterKey} filters={filters} />
            </Stack>
            <FilterSort />
        </Stack>
    );
}

export function createFilterButtons<T extends string | number>({
    items,
    url,
    getURL,
    getTooltip,
    getLabel,
    endTag = "",
    imgFormat = "png",
    iconPadding,
}: CreateFilterButtonsProps<T>): FilterButtons[] {
    return items.map((item) => {
        const src = getURL !== undefined ? getURL(item) : item;
        return {
            value: item,
            icon: (
                <TextLabel
                    icon={url ? `${url}/${src}${endTag}` : ""}
                    iconProps={{
                        size: 32,
                        padding: iconPadding ?? "4px",
                        tooltip:
                            getTooltip !== undefined
                                ? getTooltip(item)
                                : `${item}`,
                        format: imgFormat,
                    }}
                    title={getLabel !== undefined && getLabel(item)}
                    titleProps={{
                        variant: "body2",
                        weight: "primary",
                        sx: { p: "4px 8px", textTransform: "none" },
                    }}
                />
            ),
        };
    });
}

export function createGroupedFilterButtons<T extends string | number>({
    groupItems,
    groupUrl,
    dropdown = true,
    ...props
}: CreateGroupFilterButtonsProps<T>): GroupFilterButtons[] {
    return Object.entries(groupItems).map(([key, values]) => ({
        buttons: createFilterButtons({ items: values, ...props }),
        icon: groupUrl ? `${groupUrl}/${key}` : "",
        label: key,
        dropdown: dropdown,
    }));
}
