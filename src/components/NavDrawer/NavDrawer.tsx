"use client";

// Component imports
import NavDrawerRoot from "./NavDrawerRoot";
import NavDrawerMenu from "./NavDrawerMenu";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Toolbar from "@mui/material/Toolbar";
import { DrawerProps } from "@mui/material/Drawer";

// Helper imports
import { useGameTag } from "@/context";
import { navItems } from "@/data/navItems";

interface NavDrawerProps {
    open?: boolean;
    onClose?: DrawerProps["onClose"];
}

export default function NavDrawer({ open }: NavDrawerProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));

    const game = useGameTag();
    const items = navItems[game] || [];

    const DrawerMenu = <NavDrawerMenu open={open} items={items} />;

    return matches ? (
        <NavDrawerRoot
            variant="permanent"
            open={open}
            sx={{
                "& .MuiDrawer-paper": {
                    borderRight: `1px solid ${theme.border.color.primary}`,
                    backgroundColor: theme.drawer.backgroundColor.main,
                },
            }}
        >
            <Toolbar variant="dense" />
            <Toolbar variant="dense" />
            {DrawerMenu}
        </NavDrawerRoot>
    ) : (
        DrawerMenu
    );
}
