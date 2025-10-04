// Component imports
import IrminsulLogo from "../IrminsulLogo";
import GamesMenu from "../GamesMenu";
import FlexBox from "@/components/FlexBox";

// MUI imports
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export default function NavBarDesktop() {
    return (
        <AppBar position="fixed">
            <Toolbar
                variant="dense"
                sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
                <FlexBox spacing={2}>
                    <IrminsulLogo />
                    <GamesMenu />
                </FlexBox>
            </Toolbar>
        </AppBar>
    );
}
