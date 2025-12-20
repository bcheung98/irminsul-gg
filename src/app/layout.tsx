import "./globals.css";

import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import StyledRoot from "./StyledRoot";

export const metadata: Metadata = {
    title: {
        default: "Irminsul.GG",
        template: "%s - Irminsul.GG",
    },
    description: "A database and companion website for various gacha games.",
    referrer: "origin-when-cross-origin",
    keywords: [
        "Irminsul",
        "Irminsul.GG",
        "Irminsul GG",
        "Genshin Impact",
        "Honkai: Star Rail",
        "Zenless Zone Zero",
        "Wuthering Waves",
        "Umamusume",
    ],
    openGraph: {
        title: {
            default: "Irminsul.GG",
            template: "%s - Irminsul.GG",
        },
        description:
            "A database and companion website for various gacha games.",
        siteName: "Irminsul.GG",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <InitColorSchemeScript attribute="class" defaultMode="dark" />
                <AppRouterCacheProvider>
                    <main>
                        <StyledRoot>{children}</StyledRoot>
                    </main>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
