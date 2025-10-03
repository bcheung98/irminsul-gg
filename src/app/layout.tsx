import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import StyledRoot from "./components/StyledRoot";

export const metadata: Metadata = {
    title: {
        default: "Irminsul.GG",
        template: "%s - Irminsul.GG",
    },
    description: "A database and companion website for various gacha games.",
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
