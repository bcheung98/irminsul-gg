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
    index = 0,
}: CharacterSkillScalingProps) {
    if (skill && !Array.isArray(skill)) {
        skill = [skill];
    }

    const maxLevel = 15;

    const currentStatDisplay =
        useStore(useSettingsStore, (state) => state.statDisplay) || "slider";
    const [mode, setMode] = useState<SkillDisplay>(currentStatDisplay);

    useEffect(() => {
        setMode(currentStatDisplay);
    }, [currentStatDisplay]);

    return (
        <Dropdown
            title="Skill Scaling"
            iconColor={color}
            contentPadding={mode === "slider" ? "16px 24px" : "4px 0px"}
        >
            {skill?.map((skl, index) => {
                const data = skl.scaling?.map((subScaling) =>
                    subScaling.slice(0, maxLevel + 1)
                )!;
                const levels = data.length > 0 ? data[0].length - 1 : maxLevel;
                const initialLevel =
                    data.length > 0 ? Math.min(10, data[0].length - 1) : 10;
                return (
                    <Stack spacing={1} key={index}>
                        {skill.length > 1 && <Text>{skl.name}</Text>}
                        <StatsTable
                            mode={mode}
                            levels={range(1, levels)}
                            data={data}
                            headColumns={["Level", ...range(1, levels)]}
                            sliderProps={{
                                initialValue: initialLevel,
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
                                            ? { sm: "100%", md: "50%" }
                                            : "max-content",
                                    maxWidth:
                                        mode === "slider"
                                            ? { lg: "550px" }
                                            : "100%",
                                    mt: "8px",
                                },
                            }}
                            textID={`character-skill-value-${index}`}
                        />
                    </Stack>
                );
            })}
        </Dropdown>
    );
}
