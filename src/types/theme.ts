import { SxProps, TypographyVariant } from "@mui/material";
import { themeNames } from "@/themes/theme";
import { darkThemeData } from "@/themes/darkTheme";

export type ThemeNames = (typeof themeNames)[number];

type DarkTheme = typeof darkThemeData;
type ThemeData = DarkTheme;

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
    [Property in TypographyVariant as `${string & Property}-styled`]: true;
};

type NewTypographyVariants = {
    sitename: true;
    body3: true;
    subtitle3: true;
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
