import { useEffect, useState } from "react";

// Component imports
import Text from "@/components/Text";
import ToggleButtons from "@/components/ToggleButtons";

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

// Type imports
import { InfoGalleryButtonProps, InfoGalleryProps } from "./InfoGallery.types";
import { useDrawerStore } from "@/stores/useDrawerStore";

export default function InfoGalleryHeader({
    title,
    buttons = defaultButtons,
    view,
    handleView,
}: InfoGalleryProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));

    const { rightDrawerOpen, toggleRightDrawer, toggleRightDrawerMobile } =
        useDrawerStore();

    useEffect(() => {
        toggleRightDrawer();
        toggleRightDrawerMobile();
    }, [matches]);

    return (
        <Grid container spacing={2}>
            <Grid size="auto">
                <Text variant="h5">{title}</Text>
            </Grid>
            <Grid size={{ xs: 6, sm: "auto" }}>
                <ToggleButtons
                    color="primary"
                    buttons={buttons}
                    value={view}
                    exclusive
                    onChange={handleView}
                    highlightOnHover={false}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: "auto" }}>
                <Button
                    onClick={
                        matches ? toggleRightDrawer : toggleRightDrawerMobile
                    }
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
        </Grid>
    );
}

export const defaultButtons: InfoGalleryButtonProps[] = [
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
        value: "table",
        icon: <TableRowsIcon />,
        tooltip: "List view",
    },
];
