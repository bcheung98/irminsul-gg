import type {} from "@mui/lab/themeAugmentation";
import { createTheme, SxProps } from "@mui/material";
import { darkTheme } from "./darkTheme";

export const themeList = [
    { name: "Dark", label: "Default", data: darkTheme },
] as const;

export const themeNames = themeList.map((t) => t.name);

export function getTheme(name: string) {
    let theme =
        themeList[themeList.findIndex((theme) => theme.name === name)].data;
    const baseThemeData = {
        palette: {
            background: {
                default: theme.background(0),
                paper: theme.background(1),
            },
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: theme.appbar.backgroundColor,
                        borderWidth: "0 0 1px 0",
                        borderStyle: "solid",
                        borderColor: theme.border.color.primary,
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        color: theme.appbar.color,
                        fontFamily: theme.font.styled.family,
                        fontWeight: theme.font.styled.weight,
                        textTransform: "none",
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        color: theme.text.primary,
                    },
                },
            },
            MuiTypography: {
                defaultProps: {
                    variantMapping: {
                        "h4-styled": "h4",
                        "h5-styled": "h5",
                        "h6-styled": "h6",
                        "body1-styled": "p",
                        "body2-styled": "p",
                    },
                },
            },
        },
        typography: {
            sitename: {
                fontFamily: "Rowdies, Inter !important",
                fontSize: "1.25rem",
                fontWeight: "400 !important",
                color: "rgb(255, 255, 255) !important",
                letterSpacing: ".1rem",
            },
            h4: {
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(theme.font.sizes.h4.xs),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(theme.font.sizes.h4.sm),
                },
            },
            "h4-styled": {
                ...theme.typography.h4,
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes["h4-styled"].xs
                    ),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes["h4-styled"].sm
                    ),
                },
            },
            h5: {
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(theme.font.sizes.h5.xs),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(theme.font.sizes.h5.sm),
                },
            },
            "h5-styled": {
                ...theme.typography.h5,
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes["h5-styled"].xs
                    ),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes["h5-styled"].sm
                    ),
                },
            },
            h6: {
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(theme.font.sizes.h6.xs),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(theme.font.sizes.h6.sm),
                },
            },
            "h6-styled": {
                ...theme.typography.h6,
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes["h6-styled"].xs
                    ),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes["h6-styled"].sm
                    ),
                },
            },
            body1: {
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes.body1.xs
                    ),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes.body1.sm
                    ),
                },
            },
            "body1-styled": {
                ...theme.typography.body1,
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes["body1-styled"].xs
                    ),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes["body1-styled"].sm
                    ),
                },
            },
            subtitle1: {
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes.subtitle1.xs
                    ),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes.subtitle1.sm
                    ),
                },
            },
            "subtitle1-styled": {
                ...theme.typography.subtitle1,
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes["subtitle1-styled"].xs
                    ),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes["subtitle1-styled"].sm
                    ),
                },
            },
            body2: {
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes.body2.xs
                    ),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes.body2.sm
                    ),
                },
            },
            "body2-styled": {
                ...theme.typography.body2,
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes["body2-styled"].xs
                    ),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes["body2-styled"].sm
                    ),
                },
            },
            subtitle2: {
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes.subtitle2.xs
                    ),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes.subtitle2.sm
                    ),
                },
            },
            "subtitle2-styled": {
                ...theme.typography.subtitle2,
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes["subtitle2-styled"].xs
                    ),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes["subtitle2-styled"].sm
                    ),
                },
            },
        },
        styles: {
            drawer: (matches: boolean, width = 320): SxProps => {
                return matches
                    ? {
                          flexShrink: 0,
                          "& .MuiDrawer-paper": {
                              width: width,
                              borderLeft: `1px solid ${theme.border.color.primary}`,
                              backgroundColor: theme.appbar.backgroundColor,
                              py: 2.5,
                              scrollbarWidth: "none",
                          },
                      }
                    : {
                          "& .MuiDrawer-paper": {
                              borderTop: `1px solid ${theme.border.color.primary}`,
                              backgroundColor: theme.appbar.backgroundColor,
                              height: "auto",
                              maxHeight: "88%",
                          },
                      };
            },
        },
    };

    theme = createTheme(theme, baseThemeData);
    return theme;
}
