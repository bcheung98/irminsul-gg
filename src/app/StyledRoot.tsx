"use client";

import useSWR from "swr";
import { usePathname } from "next/navigation";

// Component imports
import StoreProvider from "./StoreProvider";
import NavBar from "@/components/NavBar";
import NavBarBottom from "@/components/NavBar/NavBarBottom";

// MUI imports
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

// Helper imports
import { GameListContext, DataContext, GameContext } from "@/app/context";
import getTheme from "@/themes/theme";
import { urls } from "@/lib/fetchData";
import { games } from "@/data/games";

// Type imports
import { Game, GameInfo } from "@/types";

export default function StyledRoot({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const theme = getTheme(0);

    const pathname = usePathname();
    const pathSplit = pathname.split("/");
    const gameTag = pathSplit[1];
    const url = pathSplit.slice(1, 3).join("/");

    function getCurrentData() {
        const { data, error, isLoading } = useSWR(urls[url], (url: string) =>
            fetch(url).then((r) => r.json())
        );

        let currentData: any[] = [];
        if (!isLoading && !error) {
            currentData = data;
        }
        return { data: currentData, dataStatus: isLoading };
    }

    const websites = Object.values(games).map((game) => game) as GameInfo[];
    const { data } = getCurrentData();

    return (
        <StoreProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Toolbar variant="dense" id="back-to-top-anchor" />
                <img src={theme.backgroundImageURL} id="background-image" />
                <GameListContext value={websites}>
                    <GameContext value={games[gameTag as Game]}>
                        <DataContext value={data}>
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
                                        }}
                                    >
                                        {children}
                                    </Box>
                                    {pathname === "/" && <NavBarBottom />}
                                </Box>
                            </Box>
                        </DataContext>
                    </GameContext>
                </GameListContext>
            </ThemeProvider>
        </StoreProvider>
    );
}
