// Component imports
import FilterDrawerRoot from "./FilterDrawerRoot";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import FilterDrawerHeader from "./FilterDrawerHeader";

// Type imports
import { FilterDrawerProps } from "./FilterDrawer.types";

const width = 360; // px

export default function FilterDrawerDesktop({
    open,
    component,
    toggleDrawer,
}: FilterDrawerProps) {
    const theme = useTheme();

    return (
        <FilterDrawerRoot
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
            <FilterDrawerHeader
                toggleDrawer={toggleDrawer}
                component={component}
            />
        </FilterDrawerRoot>
    );
}
