// Component imports
import IrminsulLogo from "@/components/IrminsulLogo";
import GamesMenu from "@/components/GamesMenu";
import FlexBox from "@/components/FlexBox";
import NavButton from "@/components/NavButton";

// MUI imports
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";

export default function NavBarContent() {
    return (
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
                <NavButton title="Settings" sx={{ p: 0.5 }}>
                    <SettingsIcon />
                </NavButton>
            </FlexBox>
        </Toolbar>
    );
}
