"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Component imports
import NavBar from "@/components/NavBar";
import NavBarBottom from "@/components/NavBar/NavBarBottom";

// MUI imports
import Box from "@mui/material/Box";

// Helper imports
import { GameContext } from "@/context";
import { games } from "@/data/games";

// Type imports
import { Game } from "@/types";

export default function RouteShell({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const pathSplit = pathname.split("/");
    const gameTag = pathSplit[1] as Game;

    useEffect(() => {
        const image = document.getElementById("background-image--1");
        image?.classList.remove("inactive");
        image?.classList.add("active");
        const anchor = document.querySelector("#back-to-top-anchor");
        if (anchor) {
            anchor.scrollIntoView({
                block: "center",
            });
        } else {
            window.scroll(0, 0);
        }
    }, [pathname]);

    return (
        <GameContext value={games[gameTag]}>
            <NavBar />
            <Box sx={{ display: "flex" }}>
                <Box
                    sx={{
                        position: "relative",
                        minWidth: "0vw",
                        width: "100vw",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            minHeight: "100vh",
                            mb: pathname === "/" ? 4 : 0,
                        }}
                    >
                        {children}
                    </Box>
                    {pathname === "/" && <NavBarBottom />}
                </Box>
            </Box>
        </GameContext>
    );
}
