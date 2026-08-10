// Component imports
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";
import FlexBox from "@/components/FlexBox";
import RatingCalculatorStatInput from "./RatingCalculatorStatInput";

// MUI imports
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// Helper imports
import { range } from "@/utils";
import { useRatingCalculatorStore } from "@/stores";
import { specialties } from "@/data/uma/common";

export default function RatingCalculatorStats() {
    const { setStat } = useRatingCalculatorStore();

    const resetStats = () => {
        range(0, 4).map((i) => setStat(i, 0));
    };

    return (
        <Stack spacing={2} sx={{ px: 1 }}>
            <FlexBox sx={{ justifyContent: "space-between" }}>
                <Text variant="h6" weight="highlight">
                    Stats
                </Text>
                <Button
                    color="info"
                    variant="contained"
                    size="small"
                    onClick={resetStats}
                >
                    Reset Stats
                </Button>
            </FlexBox>
            <Grid container spacing={2}>
                {specialties.slice(0, 5).map((stat, index) => (
                    <Grid key={stat} size={{ xs: "auto", xl: "grow" }}>
                        <Stack spacing={1}>
                            <TextLabel
                                title={stat}
                                icon={`uma/icons/specialties/${stat}`}
                            />
                            <RatingCalculatorStatInput index={index} />
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
