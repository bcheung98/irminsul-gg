// Component imports
import ContentBox from "@/components/ContentBox";
import Text from "@/components/Text";
import SkillInfo from "../SkillInfo";
import SkillEvoConditions from "../SkillEvoConditions";

// MUI imports
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Helper imports
import { useStore, useServerStore } from "@/stores";
import { toTitleCase } from "@/utils";

// Type imports
import {
    UmaCharacterEvoSkill,
    UmaCharacterSkills,
    UmaSkillKey,
} from "@/types/uma/character";

export default function CharacterSkills({
    skills,
}: {
    skills: UmaCharacterSkills;
}) {
    const server = useStore(useServerStore, (state) => state.uma);

    const showSkill = (key: UmaSkillKey) => {
        if (skills[key]?.length === 0) return false;
        if (key === "evo") return server === "Asia";
        return true;
    };

    const renderSkill = (key: UmaSkillKey, skills: number[]) => (
        <Grid container spacing={2}>
            {skills.map((skill, index) => (
                <Grid key={index} size={12}>
                    <SkillInfo skillID={skill} expand={key === "unique"} />
                </Grid>
            ))}
        </Grid>
    );

    const renderEvoSkill = (skills: UmaCharacterEvoSkill[]) => (
        <Stack spacing={4}>
            {skills.map((skill, index) => (
                <Stack key={index} spacing={0.5}>
                    <SkillEvoConditions skillID={skill.new} />
                    {Object.values(skill)
                        .reverse()
                        .map((s, i) => (
                            <Grid
                                key={i}
                                container
                                columnSpacing={2}
                                alignItems="center"
                            >
                                <Grid size={i === 0 ? { xs: 10, sm: 4 } : 12}>
                                    <SkillInfo
                                        skillID={s}
                                        expand={Boolean(i)}
                                    />
                                </Grid>
                                <Grid size="auto">
                                    {i == 0 && <Text>❯❯❯</Text>}
                                </Grid>
                            </Grid>
                        ))}
                </Stack>
            ))}
        </Stack>
    );

    return (
        <ContentBox header="Skills">
            <Grid container spacing={2}>
                {Object.entries(skills).map(
                    ([key, skills]) =>
                        showSkill(key as UmaSkillKey) && (
                            <Grid
                                key={key}
                                size={
                                    ["unique", "evo"].includes(key)
                                        ? 12
                                        : { xs: 12, sm: 6, md: 4 }
                                }
                            >
                                <Stack spacing={1}>
                                    <Text weight="highlight">
                                        {`${formatTitle(key)} Skills`}
                                        {server === "NA" &&
                                            key === "evo" &&
                                            " (JP server only)"}
                                    </Text>
                                    {key !== "evo"
                                        ? renderSkill(
                                              key as UmaSkillKey,
                                              skills as number[]
                                          )
                                        : renderEvoSkill(
                                              skills as UmaCharacterEvoSkill[]
                                          )}
                                </Stack>
                            </Grid>
                        )
                )}
            </Grid>
        </ContentBox>
    );
}

function formatTitle(key: string) {
    return key === "evo" ? "Evolved" : toTitleCase(key);
}
