import React from "react";

// Component imports
import { TextStyled } from "styled/StyledTypography";
import {
    StyledToggleButton,
    StyledToggleButtonGroup,
} from "styled/StyledToggleButtons";

// MUI imports
import { ToggleButtonProps, ToggleButtonGroupProps } from "@mui/material";

export interface CustomToggleButtonProps extends ToggleButtonProps {
    icon?: React.ReactNode;
    label?: React.ReactNode;
    padding?: number | string;
    highlightOnHover?: boolean;
}

export function ToggleButton(props: CustomToggleButtonProps) {
    const { icon, label, color } = props;

    return (
        <StyledToggleButton {...props} color={color}>
            {icon}
            <TextStyled
                variant="body2-styled"
                sx={{ color: "white", textTransform: "none" }}
            >
                {label}
            </TextStyled>
        </StyledToggleButton>
    );
}

export interface ToggleButtonsProps extends ToggleButtonGroupProps {
    buttons: CustomToggleButtonProps[];
    width?: string;
    spacing?: number;
    padding?: number | string;
    highlightOnHover?: boolean;
}

function ToggleButtons(props: ToggleButtonsProps) {
    const { buttons, highlightOnHover = true, color } = props;

    return (
        <StyledToggleButtonGroup {...props}>
            {buttons.map((button, index) => (
                <ToggleButton
                    key={index}
                    highlightOnHover={highlightOnHover}
                    color={color}
                    {...button}
                />
            ))}
        </StyledToggleButtonGroup>
    );
}

export default ToggleButtons;
