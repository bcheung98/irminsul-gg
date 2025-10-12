"use client";

import useSWR from "swr";
import { usePathname } from "next/navigation";

// Component imports
import StoreProvider from "./StoreProvider";
import Image from "@/components/Image";
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
        return { websites, websiteStatus: isLoading };
    }

    function getCurrentData() {
        const { data, error, isLoading } = useSWR(urls[pathname], fetcher);

        let currentData: any[] = [];
        if (!isLoading && !error) {
            currentData = data;
        }
        return { data: currentData, dataStatus: isLoading };
    }

    const { websites } = getWebsites();
    const { data } = getCurrentData();

    return (
        <StoreProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Toolbar variant="dense" id="back-to-top-anchor" />
                <Image src={theme.backgroundImageURL} id="background-image" />
                <Box sx={{ display: "flex" }}>
                    <WebsiteContext value={websites}>
                        <DataContext value={data}>
                            <NavBar />
                            <Box sx={{ position: "relative", width: "100vw" }}>
                                <Box sx={{ minHeight: "100vh" }}>
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
