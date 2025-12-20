import { useState } from "react";

// Component imports
import Text from "@/components/Text";
import Slider from "@/components/Slider";
import StatsTable from "@/components/StatsTable";
import * as Table from "@/components/Table";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Helper imports
import { range, toTitleCase } from "@/utils";

// Type imports
import { AttributeData } from "@/types";
import { UmaCharacterStats } from "@/types/uma/character";

export default function CharacterStats({
    stats,
    attributes,
}: {
    stats: UmaCharacterStats;
    attributes: AttributeData;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const { rarity = 3 } = attributes;

    const levels = range(rarity, 5).map((i) => i);

    const title = (stat: keyof UmaCharacterStats) => {
        let res = toTitleCase(stat);
        let growth = stats[stat].slice(-1)[0];
        if (!matches && growth) res += ` (+${growth}%)`;
        return `${res}|uma/icons/specialties/${toTitleCase(stat)}`;
    };

    const data = Object.entries(stats).map(([stat, values]) => [
        title(stat as keyof UmaCharacterStats),
        ...levels.map((_, index) => values[index]),
    ]);

    const [sliderValue, setSliderValue] = useState(1);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const marks = levels.map((rarity, index) => ({
        value: index + 1,
        label: (
            <Text
                variant={sliderValue === index + 1 ? "subtitle1" : "subtitle2"}
                sx={{
                    userSelect: "none",
                    opacity: sliderValue === index + 1 ? 1 : 0.25,
                }}
            >
                {rarity}★
            </Text>
        ),
    }));

    return (
        <Stack spacing={2}>
            {matches ? (
                <Box sx={{ maxWidth: "500px" }}>
                    <Table.Container component={Card}>
                        <Table.Root>
                            <Table.Head
                                data={data.map((stat) => stat[0])}
                                iconSize={20}
                            />
                            <Table.Body>
                                <Table.Row>
                                    {data.map((stat) => (
                                        <Table.Cell
                                            key={stat[0]}
                                            label={{
                                                title: stat[sliderValue],
                                                titleProps: {
                                                    variant: "h6",
                                                },
                                            }}
                                            padding="8px"
                                        />
                                    ))}
                                </Table.Row>
                                <Table.Row>
                                    {Object.entries(stats).map(
                                        ([stat, values]) => (
                                            <Table.Cell
                                                key={stat}
                                                label={{
                                                    title: `+${
                                                        values.slice(-1)[0]
                                                    }%`,
                                                }}
                                            />
                                        )
                                    )}
                                </Table.Row>
                            </Table.Body>
                        </Table.Root>
                    </Table.Container>
                </Box>
            ) : (
                <StatsTable
                    hideSlider
                    mode="slider"
                    levels={levels}
                    data={data}
                    orientation="column"
                    sliderValue={sliderValue || levels.length}
                    handleSliderChange={handleSliderChange}
                    tableProps={{
                        sx: {
                            width: { xs: "100%", sm: "50%" },
                        },
                    }}
                />
            )}
            <Box>
                <Slider
                    value={sliderValue}
                    step={1}
                    min={1}
                    max={levels.length}
                    marks={marks}
                    onChange={handleSliderChange}
                    size={matches ? "medium" : "small"}
                    sx={{
                        minWidth: "100px",
                        maxWidth: "250px",
                        mx: "8px",
                    }}
                />
            </Box>
        </Stack>
    );
}
