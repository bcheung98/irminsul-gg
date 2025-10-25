// Component imports
import Text from "@/components/Text";
import { ToggleButtonRoot, ToggleButtonGroupRoot } from "./ToggleButtonsRoot";

// Type imports
import { ToggleButtonProps, ToggleButtonsProps } from "./ToggleButtons.types";

export function ToggleButton(props: ToggleButtonProps) {
    const { icon, label, color } = props;

    return (
        <ToggleButtonRoot {...props} color={color}>
            {icon}
            <Text
                variant="body2-styled"
                sx={{ color: "white", textTransform: "none" }}
            >
                {label}
            </Text>
        </ToggleButtonRoot>
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
