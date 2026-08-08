// Component imports
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";
import RatingCalculatorStatInput from "./RatingCalculatorStatInput";

// MUI imports
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

// Helper imports
import { specialties } from "@/data/uma/common";

export default function RatingCalculatorStats() {
    return (
        <Stack spacing={1} sx={{ px: 1 }}>
            <Text variant="h6" weight="highlight">
                Stats
            </Text>
            <Grid container spacing={2}>
                {specialties.slice(0, 5).map((stat, index) => (
                    <Grid key={stat} size={{ xs: "auto", xl: "grow" }}>
                        <Stack spacing={1}>
                            <TextLabel
                                title={stat}
                                icon={`uma/icons/specialties/${stat}`}
                            />
                            <RatingCalculatorStatInput
                                index={index}
                                value={0}
                            />
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
