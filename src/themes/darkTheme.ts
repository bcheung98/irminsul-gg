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

const appbarColors = ["rgb(0, 16, 32)", "rgb(8, 32, 72)", "rgb(32, 56, 96)"];

const borderColors = {
    primary: "rgb(168, 147, 105)",
    secondary: "rgb(233, 194, 39)",
};

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
    palette: {
        background: {
            default: backgroundColors[0].main,
            paper: backgroundColors[1].main,
        },
        primary: {
            main: "rgb(0, 16, 32)",
        },
        secondary: {
            main: "rgb(8, 32, 72)",
        },
        tertiary: {
            main: "rgb(32, 56, 96)",
            light: "rgb(52, 76, 116)",
            dark: "rgb(22, 46, 86)",
        },
        info: {
            main: "rgb(25, 118, 210)",
        },
        divider: borderColors.primary,
    },
    font: {
        weight: {
            primary: 300,
            element: 300,
            highlight: 300,
        },
        sizes: {
            h4: {
                xs: 26,
                sm: 28,
            },
            h5: {
                xs: 22,
                sm: 24,
            },
            h6: {
                xs: 18,
                sm: 20,
            },
            body1: {
                xs: 14,
                sm: 16,
            },
            subtitle1: {
                xs: 13,
                sm: 15,
            },
            body2: {
                xs: 12,
                sm: 14,
            },
            subtitle2: {
                xs: 11,
                sm: 13,
            },
        },
    },
    typography: {
        fontFamily: font.style.fontFamily,
    },
    text: {
        primary: "rgb(255, 255, 255)",
        contrast: "rgb(0, 0, 0)",
        selected: "rgb(30, 175, 255)",
        appbar: "rgb(255, 255, 255)",
        description: "rgb(205, 205, 205)",
        highlight: "#F7CA2F",
        highlight2: "#FFFFFF",
        star: "rgb(255, 238, 157)",
        header: "#FFE7B9",
        value: "#3BB1FF",
    },
    appbar: {
        backgroundColor: {
            main: appbarColors[0],
            hover: appbarColors[1],
            selectedHover: appbarColors[2],
        },
    },
    border: {
        color: {
            primary: borderColors.primary,
            secondary: borderColors.secondary,
        },
    },
};

export const darkTheme = createTheme(darkThemeData);
