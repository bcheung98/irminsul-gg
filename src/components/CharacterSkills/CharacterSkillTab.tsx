import { useEffect, useState } from "react";

// Component imports
import Text from "@/components/Text";
import CharacterSkillDescription from "./CharacterSkillDescription";
import CharacterSkillScaling from "./CharacterSkillScaling";
import CharacterSkillLevelUp from "./CharacterSkillLevelUp";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { range } from "@/utils";
import { useGameTag, useSkillContext, useSkillVersionContext } from "@/context";
import { useTextColor } from "@/helpers/styles";
import { skillKeys } from "@/data/skills";

// Type imports
import { CharacterSkillProps } from "./CharacterSkills.types";
import { CharacterSkillsList } from "@/types/skill";

export default function CharacterSkillTab({
    skillKey,
    keywords,
    materials,
    attributes,
}: CharacterSkillProps) {
    const theme = useTheme();

    const game = useGameTag();
    const buffs = useSkillVersionContext();
    const textColor = useTextColor(theme.text);

    const skillsContext = useSkillContext();
    let skills: CharacterSkillsList | undefined;
    if (skillsContext) {
        skills = skillsContext;
    }

    if (skills && skills[skillKey]) {
        let skill = skills[skillKey];
        if (buffs && buffs.value !== "v1" && skill.length > 1) {
            skill = skill.filter(
                (skill) => skill.version?.value === buffs.value
            );
        } else {
            skill = skill.filter((skill) => !skill.version);
        }

        // HSR specific
        const initialValue =
            skillKey === "attack" || skillKey.startsWith("memo") ? 6 : 10;
        const maxLevel =
            skillKey === "attack" || skillKey.startsWith("memo") ? 7 : 12;
        const [sliderValue, setSliderValue] = useState(initialValue);
        const handleSliderChange = (_: Event, newValue: number | number[]) => {
            setSliderValue(newValue as number);
        };
        const levels = range(1, maxLevel);
        const scaling = skills[skillKey]
            .map((skill) => skill.scaling || [])
            .flat();
        const targets = document.getElementsByClassName(
            "character-skill-value"
        );
        useEffect(() => {
            scaling.forEach((subScaling: string[], index: number) => {
                let target = targets[index];
                if (target) {
                    target.innerHTML = subScaling[sliderValue - 1];
                }
            });
        }, [sliderValue]);

        return (
            <Stack spacing={3}>
                <Stack spacing={2}>
                    <Text weight="highlight" sx={{ color: theme.text.header }}>
                        {skillKeys[game][skillKey]}
                    </Text>
                    <Stack spacing={2}>
                        {skill?.map((skl, index) => (
                            <CharacterSkillDescription
                                key={`${skillKey}-${index}`}
                                skill={skl}
                                skillKey={skillKey}
                                keywords={keywords}
                                attributes={attributes}
                                levels={levels}
                                sliderValue={sliderValue}
                                handleSliderChange={handleSliderChange}
                            />
                        ))}
                    </Stack>
                </Stack>
                <Stack spacing={2}>
                    {game !== "hsr" && !["technique"].includes(skillKey) && (
                        <CharacterSkillScaling
                            skill={skill}
                            color={textColor(game, attributes.element)}
                        />
                    )}
                    {!["altsprint", "technique"].includes(skillKey) && (
                        <CharacterSkillLevelUp
                            materials={materials}
                            color={textColor(game, attributes.element)}
                            attributes={attributes}
                            skillKey={skillKey}
                        />
                    )}
                </Stack>
            </Stack>
        );
    } else {
        return <></>;
    }
}
