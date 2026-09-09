import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Component imports
import FlexBox from "@/components/FlexBox";
import NavDrawer from "@/components/NavDrawer";
import GamesMenu from "@/components/GamesMenu";
import GamesMenuList from "@/components/GamesMenu/GamesMenuList";
import DiscordButton from "@/components/DiscordButton";
import KofiButton from "@/components/KofiButton";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useGame } from "@/context";
import { staticNavItems } from "@/data/navItems";

export default function NavDrawerMobile({
    open,
    toggleDrawer,
    handleDrawerClose,
}: {
    open: boolean;
    toggleDrawer: (newOpen: boolean) => () => void;
    handleDrawerClose: () => void;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const game = useGame();

    const pathname = usePathname();

    useEffect(() => {
        toggleDrawer(false);
    }, [pathname]);

    return (
        <Drawer
            open={open}
            onClose={handleDrawerClose}
            anchor={matches ? "left" : "right"}
            sx={{
                zIndex: theme.zIndex.drawer,
                boxSizing: "content-box",
                "& .MuiDrawer-paper": {
                    maxWidth: { xs: "400px", md: "300px" },
                    py: 5,
                    borderLeft: {
                        xs: `1px solid ${theme.border.color.primary}`,
                        md: 0,
                    },
                    borderRight: {
                        xs: 0,
                        md: `1px solid ${theme.border.color.primary}`,
                    },
                    backgroundColor: theme.drawer.backgroundColor.main,
                },
            }}
        >
            <Toolbar variant="dense" />
            <Stack
                spacing={1}
                divider={<Divider />}
                sx={{ maxHeight: "100%", overflowY: "auto", pb: 5 }}
            >
                <Box sx={{ pt: 1 }}>
                    <Box sx={{ px: 1 }}>
                        {game ? (
                            <GamesMenu />
                        ) : (
                            <GamesMenuList handleClose={handleDrawerClose} />
                        )}
                    </Box>
                    {game && (
                        <NavDrawer open={open} onClose={handleDrawerClose} />
                    )}
                </Box>
                {!matches && (
                    <>
                        <FlexBox sx={{ display: { xs: "flex", sm: "none" } }}>
                            <NavDrawer
                                open={open}
                                items={staticNavItems}
                                onClose={handleDrawerClose}
                            />
                        </FlexBox>
                        <FlexBox
                            spacing={2}
                            sx={{
                                display: { xs: "flex", sm: "none" },
                                px: 2,
                                pt: 1,
                            }}
                        >
                            <DiscordButton />
                            <KofiButton />
                        </FlexBox>
                    </>
                )}
            </Stack>
            <Toolbar variant="dense" />
        </Drawer>
    );
}
