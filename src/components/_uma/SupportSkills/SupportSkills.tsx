// Component imports
import ContentBox from "@/components/ContentBox";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import SkillInfo from "../SkillInfo";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

// Type imports
import { UmaSupportSkills } from "@/types/uma/support";

export default function SupportSkills({
    skills,
}: {
    skills: UmaSupportSkills;
}) {
    const theme = useTheme();

    const skillsList = {
        "Skills From Events": skills.event,
        "Support Hints": skills.hint,
    };

    return (
        <ContentBox header="Skills">
            <Stack spacing={2}>
                {Object.entries(skillsList).map(
                    ([title, skills]) =>
                        skills.length > 0 && (
                            <Stack key={title} spacing={1}>
                                <Text weight="highlight">{title}</Text>
                                <Grid container spacing={1}>
                                    {skills.map((skill, index) => (
                                        <Grid
                                            key={index}
                                            size={{ xs: 12, md: 6 }}
                                        >
                                            <SkillInfo skillID={skill} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Stack>
                        )
                )}
                {skills.stat.length > 0 && (
                    <Stack spacing={1}>
                        <Text weight="highlight">Stat Hints</Text>
                        <Grid container>
                            <Grid
                                size={{ xs: 12, md: 6 }}
                                sx={{
                                    p: 1,
                                    backgroundColor: theme.background(0),
                                    borderRadius: "4px",
                                }}
                            >
                                <FlexBox
                                    spacing={1.5}
                                    sx={{ alignItems: "flex-start" }}
                                >
                                    <KeyboardDoubleArrowUpIcon
                                        sx={{
                                            color: theme.text.primary,
                                            fontSize: "24px",
                                        }}
                                    />
                                    <Stack>
                                        {skills.stat.map((stat) => (
                                            <Text
                                                key={stat.type}
                                                variant="body2"
                                                weight="highlight"
                                            >{`${stat.type} +${stat.value}`}</Text>
                                        ))}
                                    </Stack>
                                </FlexBox>
                            </Grid>
                        </Grid>
                    </Stack>
                )}
            </Stack>
        </ContentBox>
    );
}
