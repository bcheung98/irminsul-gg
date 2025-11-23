import { useEffect } from "react";

// Component imports
import InfoGalleryHeader from "./InfoGalleryHeader";
import ActionFab from "@/components/ActionFab";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import TuneIcon from "@mui/icons-material/Tune";

// Helper imports
import { useDrawerStore } from "@/stores";

// Type imports
import { InfoGalleryProps } from "./InfoGallery.types";

export default function InfoGallery(props: InfoGalleryProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));

    const { toggleRightDrawer, toggleRightDrawerMobile } = useDrawerStore();
    const toggleDrawerState = (open?: boolean) => {
        matches ? toggleRightDrawer(open) : toggleRightDrawerMobile(open);
    };

    useEffect(() => {
        toggleDrawerState(matches);
    }, [matches]);

    return (
        <>
            <Stack spacing={2} sx={{ p: 1 }}>
                <InfoGalleryHeader {...props} />
                {props.children}
            </Stack>
            {!props.hideFilters && (
                <ActionFab
                    action={toggleDrawerState}
                    icon={<TuneIcon fontSize="small" />}
                    tooltip="Open filters"
                    tooltipArrow="left"
                />
            )}
        </>
    );
}
