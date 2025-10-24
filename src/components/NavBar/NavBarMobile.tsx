"use client";

import { useState } from "react";

// Component imports
import Breadcrumbs from "@/components/Breadcrumbs";
import NavBarContent from "./NavBarContent";
import NavDrawer from "@/components/NavDrawer";
import MenuCloseIcon from "@/components/MenuCloseIcon";

// MUI imports
import { alpha, useTheme } from "@mui/material/styles";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

// Helper imports
import { useGame } from "@/app/context";

export default function NavBarMobile() {
    const theme = useTheme();

    const game = useGame();

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenuState = () => {
        setMenuOpen(!menuOpen);
    };
    const handleMenuClose = () => {
        setMenuOpen(false);
    };
    const handleMenuKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Escape") {
            setMenuOpen(false);
        }
    };

    return (
        <ClickAwayListener onClickAway={handleMenuClose}>
            <AppBar
                role="presentation"
                position="fixed"
                onKeyDown={handleMenuKeyDown}
                sx={{
                    containerType: "inline-size",
                    backgroundColor: alpha(
                        theme.appbar.backgroundColor.main,
                        1
                    ),
                }}
            >
                <NavBarContent />
                {game && (
                    <>
                        <Toolbar
                            variant="dense"
                            sx={{
                                width: "100vw",
                                borderTop: `1px solid ${theme.border.color.primary}`,
                                gap: "32px",
                                justifyContent: "space-between",
                            }}
                        >
                            {game && <Breadcrumbs website={game} />}
                            <IconButton onClick={toggleMenuState}>
                                <MenuCloseIcon open={menuOpen} />
                            </IconButton>
                        </Toolbar>
                        <Collapse
                            in={menuOpen}
                            timeout="auto"
                            sx={{
                                backgroundColor:
                                    theme.appbar.backgroundColor.main,
                                borderTop: `1px solid ${theme.border.color.secondary}`,
                                maxHeight: "50vh",
                                overflowY: "auto !important",
                            }}
                        >
                            <NavDrawer open={menuOpen} />
                        </Collapse>
                    </>
                )}
            </AppBar>
        </ClickAwayListener>
    );
}
