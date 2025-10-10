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
import getTheme from "@/themes/theme";
import { urls } from "@/lib/fetchData";
import { WebsiteContext, DataContext } from "@/app/context";

// Type imports
import { Website } from "@/types/website";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function StyledRoot({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const theme = getTheme("Dark");

    const pathname = usePathname().split("/").slice(1, 3).join("/");

    function getWebsites() {
        const { data, error, isLoading } = useSWR(
            "https://api.irminsul.gg/main/websites.json",
            fetcher
        );

        const websites: Website[] = [];
        if (!isLoading && !error) {
            data.forEach((website: Website) => {
                website.enabled && websites.push(website);
            });
        }
        return websites;
    }

    function getCurrentData() {
        const { data, error, isLoading } = useSWR(urls[pathname], fetcher);

        let currentData: any[] = [];
        if (!isLoading && !error) {
            currentData = data;
        }
        return currentData;
    }

    const websites = getWebsites();
    const data = getCurrentData();

    const background = `linear-gradient(to bottom, ${theme.backgroundImageColors[0]} 10%, ${theme.backgroundImageColors[1]} 50%, ${theme.backgroundImageColors[0]} 100%)`;
    const backgroundImage = `linear-gradient(to bottom, ${theme.backgroundImageColors[0]} 10%, ${theme.backgroundImageColors[1]} 50%, ${theme.backgroundImageColors[0]} 100%), url(${theme.backgroundImageURL})`;

    return (
        <StoreProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box id="back-to-top-anchor" />
                <Toolbar variant="dense" />
                <Box
                    sx={{
                        display: "flex",
                        backgroundColor: theme.background(0),
                        backgroundImage: {
                            xs: background,
                            sm: backgroundImage,
                        },
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "50% 25%",
                        backgroundAttachment: "fixed",
                    }}
                >
                    <WebsiteContext value={websites}>
                        <DataContext value={data}>
                            <NavBar />
                            <Box
                                sx={{
                                    minWidth: "0vw",
                                    width: "100vw",
                                    backgroundColor: background,
                                }}
                            >
                                <Box
                                    sx={{
                                        minHeight: "100vh",
                                        width: "100%",
                                        mx: "auto",
                                    }}
                                >
                                    {children}
                                </Box>
                                <NavBarBottom />
                            </Box>
                        </DataContext>
                    </WebsiteContext>
                </Box>
            </ThemeProvider>
        </StoreProvider>
    );
}
