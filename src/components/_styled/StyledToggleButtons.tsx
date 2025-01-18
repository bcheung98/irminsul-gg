import {
    CustomToggleButtonProps,
    ToggleButtonsProps,
} from "custom/ToggleButtons";

// MUI imports
import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ColorVariants } from "types/theme";

export const StyledToggleButton = styled(
    (props: CustomToggleButtonProps) => (
        <ToggleButton disableRipple {...props} />
    ),
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
                ? theme.border.color.highlight
                : theme.border.color.primary,
            boxShadow: highlightOnHover
                ? `0 0 4px 1px ${theme.border.color.highlight}`
                : "none",
        },
    },
}));

export const StyledToggleButtonGroup = styled(
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
            ? `0px solid ${theme.border.color.primary} !important`
            : `0px solid ${theme.border.color.primary}`,
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
