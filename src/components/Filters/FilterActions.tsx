// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
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
        <Grid container spacing={1} sx={{ alignItems: "center" }}>
            <Grid size="auto">
                <Button
                    onClick={clearFilters}
                    disabled={!activeFilters}
                    variant="contained"
                    color={activeFilters ? "info" : "primary"}
                    disableElevation
                    startIcon={<RestartAltIcon sx={{ fontSize: 20 }} />}
                    sx={{
                        minWidth: "24px",
                        height: "28px",
                        "&.Mui-disabled": {
                            opacity: 0.35,
                            color: theme.text.primary,
                        },
                    }}
                >
                    Reset
                </Button>
            </Grid>
        </Grid>
    );
}
