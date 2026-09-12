import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Component imports
import FlexBox from "@/components/FlexBox";
import NavDrawer from "@/components/NavDrawer";
import GamesMenu from "@/components/GamesMenu";
import GamesMenuList from "@/components/GamesMenu/GamesMenuList";
import DiscordButton from "@/components/DiscordButton";
import KofiButton from "@/components/KofiButton";
import Text from "@/components/Text";
import ToggleButtons from "@/components/ToggleButtons";

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
import { useSettingsStore } from "@/stores";
import { staticNavItems } from "@/data/navItems";

// Type imports
import { MenuSide } from "@/types";

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
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"));

    const game = useGame();

    const pathname = usePathname();

    const { mobileMenuSide, setMobileMenuSide } = useSettingsStore();

    const [menuSide, setMenuSide] = useState<MenuSide>(mobileMenuSide);

    const handleMenuSide = (value: MenuSide) => {
        setMenuSide(value);
        setMobileMenuSide(value);
    };

    useEffect(() => {
        toggleDrawer(false);
    }, [pathname]);

    return (
        <Drawer
            open={open}
            onClose={handleDrawerClose}
            anchor={matches_up_sm ? "left" : mobileMenuSide}
            sx={{
                zIndex: theme.zIndex.drawer,
                boxSizing: "content-box",
                "& .MuiDrawer-paper": {
                    maxWidth: { sm: "300px" },
                    py: 5,
                    borderRight: {
                        xs: 0,
                        sm: `1px solid ${theme.border.color.primary}`,
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
                {!matches_up_md && (
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
                        <FlexBox
                            sx={{
                                display: { xs: "flex", sm: "none" },
                                px: 2,
                                pt: 2,
                            }}
                        >
                            <Stack spacing={1.5}>
                                <Text variant="body2" weight="highlight">
                                    Menu Side
                                </Text>
                                <ToggleButtons
                                    buttons={[
                                        { value: "left", label: "Left" },
                                        { value: "right", label: "Right" },
                                    ]}
                                    value={menuSide}
                                    exclusive
                                    onChange={(
                                        _: React.BaseSyntheticEvent,
                                        newValue: MenuSide,
                                    ) => {
                                        if (newValue !== null) {
                                            handleMenuSide(newValue);
                                        }
                                    }}
                                    spacing={0}
                                    padding="6px 16px"
                                    highlightOnHover={false}
                                />
                            </Stack>
                        </FlexBox>
                    </>
                )}
            </Stack>
            <Toolbar variant="dense" />
        </Drawer>
    );
}
