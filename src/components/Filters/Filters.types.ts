import { FilterGroup } from "@/types";

export interface FiltersProps {
    actions: FilterActionsProps;
    filters: FilterGroup[];
}

export interface FilterActionsProps {
    clearFilters: () => void;
    activeFilters: boolean;
}

export interface FilterListProps {
    filters: FilterGroup[];
}
