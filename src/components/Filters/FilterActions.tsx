// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface FilterActionsProps {
    clearFilters: () => void;
    activeFilters: boolean;
}

export default function FilterActions({
    clearFilters,
    activeFilters,
}: FilterActionsProps) {
    const theme = useTheme();

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
