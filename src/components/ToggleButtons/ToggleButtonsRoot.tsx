// MUI imports
import { styled } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// Type imports
import { ColorVariants } from "@/types/theme";
import { ToggleButtonProps, ToggleButtonsProps } from "./ToggleButtons.types";

export const ToggleButtonRoot = styled(
    (props: ToggleButtonProps) => <ToggleButton disableRipple {...props} />,
    {
        shouldForwardProp: (prop) =>
            !["highlightOnHover", "backgroundColor"].includes(prop.toString()),
    }
)(({ theme, highlightOnHover, color = "primary" }) => ({
    "&.MuiToggleButton-root": {
        opacity: 0.4,
        color: "white",
        "&:hover": {
            backgroundColor: theme.palette[color as ColorVariants].light,
            borderColor: highlightOnHover
                ? theme.border.color.primary
                : theme.border.color.highlight,
            boxShadow: highlightOnHover
                ? `0 0 4px 1px ${theme.border.color.highlight}`
                : "none",
        },
    },
}));

export const ToggleButtonGroupRoot = styled(
    (props: ToggleButtonsProps) => <ToggleButtonGroup {...props} />,
    {
        shouldForwardProp: (prop) =>
            !["highlightOnHover", "backgroundColor"].includes(prop.toString()),
    }
)(({ theme, width, spacing, padding = 4, color = "primary" }) => ({
    flexWrap: "wrap",
    width: width || "auto",
    "& .MuiToggleButtonGroup-grouped": {
        padding: getPadding(padding),
        margin: spacing ? `${spacing}px !important` : "0px",
        border: spacing
            ? `1px solid ${theme.border.color.primary} !important`
            : `1px solid ${theme.border.color.primary}`,
        borderRadius: spacing ? "4px" : "none",
        backgroundColor: theme.palette[color as ColorVariants].main,
        "&.Mui-selected": {
            backgroundColor: theme.palette[color as ColorVariants].main,
            opacity: 1,
            "&:hover": {
                backgroundColor: theme.palette[color as ColorVariants].light,
            },
        },
    },
}));

function getPadding(padding: string | number) {
    if (typeof padding === "number") {
        return `${padding}px`;
    } else {
        return padding;
    }
}
