"use client";

import { Rowdies } from "next/font/google";
import { createTheme } from "@mui/material";
import { getThemeBackgroundColors } from "@/helpers/styles";
import { Shade } from "@/types/theme";

const font = Rowdies({
    weight: ["300", "400", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-rowdies",
});

const backgroundColors = [
    {
        light: "rgb(42, 66, 106)",
        main: "rgb(32, 56, 96)",
        dark: "rgb(22, 46, 86)",
    },
    {
        light: "rgb(10, 42, 82)",
        main: "rgb(8, 32, 72)",
        dark: "rgb(6, 22, 62)",
    },
    {
        light: "rgb(0, 21, 42)",
        main: "rgb(0, 16, 32)",
        dark: "rgb(0, 11, 22)",
    },
];

export const darkThemeData = {
    name: "Dark",
    background: (index: number, shade?: Shade) =>
        getThemeBackgroundColors({ colors: backgroundColors, index, shade }),
    typography: {
        fontFamily: font.style.fontFamily,
    },
};

export const darkTheme = createTheme(darkThemeData);
