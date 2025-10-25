import { ToggleButtonProps as MuiToggleButtonProps } from "@mui/material/ToggleButton";
import { ToggleButtonGroupProps } from "@mui/material/ToggleButtonGroup";

export interface ToggleButtonProps extends MuiToggleButtonProps {
    icon?: React.ReactNode;
    label?: React.ReactNode;
    padding?: number | string;
    highlightOnHover?: boolean;
}

export interface ToggleButtonsProps extends ToggleButtonGroupProps {
    buttons: ToggleButtonProps[];
    width?: string;
    spacing?: number;
    padding?: number | string;
    highlightOnHover?: boolean;
}
