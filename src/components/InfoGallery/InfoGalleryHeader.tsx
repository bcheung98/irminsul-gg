import { useEffect } from "react";

// Component imports
import Text from "@/components/Text";
import ToggleButtons from "@/components/ToggleButtons";
import SearchBar from "@/components/SearchBar";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableRowsIcon from "@mui/icons-material/TableRows";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import { useDrawerStore } from "@/stores";

// Type imports
import { InfoGalleryButtonProps, InfoGalleryProps } from "./InfoGallery.types";

export default function InfoGalleryHeader({
    title,
    buttonKeys: buttons = ["icon", "card", "list"],
    customButtons,
    view,
    handleView,
    searchValue,
    handleInputChange,
    hideSearchBar = false,
    hideFilters = false,
}: InfoGalleryProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));

    const { rightDrawerOpen, toggleRightDrawer, toggleRightDrawerMobile } =
        useDrawerStore();

    useEffect(() => {
        toggleRightDrawer();
        toggleRightDrawerMobile();
    }, [matches]);

    const toggleDrawerState = () => {
        matches ? toggleRightDrawer() : toggleRightDrawerMobile();
    };

    function getButtons() {
        if (customButtons) return customButtons;
        return buttonList
            .map((button) => buttons.includes(button.value) && button)
            .filter(Boolean) as InfoGalleryButtonProps[];
    }

    return (
        <Grid container spacing={2}>
            <Grid size="auto">
                <Text variant="h5">{title}</Text>
            </Grid>
            {buttons.length > 1 && (
                <Grid size={{ xs: 6, sm: "auto" }}>
                    <ToggleButtons
                        color="primary"
                        buttons={getButtons()}
                        value={view}
                        exclusive
                        onChange={handleView}
                        highlightOnHover={false}
                    />
                </Grid>
            )}
            {!hideSearchBar && (
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <SearchBar
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleInputChange}
                        sx={{ height: "32px" }}
                    />
                </Grid>
            )}
            {!hideFilters && (
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <Button
                        onClick={toggleDrawerState}
                        variant="contained"
                        color="primary"
                        disableElevation
                        disableRipple
                        startIcon={
                            matches && rightDrawerOpen ? (
                                <KeyboardArrowRightIcon />
                            ) : (
                                <TuneIcon />
                            )
                        }
                        sx={{ height: "32px" }}
                    >
                        Filters
                    </Button>
                </Grid>
            )}
        </Grid>
    );
}

export const buttonList: InfoGalleryButtonProps[] = [
    {
        value: "icon",
        icon: <ViewCompactIcon />,
        tooltip: "Card view",
    },
    {
        value: "card",
        icon: <ViewModuleIcon />,
        tooltip: "Expanded card view",
    },
    {
        value: "list",
        icon: <TableRowsIcon />,
        tooltip: "List view",
    },
];
