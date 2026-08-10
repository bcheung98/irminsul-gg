// Component imports
import TextLabel from "@/components/TextLabel";
import RatingCalculatorLevelSelect from "./RatingCalculatorLevelSelect";

// MUI imports
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

// Helper imports
import { useRatingCalculatorStore } from "@/stores";
import { useTEHelperData } from "../TEHelper/TEHelper.utils";

export default function RatingCalculatorLevel() {
    const { characters } = useTEHelperData();
    const { character, stats } = useRatingCalculatorStore();

    return (
        <Grid container spacing={4} sx={{ px: 1 }}>
            <Grid size="auto">
                <Stack spacing={1}>
                    <TextLabel title="Star Level" />
                    <RatingCalculatorLevelSelect
                        levels={[
                            characters.find((c) => character === c.id)
                                ?.rarity || 3,
                            5,
                        ]}
                        index={5}
                    />
                </Stack>
            </Grid>
            <Grid size="auto">
                <Stack spacing={1}>
                    <TextLabel title="Unique Skill Level" />
                    <RatingCalculatorLevelSelect
                        levels={[1, Math.max(4, stats[5] + 1)]}
                        index={6}
                    />
                </Stack>
            </Grid>
        </Grid>
    );
}
