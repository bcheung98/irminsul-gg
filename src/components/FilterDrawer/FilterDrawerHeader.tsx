// Component imports
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// Type imports
import { FilterDrawerProps } from "./FilterDrawer.types";

export default function FilterDrawerHeader({
    component,
    toggleDrawer,
}: FilterDrawerProps) {
    const theme = useTheme();

    return (
        <Stack spacing={1} sx={{ pt: { xs: 1, sm: 9, lg: 11 }, pb: 2, px: 2 }}>
            <Toolbar
                variant="dense"
                disableGutters
                sx={{ justifyContent: "space-between", gap: 2 }}
            >
                <Text>Filters</Text>
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
        </Stack>
    );
}
