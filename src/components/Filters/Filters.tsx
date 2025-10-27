// Component imports
import FilterActions from "./FilterActions";
import FilterList from "./FilterList";

// MUI imports
import Stack from "@mui/material/Stack";

// Type imports
import { FiltersProps } from "./Filters.types";

export default function Filters({ actions, filters }: FiltersProps) {
    return (
        <Stack spacing={2}>
            <FilterActions {...actions} />
            <FilterList filters={filters} />
        </Stack>
    );
}
