// Component imports
import SearchBar from "@/components/SearchBar";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Tooltip from "@/components/Tooltip";
import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface FilterDrawerActionsProps {
    clearFilters: () => void;
    activeFilters: boolean;
    searchValue: string;
    handleInputChange: (event: React.BaseSyntheticEvent) => void;
}

export default function FilterDrawerActions({
    clearFilters,
    activeFilters,
    searchValue,
    handleInputChange,
}: FilterDrawerActionsProps) {
    const theme = useTheme();

    return (
        <Grid container spacing={1} sx={{ alignItems: "center" }}>
            <Grid size="auto">
                <Tooltip title="Reset" placement="left">
                    <Button
                        onClick={clearFilters}
                        disabled={!activeFilters}
                        variant="contained"
                        color={activeFilters ? "info" : "primary"}
                        disableElevation
                        sx={{
                            minWidth: "24px",
                            height: "28px",
                            p: 1,
                            "&.Mui-disabled": {
                                opacity: 0.35,
                                color: theme.text.primary,
                            },
                        }}
                    >
                        <RestartAltIcon sx={{ fontSize: 20 }} />
                    </Button>
                </Tooltip>
            </Grid>
            <Grid size="grow">
                <SearchBar
                    placeholder="Search"
                    value={searchValue}
                    onChange={handleInputChange}
                    sx={{ height: "32px" }}
                />
            </Grid>
        </Grid>
    );
}
