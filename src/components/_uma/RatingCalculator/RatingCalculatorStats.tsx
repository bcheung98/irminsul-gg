// Component imports
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";
import FlexBox from "@/components/FlexBox";
import InfoButton from "@/components/InfoButton";
import RatingCalculatorStatInput from "./RatingCalculatorStatInput";

// MUI imports
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import ReplayIcon from "@mui/icons-material/Replay";

// Helper imports
import { range } from "@/utils";
import { useRatingCalculatorStore } from "@/stores";
import { specialties } from "@/data/uma/common";

export default function RatingCalculatorStats() {
    const setStat = useRatingCalculatorStore((state) => state.setStat);

    const resetStats = () => {
        range(0, 4).map((i) => setStat(i, 0));
    };

    return (
        <Stack spacing={2} sx={{ px: 1 }}>
            <FlexBox sx={{ justifyContent: "space-between" }}>
                <Text variant="h6" weight="highlight">
                    Stats
                </Text>
                <InfoButton
                    title="Reset Stats"
                    size="small"
                    onClick={resetStats}
                    icons={{ start: ReplayIcon }}
                />
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
