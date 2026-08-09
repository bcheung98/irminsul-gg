// Component imports
import Dropdown from "@/components/Dropdown";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { stats as statTypes } from "@/data/uma/common";
import { useRatingCalculatorStore } from "@/stores";

// Type imports
import { DataArray, ValueArray } from "@/types/uma/calculator";

export default function RatingCalculatorScoreBreakdown({
    stats,
    values,
}: {
    stats: DataArray;
    values: ValueArray;
}) {
    const theme = useTheme();

    const { skills, hiddenSkills } = useRatingCalculatorStore();

    const sum = (a: number, c: number) => a + c;
    const statsScore = values[0].reduce(sum);
    const uniqueScore = values[1];
    const skillsScore = values[2];

    const [statsPercent, skillsPercent, uniquePercent] = getPerfectPercentages([
        statsScore,
        skillsScore,
        uniqueScore,
    ]);

    const { value, valueBuffer } = getValues(
        statsPercent,
        skillsPercent,
        uniquePercent,
    );

    const categories = [
        {
            label: "Stats",
            value: statsPercent,
            color: theme.palette.warning.light,
        },
        {
            label: "Skills",
            value: skillsPercent,
            color: theme.palette.info.main,
        },
        {
            label: "Unique Lvl",
            value: uniquePercent,
            color: theme.palette.error.main,
        },
    ].sort((a, b) => b.value - a.value);
    const colors = categories.map((item) => item.color);

    return (
        <Dropdown
            title="Score Breakdown"
            textVariant="body1"
            reverse
            rotate={[180, 0]}
            contentPadding={"4px 0 0 0"}
        >
            <Stack spacing={2}>
                <Stack spacing={0.5} divider={<Divider />}>
                    <FlexBox sx={{ justifyContent: "space-between" }}>
                        <Text variant="subtitle1" weight="highlight">
                            {`Stats: (${stats
                                .slice(0, 5)
                                .reduce(sum)
                                .toLocaleString("en-US")})`}
                        </Text>
                        <Text variant="subtitle1" weight="highlight">
                            {`${statsScore.toLocaleString("en-US")}`}
                        </Text>
                    </FlexBox>
                    {statTypes.map((stat, index) => (
                        <FlexBox
                            key={stat}
                            sx={{ justifyContent: "space-between", pl: 2 }}
                        >
                            <TextLabel
                                title={`${stat} (${stats[index].toLocaleString("en-US")}):`}
                                titleProps={{ variant: "subtitle1" }}
                                icon={`uma/icons/specialties/${stat}`}
                                iconProps={{ size: 20 }}
                            />
                            <Text variant="subtitle1" weight="highlight">
                                {`(${values[0][index].toLocaleString("en-US")})`}
                            </Text>
                        </FlexBox>
                    ))}
                    <FlexBox sx={{ justifyContent: "space-between" }}>
                        <Text variant="subtitle1" weight="highlight">
                            {`Lv ${stats[6]} Unique Skill (${stats[5]}★):`}
                        </Text>
                        <Text variant="subtitle1" weight="highlight">
                            {`${uniqueScore.toLocaleString("en-US")}`}
                        </Text>
                    </FlexBox>
                    <FlexBox sx={{ justifyContent: "space-between" }}>
                        <Text variant="subtitle1" weight="highlight">
                            {`Skills (${skills.length - hiddenSkills.length}):`}
                        </Text>
                        <Text variant="subtitle1" weight="highlight">
                            {`${skillsScore.toLocaleString("en-US")}`}
                        </Text>
                    </FlexBox>
                </Stack>
                <Stack spacing={1}>
                    <Text weight="highlight">Score Contribution</Text>
                    <LinearProgress
                        variant="buffer"
                        value={value}
                        valueBuffer={valueBuffer}
                        color="info"
                        sx={{
                            borderRadius: "8px",
                            height: "8px",
                            backgroundColor: theme.background(2, "light"),
                            "& .MuiLinearProgress-bar": {
                                transition: "200ms",
                                backgroundColor: colors[0],
                            },
                            "& .MuiLinearProgress-bar2": {
                                transition: "200ms",
                                backgroundColor: colors[1],
                            },
                            "& .MuiLinearProgress-dashed": {
                                transition: "200ms",
                                animation: "none",
                                backgroundImage: `none`,
                                backgroundColor: colors[2],
                            },
                        }}
                    />
                    <FlexBox spacing={4}>
                        {categories.map((category) => (
                            <FlexBox key={category.label} spacing={1}>
                                <div
                                    style={{
                                        width: "8px",
                                        height: "8px",
                                        backgroundColor:
                                            category.color ||
                                            theme.text.primary,
                                        borderRadius: "4px",
                                    }}
                                />
                                <Text variant="subtitle1" weight="highlight">
                                    {category.label}
                                </Text>
                                <Text
                                    variant="subtitle1"
                                    sx={{
                                        color: theme.text.description,
                                    }}
                                >
                                    {`${category.value}%`}
                                </Text>
                            </FlexBox>
                        ))}
                    </FlexBox>
                </Stack>
            </Stack>
        </Dropdown>
    );
}

function getPerfectPercentages(
    numbers: number[],
    decimalPlaces: number = 1,
): number[] {
    const total = numbers.reduce((sum, val) => sum + val, 0);
    if (total === 0) {
        return numbers.map(() => 0);
    }
    const multiplier = 10 ** decimalPlaces;
    const target = 100 * multiplier;
    const seats = numbers.map((num) => {
        const precise = (num / total) * target;
        return {
            floor: Math.floor(precise),
            remainder: precise - Math.floor(precise),
        };
    });
    const currentSum = seats.reduce((sum, item) => sum + item.floor, 0);
    const difference = target - currentSum;
    const sortedIndices = seats
        .map((item, index) => ({
            index,
            remainder: item.remainder,
        }))
        .sort((a, b) => b.remainder - a.remainder);
    for (let i = 0; i < difference; i++) {
        seats[sortedIndices[i].index].floor += 1;
    }
    return seats.map((item) => item.floor / multiplier);
}

function getValues(a: number, b: number, c: number) {
    return {
        value: Math.max(a, b, c),
        valueBuffer: 100 - Math.min(a, b, c),
    };
}
