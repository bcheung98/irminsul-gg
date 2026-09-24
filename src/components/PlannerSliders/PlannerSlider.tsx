import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
import type { PlannerSliderProps } from "./PlannerSlider.types";
import type { GameNoUma } from "@/types";

const THRESHOLD = "@500";

export default function PlannerSlider({
    mode,
    type,
    id,
    skillKey,
    icon,
    levels,
    values,
    title,
    color,
}: PlannerSliderProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));

    const game = useGameTag() as GameNoUma;

    const setItemValues = usePlannerStore(
        (state) => state[`${game}/setItemValues`],
    );

    const label = title ?? skillKeys[game][skillKey] ?? "Level";

    const [selected, setSelected] = useState(values.selected);
    const handleSelect = () => {
        const nextSelected = !selected;

        setSelected(nextSelected);

        const [start, stop] = sliderValueRef.current;

        setItemValues({
            id,
            skillKey,
            values: {
                start,
                stop,
                selected: nextSelected,
            },
        });
    };

    const minDistance = 1;
    const maxValue = levels.length;

    const clampSliderValue = (
        newValue: number[],
        activeThumb: number,
    ): number[] => {
        if (newValue[1] - newValue[0] >= minDistance) {
            return newValue;
        }

        if (activeThumb === 0) {
            const clamped = Math.min(newValue[0], maxValue - minDistance);

            return [clamped, clamped + minDistance];
        }

        const clamped = Math.max(newValue[1], minDistance + 1);

        return [clamped - minDistance, clamped];
    };

    const [sliderValue, setSliderValue] = useState([values.start, values.stop]);

    const sliderValueRef = useRef(sliderValue);

    const handleSliderChange = useCallback(
        (_: Event, newValue: number | number[], activeThumb: number) => {
            if (!Array.isArray(newValue)) return;

            const nextValue = clampSliderValue(newValue, activeThumb);

            sliderValueRef.current = nextValue;
            setSliderValue(nextValue);
        },
        [maxValue],
    );

    const handleSliderCommit = useCallback(() => {
        const [start, stop] = sliderValueRef.current;

        setItemValues({
            id,
            skillKey,
            values: { start, stop, selected },
        });
    }, [id, skillKey, selected, setItemValues]);

    const marks = useMemo(
        () =>
            levels.map((level, index) => {
                const value = index + 1;
                const active = sliderValue.includes(value);

                return {
                    value,
                    label: (
                        <Text
                            variant={active ? "body1" : "body2"}
                            weight={active ? "highlight" : "primary"}
                            sx={{
                                userSelect: "none",
                                opacity: active
                                    ? { "@": 0, [THRESHOLD]: 1 }
                                    : { "@": 0, [THRESHOLD]: 0.25 },
                            }}
                        >
                            {level}
                        </Text>
                    ),
                };
            }),
        [levels, sliderValue],
    );

    const initialized = usePlannerStore(
        (state) =>
            state[`${game}/items`].find((item) => item.id === id)?.values[
                skillKey
            ] !== undefined,
    );

    useEffect(() => {
        if (initialized) return;

        setItemValues({
            id,
            skillKey,
            values: {
                start: values.start,
                stop: values.stop,
                selected: values.selected,
            },
        });
    }, [
        initialized,
        id,
        skillKey,
        values.start,
        values.stop,
        values.selected,
        setItemValues,
    ]);

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
                        tooltip={mode === "view" ? label : ""}
                        supressLoadImageWarning
                    />
                )}
                {mode === "edit" ? (
                    <Text
                        weight="highlight"
                        sx={{ opacity: selected ? 1 : 0.35 }}
                    >
                        {label}
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
                        [THRESHOLD]: 2,
                    },
                    alignItems: "center",
                }}
            >
                <Grid
                    size={1}
                    sx={{
                        display: { "@": "flex", [THRESHOLD]: "none" },
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
                        onChangeCommitted={handleSliderCommit}
                        disableSwap
                        size={matches ? "small" : "medium"}
                        sx={{
                            color,
                            "& .MuiSlider-thumb, & .MuiSlider-track": {
                                transition: "none",
                            },
                        }}
                    />
                </Grid>
                <Grid
                    size={1}
                    sx={{
                        display: { "@": "flex", [THRESHOLD]: "none" },
                        mb: 3,
                    }}
                >
                    <Text weight="highlight">{levels[sliderValue[1] - 1]}</Text>
                </Grid>
            </Grid>
        </Stack>
    );
}
