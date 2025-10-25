import { alpha, styled } from "@mui/material";
import MuiSwitch from "@mui/material/Switch";

interface SwitchProps {
    switchColor?: string;
}

const Switch = styled(MuiSwitch, {
    shouldForwardProp: (prop) => prop !== "switchColor",
})<SwitchProps>(({ theme, switchColor }) => ({
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

export default Switch;
