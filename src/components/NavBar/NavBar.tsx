// Component imports
import IrminsulLogo from "@/components/IrminsulLogo";
import GamesMenu from "@/components/GamesMenu";
import DiscordButton from "@/components/DiscordButton";
import KofiButton from "@/components/KofiButton";
import SiteSearch from "@/components/SiteSearch";
import Settings from "@/components/Settings";
import FlexBox from "@/components/FlexBox";
import NavButton from "@/components/NavButton";
import NavLink from "@/components/NavLink";
import Text from "@/components/Text";

// MUI imports
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// Helper imports
import { useGameTag } from "@/context";

export default function NavBar() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const game = useGameTag();

    return (
        <AppBar
            position="fixed"
            sx={{
                containerType: "inline-size",
                zIndex: theme.zIndex.drawer + 1,
                backdropFilter: { sm: "none", lg: "blur(4px)" },
                backgroundColor: {
                    xs: theme.appbar.backgroundColor.main,
                    lg: alpha(theme.appbar.backgroundColor.main, 0.95),
                },
            }}
        >
            <Toolbar
                variant="dense"
                disableGutters
                sx={{
                    alignItems: "center",
                    justifyContent: { xs: "space-between", sm: "left" },
                    px: 2,
                    gap: 2,
                }}
            >
                <FlexBox spacing={2}>
                    <IrminsulLogo />
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ display: { xs: "none", sm: "block" }, my: "4px" }}
                    />
                </FlexBox>
                <FlexBox
                    spacing={1}
                    sx={{
                        width: "100%",
                        justifyContent: { xs: "right", sm: "space-between" },
                    }}
                >
                    <FlexBox spacing={1}>
                        <GamesMenu />
                        {matches && (
                            <NavLink href="/calendar">
                                <Button
                                    variant="text"
                                    sx={{
                                        display: { xs: "none", md: "flex" },
                                        transition: "color 0.25s",
                                        "&:hover": {
                                            color: theme.text.selected,
                                            textShadow: ` ${theme.text.selected} 1px 1px 8px`,
                                        },
                                    }}
                                >
                                    <Text
                                        variant="body2"
                                        sx={{ color: "inherit" }}
                                    >
                                        Calendar
                                    </Text>
                                </Button>
                            </NavLink>
                        )}
                        <NavButton
                            title="Calendar"
                            href="/calendar"
                            sx={{ display: { xs: "flex", md: "none" } }}
                        >
                            <CalendarMonthIcon />
                        </NavButton>
                    </FlexBox>
                    <FlexBox spacing={{ xs: 1, md: 3 }}>
                        <FlexBox
                            spacing={2}
                            sx={{ display: { xs: "none", md: "flex" } }}
                        >
                            <DiscordButton />
                            <KofiButton />
                        </FlexBox>
                        {game && <SiteSearch />}
                        <Settings />
                    </FlexBox>
                </FlexBox>
            </Toolbar>
        </AppBar>
    );
}
