"use client";

import { Rowdies } from "next/font/google";
import { createTheme, alpha } from "@mui/material";
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
    secondary: "rgb(30, 73, 118)",
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

const textColors = {
    primary: "rgb(255, 255, 255)",
    contrast: "rgb(0, 0, 0)",
    selected: "rgb(30, 175, 255)",
    description: "rgb(205, 205, 205)",
};

const iconBackgrounds = ["rgb(0, 16, 32)", "rgb(8, 32, 72)", "rgb(32, 56, 96)"];

export const darkThemeData = {
    name: "Dark",
    background: (index: number, shade?: Shade) =>
        getThemeBackgroundColors({ colors: backgroundColors, index, shade }),
    backgroundImageColors: ["rgba(23, 46, 98, 0)", "rgba(73, 218, 243, 0)"],
    backgroundImageURL: "https://assets.irminsul.gg/main/images/Irminsul.png",
    backgroundImageAlpha: 0.75,
    irminsulLogo: {
        imgURL: "logo_red",
        filter: "brightness(1) invert(0)",
        textBackground: textColors.primary,
        textBackgroundHover: textColors.selected,
    },
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
            light: "rgb(52, 76, 116)",
            main: "rgb(32, 56, 96)",
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
            home: 400,
        },
        sizes: {
            h3: {
                xs: 28,
                sm: 30,
            },
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
            body3: {
                xs: 10,
                sm: 12,
            },
            subtitle3: {
                xs: 9,
                sm: 11,
            },
        },
    },
    typography: {
        fontFamily: font.style.fontFamily,
    },
    text: {
        ...textColors,
        star: "#ffcc33",
        genshin: {
            highlight: "#ffe7b9",
            header: "#ffe7b9",
            refinement: "#3bb1ff",
            value: "#3bb1ff",
            pyro: "#e46052",
            hydro: "#4faaff",
            electro: "#d85dd8",
            cryo: "#90e1fa",
            anemo: "#4bcfa3",
            geo: "#ecd133",
            dendro: "#9cdf3f",
        },
    },
    appbar: {
        backgroundColor: {
            main: alpha(appbarColors[0], 0.95),
            hover: appbarColors[1],
            selectedHover: appbarColors[2],
        },
        color: {
            primary: textColors.primary,
        },
    },
    border: {
        color: {
            primary: borderColors.primary,
            secondary: borderColors.secondary,
        },
    },
    contentBox: {
        backgroundColor: {
            main: backgroundColors[1].main,
            header: appbarColors[0],
        },
        border: {
            radius: 1,
            width: 0,
            color: borderColors.primary,
        },
        color: {
            primary: textColors.primary,
            header: textColors.primary,
        },
    },
    drawer: {
        backgroundColor: {
            main: appbarColors[1],
            hover: appbarColors[2],
            selectedHover: appbarColors[0],
        },
        color: {
            primary: textColors.primary,
        },
    },
    infoAvatar: {
        backgroundColor: {
            main: appbarColors[0],
        },
        border: {
            radius: 2,
            width: 2,
            color: borderColors.primary,
        },
        color: {
            primary: textColors.primary,
        },
    },
    infoCard: {
        backgroundColor: {
            main: appbarColors[0],
        },
        border: {
            radius: 4,
            width: 0,
            color: borderColors.primary,
        },
        color: {
            primary: textColors.primary,
        },
    },
    iconBackground: {
        primary: iconBackgrounds[0],
        secondary: iconBackgrounds[1],
    },
    materialCard: {
        backgroundColor: {
            main: appbarColors[0],
            label: appbarColors[0],
        },
        border: {
            radius: 4,
            width: 0,
            color: borderColors.primary,
        },
        imageBorder: {
            radius: 4,
            width: 0,
            color: borderColors.primary,
        },
        backgroundImage: (rarity: number) =>
            `url(https://assets.irminsul.gg/wuwa/backgrounds/Background_${rarity}_Star.png)`,
        color: {
            primary: textColors.primary,
        },
    },
    table: {
        backgroundColor: {
            header: appbarColors[0],
            main: backgroundColors[1],
        },
        color: {
            header: textColors.primary,
            primary: textColors.primary,
        },
    },
};

export const darkTheme = createTheme(darkThemeData);
