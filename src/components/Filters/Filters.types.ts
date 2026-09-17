import type { FilterState } from "@/stores/useFilterStore";
import type {
    FilterGroup,
    FilterKey,
    FilterOption,
    Filters,
} from "@/types/filters";
import type { ToggleButtonProps } from "../ToggleButtons/ToggleButtons.types";

export interface FiltersProps {
    initialState: Record<string, (string | number)[]>;
    filterKey: keyof FilterState;
    filters: FilterGroup[];
}
export interface FilterActionsProps {
    initialState: Record<string, (string | number)[]>;
    filterKey: FilterKey;
}
export interface FilterListProps {
    filterKey: FilterKey;
    filters: FilterGroup[];
}
export interface FilterButtonsProps {
    filterKey: FilterKey;
    filter: FilterGroup;
}
export interface FilterButtonRootProps {
    filter: FilterGroup;
    buttons: ToggleButtonProps[];
    value: (string | number)[];
    onChange: (
        event: React.BaseSyntheticEvent,
        value: (string | number)[],
    ) => void;
}
export interface FilterButtonsLocalProps<T extends Filters> {
    filter: FilterGroup;
    filters: T;
    setFilters: React.Dispatch<React.SetStateAction<T>>;
}
export interface FilterOptionProps {
    filterKey: FilterKey;
    option: FilterOption;
}
interface CreateButtonProps {
    url?: string;
    getURL?: (args?: any) => string;
    getTooltip?: (args?: any) => string;
    getLabel?: (args?: any) => string;
    endTag?: string;
}
export interface CreateFilterButtonsProps<
    T extends string | number,
> extends CreateButtonProps {
    items: readonly T[];
    imgFormat?: "png" | "gif" | "webp";
    iconPadding?: string | number;
}
export interface CreateGroupFilterButtonsProps<
    T extends string | number,
> extends CreateButtonProps {
    groupUrl?: string;
    dropdown?: boolean;
    groupItems: Record<string, readonly T[]>;
}
