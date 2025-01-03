// Component imports
import Logo from "./Logo";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { AppBar, Toolbar, Box } from "@mui/material";

function Nav() {
    return (
        <AppBar position="fixed">
            <Toolbar
                disableGutters
                sx={{ justifyContent: { xs: "center", md: "space-between" } }}
            >
                <FlexBox>
                    <Box
                        sx={{
                            display: { xs: "none", md: "block" },
                            width: "64px",
                        }}
                    />
                    <Logo />
                </FlexBox>
            </Toolbar>
        </AppBar>
    );
}

export default Nav;
