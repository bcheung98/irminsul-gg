"use client";

import { useState } from "react";

// Component imports
import Breadcrumbs from "@/components/Breadcrumbs";
import NavBarContent from "./NavBarContent";
import NavDrawer from "@/components/NavDrawer";

// MUI imports
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

// Helper imports
import { useGame } from "@/app/context";
import { navBarStyles } from "./NavBar.styles";

export default function NavBarDesktop() {
    const theme = useTheme();

    const game = useGame();

    const [drawerOpen, setDrawerOpen] = useState(true);
    const toggleDrawerState = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawerStyles = navBarStyles({ open: drawerOpen });

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backdropFilter: "blur(4px)",
                    zIndex: theme.zIndex.drawer + 1,
                }}
            >
                <NavBarContent />
                {game && (
                    <Toolbar
                        variant="dense"
                        sx={{
                            width: "100vw",
                            borderTop: `1px solid ${theme.border.color.primary}`,
                            gap: "32px",
                        }}
                    >
                        <IconButton
                            onClick={toggleDrawerState}
                            sx={drawerStyles.menuButton()}
                        >
                            <MenuOpenIcon sx={drawerStyles.menuIcon()} />
                        </IconButton>
                        {game && <Breadcrumbs website={game} />}
                    </Toolbar>
                )}
            </AppBar>
            {game && <NavDrawer open={drawerOpen} />}
        </>
    );
}
