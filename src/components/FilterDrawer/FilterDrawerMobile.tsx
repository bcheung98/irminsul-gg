// Component imports
import FilterDrawerHeader from "./FilterDrawerHeader";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";

// Type imports
import { FilterDrawerProps } from "./FilterDrawer.types";

export default function FilterDrawerDesktop({
    open,
    component,
    toggleDrawer,
}: FilterDrawerProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <Drawer
            variant="temporary"
            anchor={matches ? "right" : "bottom"}
            open={open}
            onClose={toggleDrawer}
            sx={
                matches
                    ? {
                          flexShrink: 0,
                          "& .MuiDrawer-paper": {
                              width: 320,
                              borderLeft: `1px solid ${theme.border.color.primary}`,
                              backgroundColor: theme.appbar.backgroundColor,
                              py: 2.5,
                              scrollbarWidth: "none",
                          },
                      }
                    : {
                          "& .MuiDrawer-paper": {
                              borderTop: `1px solid ${theme.border.color.primary}`,
                              backgroundColor: theme.appbar.backgroundColor,
                              height: "auto",
                              maxHeight: "88%",
                          },
                      }
            }
        >
            <FilterDrawerHeader
                toggleDrawer={toggleDrawer}
                component={component}
            />
        </Drawer>
    );
}
