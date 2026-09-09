"use client";

// Component imports
import NavDrawerRoot from "./NavDrawerRoot";
import NavDrawerMenu from "./NavDrawerMenu";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Toolbar from "@mui/material/Toolbar";

// Helper imports
import { useGameTag } from "@/context";
import { NavItem, navItems } from "@/data/navItems";

export interface NavDrawerProps {
    open?: boolean;
    onClose?: () => void;
    items?: NavItem[];
}

export default function NavDrawer({ open, onClose, items }: NavDrawerProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));

    const game = useGameTag();
    const navList = items ?? navItems[game] ?? [];

    const DrawerMenu = (
        <NavDrawerMenu open={open} onClose={onClose} items={navList} />
    );

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
