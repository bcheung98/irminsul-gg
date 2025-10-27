// Component imports
import FilterButtons from "./FilterButtons";

// MUI imports
import Stack from "@mui/material/Stack";

// Type imports
import { FilterGroup } from "@/types";

interface FilterListProps {
    filters: FilterGroup[];
}

export default function FilterList({ filters }: FilterListProps) {
    return (
        <Stack spacing={1}>
            {filters.map((filter) => (
                <FilterButtons key={filter.name} filter={filter} />
            ))}
        </Stack>
    );
}
