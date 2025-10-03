"use client";

import { createTheme } from "@mui/material/styles";
import { darkTheme } from "./darkTheme";

export const themeList = [
    { name: "Dark", label: "Default", data: darkTheme },
] as const;

export const themeNames = themeList.map((t) => t.name);

export default function getTheme(name: string) {
    let theme =
        themeList[themeList.findIndex((theme) => theme.name === name)].data;
        
    const baseThemeData = {
        palette: {
            background: {
                default: theme.background(0),
                paper: theme.background(1),
            },
            mode: "dark",
        },
    };

    return createTheme(theme, baseThemeData);
}
