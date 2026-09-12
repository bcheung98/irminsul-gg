"use client";

import "./NavBar.css";

// Component imports
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import NavLink from "@/components/NavLink";
import { AppStatus, DataStatus } from "@/components/StatusIndicator";

// MUI imports
import { useTheme } from "@mui/material/styles";
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

    const game = useGame();

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
                    pt: 1,
                    pb: 3,
                    width: { xs: "95%", md: "100%" },
                    mx: "auto",
                }}
            >
                <Stack spacing={1} divider={<Divider />} sx={{ width: "100%" }}>
                    <FlexBox
                        wrap
                        sx={{
                            justifyContent: "space-between",
                            gap: 1,
                        }}
                    >
                        <Text
                            variant="body2"
                            weight="highlight"
                            sx={{
                                userSelect: "none",
                                borderBottom: {
                                    xs: `1px solid ${theme.border.color.primary}`,
                                    md: 0,
                                },
                                pb: { xs: 2, md: 0 },
                                pr: { xs: 0, sm: 4, md: 0 },
                                width: { xs: "100%", md: "auto" },
                            }}
                        >
                            {navText}
                        </Text>
                        <Stack spacing={1} divider={<Divider />}>
                            <FlexBox spacing={2}>
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
                        </Stack>
                    </FlexBox>
                    <FlexBox
                        wrap
                        sx={{
                            justifyContent: "space-between",
                            pt: { xs: 1, md: 0.5 },
                            pr: 0.5,
                            gap: [2, 1],
                        }}
                    >
                        <FlexBox
                            sx={{
                                justifyContent: { xs: "left", md: "right" },
                                gap: 2,
                            }}
                        >
                            <AppStatus />
                            <DataStatus />
                        </FlexBox>
                        <FlexBox
                            sx={{
                                alignItems: "baseline",
                                justifyContent: { xs: "left", md: "right" },
                                gap: 4,
                            }}
                        >
                            <Text
                                variant="body3"
                                weight="highlight"
                                sx={{
                                    color: theme.text.description,
                                    userSelect: "none",
                                }}
                            >
                                {`© ${new Date().getFullYear()}`}
                            </Text>
                            <TextLink href="/blog">Blog</TextLink>
                            <TextLink href="/privacy-policy">
                                Privacy Policy
                            </TextLink>
                            <TextLink href="/site-map">Sitemap</TextLink>
                        </FlexBox>
                    </FlexBox>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

function TextLink({
    children,
    href,
}: {
    children: React.ReactNode;
    href: string;
}) {
    return (
        <Text
            variant="subtitle2"
            weight="highlight"
            sx={(theme) => ({
                "&:hover": {
                    color: theme.text.selected,
                    textDecoration: "underline",
                    cursor: "pointer",
                },
            })}
        >
            <NavLink href={href}>{children}</NavLink>
        </Text>
    );
}
