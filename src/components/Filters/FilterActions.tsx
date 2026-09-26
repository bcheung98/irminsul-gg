// Component imports
import InfoButton from "@/components/InfoButton";

// MUI imports
import { useTheme } from "@mui/material/styles";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Helper imports
import { useFilterStore } from "@/stores";

// Type imports
import type { FilterActionsProps } from "./Filters.types";

export default function FilterActions({
    initialState,
    filterKey,
}: FilterActionsProps) {
    const theme = useTheme();

    const filters = useFilterStore((state) => state[filterKey]);
    const clearFilterState = useFilterStore((state) => state.clearFilterState);

    const activeFilters = Object.entries(filters).some(
        ([key, values]) => !key.startsWith("_") && values.length > 0,
    );

    const clearFilters = () => {
        const resetState = { ...initialState };
        for (const key of Object.keys(resetState)) {
            if (key.startsWith("_")) {
                resetState[key] = filters[key];
            }
        }
        clearFilterState(filterKey, resetState);
    };

    return (
        <InfoButton
            title="Reset"
            icons={{ start: RestartAltIcon }}
            color={
                activeFilters ? theme.palette.info.main : theme.background(2)
            }
            disabled={!activeFilters}
            onClick={clearFilters}
        />
    );
}
