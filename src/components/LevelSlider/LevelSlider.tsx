// Component imports
import FlexBox from "@/components/FlexBox";
import Slider from "@/components/Slider";
import Text from "@/components/Text";

// MUI imports
import { useTheme, SxProps } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Type imports
import { SkillDisplay } from "@/types";

export default function LevelSlider({
    mode,
    levels,
    value,
    handleSliderChange,
    sx,
}: {
    mode: SkillDisplay;
    levels: (string | number)[];
    value: number;
    handleSliderChange: (_: Event, newValue: number | number[]) => void;
    sx?: SxProps;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <FlexBox
            sx={{
                display: mode === "slider" ? "flex" : "none",
                flexWrap: { xs: "wrap", md: "nowrap" },
            }}
        >
            <Text weight="highlight" sx={{ minWidth: "60px" }}>
                Lv. {levels[value - 1]}
            </Text>
            <Slider
                value={value}
                step={1}
                min={1}
                max={levels.length}
                onChange={handleSliderChange}
                size={matches ? "medium" : "small"}
                sx={sx}
            />
        </FlexBox>
    );
}
