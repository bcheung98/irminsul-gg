// Component imports
import FilterActions from "./FilterActions";
import FilterList from "./FilterList";
import FilterSort from "./FilterSort";

// MUI imports
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Type imports
import { FiltersProps } from "./Filters.types";

export default function Filters({ actions, filters }: FiltersProps) {
    return (
        <Stack spacing={2} divider={<Divider />}>
            <Stack spacing={1}>
                <FilterActions {...actions} />
                <FilterList filters={filters} />
            </Stack>
            <FilterSort />
        </Stack>
    );
}
