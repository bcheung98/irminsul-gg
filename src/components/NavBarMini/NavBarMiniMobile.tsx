import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Component imports
import NavBarMiniRoot from "./NavBarMiniRoot";
import NavDrawer from "@/components/NavDrawer";
import Breadcrumbs from "@/components/Breadcrumbs";
import MenuCloseIcon from "@/components/MenuCloseIcon";
import Tooltip from "@/components/Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import AppBar from "@mui/material/AppBar";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

// Helper imports
import { useGame } from "@/context";
import { navBarMiniStyles } from "./NavBarMini.styles";

export default function NavBarMiniMobile() {
    const theme = useTheme();

    const game = useGame();

    const pathname = usePathname();

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

    useEffect(() => {
        handleMenuClose();
    }, [pathname]);

    return (
        <Box sx={{ display: { xs: "block", lg: "none" } }}>
            <AppBar sx={styles.root()}>
                <NavBarMiniRoot onKeyDown={handleMenuKeyDown}>
                    <Tooltip title={!menuOpen ? "Open menu" : "Close menu"}>
                        <IconButton
                            onClick={toggleMenuState}
                            sx={{
                                p: 0.5,
                                mr: 0.5,
                                "&:hover": {
                                    backgroundColor:
                                        theme.drawer.backgroundColor.hover,
                                },
                            }}
                        >
                            <MenuCloseIcon
                                open={menuOpen}
                                targetClass="lock-scroll"
                            />
                        </IconButton>
                    </Tooltip>
                    {game && <Breadcrumbs website={game} />}
                </NavBarMiniRoot>
                <Collapse
                    in={menuOpen}
                    timeout="auto"
                    sx={{
                        borderTop: `1px solid ${theme.appbar.backgroundColor.selectedHover}`,
                        maxHeight: "50%",
                        overflowY: "auto",
                        scrollbarWidth: "none",
                    }}
                >
                    <NavDrawer open={menuOpen} />
                </Collapse>
            </AppBar>
            <Backdrop
                open={menuOpen}
                onClick={handleMenuClose}
                sx={{ zIndex: theme.zIndex.drawer }}
            />
        </Box>
    );
}
