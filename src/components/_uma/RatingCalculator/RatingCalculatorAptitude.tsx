// Component imports
import RatingCalculatorAptitudeSelect from "./RatingCalculatorAptitudeSelect";
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";

// MUI imports
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

// Helper imports
import useStore, { useRatingCalculatorStore } from "@/stores";
import { formatAptitude } from "@/helpers/uma/formatTitle";

// Type imports
import { UmaRank } from "@/types/uma";

export default function RatingCalculatorAptitude() {
    const aptitude = useStore(
        useRatingCalculatorStore,
        (state) => state.aptitude,
    );

    if (!aptitude) return <></>;

    return (
        <Stack spacing={1} sx={{ px: 1 }}>
            <Text variant="h6" weight="highlight">
                Aptitude
            </Text>
            {entries(aptitude).map(([category, values]) => (
                <Grid
                    key={category}
                    container
                    spacing={1}
                    alignItems="baseline"
                >
                    <Grid size={{ xs: 12, md: 1, xl: 1.5 }}>
                        <Text variant="subtitle1" weight="highlight">
                            {formatAptitude(category)}
                        </Text>
                    </Grid>
                    <Grid size={{ xs: 12, md: 10 }}>
                        <FlexBox spacing={1} wrap>
                            {entries(values).map(([apt]) => (
                                <RatingCalculatorAptitudeSelect
                                    key={apt}
                                    category={category}
                                    apt={`${apt}`}
                                    value={aptitude[category][apt] as UmaRank}
                                />
                            ))}
                        </FlexBox>
                    </Grid>
                </Grid>
            ))}
        </Stack>
    );
}

function entries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
}
