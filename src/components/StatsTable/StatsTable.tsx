import { useState, useEffect } from "react";

// Component imports
import FlexBox from "../FlexBox";
import * as Table from "../Table";
import Slider from "../Slider";
import Text from "../Text";

// MUI imports
import { useTheme, SxProps } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Type imports
import { Orientation, SkillDisplay } from "@/types";

interface StatsTableProps {
    mode?: SkillDisplay;
    levels: (string | number)[];
    data: (string | number)[][];
    headColumns?: (string | number)[];
    orientation?: Orientation;
    sliderProps?: {
        initialValue?: number;
        sx?: SxProps;
    };
    tableProps?: {
        width?: string | number;
        sx?: SxProps;
    };
    textID?: string;
}

export default function StatsTable({
    mode = "slider",
    levels,
    data,
    headColumns,
    orientation = "row",
    sliderProps,
    tableProps,
    textID = "text-value",
}: StatsTableProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const [sliderValue, setSliderValue] = useState(
        sliderProps?.initialValue || levels.length
    );
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    useEffect(() => {
        const targets = document.getElementsByClassName(textID);
        data.forEach((subScaling: (string | number)[], index: number) => {
            const target = targets[index];
            if (target) {
                target.innerHTML = subScaling[sliderValue].toString();
            }
        });
    }, [sliderValue]);

    const tableHeadData = headColumns || data.map((row) => row[0]);
    const tableRows =
        orientation === "row"
            ? data
            : levels.map((_, level) => data.map((row) => row[level + 1]));
    const sliderRows = data.filter((row) => row[0] !== "Level");

    return (
        <Stack spacing={2}>
            {levels.length > 1 && (
                <FlexBox
                    sx={{
                        display: mode === "slider" ? "flex" : "none",
                        flexWrap: { xs: "wrap", md: "nowrap" },
                    }}
                >
                    <Text sx={{ minWidth: "60px" }}>
                        Lv. {levels[sliderValue - 1]}
                    </Text>
                    <Slider
                        value={sliderValue}
                        step={1}
                        min={1}
                        max={levels.length}
                        onChange={handleSliderChange}
                        size={matches ? "medium" : "small"}
                        sx={sliderProps?.sx}
                    />
                </FlexBox>
            )}
            <Table.Container
                component={Card}
                sx={Object.assign(
                    { width: mode === "slider" ? "30%" : "100%" },
                    tableProps?.sx
                )}
            >
                <Table.Root>
                    {mode === "table" && <Table.Head data={tableHeadData} />}
                    <Table.Body>
                        {mode === "slider"
                            ? sliderRows.map((row, i) => (
                                  <Table.Row key={i}>
                                      <Table.Cell
                                          align="left"
                                          label={{ title: row[0] }}
                                          padding="8px 16px"
                                      />
                                      <Table.Cell
                                          align="right"
                                          label={{ title: row[sliderValue] }}
                                          padding="8px 16px"
                                      />
                                  </Table.Row>
                              ))
                            : tableRows.map((row, i) => (
                                  <Table.Row key={i} hover>
                                      {row.map((level, index) => (
                                          <Table.Cell
                                              key={`${row[0]}-${index}`}
                                              label={{ title: level }}
                                          />
                                      ))}
                                  </Table.Row>
                              ))}
                    </Table.Body>
                </Table.Root>
            </Table.Container>
        </Stack>
    );
}
