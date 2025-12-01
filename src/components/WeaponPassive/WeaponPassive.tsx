import { useEffect, useState } from "react";

// Component imports
import SkillDescription from "@/components/SkillDescription";
import Text from "@/components/Text";
import Slider from "@/components/Slider";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";

// Helper imports
import { useGameTag } from "@/context";
import { range } from "@/utils";

// Type imports
import { TWeaponStats } from "@/components/StatsDisplay/StatsDisplay.types";

export default function WeaponPassive({ stats }: { stats: TWeaponStats }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const game = useGameTag();

    const { passive } = stats;
    const className = "weapon-passive-value";

    const [sliderValue, setSliderValue] = useState(0);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const marks = range(5).map((level) => ({
        value: level,
        label: (
            <Text
                variant={sliderValue === level ? "subtitle1" : "subtitle2"}
                weight={sliderValue === level ? "highlight" : "primary"}
                sx={{
                    userSelect: "none",
                    opacity: sliderValue === level ? 1 : 0.25,
                }}
            >
                {level + 1}
            </Text>
        ),
    }));

    if (passive) {
        useEffect(() => {
            const targets = document.getElementsByClassName(className);
            passive.scaling?.forEach(
                (subScaling: (string | number)[], index: number) => {
                    const target = targets[index];
                    if (target) {
                        target.innerHTML = subScaling[sliderValue].toString();
                    }
                }
            );
        }, [sliderValue]);

        return (
            <Stack spacing={2}>
                <Card sx={{ p: 2, backgroundColor: theme.background(0) }}>
                    <Stack spacing={1}>
                        <Text weight="highlight">{passive.name}</Text>
                        <Text
                            component="span"
                            variant="subtitle1"
                            sx={{
                                color: theme.text.description,
                            }}
                        >
                            <SkillDescription
                                game={game}
                                description={passive.description}
                                targetClassName={
                                    game === "hsr"
                                        ? "text-value"
                                        : "text-refinement"
                                }
                                newClassName={className}
                            />
                        </Text>
                    </Stack>
                </Card>
                {passive.scaling && (
                    <Box sx={{ width: { xs: "90%", md: "30vw" } }}>
                        <Slider
                            value={sliderValue}
                            marks={marks}
                            step={1}
                            min={0}
                            max={4}
                            onChange={handleSliderChange}
                            size={matches ? "medium" : "small"}
                            sx={{
                                minWidth: "100px",
                                maxWidth: "200px",
                                ml: 2,
                            }}
                        />
                    </Box>
                )}
            </Stack>
        );
    } else {
        return <></>;
    }
}
