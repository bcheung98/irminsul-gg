import "./globals.css";
import Script from "next/script";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import StyledRoot from "./StyledRoot";
import { getMetadata } from "@/helpers/metadata";

export const metadata = getMetadata({
    overrides: { twitter: { card: "summary_large_image" } },
});

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
                {/* Cloudflare Web Analytics */}
                {process.env.NODE_ENV === "production" && (
                    <Script
                        defer
                        src="https://static.cloudflareinsights.com/beacon.min.js"
                        data-cf-beacon='{"token": "209a87cfdab648b8974689a97c88dfb5"}'
                    />
                )}
            </body>
        </html>
    );
}
