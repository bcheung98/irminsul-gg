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
import type {
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

    const shouldShowSkill = (key: UmaSkillKey) => {
        if (skills[key]?.length === 0) return false;
        if (key === "evo") return server === "Asia";
        return true;
    };

    return (
        <ContentBox header="Skills">
            <Grid container spacing={2}>
                {Object.entries(skills).map(
                    ([key, skills]) =>
                        shouldShowSkill(key as UmaSkillKey) && (
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
                                    {key !== "evo" ? (
                                        <Skill
                                            skillKey={key as UmaSkillKey}
                                            skills={skills}
                                        />
                                    ) : (
                                        <EvoSkill skills={skills} />
                                    )}
                                </Stack>
                            </Grid>
                        ),
                )}
            </Grid>
        </ContentBox>
    );
}

function formatTitle(key: string) {
    return key === "evo" ? "Evolved" : toTitleCase(key);
}

function Skill({
    skillKey,
    skills,
}: {
    skillKey: UmaSkillKey;
    skills: number[];
}) {
    return (
        <Grid container spacing={2}>
            {skills.map((skill, index) => (
                <Grid key={index} size={12}>
                    <SkillInfo skillID={skill} expand={skillKey === "unique"} />
                </Grid>
            ))}
        </Grid>
    );
}

function EvoSkill({ skills }: { skills: UmaCharacterEvoSkill[] }) {
    return (
        <Stack spacing={4}>
            {skills.map((skill, index) => (
                <Stack key={index} spacing={0.5}>
                    <SkillEvoConditions conditions={skill.conditions} />
                    {[skill.old, skill.new].map((s, i) => (
                        <Grid
                            key={i}
                            container
                            columnSpacing={2}
                            alignItems="center"
                        >
                            <Grid size={i === 0 ? { xs: 10, sm: 4 } : 12}>
                                <SkillInfo skillID={s} expand={Boolean(i)} />
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
}
