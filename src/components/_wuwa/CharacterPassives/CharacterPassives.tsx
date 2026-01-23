import { useState } from "react";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import KeywordPopup from "@/components/KeywordPopup";
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";
import SkillCard from "@/components/SkillCard";
import SkillIcon from "@/components/SkillIcon";
import SkillDescription from "@/components/SkillDescription";
import CharacterSkillLevelUp from "@/components/CharacterSkills/CharacterSkillLevelUp";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useSkillContext, useSkillVersionContext } from "@/context";
import { useSkillKeyword } from "@/helpers/skills";
import { useTextColor } from "@/helpers/styles";

// Type imports
import { SkillProps } from "@/components/CharacterSkills/CharacterSkills.types";
import { CharacterSkillsList, Skill, SkillKeyword } from "@/types/skill";

export default function CharacterPassives({
    keywords,
    attributes,
    materials,
}: SkillProps) {
    const theme = useTheme();

    const textColor = useTextColor(theme.text);

    const getSkillKeyword = useSkillKeyword().wuwa;

    const skillVersion = useSkillVersionContext();
    const skillsContext = useSkillContext();
    let skills: CharacterSkillsList | undefined;
    if (skillsContext) {
        skills = skillsContext;
    }

    const [currentKeyword, setCurrentKeyword] = useState<SkillKeyword | null>(
        null,
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = (event: React.BaseSyntheticEvent) => {
        const keyword = getSkillKeyword({
            tag: event.target.dataset.tag,
            skills: skills,
            skillVersion: skillVersion.value,
            keywords: keywords,
            attributes: attributes,
        });
        if (keyword) {
            setCurrentKeyword(keyword);
            setDialogOpen(true);
        }
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
        setCurrentKeyword(null);
    };

    if (!skills) return null;

    const { passive1, passive2 } = skills;

    const passives = [passive1, passive2]
        .map((passive) =>
            skillVersion &&
            skillVersion.value !== "v1" &&
            passive &&
            passive.length > 1
                ? passive.filter(
                      (skill) => skill.version?.value === skillVersion.value,
                  )
                : passive?.filter((skill) => !skill.version),
        )
        .flat()
        .filter(Boolean) as Skill[];

    return (
        <>
            <Grid container spacing={2}>
                {passives.map((passive, index) => (
                    <SkillCard key={`passive${index + 1}`}>
                        <Stack spacing={2} divider={<Divider />}>
                            <Stack spacing={1}>
                                <TextLabel
                                    icon={
                                        <SkillIcon
                                            icon={`wuwa/skills/${
                                                attributes.id
                                            }_passive${index + 1}`}
                                            attributes={attributes}
                                        />
                                    }
                                    title={passive.name}
                                    titleProps={{ variant: "h6" }}
                                    subtitle="Inherent Skill"
                                    subtitleProps={{
                                        color: theme.text.header,
                                        variant: "subtitle1",
                                    }}
                                    spacing={2}
                                />
                                <Text
                                    component="span"
                                    variant="subtitle1"
                                    sx={{ color: theme.text.description }}
                                >
                                    <SkillDescription
                                        game="wuwa"
                                        description={passive.description}
                                        onClick={handleDialogOpen}
                                    />
                                </Text>
                            </Stack>
                            <CharacterSkillLevelUp
                                title="Unlock Cost"
                                materials={materials}
                                color={textColor("wuwa", attributes.element)}
                                attributes={attributes}
                                skillKey={`passive${index + 1}`}
                                unlock={`Requires Resonator Ascension ${
                                    (index + 1) * 2
                                }`}
                            />
                        </Stack>
                    </SkillCard>
                ))}
            </Grid>
            <ContentDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                onClose={handleDialogClose}
                header={"Related effects"}
                maxWidth="md"
            >
                <KeywordPopup
                    keyword={currentKeyword}
                    attributes={attributes}
                />
            </ContentDialog>
        </>
    );
}
