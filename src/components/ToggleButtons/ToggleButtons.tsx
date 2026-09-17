// Component imports
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";
import { ToggleButtonRoot, ToggleButtonGroupRoot } from "./ToggleButtonsRoot";

// Type imports
import { ToggleButtonProps, ToggleButtonsProps } from "./ToggleButtons.types";
import type { SxProps, Theme } from "@mui/material/styles";

export function ToggleButton(props: ToggleButtonProps) {
    const { icon, label, tooltip, color } = props;

    const textStyle: SxProps<Theme> = (theme) => ({
        color: theme.text.primary,
        textTransform: "none",
    });

    return (
        <Tooltip title={tooltip} placement="top">
            <ToggleButtonRoot {...props} color={color}>
                {icon}
                <Text variant="subtitle2" sx={textStyle}>
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
            {buttons.map((button) => (
                <ToggleButton
                    key={`${button.value}`}
                    highlightOnHover={highlightOnHover}
                    color={color}
                    {...button}
                />
            ))}
        </ToggleButtonGroupRoot>
    );
}
