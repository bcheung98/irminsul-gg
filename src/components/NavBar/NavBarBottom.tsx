"use client";

import { usePathname } from "next/navigation";

// Component imports
import Text from "@/components/Text";

// MUI imports
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

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
                    width: pathname !== "/" ? "100%" : "75%",
                    mx: "auto",
                }}
            >
                <Text variant="body2" weight="highlight">
                    {navText}
                </Text>
            </Toolbar>
        </AppBar>
    );
}
