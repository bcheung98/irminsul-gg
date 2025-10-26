// Component imports
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";

// MUI imports
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fab, { FabProps } from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { TooltipProps } from "@mui/material/Tooltip";

interface ActionFabProps {
    action?: (args: any) => void;
    hysteresis?: boolean;
    threshold?: number;
    icon?: React.ReactNode;
    label?: React.ReactNode;
    tooltip?: string;
    tooltipArrow?: TooltipProps["placement"];
    color?: FabProps["color"];
    position?: {
        top?: string | number;
        right?: string | number;
        bottom?: string | number;
        left?: string | number;
    };
}

function ActionFab({
    action,
    hysteresis = false,
    threshold = 100,
    icon,
    label,
    tooltip = "",
    tooltipArrow = "top",
    color = "primary",
    position = {
        top: 100,
        right: 20,
    },
}: ActionFabProps) {
    const trigger = useScrollTrigger({
        disableHysteresis: !hysteresis,
        threshold: threshold,
    });

    return (
        <Fade in={trigger}>
            <Box onClick={action} sx={[{ position: "fixed" }, { ...position }]}>
                <Tooltip title={tooltip} arrow placement={tooltipArrow}>
                    <Fab
                        color={color}
                        size="small"
                        disableRipple
                        sx={{
                            width: "100%",
                            p: 1,
                            borderRadius: "4px",
                            color: "white",
                        }}
                    >
                        {icon || <KeyboardArrowLeftIcon />}
                        {label && (
                            <Text variant="subtitle1" sx={{ ml: "4px" }}>
                                {label}
                            </Text>
                        )}
                    </Fab>
                </Tooltip>
            </Box>
        </Fade>
    );
}

export default ActionFab;
