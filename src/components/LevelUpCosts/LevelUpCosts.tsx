import { useState } from "react";

// Component imports
import MaterialCard from "../MaterialCard";
import Text from "../Text";
import Slider from "../Slider";
import LevelUpSlider from "../LevelUpSlider";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// Helper imports
import { objectKeys } from "@/utils";
import levelData from "@/data/levels";

// Type imports
import { Materials } from "@/types/materials";

interface LevelUpCostsProps {
    tag: string;
    materials: Materials;
    text?: string;
    color?: string;
    iconSize?: number;
    threshold?: string;
}

export default function LevelUpCosts({
    tag,
    materials,
    text = "",
    color,
    iconSize = 64,
    threshold = "@100",
}: LevelUpCostsProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));

    const [game, key] = tag.split("/");

    const levels = levelData[game](key);
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
                variant={values.includes(index + 1) ? "body1" : "body2"}
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

    return (
        <Stack spacing={1}>
            <Text variant="h6">{text}</Text>
            <Box sx={{ containerType: "inline-size" }}>
                <Grid
                    container
                    spacing={2}
                    sx={{ mb: levels.length > 0 ? "16px" : "0px" }}
                >
                    {objectKeys(materials).map((material, index) => (
                        <MaterialCard
                            key={index}
                            game={game}
                            name={`${materials[material]}`}
                            cost={0}
                            size={iconSize}
                        />
                    ))}
                </Grid>
                {levels.length > 0 && (
                    <LevelUpSlider
                        slider={slider}
                        values={[levels[values[0] - 1], levels[values[1] - 1]]}
                        threshold={threshold}
                    />
                )}
            </Box>
        </Stack>
    );
}
