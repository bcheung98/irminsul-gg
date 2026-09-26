import { useEffect } from "react";

// Component imports
import Text from "@/components/Text";
import ToggleButtons from "@/components/ToggleButtons";
import InfoButton from "@/components/InfoButton";
import InfoGallerySearch from "./InfoGallerySearch";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableRowsIcon from "@mui/icons-material/TableRows";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import { useDrawerStore } from "@/stores";

// Type imports
import type {
    InfoGalleryButtonProps,
    InfoGalleryProps,
} from "./InfoGallery.types";
import type { GalleryView } from "@/types";

const DEFAULT_BUTTONS: GalleryView[] = ["icon", "card", "list"];

export default function InfoGalleryHeader({
    title,
    buttonKeys,
    extraButtons,
    view,
    handleView,
    searchValue,
    setSearchValue,
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

    const buttons = buttonKeys ?? DEFAULT_BUTTONS;

    function getButtons() {
        return defaultButtonList
            .map((button) => buttons.includes(button.value) && button)
            .filter(Boolean) as InfoGalleryButtonProps[];
    }

    return (
        <Grid container spacing={2}>
            <Grid size="auto">
                <Text
                    variant="h5"
                    sx={{ fontWeight: theme.font.weight.highlight }}
                >
                    {title}
                </Text>
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
            {extraButtons && (
                <Grid size={{ xs: 6, sm: "auto" }}>{extraButtons}</Grid>
            )}
            {!hideSearchBar && (
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <InfoGallerySearch
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    />
                </Grid>
            )}
            {!hideFilters && (
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <InfoButton
                        title="Filters"
                        icons={{
                            start:
                                matches && rightDrawerOpen
                                    ? KeyboardArrowRightIcon
                                    : TuneIcon,
                        }}
                        color={theme.background(2)}
                        onClick={toggleDrawerState}
                        disableRipple
                        hoverAdjust={0.05}
                        sx={{ height: "32px" }}
                    />
                </Grid>
            )}
        </Grid>
    );
}

export const defaultButtonList: InfoGalleryButtonProps[] = [
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
