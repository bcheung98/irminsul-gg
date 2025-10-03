"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import getTheme from "@/themes/theme";

export default function StyledRoot({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const theme = getTheme("Dark");

    return (
        <ThemeProvider theme={theme} defaultMode="dark">
            <CssBaseline enableColorScheme />
            {children}
        </ThemeProvider>
    );
}
