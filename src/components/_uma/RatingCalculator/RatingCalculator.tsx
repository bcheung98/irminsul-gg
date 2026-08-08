// Component imports
import Text from "@/components/Text";
import RatingCalculatorCharacterSelect from "./RatingCalculatorCharacterSelect";
import RatingCalculatorStats from "./RatingCalculatorStats";
import RatingCalculatorAptitude from "./RatingCalculatorAptitude";
import RatingCalculatorLevel from "./RatingCalculatorLevel";
import RatingCalculatorScore from "./RatingCalculatorScore";
import RatingCalculatorScoreFab from "./RatingCalculatorScoreFab";
import RatingCalculatorSkills from "./RatingCalculatorSkills";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grow from "@mui/material/Grow";

export default function RatingCalculator() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("xl"));

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 200,
    });

    return (
        <>
            <Stack spacing={2} sx={{ p: 1 }}>
                <Text variant="h5" weight="highlight">
                    Rating Calculator
                </Text>
                <Card
                    sx={{
                        p: 2,
                        backgroundColor: theme.palette.error.dark,
                    }}
                >
                    <Text weight="highlight">
                        This feature is currently in beta, so there might be
                        things that are broken. Please let me know in the
                        Discord if there's anything wrong!
                    </Text>
                </Card>
                <Card
                    sx={{
                        p: 2,
                        borderRadius: theme.contentBox.border.radius,
                        overflow: "unset", // Required for sticky element
                    }}
                >
                    <Stack spacing={2} divider={<Divider />}>
                        <Grid container spacing={2}>
                            <Grid size="grow">
                                <Stack
                                    spacing={2}
                                    divider={<Divider />}
                                    sx={{ display: "unset" }}
                                >
                                    <Grid
                                        container
                                        spacing={2}
                                        sx={{
                                            justifyContent: {
                                                xs: "space-between",
                                                md: "left",
                                            },
                                        }}
                                    >
                                        <RatingCalculatorCharacterSelect />
                                        <RatingCalculatorScore />
                                    </Grid>
                                    <RatingCalculatorLevel />
                                    <RatingCalculatorStats />
                                    <RatingCalculatorAptitude />
                                    <Grow in={trigger}>
                                        <Box
                                            sx={{
                                                display: {
                                                    xs: "none",
                                                    xl: "flex",
                                                },
                                                position: "sticky",
                                                top: "96px",
                                            }}
                                        >
                                            <Box sx={{ width: "100%" }}></Box>
                                            <Box sx={{ width: "75%" }}>
                                                <RatingCalculatorScore mini />
                                            </Box>
                                        </Box>
                                    </Grow>
                                </Stack>
                            </Grid>
                            <Grid size={{ xs: 12, xl: "auto" }}>
                                <Divider
                                    orientation={
                                        matches ? "vertical" : "horizontal"
                                    }
                                />
                            </Grid>
                            <Grid size="grow">
                                <RatingCalculatorSkills />
                            </Grid>
                        </Grid>
                    </Stack>
                </Card>
            </Stack>
            <RatingCalculatorScoreFab />
        </>
    );
}
