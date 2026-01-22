import { useEffect, useState } from "react";

// Component imports
import Text from "@/components/Text";
import SkillCard from "@/components/SkillCard";
import CharacterSkillDescription from "./CharacterSkillDescription";
import CharacterSkillScaling from "./CharacterSkillScaling";
import CharacterSkillLevelUp from "./CharacterSkillLevelUp";
import CharacterBonusStats from "../_wuwa/CharacterBonusStats";
import CharacterPassives from "../_wuwa/CharacterPassives";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

// Helper imports
import { range } from "@/utils";
import { useGameTag, useSkillContext, useSkillVersionContext } from "@/context";
import { useStore, useSettingsStore } from "@/stores";
import { useTextColor } from "@/helpers/styles";
import { skillKeys } from "@/data/skills";

// Type imports
import { CharacterSkillProps } from "./CharacterSkills.types";
import { CharacterSkillsList } from "@/types/skill";
import { SkillDisplay } from "@/types";

export default function CharacterSkillTab({
    skillKey,
    keywords,
    materials,
    attributes,
}: CharacterSkillProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));

    const game = useGameTag();

    const textColor = useTextColor(theme.text);
    const color =
        attributes.colors?.accent || textColor(game, attributes.element);

    const currentStatDisplay =
        useStore(useSettingsStore, (state) => state.statDisplay) || "slider";
    const [mode, setMode] = useState<SkillDisplay>(currentStatDisplay);

    useEffect(() => {
        setMode(currentStatDisplay);
    }, [currentStatDisplay]);

    const skillVersion = useSkillVersionContext();
    const skillsContext = useSkillContext();
    let skills: CharacterSkillsList | undefined;
    if (skillsContext) {
        skills = skillsContext;
    }

    if (skills && skills[skillKey]) {
        let skill = skills[skillKey];
        if (skillVersion && skillVersion.value !== "v1" && skill.length > 1) {
            skill = skill.filter(
                (skill) => skill.version?.value === skillVersion.value,
            );
        } else {
            skill = skill.filter((skill) => !skill.version);
        }

        let initialValue = 10;
        let maxLevel = 10;
        if (game === "genshin") {
            initialValue = skillKey === "altsprint" ? 1 : 10;
            maxLevel = skillKey === "altsprint" ? 1 : 15;
        }
        if (game === "hsr") {
            initialValue =
                skillKey === "attack" || skillKey.startsWith("memo") ? 6 : 10;
            maxLevel =
                skillKey === "attack" || skillKey.startsWith("memo") ? 7 : 12;
        }
        if (game === "zzz") {
            switch (skillKey) {
                case "core":
                    initialValue = 7;
                    maxLevel = 7;
                    break;
                case "A":
                case "C":
                    initialValue = 10;
                    maxLevel = 10;
                    break;
                case "B":
                    initialValue = 5;
                    maxLevel = 5;
                    break;
                default:
                    initialValue = 12;
                    maxLevel = 16;
                    break;
            }
        }
        if (game === "endfield") {
            initialValue = 12;
            maxLevel = 12;
        }

        const [sliderValue, setSliderValue] = useState(initialValue);
        const handleSliderChange = (_: Event, newValue: number | number[]) => {
            setSliderValue(newValue as number);
        };
        const levels = range(1, maxLevel);
        const scaling = skill.map((skill) => skill.scaling || []).flat();
        const targets = document.getElementsByClassName(
            game === "zzz"
                ? "character-skill-value-0"
                : "character-skill-value",
        );
        useEffect(() => {
            scaling.forEach((subScaling: string[], index: number) => {
                let target = targets[index];
                if (target) {
                    target.innerHTML = subScaling[sliderValue - 1];
                }
            });
        }, [skillVersion.value, sliderValue]);

        const LevelUp = ![
            "altsprint",
            "technique",
            "outro",
            "break",
            "A",
            "B",
            "C",
        ].includes(skillKey) ? (
            <Stack sx={{ px: { xs: 0, md: 1 } }}>
                <CharacterSkillLevelUp
                    materials={materials}
                    color={color}
                    attributes={attributes}
                    skillKey={skillKey}
                />
            </Stack>
        ) : (
            <></>
        );

        const SkillScaling =
            game !== "hsr" && !["outro", "core", "break"].includes(skillKey) ? (
                <Grid size={{ xs: 12, md: mode === "slider" ? 5 : 12 }}>
                    <CharacterSkillScaling
                        skill={skill}
                        initialValue={initialValue}
                        maxLevel={maxLevel}
                        color={color}
                    />
                </Grid>
            ) : (
                <></>
            );

        const WuWaExtraSkillInfo = !["outro", "break"].includes(skillKey) ? (
            skillKey === "forte" ? (
                <CharacterPassives
                    attributes={attributes}
                    materials={materials}
                    keywords={keywords}
                />
            ) : (
                <CharacterBonusStats
                    attributes={attributes}
                    skillKey={skillKey}
                    materials={materials}
                />
            )
        ) : null;

        return (
            <Stack spacing={2} divider={<Divider />}>
                <Stack spacing={2}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: "grow" }}>
                            <Stack spacing={2}>
                                <Text
                                    weight="highlight"
                                    sx={{ color: theme.text.header }}
                                >
                                    {skillKeys[game][skillKey]}
                                </Text>
                                <Grid
                                    container
                                    spacing={2}
                                    sx={{
                                        maxHeight: "840px",
                                        overflowY: "auto",
                                        scrollbarWidth: "thin",
                                        scrollbarGutter: "stable",
                                    }}
                                >
                                    {skill.map(
                                        (skl, index) =>
                                            skl.description && (
                                                <SkillCard
                                                    key={`${skillKey}-${index}`}
                                                    size={12}
                                                >
                                                    <CharacterSkillDescription
                                                        skill={skl}
                                                        skillKey={skillKey}
                                                        keywords={keywords}
                                                        attributes={attributes}
                                                        levels={levels}
                                                        sliderValue={
                                                            sliderValue
                                                        }
                                                        handleSliderChange={
                                                            handleSliderChange
                                                        }
                                                        index={index}
                                                    />
                                                </SkillCard>
                                            ),
                                    )}
                                </Grid>
                                {matches && mode === "slider" && LevelUp}
                            </Stack>
                        </Grid>
                        {SkillScaling}
                    </Grid>
                    {(!matches || mode === "table") && LevelUp}
                </Stack>
                {game === "wuwa" && WuWaExtraSkillInfo}
            </Stack>
        );
    } else {
        return (
            <Text variant="h6" weight="highlight">
                Could not find skill
            </Text>
        );
    }
}
