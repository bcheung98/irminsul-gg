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

// Type imports
import { CharacterSkillScalingProps } from "./CharacterSkills.types";
import { SkillDisplay } from "@/types";

export default function CharacterSkillScaling({
    skill,
    color,
}: CharacterSkillScalingProps) {
    const maxLevel = skill.map((skl) =>
        skl.scaling ? skl.scaling[0].length - 1 : 1
    )[0];
    const initialLevel = Math.min(10, maxLevel);

    const currentStatDisplay =
        useStore(useSettingsStore, (state) => state.statDisplay) || "slider";
    const [mode, setMode] = useState<SkillDisplay>(currentStatDisplay);

    useEffect(() => {
        setMode(currentStatDisplay);
    }, [currentStatDisplay]);

    const [sliderValue, setSliderValue] = useState(initialLevel);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const Root = (
        <Stack spacing={3}>
            {skill.map((skl, index) => {
                if (!skl.scaling) {
                    return <></>;
                }
                const data = skl.scaling.map((subScaling) =>
                    subScaling.slice(0, maxLevel + 1)
                )!;
                const levels = data.length > 0 ? data[0].length - 1 : maxLevel;
                return (
                    <Stack spacing={1} key={index}>
                        {skill.length > 1 && (
                            <Text variant="h6" weight="highlight">
                                {skl.name}
                            </Text>
                        )}
                        <StatsTable
                            mode={mode}
                            levels={range(1, levels)}
                            data={data}
                            headColumns={["Level", ...range(1, levels)]}
                            sliderValue={sliderValue}
                            handleSliderChange={handleSliderChange}
                            sliderProps={{
                                sx: {
                                    minWidth: "100px",
                                    maxWidth: "500px",
                                    ml: "8px",
                                    color: color,
                                },
                            }}
                            tableProps={{
                                sx: {
                                    width:
                                        mode === "slider"
                                            ? { sm: "100%", md: "100%" }
                                            : "max-content",
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
            <Stack sx={{ display: { xs: "block", md: "none" } }}>
                <Dropdown
                    title={title}
                    iconColor={color}
                    contentPadding={mode === "slider" ? "8px 24px" : "8px 0px"}
                >
                    {Root}
                </Dropdown>
            </Stack>
            <Stack sx={{ display: { xs: "none", md: "block" } }} spacing={2}>
                <Text weight="highlight">{title}</Text>
                {Root}
            </Stack>
        </Stack>
    );
}
