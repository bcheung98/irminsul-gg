// Component imports
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";

// MUI imports
import { rgbToHex } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box, { BoxProps } from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { TooltipProps } from "@mui/material/Tooltip";

// Helper imports
import { adjustColor } from "@/utils/colors";

interface ActionFabProps {
    action?: (args: any) => void;
    hysteresis?: boolean;
    threshold?: number;
    icon?: React.ReactNode;
    label?: React.ReactNode;
    tooltip?: string;
    tooltipArrow?: TooltipProps["placement"];
    color?: string;
    position?: {
        top?: BoxProps["padding"];
        right?: BoxProps["padding"];
        bottom?: BoxProps["padding"];
        left?: BoxProps["padding"];
    };
    zIndex?: number;
}

function ActionFab({
    action,
    hysteresis = false,
    threshold = 100,
    icon,
    label,
    tooltip = "",
    tooltipArrow = "top",
    color,
    position = {
        top: 100,
        right: 20,
    },
    zIndex,
}: ActionFabProps) {
    const trigger = useScrollTrigger({
        disableHysteresis: !hysteresis,
        threshold: threshold,
    });

    return (
        <Fade in={trigger}>
            <Box
                onClick={action}
                sx={[
                    { position: "fixed", zIndex: zIndex, width: "40px" },
                    { ...position },
                ]}
            >
                <Tooltip title={tooltip} arrow placement={tooltipArrow}>
                    <Fab
                        size="small"
                        disableRipple
                        sx={(theme) => ({
                            width: "100%",
                            height: "100%",
                            p: 1,
                            borderRadius: "8px",
                            color: theme.text.primary,
                            backgroundColor:
                                color || theme.background(2, "dark"),
                            "&:hover": {
                                backgroundColor: color
                                    ? adjustColor(rgbToHex(color), 0.15)
                                    : theme.background(2),
                            },
                        })}
                    >
                        {icon || <KeyboardArrowLeftIcon />}
                        {label && (
                            <Text
                                variant="subtitle1"
                                sx={{ ml: "4px", textTransform: "none" }}
                            >
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
