"use client";

import { useState } from "react";

// Component imports
import IrminsulLogo from "../IrminsulLogo";
import GamesMenu from "../GamesMenu";
import FlexBox from "@/components/FlexBox";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import NavDrawer from "../NavDrawer";

// MUI imports
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

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

    const drawerStyles = navBarStyles({ drawerOpen });

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backdropFilter: "blur(4px)",
                    zIndex: theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar
                    variant="dense"
                    sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <FlexBox spacing={2}>
                        <IrminsulLogo />
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ my: "4px" }}
                        />
                        <GamesMenu />
                    </FlexBox>
                </Toolbar>
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
                            disableRipple
                            disableTouchRipple
                            sx={drawerStyles.menuButton()}
                        >
                            <MenuIcon sx={drawerStyles.menuIcon()} />
                        </IconButton>
                        {game && <Breadcrumbs website={game} />}
                    </Toolbar>
                )}
            </AppBar>
            {game && <NavDrawer open={drawerOpen} />}
        </>
    );
}
