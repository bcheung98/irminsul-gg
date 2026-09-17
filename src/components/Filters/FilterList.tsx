// Component imports
import FilterButtons from "./FilterButtons";

// MUI imports
import Stack from "@mui/material/Stack";

// Type imports
import type { FilterListProps } from "./Filters.types";

export default function FilterList({ filterKey, filters }: FilterListProps) {
    return (
        <Stack spacing={1}>
            {filters.map((filter) => (
                <FilterButtons
                    key={filter.tag}
                    filterKey={filterKey}
                    filter={filter}
                />
            ))}
        </Stack>
    );
}
