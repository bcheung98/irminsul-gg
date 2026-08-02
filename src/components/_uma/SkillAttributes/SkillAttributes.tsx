// Component imports
import SkillDetails from "@/components/_uma/SkillDetails";
import SkillSources from "@/components/_uma/SkillSources";
import SkillVersions from "@/components/_uma/SkillVersions";
import SkillEvo from "@/components/_uma/SkillEvo";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Helper imports
import { useUmaContext } from "@/context";
import { useStore, useServerStore } from "@/stores";

// Type imports
import { UmaSkill } from "@/types/uma/skill";

export default function SkillAttributes({
    skill,
    showSources = false,
    handleClick,
}: {
    skill: UmaSkill;
    showSources?: boolean;
    handleClick: (arg: any) => void;
}) {
    const theme = useTheme();

    const server = useStore(useServerStore, (state) => state.uma);

    const { skills } = useUmaContext();
    let skillVersions = skill.versions || [];
    if (server === "NA") {
        skillVersions = skillVersions.filter(
            (v) => skills.find((skill) => skill.id === v)?.global,
        );
    }
    if (skill.evo) skillVersions = [skill.evo.old];

    return (
        <Stack spacing={2}>
            <Grid container rowSpacing={1} columnSpacing={2}>
                <Grid size={{ xs: 12, lg: "grow" }}>
                    <Stack spacing={2}>
                        <SkillDetails skill={skill} />
                        {showSources && (
                            <SkillSources
                                skill={skill}
                                backgroundColor={theme.background(0)}
                            />
                        )}
                    </Stack>
                </Grid>
                {(skillVersions.length > 0 ||
                    (skill.evolutions && skill.evolutions.length > 0)) && (
                    <Grid size={{ xs: 12, lg: 5 }}>
                        <Stack spacing={2}>
                            <SkillVersions
                                skills={skillVersions}
                                evo={Boolean(skill.evo)}
                                handleClick={handleClick}
                            />
                            <SkillEvo
                                evolutions={skill.evolutions}
                                handleClick={handleClick}
                            />
                        </Stack>
                    </Grid>
                )}
            </Grid>
        </Stack>
    );
}
