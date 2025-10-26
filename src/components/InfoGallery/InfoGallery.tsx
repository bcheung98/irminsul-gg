// Component imports
import InfoGalleryHeader from "./InfoGalleryHeader";
import ActionFab from "@/components/ActionFab";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import TuneIcon from "@mui/icons-material/Tune";

// Helper imports
import { useDrawerStore } from "@/stores/useDrawerStore";

// Type imports
import { InfoGalleryProps } from "./InfoGallery.types";

export default function InfoGallery(props: InfoGalleryProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const { toggleRightDrawer } = useDrawerStore();
    const toggleDrawerState = () => {
        toggleRightDrawer();
    };

    return (
        <>
            <Stack spacing={2} sx={{ p: 1 }}>
                <InfoGalleryHeader {...props} />
                {props.children}
            </Stack>
            <ActionFab
                action={toggleDrawerState}
                icon={<TuneIcon />}
                tooltip="Open filters"
                tooltipArrow="left"
            />
        </>
    );
}
