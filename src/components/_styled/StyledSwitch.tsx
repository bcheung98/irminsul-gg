import { alpha, styled, Switch } from "@mui/material";

interface StyledSwitchProps {
    switchColor?: string;
}

export const StyledSwitch = styled(Switch, {
    shouldForwardProp: (prop) => prop !== "switchColor",
})<StyledSwitchProps>(({ theme, switchColor }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
        color: switchColor,
        "&:hover": {
            backgroundColor: alpha(
                switchColor || theme.palette.primary.main,
                0
            ),
        },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: switchColor,
    },
}));
