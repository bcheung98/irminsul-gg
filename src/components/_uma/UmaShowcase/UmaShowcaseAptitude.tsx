// Component imports
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";
import Image from "@/components/Image";

// MUI imports
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Helper imports
import { toTitleCase } from "@/utils";

// Type imports
import { UmaCharacterAptitude } from "@/types/uma/character";

export default function UmaShowcaseAptitude({
    aptitude,
}: {
    aptitude: UmaCharacterAptitude;
}) {
    return (
        <Stack spacing={1} sx={{ px: 2, pb: 2 }}>
            {Object.entries(aptitude).map(([category, values]) => (
                <Grid
                    key={category}
                    container
                    spacing={2}
                    sx={{ alignItems: "baseline" }}
                >
                    <Grid size="grow">
                        <Text
                            weight="highlight"
                            sx={{
                                textAlign: "center",
                                color: "rgb(121, 64, 22)",
                            }}
                        >
                            {formatTitle(category)}
                        </Text>
                    </Grid>
                    <Grid size={10}>
                        <Grid container spacing={1}>
                            {Object.entries(values).map(([apt, rank]) => (
                                <Grid key={apt} size={3}>
                                    <Card
                                        sx={{
                                            p: "2px 8px",
                                            backgroundColor: "white",
                                            border: `1px solid rgb(226, 212, 199)`,
                                        }}
                                    >
                                        <FlexBox>
                                            <FlexBox
                                                sx={{
                                                    justifyContent: "center",
                                                    width: "75%",
                                                }}
                                            >
                                                <Text
                                                    weight="highlight"
                                                    sx={{
                                                        color: "rgb(121, 64, 22)",
                                                    }}
                                                >
                                                    {formatTitle(apt)}
                                                </Text>
                                            </FlexBox>
                                            <FlexBox>
                                                <Image
                                                    src={`uma/ranks/${rank}`}
                                                    alt={`${rank}`}
                                                    style={{
                                                        width: "24px",
                                                        height: "auto",
                                                    }}
                                                />
                                            </FlexBox>
                                        </FlexBox>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
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
