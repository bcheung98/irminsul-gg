import { styled } from "@mui/material/styles";
import MuiTooltip, {
    TooltipProps as MuiTooltipProps,
    tooltipClasses,
} from "@mui/material/Tooltip";

interface TooltipProps extends MuiTooltipProps {
    fontSize?: number;
}

export const Tooltip = styled(({ className, ...props }: TooltipProps) => (
    <MuiTooltip
        {...props}
        arrow
        disableInteractive
        classes={{ popper: className }}
    />
))(({ theme, fontSize = 12 }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: `black`,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: `black`,
        fontSize: theme.typography.pxToRem(fontSize),
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.font.weight.primary,
        maxWidth: "none",
    },
}));
