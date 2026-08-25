// Component imports
import SkillDetails from "@/components/_uma/SkillDetails";
import SkillSources from "@/components/_uma/SkillSources";
import SkillVersions from "@/components/_uma/SkillVersions";
import SkillEvo from "@/components/_uma/SkillEvo";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// Helper imports
import { useUmaContext } from "@/context";
import { useStore, useServerStore } from "@/stores";

// Type imports
import { UmaSkill } from "@/types/uma/skill";

export default function SkillAttributes({
    skill,
    showSources = false,
    inherited = false,
    handleClick,
    handleSwitchChange,
}: {
    skill: UmaSkill;
    showSources?: boolean;
    inherited?: boolean;
    handleClick?: (arg: any) => void;
    handleSwitchChange: () => void;
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

    const page = !Boolean(handleClick);

    return (
        <Stack spacing={2}>
            <Grid container rowSpacing={1} columnSpacing={2}>
                <Grid size={{ xs: 12, lg: "grow" }}>
                    <Stack spacing={2}>
                        <SkillDetails
                            skill={skill}
                            inherited={inherited}
                            handleSwitchChange={handleSwitchChange}
                        />
                        {showSources && (
                            <SkillSources
                                skill={skill}
                                backgroundColor={theme.background(0)}
                            />
                        )}
                        {!page && (
                            <ButtonBase
                                href={`/uma/skills/${skill.id}`}
                                target="_blank"
                                sx={{
                                    width: "max-content",
                                    height: "32px",
                                    px: 2,
                                    borderRadius: "4px",
                                    backgroundColor: theme.palette.info.main,
                                    "&:hover": {
                                        backgroundColor:
                                            theme.palette.info.dark,
                                    },
                                    transition: "background-color 0.15s",
                                }}
                            >
                                <TextLabel
                                    icon={
                                        <OpenInNewIcon
                                            sx={{
                                                color: theme.text.primary,
                                                fontSize: "18px",
                                            }}
                                        />
                                    }
                                    title="Open skill details page"
                                    titleProps={{ variant: "body2" }}
                                    spacing={0.5}
                                    reverse
                                />
                            </ButtonBase>
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
