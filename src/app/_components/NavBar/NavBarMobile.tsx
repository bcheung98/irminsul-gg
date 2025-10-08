// Component imports
import IrminsulLogo from "../IrminsulLogo";
import GamesMenu from "../GamesMenu";
import FlexBox from "@/components/FlexBox";

// MUI imports
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export default function NavBarMobile() {
    return (
        <AppBar position="fixed" sx={{ containerType: "inline-size" }}>
            <Toolbar
                variant="dense"
                sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
                <IrminsulLogo />
                <GamesMenu />
            </Toolbar>
        </AppBar>
    );
}
