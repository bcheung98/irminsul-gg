import { SxProps, Theme } from "@mui/material/styles";

export const buttonStyles = (() => {
    return {
        root: ((): SxProps<Theme> => (theme) => ({
            p: 0.5,
            color: theme.contentBox.color.header,
            borderRadius: "4px",
            border: `1px solid ${theme.border.color.primary}`,
            backgroundColor: theme.contentBox.backgroundColor.headerHover,
            "&:hover": {
                backgroundColor:
                    theme.contentBox.backgroundColor.headerSelectedHover,
            },
            "&.Mui-disabled": {
                color: theme.text.primary,
                opacity: 0.5,
            },
        }))(),
        icon: ((): SxProps => () => ({
            fontSize: {
                xs: "16px",
                sm: "18px",
            },
        }))(),
    };
})();
