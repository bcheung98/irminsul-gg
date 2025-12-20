<<<<<<< HEAD
import { SxProps } from "@mui/material";
import { themeNames } from "themes/theme";
import { darkThemeData } from "themes/darkTheme";
import { Variant } from "@mui/material/styles/createTypography";
=======
import { SxProps, TypographyVariant } from "@mui/material";
import { themeNames } from "@/themes/theme";
import { darkThemeData } from "@/themes/darkTheme";
import { nextThemeData } from "@/themes/nextTheme";
>>>>>>> irminsul-gg-v2/v2-merge

export type ThemeNames = (typeof themeNames)[number];

type DarkTheme = typeof darkThemeData;
<<<<<<< HEAD
type ThemeData = DarkTheme;
=======
type ModernTheme = typeof nextThemeData;
type ThemeData = DarkTheme & ModernTheme;
>>>>>>> irminsul-gg-v2/v2-merge

export type CustomTheme = {
    [Key in keyof ThemeData]: ThemeData[Key];
};

declare module "@mui/material/styles" {
    interface Theme extends CustomTheme {
        styles: {
            [key: string]: (...args: unknown[]) => SxProps;
        };
    }
    interface ThemeOptions extends Partial<CustomTheme> {}

    interface Palette {
        default: Palette["primary"];
        tertiary: Palette["primary"];
    }
    interface PaletteOptions {
        default?: PaletteOptions["primary"];
        tertiary?: PaletteOptions["primary"];
    }

    interface TypographyVariants extends TypographyVariantsType {}
    interface TypographyVariantsOptions extends TypographyVariantsOptionsType {}
}

type StyledTypographyVariants = {
<<<<<<< HEAD
    [Property in Variant as `${string & Property}-styled`]: true;
=======
    [Property in TypographyVariant as `${string & Property}-styled`]: true;
>>>>>>> irminsul-gg-v2/v2-merge
};

type NewTypographyVariants = {
    sitename: true;
<<<<<<< HEAD
=======
    body3: true;
    subtitle3: true;
>>>>>>> irminsul-gg-v2/v2-merge
};

type TypographyOverrides = StyledTypographyVariants & NewTypographyVariants;

type TypographyVariantsType = {
    [Property in keyof TypographyOverrides]: React.CSSProperties;
};

type TypographyVariantsOptionsType = {
    [Property in keyof TypographyOverrides]?: React.CSSProperties;
};

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides extends TypographyOverrides {}
}

declare module "@mui/material/Chip" {
    interface ChipPropsColorOverrides {
        tertiary: true;
    }
}

export type Shade = "main" | "light" | "dark";
export type ColorVariants =
    | "default"
    | "primary"
    | "secondary"
    | "tertiary"
    | "error"
    | "warning"
    | "info"
    | "success";
