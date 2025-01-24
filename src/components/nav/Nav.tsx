// Component imports
import Logo from "./Logo";
import KofiButton from "components/KofiButton";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, useMediaQuery, AppBar, Toolbar, Box } from "@mui/material";

function Nav() {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <AppBar position="fixed">
            <Toolbar
                disableGutters
                sx={{
                    pr: { xs: 0, sm: "32px" },
                    justifyContent: { xs: "center", sm: "space-between" },
                }}
            >
                <FlexBox>
                    <Box
                        sx={{
                            display: { xs: "none", sm: "block" },
                            width: "64px",
                        }}
                    />
                    <Logo />
                </FlexBox>
                {matches_sm_up && <KofiButton />}
            </Toolbar>
        </AppBar>
    );
}

export default Nav;
