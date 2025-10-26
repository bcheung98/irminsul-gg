// Component imports
import SearchBar from "@/components/SearchBar";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Helper imports
import { useSearchValue } from "@/hooks";
import { SearchContext } from "@/context";

// Type imports
import { FilterDrawerProps } from "./FilterDrawer.types";

export default function FilterDrawerHeader({
    component,
    toggleDrawer,
}: FilterDrawerProps) {
    const theme = useTheme();

    const { searchValue, handleInputChange } = useSearchValue();

    return (
        <SearchContext value={searchValue}>
            <Box sx={{ pt: { xs: 1, sm: 9, lg: 11 }, pb: 2, px: 2 }}>
                <Toolbar
                    variant="dense"
                    disableGutters
                    sx={{ justifyContent: "space-between", mb: 1 }}
                >
                    <Button
                        variant="contained"
                        color="info"
                        disableElevation
                        startIcon={<RestartAltIcon />}
                        sx={{
                            height: "24px",
                            "&.Mui-disabled": {
                                opacity: 0.35,
                                color: theme.text.primary,
                            },
                        }}
                    >
                        Reset
                    </Button>
                    <IconButton
                        onClick={toggleDrawer}
                        sx={{
                            color: theme.drawer.color.primary,
                            p: 0.5,
                            "&:hover": {
                                backgroundColor:
                                    theme.drawer.backgroundColor.hover,
                            },
                        }}
                    >
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </Toolbar>
                <SearchBar
                    placeholder="Search"
                    value={searchValue}
                    onChange={handleInputChange}
                    sx={{ height: "32px" }}
                />
                {component || null}
            </Box>
        </SearchContext>
    );
}
