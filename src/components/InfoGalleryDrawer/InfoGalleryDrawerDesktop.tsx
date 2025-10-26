// Component imports
import InfoGalleryDrawerRoot from "./InfoGalleryDrawerRoot";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import InfoGalleryDrawerHeader from "./InfoGalleryDrawerHeader";

// Type imports
import { InfoGalleryDrawerProps } from "./InfoGalleryDrawer.types";

const width = 360; // px

export default function InfoGalleryDrawerDesktop({
    open,
    component,
    toggleDrawer,
}: InfoGalleryDrawerProps) {
    const theme = useTheme();

    return (
        <InfoGalleryDrawerRoot
            variant="permanent"
            anchor="right"
            open={open}
            onClose={toggleDrawer}
            sx={{
                display: component ? "block" : "none",
                width: open ? width : 0,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    mr: open ? 0 : "-1px",
                    width: open ? width : 0,
                    borderLeft: `1px solid ${theme.border.color.primary}`,
                    backgroundColor: theme.drawer.backgroundColor.main,
                },
            }}
        >
            <InfoGalleryDrawerHeader
                toggleDrawer={toggleDrawer}
                component={component}
            />
        </InfoGalleryDrawerRoot>
    );
}
