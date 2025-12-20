"use client";

import "./NavBar.css";

import { usePathname } from "next/navigation";

// Component imports
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";

// MUI imports
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";

// Helper imports
import { useGame } from "@/context";

export default function NavBarBottom() {
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

    console.log(
        `MKCLXYKCM\nOZBLLCZAN\nBFIKCLELC\nCDMNXLQZZ\nGILFCQOGI\nWXTDQWLBL\nSZIBIWIVC\nFWLLGCWAL`
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
                    width: pathname !== "/" ? "95%" : "75%",
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
                <div>
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
                </div>
            </Toolbar>
        </AppBar>
    );
}
