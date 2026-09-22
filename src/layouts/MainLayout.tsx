"use client";

import { useEffect, Suspense } from "react";

// Component imports
import MainShell from "./MainShell";
import ActionFab from "@/components/ActionFab";
import Loader from "@/components/Loader";
import LoaderGlobal from "@/components/Loader/LoaderGlobal";

// MUI imports
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// Helper imports
import getTheme from "@/themes/theme";
import { GameListContext } from "@/context";
import { games } from "@/data/games";
import { useSettingsStore } from "@/stores/useSettingsStore";

// Type imports
import type { GameInfo } from "@/types";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useEffect(() => {
        console.info(
            `MKCLXYKCM\nOZBLLCZAN\nBFIKCLELC\nCDMNXLQZZ\nGILFCQOGI\nWXTDQWLBL\nSZIBIWIVC\nFWLLGCWAL`,
        );
    }, []);

    const scrollToTop = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector("#back-to-top-anchor");

        if (anchor) {
            anchor.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };
    const websites = Object.values(games) as GameInfo[];

    const hydrated = useSettingsStore((state) => state._hasHydrated);
    const themeIndex = useSettingsStore((state) => state.theme);

    useEffect(() => {
        useSettingsStore.persist.rehydrate();
    }, []);

    if (!hydrated) {
        return <LoaderGlobal />;
    }

    const theme = getTheme(themeIndex);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Toolbar variant="dense" id="back-to-top-anchor" />
            <img
                id="background-image--1"
                className="background-image active"
                src={theme.backgroundImage.imgURL}
                style={{
                    filter: theme.backgroundImage.filter,
                }}
            />
            <GameListContext value={websites}>
                <Suspense fallback={<Loader />}>
                    <MainShell>{children}</MainShell>
                </Suspense>
            </GameListContext>
            <ActionFab
                position={{
                    bottom: { xs: 60, lg: 30 },
                    left: { xs: undefined, md: 18 },
                    right: { xs: 18, md: undefined },
                }}
                action={scrollToTop}
                color={theme.palette.info.main}
                icon={<KeyboardArrowUpIcon />}
                tooltip="Scroll to top"
                tooltipArrow="right"
                zIndex={theme.zIndex.drawer + 1}
            />
        </ThemeProvider>
    );
}
