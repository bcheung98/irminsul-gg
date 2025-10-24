import { SxProps, Theme, alpha } from "@mui/material/styles";

export const navBarMiniStyles = (open?: boolean) => {
    return {
        root: (): SxProps<Theme> => (theme) => ({
            top: 48,
            zIndex: theme.zIndex.drawer + 1,
            backdropFilter: { sm: "none", lg: "blur(4px)" },
            backgroundColor: {
                xs: theme.appbar.backgroundColor.main,
                lg: alpha(theme.appbar.backgroundColor.main, 0.95),
            },
        }),
        menuButton: (): SxProps<Theme> => (theme) => ({
            borderRadius: "4px",
            width: "28px",
            height: "28px",
            color: theme.drawer.color.primary,
            backgroundColor: {
                lg: open ? theme.palette.info.main : "transparent",
            },
            "&:hover": {
                lg: {
                    backgroundColor: open
                        ? theme.palette.info.light
                        : theme.drawer.backgroundColor.hover,
                },
            },
        }),
        menuIcon: (): SxProps => ({
            transform: open ? "rotateY(0deg)" : "rotateY(180deg)",
            transition: "transform 0.25s",
        }),
    };
};
