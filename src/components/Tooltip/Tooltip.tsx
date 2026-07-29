import { styled } from "@mui/material/styles";
import MuiTooltip, {
    TooltipProps as MuiTooltipProps,
    tooltipClasses,
} from "@mui/material/Tooltip";

interface TooltipProps extends MuiTooltipProps {
    fontSize?: number;
    width?: string;
}

const Tooltip = styled(({ className, ...props }: TooltipProps) => (
    <MuiTooltip
        {...props}
        arrow
        disableInteractive
        classes={{ popper: className }}
    />
))(({ theme, fontSize, width = "none" }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: `black`,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: `black`,
        outline: `1px solid rgb(44, 44, 44)`,
        fontSize: theme.typography.pxToRem(
            fontSize || theme.font.sizes.body3.sm,
        ),
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.font.weight.highlight,
        maxWidth: width,
    },
}));

export default Tooltip;
