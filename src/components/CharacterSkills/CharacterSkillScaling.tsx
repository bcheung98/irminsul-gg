import { useEffect, useState } from "react";

// Component imports
import Dropdown from "@/components/Dropdown";
import StatsTable from "@/components/StatsTable";
import Text from "@/components/Text";

// MUI imports
import Stack from "@mui/material/Stack";

// Helper imports
import { range } from "@/utils";
import { useStore, useSettingsStore } from "@/stores";
import { useGameTag } from "@/context";

// Type imports
import { CharacterSkillScalingProps } from "./CharacterSkills.types";
import { SkillDisplay } from "@/types";

export default function CharacterSkillScaling({
    skill,
    initialValue,
    maxLevel,
    color,
}: CharacterSkillScalingProps) {
    const game = useGameTag();

    const currentStatDisplay =
        useStore(useSettingsStore, (state) => state.statDisplay) || "slider";
    const [mode, setMode] = useState<SkillDisplay>(currentStatDisplay);

    useEffect(() => {
        setMode(currentStatDisplay);
    }, [currentStatDisplay]);

    const [sliderValue, setSliderValue] = useState(initialValue);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const Root = (
        <Stack
            spacing={3}
            sx={{
                maxHeight: "840px",
                overflowY: "auto",
                scrollbarWidth: "thin",
                scrollbarGutter: "stable",
            }}
        >
            {skill.map((skl, index) => {
                if (!skl.scaling) return null;
                const data = skl.scaling.map((subScaling) =>
                    subScaling.slice(0, maxLevel + 1)
                )!;
                return (
                    <Stack spacing={1} key={index}>
                        {(skill.length > 1 || game === "zzz") && (
                            <Text variant="h6" weight="highlight">
                                {skl.name}
                            </Text>
                        )}
                        <StatsTable
                            mode={mode}
                            levels={range(1, maxLevel)}
                            data={data}
                            headColumns={["Level", ...range(1, maxLevel)]}
                            sliderValue={sliderValue}
                            handleSliderChange={handleSliderChange}
                            sliderProps={{
                                sx: {
                                    minWidth: "100px",
                                    maxWidth: "500px",
                                    mx: "8px",
                                    color: color,
                                },
                            }}
                            tableProps={{
                                sx: {
                                    width:
                                        mode === "slider"
                                            ? { sm: "100%", md: "100%" }
                                            : "100%",
                                    maxWidth:
                                        mode === "slider"
                                            ? { lg: "100%" }
                                            : "100%",
                                    mt: "8px",
                                },
                            }}
                            textID={`character-skill-value-${index}`}
                        />
                    </Stack>
                );
            })}
        </Stack>
    );

    const title = "Skill Scaling";

    return (
        <Stack>
            <Stack
                sx={{
                    display: {
                        xs: "block",
                        md: mode === "table" ? "block" : "none",
                    },
                }}
            >
                <Dropdown
                    title={title}
                    textVariant="body1"
                    iconColor={color}
                    contentPadding={mode === "slider" ? "8px 24px" : "8px 0px"}
                >
                    {Root}
                </Dropdown>
            </Stack>
            <Stack
                sx={{
                    display: {
                        xs: "none",
                        md: mode === "slider" ? "block" : "none",
                    },
                }}
                spacing={2}
            >
                <Text weight="highlight">{title}</Text>
                {Root}
            </Stack>
        </Stack>
    );
}
