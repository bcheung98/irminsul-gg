import { useState } from "react";

// Component imports
import NavBarMiniRoot from "./NavBarMiniRoot";
import NavDrawer from "@/components/NavDrawer";
import Breadcrumbs from "@/components/Breadcrumbs";
import MenuCloseIcon from "@/components/MenuCloseIcon";

// MUI imports
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import AppBar from "@mui/material/AppBar";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

// Helper imports
import { useGame } from "@/app/context";
import { navBarMiniStyles } from "./NavBarMini.styles";

export default function NavBarMiniMobile() {
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

    const styles = navBarMiniStyles();

    return (
        <Box sx={{ display: { xs: "block", lg: "none" } }}>
            <AppBar sx={styles.root()}>
                <NavBarMiniRoot onKeyDown={handleMenuKeyDown}>
                    {game && <Breadcrumbs website={game} />}
                    <IconButton onClick={toggleMenuState}>
                        <MenuCloseIcon open={menuOpen} />
                    </IconButton>
                </NavBarMiniRoot>
                <Collapse
                    in={menuOpen}
                    timeout="auto"
                    onClick={handleMenuClose}
                    sx={(theme) => ({
                        borderTop: `1px solid ${theme.border.color.secondary}`,
                        maxHeight: "50vh",
                        overflowY: "auto !important",
                    })}
                >
                    <NavDrawer open={menuOpen} />
                </Collapse>
            </AppBar>
            <Backdrop
                open={menuOpen}
                onClick={handleMenuClose}
                sx={(theme) => ({
                    zIndex: theme.zIndex.drawer,
                })}
            />
        </Box>
    );
}
