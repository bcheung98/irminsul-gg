"use client";

import { useContext, useState } from "react";
import { usePathname } from "next/navigation";

// Component imports
import IrminsulLogo from "../IrminsulLogo";
import GamesMenu from "../GamesMenu";
import FlexBox from "@/components/FlexBox";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import NavDrawer from "../NavDrawer";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

// Helper imports
import { WebsiteContext } from "@/app/context";
import { navBarStyles } from "./NavBar.styles";

export default function NavBarDesktop() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));

    const pathname = usePathname();
    const websites = useContext(WebsiteContext);

    const currentGame = pathname.split("/")[1];
    const currentWebsite = websites.find(
        (website) => website.tag.toLocaleLowerCase() === currentGame
    );

    const tags: string[] = [];
    websites.forEach(
        (website) =>
            website.enabled && tags.push(website.tag.toLocaleLowerCase())
    );

    const [drawerOpen, setDrawerOpen] = useState(matches);
    const toggleDrawerState = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawerStyles = navBarStyles({ drawerOpen });

    const render = tags.length > 0 && tags.includes(currentGame);

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
                {render && (
                    <Toolbar
                        variant="dense"
                        sx={{
                            borderTop: `1px solid ${theme.border.color.primary}`,
                            backgroundColor: theme.appbar.backgroundColor.main,
                            backdropFilter: "blur(4px)",
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
                        {currentWebsite && (
                            <Breadcrumbs
                                website={currentWebsite}
                                pathname={pathname}
                            />
                        )}
                    </Toolbar>
                )}
            </AppBar>
            {render && <NavDrawer open={drawerOpen} />}
        </>
    );
}
