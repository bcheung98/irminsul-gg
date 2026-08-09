import { useEffect, useState } from "react";

// Component imports
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import RatingBadge from "../RatingBadge";
import RatingCalculatorScoreBreakdown from "./RatingCalculatorScoreBreakdown";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useRatingCalculatorStore } from "@/stores";
import {
    calculateRank,
    calculateTotalSkillScore,
    calculateStatsScore,
    calculateUniqueLevelScore,
} from "@/helpers/uma/calculator";

// Type imports
import { ValueArray } from "@/types/uma/calculator";

export default function RatingCalculatorScore({
    mini = false,
}: {
    mini?: boolean;
}) {
    const theme = useTheme();

    const size = mini ? 48 : 64;

    const { aptitude, stats, skills, hiddenSkills } =
        useRatingCalculatorStore();

    const [values, setValues] = useState<ValueArray>([[0, 0, 0, 0, 0], 0, 0]);

    useEffect(() => {
        let statsScore = [],
            uniqueScore = 0,
            skillScore = 0;
        statsScore = calculateStatsScore(stats);
        uniqueScore = calculateUniqueLevelScore(stats[5], stats[6]);
        skillScore = calculateTotalSkillScore(aptitude, skills, hiddenSkills);
        setValues([statsScore, uniqueScore, skillScore]);
    }, [
        JSON.stringify(aptitude),
        JSON.stringify(stats),
        JSON.stringify(skills),
        JSON.stringify(hiddenSkills),
    ]);

    const rating = values.flat().reduce((a, c) => a + c);
    const { rank, min, nextRank, threshold } = calculateRank(rating);

    return (
        <Card
            sx={{
                width: mini ? "100%" : { xs: "100%", sm: "50%", xl: "75%" },
                p: 2,
                border: mini ? `1px solid ${theme.border.color.primary}` : 0,
                borderRadius: theme.contentBox.border.radius,
                backgroundColor: {
                    xs: theme.background(mini ? 1 : 0),
                    xl: theme.background(0),
                },
                zIndex: 1,
            }}
        >
            <Stack spacing={2} divider={<Divider />}>
                <Stack spacing={1}>
                    <FlexBox
                        spacing={2}
                        sx={{
                            alignItems: "flex-start",
                            justifyContent: mini ? "space-between" : "left",
                        }}
                    >
                        <Card
                            sx={{
                                border: `1px solid ${theme.border.color.primary}`,
                                borderRadius:
                                    theme.contentBox.border.radius *
                                    (mini ? 1 : 2),
                                backgroundColor: theme.background(1, "light"),
                                p: 1,
                            }}
                        >
                            <RatingBadge rank={rank} size={size} />
                        </Card>
                        <Stack sx={{ textAlign: mini ? "right" : "left" }}>
                            <Text
                                variant={mini ? "body2" : "body1"}
                                weight="highlight"
                            >
                                Projected Rating:
                            </Text>
                            <Text
                                variant={mini ? "h4" : "h2"}
                                weight="highlight"
                            >
                                {rating.toLocaleString("en-US")}
                            </Text>
                        </Stack>
                    </FlexBox>
                    <Stack spacing={0.5}>
                        <LinearProgress
                            variant="determinate"
                            color="info"
                            value={((rating - min) / (threshold - min)) * 100}
                            sx={{
                                borderRadius: "8px",
                                height: "8px",
                                backgroundColor: {
                                    xs: theme.background(mini ? 0 : 2, "light"),
                                    xl: theme.background(2, "light"),
                                },
                                "& .MuiLinearProgress-bar": {
                                    transition: "200ms",
                                    backgroundImage: `linear-gradient(to right, ${theme.palette.info.dark} 30%, ${theme.palette.info.light})`,
                                },
                            }}
                        />
                        <FlexBox sx={{ justifyContent: "space-between" }}>
                            <Text
                                variant={mini ? "subtitle2" : "subtitle1"}
                                weight="highlight"
                            >
                                {`${nextRank} in ${threshold - rating} points`}
                            </Text>
                            <Text
                                variant={mini ? "subtitle2" : "subtitle1"}
                                weight="highlight"
                            >
                                {`${threshold.toLocaleString("en-US")}`}
                            </Text>
                        </FlexBox>
                    </Stack>
                </Stack>
                {!mini && (
                    <RatingCalculatorScoreBreakdown
                        stats={stats}
                        values={values}
                    />
                )}
            </Stack>
        </Card>
    );
}
