import { useState } from "react";

// Component imports
import NavBarMiniRoot from "./NavBarMiniRoot";
import NavDrawer from "@/components/NavDrawer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FlexBox from "@/components/FlexBox";

// MUI imports
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

// Helper imports
import { useGame } from "@/app/context";
import { navBarMiniStyles } from "./NavBarMini.styles";

export default function NavBarMiniDesktop() {
    const game = useGame();

    const [drawerOpen, setDrawerOpen] = useState(true);
    const toggleDrawerState = () => {
        setDrawerOpen(!drawerOpen);
    };

    const styles = navBarMiniStyles(drawerOpen);

    return (
        <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <AppBar sx={styles.root()}>
                <NavBarMiniRoot>
                    <FlexBox spacing={4}>
                        <IconButton
                            onClick={toggleDrawerState}
                            sx={styles.menuButton()}
                        >
                            <MenuOpenIcon sx={styles.menuIcon()} />
                        </IconButton>
                        {game && <Breadcrumbs website={game} />}
                    </FlexBox>
                </NavBarMiniRoot>
            </AppBar>
            <NavDrawer open={drawerOpen} />
        </Box>
    );
}
