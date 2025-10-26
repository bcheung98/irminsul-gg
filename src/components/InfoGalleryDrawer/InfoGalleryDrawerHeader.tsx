// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// Type imports
import { InfoGalleryDrawerProps } from "./InfoGalleryDrawer.types";

export default function InfoGalleryDrawerHeader({
    component,
    toggleDrawer,
}: InfoGalleryDrawerProps) {
    const theme = useTheme();

    return (
        <Box sx={{ pt: { sm: 8, lg: 10 } }}>
            <Toolbar sx={{ justifyContent: "right" }}>
                <IconButton
                    onClick={toggleDrawer}
                    sx={{
                        color: theme.drawer.color.primary,
                        p: 0.5,
                        "&:hover": {
                            backgroundColor: theme.drawer.backgroundColor.hover,
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            {component || null}
        </Box>
    );
}
