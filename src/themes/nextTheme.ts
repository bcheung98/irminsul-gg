"use client";

import { Inter } from "next/font/google";
import { createTheme } from "@mui/material";
import { getThemeBackgroundColors } from "@/helpers/styles";
import { Shade } from "@/types/theme";

const font = Inter({
    weight: ["300", "400", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

const appbarColors = ["rgb(8, 8, 8)", "rgb(16, 16, 16)", "rgb(40, 40, 40)"];

const borderColors = {
    primary: "rgb(80, 80, 80)",
    secondary: "rgb(75, 83, 102)",
    highlight: "rgb(30, 73, 118)",
};

const backgroundColors = [
    {
        light: "rgb(50, 50, 50)",
        main: "rgb(40, 40, 40)",
        dark: "rgb(30, 30, 30)",
    },
    {
        light: "rgb(26, 26, 26)",
        main: "rgb(16, 16, 16)",
        dark: "rgb(6, 6, 6)",
    },
    {
        light: "rgb(18, 18, 18)",
        main: "rgb(8, 8, 8)",
        dark: "rgb(0, 0, 0)",
    },
];

const textColors = {
    primary: "rgb(255, 255, 255)",
    contrast: "rgb(0, 0, 0)",
    selected: "rgb(30, 175, 255)",
    description: "rgb(205, 205, 205)",
    header: "rgb(255, 204, 51)",
    star: "rgb(255, 204, 51)",
};

const iconBackgrounds = ["rgb(8, 8, 8)", "rgb(16, 16, 16)", "rgb(40, 40, 40)"];

export const nextThemeData = {
    id: 1,
    name: "Modern",
    background: (index: number, shade?: Shade) =>
        getThemeBackgroundColors({ colors: backgroundColors, index, shade }),
    backgroundImage: {
        imgURL: "https://assets.irminsul.gg/main/images/Irminsul.png",
        filter: "brightness(0.25) grayscale(100%)",
    },
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
            main: "rgb(8, 8, 8)",
            dark: "rgb(18, 18, 18)",
        },
        secondary: {
            main: "rgb(16, 16, 16)",
        },
        tertiary: {
            light: "rgb(60, 60, 60)",
            main: "rgb(40, 40, 40)",
            dark: "rgb(20, 20, 20)",
        },
        info: {
            main: "rgb(25, 118, 210)",
        },
        divider: borderColors.primary,
    },
    font: {
        weight: {
            primary: 600,
            element: 600,
            highlight: 600,
            home: 700,
        },
        sizes: {
            h3: {
                xs: 26,
                sm: 28,
            },
            h4: {
                xs: 24,
                sm: 26,
            },
            h5: {
                xs: 20,
                sm: 22,
            },
            h6: {
                xs: 16,
                sm: 18,
            },
            body1: {
                xs: 13,
                sm: 15,
            },
            subtitle1: {
                xs: 12,
                sm: 14,
            },
            body2: {
                xs: 11,
                sm: 13,
            },
            subtitle2: {
                xs: 10,
                sm: 12,
            },
            body3: {
                xs: 9,
                sm: 11,
            },
            subtitle3: {
                xs: 8,
                sm: 10,
            },
        },
        lineHeight: {
            subtitle1: 1.75,
            subtitle2: 1.57,
        },
    },
    typography: {
        fontFamily: font.style.fontFamily,
    },
    text: {
        ...textColors,
        genshin: {
            highlight: "#ffe7b9",
            header: "#ffe7b9",
            refinement: "#3bb1ff",
            value: "#3bb1ff",
            star: "#ffcc33",
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
            main: appbarColors[0],
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
            highlight: borderColors.highlight,
        },
    },
    contentBox: {
        backgroundColor: {
            main: backgroundColors[1].main,
            header: appbarColors[0],
            headerHover: appbarColors[1],
        },
        border: {
            radius: 2,
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
    menu: {
        backgroundColor: {
            primary: backgroundColors[0].dark,
            hover: backgroundColors[0].light,
            selected: backgroundColors[1].dark,
            selectedHover: backgroundColors[1].light,
        },
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

export const nextTheme = createTheme(nextThemeData);
