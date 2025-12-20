// Component imports
import Text from "@/components/Text";
import CloseButton from "@/components/CloseButton";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";

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
                <Text sx={{ fontWeight: theme.font.weight.highlight }}>
                    Filters
                </Text>
                <CloseButton
                    onClick={toggleDrawer}
                    textColor={theme.drawer.color.primary}
                    hoverColor={theme.drawer.backgroundColor.hover}
                />
            </Toolbar>
            {component || null}
        </Stack>
    );
}
