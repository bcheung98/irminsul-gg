import { useState } from "react";

// Component imports
import Text from "@/components/Text";
import ContentDialog from "@/components/ContentDialog";
import RatingCalculatorCharacterSelect from "./RatingCalculatorCharacterSelect";
import RatingCalculatorStats from "./RatingCalculatorStats";
import RatingCalculatorAptitude from "./RatingCalculatorAptitude";
import RatingCalculatorLevel from "./RatingCalculatorLevel";
import RatingCalculatorScore from "./RatingCalculatorScore";
import RatingCalculatorScoreFab from "./RatingCalculatorScoreFab";
import RatingCalculatorSkills from "./RatingCalculatorSkills";
import UmaShowcase from "../UmaShowcase";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";
import IosShareIcon from "@mui/icons-material/IosShare";

export default function RatingCalculator() {
    const theme = useTheme();
    const matches_up_xl = useMediaQuery(theme.breakpoints.up("xl"));
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"));

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 200,
    });

    const [open, setOpen] = useState(false);
    const handleDialogOpen = () => {
        setOpen(true);
    };
    const handleDialogClose = () => {
        setOpen(false);
    };

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
                    <Text variant="subtitle1" weight="highlight">
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
                            <Grid size={{ xs: 12, xl: 5.5 }}>
                                <Stack
                                    spacing={2}
                                    divider={<Divider />}
                                    sx={{ display: "unset" }} // Required for sticky element
                                >
                                    <Button
                                        color="info"
                                        variant="contained"
                                        size="small"
                                        startIcon={<IosShareIcon />}
                                        onClick={handleDialogOpen}
                                    >
                                        Generate Showcase Card
                                    </Button>
                                    <Grid
                                        container
                                        spacing={4}
                                        sx={{
                                            justifyContent: {
                                                xs: "space-between",
                                                md: "left",
                                            },
                                            pl: 2,
                                        }}
                                    >
                                        <RatingCalculatorCharacterSelect />
                                        <RatingCalculatorScore />
                                    </Grid>
                                    <RatingCalculatorLevel />
                                    <RatingCalculatorStats />
                                    <RatingCalculatorAptitude />
                                    {matches_up_xl && (
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
                                                <Box
                                                    sx={{ width: "100%" }}
                                                ></Box>
                                                <Box sx={{ width: "100%" }}>
                                                    <RatingCalculatorScore
                                                        mini
                                                    />
                                                </Box>
                                            </Box>
                                        </Grow>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid size={{ xs: 12, xl: 0.1 }}>
                                <Divider
                                    orientation={
                                        matches_up_xl
                                            ? "vertical"
                                            : "horizontal"
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
            <ContentDialog
                open={open}
                setOpen={setOpen}
                onClose={handleDialogClose}
                header="Save Showcase Card"
                fullScreen={!matches_up_sm}
                maxWidth="md"
                scroll="paper"
            >
                <UmaShowcase />
            </ContentDialog>
        </>
    );
}
