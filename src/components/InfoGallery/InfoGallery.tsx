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
            <Stack spacing={2} sx={{ px: 1, py: { xs: 1, sm: 2, lg: 1 } }}>
                <InfoGalleryHeader {...props} />
                {props.children}
            </Stack>
            {!props.hideFilters && (
                <ActionFab
                    action={toggleDrawerState}
                    icon={<TuneIcon fontSize="small" />}
                    tooltip="Open filters"
                    tooltipArrow="left"
                    position={{
                        top: { xs: 100, sm: 140, lg: 100 },
                        right: 20,
                    }}
                />
            )}
        </>
    );
}
