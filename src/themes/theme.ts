"use client";

import { createTheme } from "@mui/material/styles";
import { darkTheme } from "./darkTheme";
import { nextTheme } from "./nextTheme";
import { getContrastText } from "@/utils/getContrastText";

export const themeList = [nextTheme, darkTheme] as const;

export const themeNames = themeList.map((t) => t.name);

export default function getTheme(id: number) {
    let theme =
        themeList[themeList.findIndex((theme) => theme.id === id)] || nextTheme;

    const baseThemeData = {
        breakpoints: {
            values: {
                xs: 0,
                sm: 425,
                md: 768,
                lg: 1024,
                xl: 1440,
            },
        },
        components: {
            // MuiUseMediaQuery: {
            //     defaultProps: {
            //         noSsr: true,
            //     },
            // },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: theme.appbar.backgroundColor.main,
                        borderWidth: "0 0 1px 0",
                        borderStyle: "solid",
                        borderColor: theme.border.color.primary,
                    },
                },
            },
            MuiAutocomplete: {
                styleOverrides: {
                    noOptions: {
                        color: theme.appbar.color.primary,
                        backgroundColor: theme.menu.backgroundColor.primary,
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: theme.font.weight.primary,
                        fontSize: {
                            xs: theme.font.sizes.subtitle1.xs,
                            sm: theme.font.sizes.subtitle1.sm,
                        },
                    },
                },
                defaultProps: {
                    slotProps: {
                        chip: {
                            sx: {
                                height: "24px",
                                backgroundColor: theme.palette.info.main,
                                fontFamily: theme.typography.fontFamily,
                                fontSize: {
                                    xs: theme.font.sizes.subtitle2.xs,
                                    sm: theme.font.sizes.subtitle2.sm,
                                },
                                color: getContrastText(
                                    theme.text.primary,
                                    theme.palette.info.main
                                ),
                                "& .MuiChip-deleteIcon": {
                                    fontSize: {
                                        xs: theme.font.sizes.h6.xs,
                                        sm: theme.font.sizes.h6.sm,
                                    },
                                    color: getContrastText(
                                        theme.text.primary,
                                        theme.palette.info.main
                                    ),
                                    "&:hover": {
                                        color: getContrastText(
                                            theme.text.description,
                                            theme.palette.info.main
                                        ),
                                    },
                                },
                            },
                        },
                        listbox: {
                            sx: { p: 0 },
                        },
                        paper: {
                            sx: {
                                backgroundColor:
                                    theme.menu.backgroundColor.primary,
                                borderRadius: theme.contentBox.border.radius,
                            },
                        },
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        color: theme.appbar.color.primary,
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: theme.font.weight.primary,
                        textTransform: "none",
                    },
                },
            },
            MuiButtonBase: {
                defaultProps: {
                    // disableRipple: true,
                    // disableTouchRipple: true,
                },
            },
            MuiDialog: {
                styleOverrides: {
                    container: {
                        backgroundColor: "rgba(26, 30, 35, 0.6)",
                    },
                    paper: {
                        outline: `1px solid ${theme.border.color.secondary}`,
                    },
                },
            },
            MuiIconButton: {
                defaultProps: {
                    // disableRipple: true,
                    // disableTouchRipple: true,
                },
                styleOverrides: {
                    root: {
                        color: theme.text.primary,
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    icon: {
                        color: theme.text.primary,
                    },
                },
            },
            MuiSlider: {
                defaultProps: {
                    color: "info",
                },
            },
            MuiSwitch: {
                defaultProps: {
                    color: "info",
                },
            },
            MuiTypography: {
                defaultProps: {
                    variantMapping: {
                        body3: "p",
                        subtitle3: "p",
                    },
                },
                styleOverrides: {
                    root: {
                        color: theme.text.primary,
                        fontWeight: theme.font.weight.primary,
                    },
                },
            },
        },
        typography: {
            sitename: {
                fontFamily: "Rowdies, Inter !important",
                [theme.breakpoints.up("xs")]: {
                    fontSize: "1rem",
                    letterSpacing: ".075rem",
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: "1.25rem",
                    letterSpacing: ".1rem",
                },
                fontWeight: "400 !important",
                color: "rgb(255, 255, 255) !important",
            },
            h4: {
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(theme.font.sizes.h4.xs),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(theme.font.sizes.h4.sm),
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
            h6: {
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(theme.font.sizes.h6.xs),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(theme.font.sizes.h6.sm),
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
            subtitle1: {
                lineHeight: theme.font.lineHeight.subtitle1,
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
            subtitle2: {
                lineHeight: theme.font.lineHeight.subtitle2,
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
            body3: {
                ...theme.typography.body2,
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes.body3.xs
                    ),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes.body3.sm
                    ),
                },
            },
            subtitle3: {
                ...theme.typography.subtitle2,
                [theme.breakpoints.up("xs")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes.subtitle3.xs
                    ),
                },
                [theme.breakpoints.up("sm")]: {
                    fontSize: theme.typography.pxToRem(
                        theme.font.sizes.subtitle3.sm
                    ),
                },
            },
        },
    };

    return createTheme(theme, baseThemeData);
}

export const variantMap = {
    primary: 0,
    secondary: 1,
    tertiary: 2,
};
