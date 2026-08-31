import { SxProps, TypographyVariant } from "@mui/material";
import { darkThemeData } from "@/themes/darkTheme";
import { nextThemeData } from "@/themes/nextTheme";

// Make sure to add any new themes to /src/themes/theme.ts
type ThemeData = typeof nextThemeData & typeof darkThemeData;

type CustomThemeData = Omit<ThemeData, "palette" | "typography">;

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

declare module "@mui/material/styles" {
    interface Theme extends CustomThemeData {
        styles: {
            [key: string]: (...args: unknown[]) => SxProps;
        };
    }
    interface ThemeOptions extends Partial<CustomThemeData> {}

    interface Palette {
        tertiary: Palette["primary"];
    }
    interface PaletteOptions {
        tertiary?: PaletteOptions["primary"];
    }

    interface TypographyVariants extends TypographyVariantsType {}
    interface TypographyVariantsOptions extends TypographyVariantsOptionsType {}
}

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides extends TypographyOverrides {}
}

declare module "@mui/material/Chip" {
    interface ChipPropsColorOverrides {
        tertiary: true;
    }
}
