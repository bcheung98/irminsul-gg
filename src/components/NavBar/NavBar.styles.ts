import { SxProps, Theme } from "@mui/material/styles";

interface NavDrawerProps {
    open: boolean;
}

export const navBarStyles = ({ open }: NavDrawerProps) => ({
    menuButton: (): SxProps<Theme> => (theme) => ({
        borderRadius: "4px",
        width: "28px",
        height: "28px",
        color: theme.drawer.color.primary,
        backgroundColor: { lg: open ? theme.palette.info.main : "transparent" },
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
});
