import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Component imports
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";
import NavBarMiniRoot from "./NavBarMiniRoot";
import NavDrawerMobile from "@/components/NavDrawer/NavDrawerMobile";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tooltip from "@/components/Tooltip";
import MenuCloseIcon from "@/components/MenuCloseIcon";
import GamesMenu from "@/components/GamesMenu";
import CalendarButton from "@/components/CalendarButton";
import BlogButton from "@/components/Blog/BlogButton";
import RandomButton from "@/components/RandomButton";

// MUI imports
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

// Helper imports
import { useGame } from "@/context";
import { navBarMiniStyles } from "./NavBarMini.styles";

// Type imports
import { GameInfo } from "@/types";
import { staticNavItems } from "@/data/navItems";

export default function NavBarMiniMobile() {
    const game = useGame();

    const pathname = usePathname();

    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const styles = navBarMiniStyles();

    useEffect(() => {
        toggleDrawer(false);
    }, [pathname]);

    return (
        <Box sx={{ display: { xs: "block", lg: "none" } }}>
            <AppBar sx={styles.root()}>
                <NavBarMiniRoot disableGutters>
                    <Stack sx={{ display: "flex", width: "100%" }}>
                        <Stack sx={{ height: { md: "36px" } }}>
                            <MainButtonGroup />
                            <SmallBreadcrumbBar
                                game={game}
                                open={open}
                                toggleDrawer={toggleDrawer}
                            />
                        </Stack>
                        <MediumBreadcrumbBar
                            game={game}
                            open={open}
                            toggleDrawer={toggleDrawer}
                        />
                    </Stack>
                </NavBarMiniRoot>
            </AppBar>
            <NavDrawerMobile
                open={open}
                toggleDrawer={toggleDrawer}
                handleDrawerClose={handleDrawerClose}
            />
        </Box>
    );
}

function MainButtonGroup() {
    return (
        <FlexBox
            spacing={1}
            sx={{
                display: { xs: "none", sm: "flex" },
                width: "100%",
                px: 2,
            }}
        >
            <GamesMenu />
            <CalendarButton />
            <BlogButton />
            <RandomButton />
        </FlexBox>
    );
}

function SmallBreadcrumbBar({
    game,
    open,
    toggleDrawer,
}: {
    game: GameInfo;
    open: boolean;
    toggleDrawer: (newOpen: boolean) => () => void;
}) {
    const pathname = usePathname();

    const path = pathname.split("/")[1];

    return (
        <FlexBox
            spacing={1}
            sx={{
                display: { xs: "flex", sm: "none" },
                width: "100%",
                px: 2,
                justifyContent: "space-between",
            }}
        >
            {game ? (
                <Breadcrumbs website={game} />
            ) : (
                <Text variant="subtitle1" weight="highlight" sx={{ pl: 1 }}>
                    {staticNavItems.find((item) => item.href === path)?.title ||
                        "Home"}
                </Text>
            )}
            <MenuButton open={open} toggleDrawer={toggleDrawer} />
        </FlexBox>
    );
}

function MediumBreadcrumbBar({
    game,
    open,
    toggleDrawer,
}: {
    game: GameInfo;
    open: boolean;
    toggleDrawer: (newOpen: boolean) => () => void;
}) {
    return game ? (
        <Stack
            sx={(theme) => ({
                display: { xs: "none", sm: "flex" },
                borderTop: `1px solid ${theme.border.color.primary}`,
            })}
        >
            <NavBarMiniRoot>
                <MenuButton open={open} toggleDrawer={toggleDrawer} />
                <Breadcrumbs website={game} />
            </NavBarMiniRoot>
        </Stack>
    ) : null;
}

function MenuButton({
    open,
    toggleDrawer,
}: {
    open: boolean;
    toggleDrawer: (newOpen: boolean) => () => void;
}) {
    return (
        <Tooltip
            title={!open ? "Open menu" : "Close menu"}
            sx={{
                display: { xs: "flex", sm: "none" },
            }}
        >
            <IconButton
                onClick={toggleDrawer(!open)}
                sx={(theme) => ({
                    p: 0.5,
                    mr: 0.5,
                    "&:hover": {
                        backgroundColor: theme.drawer.backgroundColor.hover,
                    },
                })}
            >
                <MenuCloseIcon open={open} targetClass="lock-scroll" />
            </IconButton>
        </Tooltip>
    );
}
