import { useState } from "react";

// Component imports
import MaterialGrid from "@/components/MaterialGrid";
import Text from "@/components/Text";
import Slider from "@/components/Slider";
import LevelUpSlider from "@/components/LevelUpSlider";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";

// Helper imports
import { useGameTag } from "@/context";
import levelData from "@/data/levels";
import { costs } from "@/helpers/costs";

// Type imports
import { Materials } from "@/types/materials";

interface LevelUpCostsProps {
    levelKey: string;
    costKey: string;
    materials: Materials;
    title?: string;
    color?: string;
    iconSize?: number;
    threshold?: string;
    element?: string;
    rarity?: number;
}

export default function LevelUpCosts({
    levelKey,
    costKey,
    materials,
    title = "",
    color,
    iconSize = 56,
    threshold = "@100",
    element,
    rarity = 3,
}: LevelUpCostsProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));

    const game = useGameTag();

    if (game === "genshin" && element) {
        materials = { ...materials, gemstone: element };
    }

    const levels = levelData[game](levelKey, rarity);
    const minDistance = 1;
    const maxValue = levels.length;
    const [values, setValues] = useState([1, maxValue]);
    const handleSliderChange = (
        _: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], maxValue - minDistance);
                setValues([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance + 1);
                setValues([clamped - minDistance, clamped]);
            }
        } else {
            setValues(newValue);
        }
    };
    const marks = levels.map((level, index) => ({
        value: index + 1,
        label: (
            <Text
                variant={values.includes(index + 1) ? "subtitle1" : "subtitle2"}
                sx={{
                    userSelect: "none",
                    opacity: values.includes(index + 1)
                        ? { "@": 0, [threshold]: 1 }
                        : { "@": 0, [threshold]: 0.25 },
                }}
            >
                {level}
            </Text>
        ),
    }));

    const slider = (
        <Slider
            value={values}
            marks={marks}
            min={1}
            max={maxValue}
            onChange={handleSliderChange}
            disableSwap
            size={matches ? "small" : "medium"}
            sx={{
                color: color || theme.palette.info.main,
            }}
        />
    );

    const materialCosts = costs[game][costKey]({
        start: values[0],
        stop: values[1],
        selected: true,
        withXP: false,
        materials: materials,
        rarity: rarity,
    });

    return (
        <Stack spacing={1}>
            <Text variant="h6" weight="highlight">
                {title}
            </Text>
            <Stack
                spacing={levels.length > 0 ? 2 : 0}
                sx={{ containerType: "inline-size" }}
            >
                <MaterialGrid costs={materialCosts} size={iconSize} />
                {levels.length > 0 && (
                    <LevelUpSlider
                        slider={slider}
                        values={[levels[values[0] - 1], levels[values[1] - 1]]}
                        threshold={threshold}
                    />
                )}
            </Stack>
        </Stack>
    );
}
