"use client";

import "./NavBar.css";

import { usePathname } from "next/navigation";

// Component imports
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import NavLink from "@/components/NavLink";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";

// Helper imports
import { useGame } from "@/context";

export default function NavBarBottom() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const game = useGame();
    const pathname = usePathname();

    let text1 = "";
    let text2 = "";

    if (game) {
        text1 = text2 = game.dev;
    } else {
        text1 = "the developers of the games featured";
        text2 = "their respective developers";
    }

    const navText = (
        <>
            IRMINSUL.GG is not affiliated with {text1}.
            <br />
            Game contents are trademarks and copyrights of {text2}.
        </>
    );
    const iconButtonStyle = {
        px: "4px",
    };

    const svgStyle = {
        width: { xs: "22px", sm: "24px" },
        height: { xs: "22px", sm: "24px" },
    };

    const PrivacyPolicy = (
        <Text
            variant="body2"
            weight="highlight"
            sx={{
                "&:hover": {
                    color: theme.text.selected,
                    textDecoration: "underline",
                    cursor: "pointer",
                },
            }}
        >
            <NavLink href="/privacy-policy">Privacy Policy</NavLink>
        </Text>
    );

    return (
        <AppBar
            position="relative"
            elevation={0}
            sx={{ backgroundColor: "transparent", borderWidth: 0 }}
        >
            <Toolbar
                variant="dense"
                disableGutters
                sx={{
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "8px",
                    py: "8px",
                    width: pathname !== "/" ? { xs: "95%", md: "100%" } : "75%",
                    mx: "auto",
                }}
            >
                <Text
                    variant="body2"
                    weight="highlight"
                    sx={{ userSelect: "none" }}
                >
                    {navText}
                </Text>
                <Stack spacing={1} divider={<Divider />}>
                    <FlexBox spacing={2}>
                        {matches && (
                            <>
                                {PrivacyPolicy}
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{ my: "4px" }}
                                />
                            </>
                        )}
                        <FlexBox spacing={[1, 0.5]} wrap>
                            <Text
                                variant="body2"
                                weight="highlight"
                                sx={{ userSelect: "none" }}
                            >
                                GitHub:
                            </Text>
                            <IconButton
                                disableRipple
                                href={`https://github.com/bcheung98/irminsul-gg`}
                                target="_blank"
                                rel="noopener"
                                color="inherit"
                                sx={{ color: "white" }}
                                className="logo github"
                            >
                                <GitHubIcon sx={svgStyle} />
                            </IconButton>
                        </FlexBox>
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ my: "4px" }}
                        />
                        <FlexBox spacing={[1, 0.5]} wrap>
                            <Text
                                variant="body2"
                                weight="highlight"
                                sx={{ userSelect: "none" }}
                            >
                                Made with:
                            </Text>
                            <div>
                                <IconButton
                                    disableRipple
                                    href="https://nextjs.org/"
                                    target="_blank"
                                    rel="noopener"
                                    color="inherit"
                                    sx={iconButtonStyle}
                                    className="logo next"
                                >
                                    <Avatar
                                        variant="square"
                                        src="/nextjs.svg"
                                        sx={svgStyle}
                                    />
                                </IconButton>
                                <IconButton
                                    disableRipple
                                    href="https://react.dev"
                                    target="_blank"
                                    rel="noopener"
                                    color="inherit"
                                    sx={iconButtonStyle}
                                    className="logo react"
                                >
                                    <Avatar
                                        variant="square"
                                        src="/react.svg"
                                        sx={svgStyle}
                                    />
                                </IconButton>
                                <IconButton
                                    disableRipple
                                    href="https://mui.com"
                                    target="_blank"
                                    rel="noopener"
                                    color="inherit"
                                    sx={iconButtonStyle}
                                    className="logo mui"
                                >
                                    <Avatar
                                        variant="square"
                                        src="/mui.svg"
                                        alt="MUI Logo"
                                        sx={svgStyle}
                                    />
                                </IconButton>
                            </div>
                        </FlexBox>
                    </FlexBox>
                    {!matches && PrivacyPolicy}
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
