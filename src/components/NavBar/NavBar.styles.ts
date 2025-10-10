import { SxProps, Theme } from "@mui/material/styles";

interface NavDrawerProps {
    drawerOpen: boolean;
}

export const navBarStyles = ({ drawerOpen }: NavDrawerProps) => ({
    menuButton: (): SxProps<Theme> => (theme) => ({
        borderRadius: "4px",
        width: "28px",
        height: "28px",
        color: theme.drawer.color.primary,
        backgroundColor: drawerOpen ? theme.palette.info.main : "transparent",
        "&:hover": {
            backgroundColor: drawerOpen
                ? theme.palette.info.light
                : theme.drawer.backgroundColor.hover,
        },
    }),
    menuIcon: (): SxProps => ({
        transform: drawerOpen ? "rotateY(0deg)" : "rotateY(180deg)",
        transition: "transform 0.25s",
    }),
});
