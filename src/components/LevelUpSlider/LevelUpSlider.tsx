// Component imports
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";

interface LevelUpSliderProps {
    slider: React.ReactNode;
    values: [number | string, number | string];
    threshold?: string;
}

function LevelUpSlider({
    slider,
    values,
    threshold = "@100",
}: LevelUpSliderProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Grid
            container
            spacing={3.5}
            sx={{
                px: {
                    "@": matches ? "16px" : "0px",
                    [threshold]: "16px",
                },
                alignItems: "center",
                maxWidth: { lg: "500px" },
            }}
        >
            <Grid
                size={1}
                sx={{
                    display: { "@": "flex", [threshold]: "none" },
                    mb: "24px",
                }}
            >
                <Text>{values[0]}</Text>
            </Grid>
            <Grid size="grow">{slider}</Grid>
            <Grid
                size={1}
                sx={{
                    display: { "@": "flex", [threshold]: "none" },
                    mb: "24px",
                }}
            >
                <Text>{values[1]}</Text>
            </Grid>
        </Grid>
    );
}

export default LevelUpSlider;
