import { keyframes, SxProps, Theme } from "@mui/material/styles";

export const statusIndicatorStyles = (
    status: "success" | "warning" | "error",
) => ({
    dotRoot: (): SxProps => () => ({
        position: "relative",
        width: "8px",
        height: "8px",
        justifyContent: "center",
    }),
    dotInner: (): SxProps<Theme> => (theme) => ({
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        zIndex: 2,
        backgroundColor: theme.palette[status].light,
        boxShadow: `0 0 6px ${theme.palette[status].light}`,
    }),
    dotOuter: (): SxProps<Theme> => (theme) => ({
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        zIndex: 1,
        backgroundColor: theme.palette[status].light,
        animation:
            status === "success"
                ? `${keyframes`
                    75%, 100% {
                        transform: scale(2.5);
                        opacity: 0;
                    }
                `} 2s cubic-bezier(0, 0, 0.2, 1) infinite`
                : "none",
    }),
    indicatorRoot: (): SxProps<Theme> => (theme) => ({
        px: 2,
        py: 0.5,
        outline: `1px solid ${theme.palette[status].dark}`,
        userSelect: "none",
        cursor: "pointer",
        animation:
            status !== "success"
                ? `${keyframes`
                    0%, 100% {
                        outline-color: ${theme.palette[status].light};
                    }
                    50% {
                        outline-color: ${theme.palette[status].main};
                    }
                `} 1s steps(1, start) infinite`
                : "none",
        "&:hover": {
            backgroundColor: theme.background(1, "light"),
        },
    }),
});
