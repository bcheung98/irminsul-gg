// Component imports
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";
import Image from "@/components/Image";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Helper imports
import { toTitleCase } from "@/utils";

// Type imports
import { UmaCharacterAptitude } from "@/types/uma/character";

export default function CharacterAptitude({
    aptitude,
}: {
    aptitude: UmaCharacterAptitude;
}) {
    const theme = useTheme();

    return (
        <Stack spacing={1}>
            {Object.entries(aptitude).map(([category, values]) => (
                <Grid
                    key={category}
                    container
                    spacing={1}
                    sx={{ alignItems: "baseline" }}
                >
                    <Grid size={{ xs: 12, md: "grow" }}>
                        <Text
                            variant="subtitle1"
                            weight="highlight"
                            sx={{
                                textAlign: {
                                    xs: "left",
                                    md: "center",
                                },
                            }}
                        >
                            {formatTitle(category)}
                        </Text>
                    </Grid>
                    <Grid size={{ xs: 12, md: 10, lg: 10.5 }}>
                        <FlexBox spacing={1} wrap>
                            {Object.entries(values).map(([apt, rank]) => (
                                <Card
                                    key={apt}
                                    sx={{
                                        p: "2px 8px",
                                        backgroundColor: theme.background(0),
                                        width: "96px",
                                    }}
                                >
                                    <FlexBox
                                        spacing={1}
                                        sx={{
                                            justifyContent: "space-around",
                                        }}
                                    >
                                        <Text
                                            variant="body2"
                                            weight="highlight"
                                        >
                                            {formatTitle(apt)}
                                        </Text>
                                        <Image
                                            src={`uma/ranks/${rank}`}
                                            size={20}
                                            responsive
                                        />
                                    </FlexBox>
                                </Card>
                            ))}
                        </FlexBox>
                    </Grid>
                </Grid>
            ))}
        </Stack>
    );
}

function formatTitle(apt: string) {
    switch (apt) {
        case "short":
            return "Sprint";
        case "surface":
            return "Track";
        case "distance":
            return "Distance";
        case "strategy":
            return "Style";
        default:
            return toTitleCase(apt);
    }
}
