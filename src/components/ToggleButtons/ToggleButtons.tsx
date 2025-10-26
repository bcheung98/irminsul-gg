// Component imports
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";
import { ToggleButtonRoot, ToggleButtonGroupRoot } from "./ToggleButtonsRoot";

// Type imports
import { ToggleButtonProps, ToggleButtonsProps } from "./ToggleButtons.types";

export function ToggleButton(props: ToggleButtonProps) {
    const { icon, label, tooltip, color } = props;

    return (
        <Tooltip title={tooltip} placement="top">
            <ToggleButtonRoot {...props} color={color}>
                {icon}
                <Text
                    variant="body2-styled"
                    sx={{ color: "white", textTransform: "none" }}
                >
                    {label}
                </Text>
            </ToggleButtonRoot>
        </Tooltip>
    );
}

export default function ToggleButtons(props: ToggleButtonsProps) {
    const { buttons, highlightOnHover = true, color } = props;

    return (
        <ToggleButtonGroupRoot {...props}>
            {buttons.map((button, index) => (
                <ToggleButton
                    key={index}
                    highlightOnHover={highlightOnHover}
                    color={color}
                    {...button}
                />
            ))}
        </ToggleButtonGroupRoot>
    );
}
