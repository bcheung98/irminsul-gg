// Component imports
import FilterButtonsRoot from "./FilterButtonsRoot";

// Type imports
import type { Filters } from "@/types/filters";
import type { FilterButtonsLocalProps } from "./Filters.types";

export default function FilterButtonsLocal<T extends Filters>({
    filter,
    filters,
    setFilters,
}: FilterButtonsLocalProps<T>) {
    const tag = filter.tag as keyof T;

    const handleChange = (
        _: React.BaseSyntheticEvent,
        value: (string | number)[],
    ) => {
        setFilters((state) => ({
            ...state,
            [tag]: value,
        }));
    };

    return (
        <FilterButtonsRoot
            filter={filter}
            buttons={filter.buttons}
            value={filters[tag]}
            onChange={handleChange}
        />
    );
}
