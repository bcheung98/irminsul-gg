// Component imports
import TextLabel from "@/components/TextLabel";
import RatingCalculatorLevelSelect from "./RatingCalculatorLevelSelect";

// MUI imports
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

export default function RatingCalculatorLevel() {
    return (
        <Grid container spacing={4} sx={{ px: 1 }}>
            <Grid size="auto">
                <Stack spacing={1}>
                    <TextLabel title="Star Level" />
                    <RatingCalculatorLevelSelect levels={[1, 5]} index={5} />
                </Stack>
            </Grid>
            <Grid size="auto">
                <Stack spacing={1}>
                    <TextLabel title="Unique Skill Level" />
                    <RatingCalculatorLevelSelect levels={[1, 6]} index={6} />
                </Stack>
            </Grid>
        </Grid>
    );
}
