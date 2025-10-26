// Component imports
import IrminsulLogo from "@/components/IrminsulLogo";
import GamesMenu from "@/components/GamesMenu";
import SiteSearch from "@/components/SiteSearch";
import Settings from "@/components/Settings";
import FlexBox from "@/components/FlexBox";
import NavButton from "@/components/NavButton";

// MUI imports
import { alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// Helper imports
import { useGameTag } from "@/context";

export default function NavBar() {
    const game = useGameTag();

    return (
        <AppBar
            position="fixed"
            sx={(theme) => ({
                containerType: "inline-size",
                zIndex: theme.zIndex.drawer + 1,
                backdropFilter: { sm: "none", lg: "blur(4px)" },
                backgroundColor: {
                    xs: theme.appbar.backgroundColor.main,
                    lg: alpha(theme.appbar.backgroundColor.main, 0.95),
                },
            })}
        >
            <Toolbar
                variant="dense"
                sx={{
                    alignItems: "center",
                    justifyContent: { xs: "space-between", sm: "left" },
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
                    spacing={{ xs: 1, sm: 2 }}
                    sx={{
                        width: "100%",
                        justifyContent: { xs: "right", sm: "space-between" },
                    }}
                >
                    <FlexBox spacing={2}>
                        <GamesMenu />
                        <NavButton title="Calendar" href="/calendar">
                            <CalendarMonthIcon />
                        </NavButton>
                    </FlexBox>
                    <FlexBox spacing={{ xs: 0, sm: 2, lg: 4 }}>
                        {game && <SiteSearch />}
                        <Settings />
                    </FlexBox>
                </FlexBox>
            </Toolbar>
        </AppBar>
    );
}
