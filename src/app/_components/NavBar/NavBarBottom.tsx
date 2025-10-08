"use client";

import { useContext } from "react";
import { usePathname } from "next/navigation";

// Component imports
import Text from "@/components/Text";

// MUI imports
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

// Helper imports
import { WebsiteContext } from "@/app/context";

export default function NavBarBottom() {
    const websites = useContext(WebsiteContext);
    const pathname = usePathname().split("/").slice(1)[0];

    let text1 = "";
    let text2 = "";

    const tags: string[] = [];
    websites.forEach(
        (website) =>
            website.enabled && tags.push(website.tag.toLocaleLowerCase())
    );

    if (tags.length > 0 && tags.includes(pathname)) {
        text1 = text2 = websites.find(
            (website) => website.tag.toLocaleLowerCase() === pathname
        )!.dev;
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
                sx={{
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "8px",
                    py: "8px",
                    width: {
                        xs: "100%",
                        lg: "75%",
                    },
                    mx: "auto",
                }}
            >
                {tags.length > 0 && <Text variant="body2">{navText}</Text>}
            </Toolbar>
        </AppBar>
    );
}
