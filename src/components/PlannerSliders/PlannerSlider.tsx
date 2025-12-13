import { memo, useCallback, useEffect, useState } from "react";

// Component imports
import FlexBox from "@/components/FlexBox";
import Slider from "@/components/Slider";
import Switch from "@/components/Switch";
import Text from "@/components/Text";
import Image from "@/components/Image";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

// Helper imports
import { useGameTag } from "@/context";
import { skillKeys } from "@/data/skills";
import { usePlannerStore } from "@/stores";

// Type imports
import { PlannerSliderProps } from "./PlannerSlider.types";
import { GameNoUma } from "@/types";

const threshold = "@500";

const PlannerSlider = memo(function PlannerSlider({
    mode,
    type,
    id,
    skillKey,
    icon,
    levels,
    values,
    materials,
    color,
}: PlannerSliderProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));

    const game = useGameTag() as GameNoUma;

    const setItemValues = usePlannerStore()[`${game}/setItemValues`];

    const title = skillKeys[game][skillKey] || "Level";

    const [selected, setSelected] = useState(values.selected);
    const handleSelect = () => {
        setSelected(!selected);
    };

    const minDistance = 1;
    const maxValue = levels.length;
    const [sliderValue, setSliderValue] = useState([values.start, values.stop]);
    const handleSliderChange = useCallback(
        (_: Event, newValue: number | number[], activeThumb: number) => {
            if (!Array.isArray(newValue)) {
                return;
            }
            if (newValue[1] - newValue[0] < minDistance) {
                if (activeThumb === 0) {
                    const clamped = Math.min(
                        newValue[0],
                        maxValue - minDistance
                    );
                    setSliderValue(() => [clamped, clamped + minDistance]);
                } else {
                    const clamped = Math.max(newValue[1], minDistance + 1);
                    setSliderValue(() => [clamped - minDistance, clamped]);
                }
            } else {
                setSliderValue(() => newValue);
            }
        },
        []
    );

    const marks = levels.map((level, index) => ({
        value: index + 1,
        label: (
            <Text
                variant={sliderValue.includes(index + 1) ? "body1" : "body2"}
                weight={
                    sliderValue.includes(index + 1) ? "highlight" : "primary"
                }
                sx={{
                    userSelect: "none",
                    opacity: sliderValue.includes(index + 1)
                        ? { "@": 0, [threshold]: 1 }
                        : { "@": 0, [threshold]: 0.25 },
                }}
            >
                {level}
            </Text>
        ),
    }));

    useEffect(() => {
        setItemValues({
            id,
            skillKey,
            values: {
                start: sliderValue[0],
                stop: sliderValue[1],
                selected,
            },
        });
    }, [sliderValue, selected]);

    return (
        <Stack
            spacing={1}
            sx={{ containerType: "inline-size", userSelect: "none" }}
        >
            <FlexBox spacing={1}>
                {type === "characters" && (
                    <Switch
                        checked={selected}
                        onChange={handleSelect}
                        size="small"
                        switchColor={color}
                        sx={{ display: mode === "edit" ? "flex" : "none" }}
                    />
                )}
                {icon && (
                    <Image
                        src={icon}
                        size={40}
                        responsive
                        responsiveSize={0.2}
                        style={{
                            opacity: selected ? 1 : 0.35,
                            padding: game === "zzz" ? 0 : "4px",
                            borderRadius: "64px",
                            border:
                                game === "zzz"
                                    ? "1px solid black"
                                    : `2px solid ${theme.border.color.primary}`,
                            backgroundColor: theme.iconBackground.primary,
                        }}
                        tooltip={mode === "view" ? title : ""}
                    />
                )}
                {mode === "edit" ? (
                    <Text
                        weight="highlight"
                        sx={{ opacity: selected ? 1 : 0.35 }}
                    >
                        {title}
                    </Text>
                ) : (
                    <Text
                        weight="highlight"
                        sx={{
                            opacity: selected ? 1 : 0.35,
                            textTransform: "capitalize",
                        }}
                    >
                        {skillKey === "level" && `Level: `}
                        {selected
                            ? `${levels[sliderValue[0] - 1]} → ${
                                  levels[sliderValue[1] - 1]
                              }`
                            : "---"}
                    </Text>
                )}
            </FlexBox>
            <Grid
                container
                columnSpacing={3.5}
                sx={{
                    display: mode === "edit" ? "flex" : "none",
                    opacity: selected ? 1 : 0.35,
                    px: {
                        "@": matches ? 2 : 0,
                        [threshold]: 2,
                    },
                    alignItems: "center",
                }}
            >
                <Grid
                    size={1}
                    sx={{
                        display: { "@": "flex", [threshold]: "none" },
                        mb: 3,
                    }}
                >
                    <Text weight="highlight">{levels[sliderValue[0] - 1]}</Text>
                </Grid>
                <Grid size="grow">
                    <Slider
                        disabled={!selected}
                        value={sliderValue}
                        marks={marks}
                        min={1}
                        max={maxValue}
                        onChange={handleSliderChange}
                        disableSwap
                        size={matches ? "small" : "medium"}
                        sx={{ color: color }}
                    />
                </Grid>
                <Grid
                    size={1}
                    sx={{
                        display: { "@": "flex", [threshold]: "none" },
                        mb: 3,
                    }}
                >
                    <Text weight="highlight">{levels[sliderValue[1] - 1]}</Text>
                </Grid>
            </Grid>
        </Stack>
    );
});

export default PlannerSlider;
