import { styled } from "@mui/material/styles"
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip"

interface StyledTooltipProps extends TooltipProps {
    fontSize?: number
}

export const StyledTooltip = styled(({ className, ...props }: StyledTooltipProps) => (
    <Tooltip {...props} arrow disableInteractive classes={{ popper: className }} />
))(({ theme, fontSize = 12 }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: `black`
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: `black`,
        fontSize: theme.typography.pxToRem(fontSize),
        fontFamily: theme.font.styled.family,
        fontWeight: theme.font.styled.weight,
        maxWidth: "none",
    },
}))