"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import getTheme from "@/themes/theme";
import StoreProvider from "./StoreProvider";
import NavBar from "./components/NavBar";

export default function StyledRoot({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const theme = getTheme("Dark");

    return (
        <StoreProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <NavBar />
                {children}
            </ThemeProvider>
        </StoreProvider>
    );
}
