// Component imports
import IrminsulLogo from "@/components/IrminsulLogo";
import GamesMenu from "@/components/GamesMenu";
import Settings from "../Settings/Settings";
import FlexBox from "@/components/FlexBox";
import NavButton from "@/components/NavButton";

// MUI imports
import { alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function NavBar() {
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
                    spacing={2}
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
                    <Settings />
                </FlexBox>
            </Toolbar>
        </AppBar>
    );
}
