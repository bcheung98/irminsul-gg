import { useEffect } from "react";

// Component imports
import LevelSlider from "@/components/LevelSlider";
import * as Table from "@/components/Table";

// MUI imports
import { SxProps } from "@mui/material/styles";
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
    sliderValue: number;
    handleSliderChange: (_: Event, newValue: number | number[]) => void;
    sliderProps?: {
        sx?: SxProps;
    };
    tableProps?: {
        width?: string | number;
        sx?: SxProps;
    };
    textID?: string;
    hideSlider?: boolean;
}

export default function StatsTable({
    mode = "slider",
    levels,
    data,
    headColumns,
    orientation = "row",
    sliderValue,
    handleSliderChange,
    sliderProps,
    tableProps,
    textID = "text-value",
    hideSlider = false,
}: StatsTableProps) {
    useEffect(() => {
        const targets = document.getElementsByClassName(textID);
        data.forEach((subScaling: (string | number)[], index: number) => {
            const target = targets[index] as HTMLElement;
            if (target) {
                if (target.dataset.index) {
                    target.innerHTML =
                        data[Number(target.dataset.index)][
                            sliderValue
                        ].toString();
                } else {
                    target.innerHTML = subScaling[sliderValue].toString();
                }
            }
        });
    }, [data, sliderValue]);

    const tableHeadData = headColumns || data.map((row) => row[0]);
    const tableRows =
        orientation === "row"
            ? data
            : levels.map((_, level) => data.map((row) => row[level + 1]));
    const sliderRows = data.filter((row) => row[0] !== "Level");

    return (
        <Stack spacing={2}>
            {!hideSlider && mode === "slider" && levels.length > 1 && (
                <LevelSlider
                    mode={mode}
                    levels={levels}
                    value={sliderValue}
                    handleSliderChange={handleSliderChange}
                    sx={sliderProps?.sx}
                />
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
