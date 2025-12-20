import { styled } from "@mui/material";
import MuiSlider from "@mui/material/Slider";

const Slider = styled(MuiSlider)(() => ({
    height: 4,
    "& .MuiSlider-track": {
        border: "none",
    },
    "& .MuiSlider-thumb": {
        "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
            boxShadow: "inherit",
        },
        "&:before": {
            display: "none",
        },
    },
}));

export default Slider;
