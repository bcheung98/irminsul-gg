import { useState } from "react";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import KeywordPopup from "@/components/KeywordPopup";
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";
import SkillIcon from "@/components/SkillIcon";
import SkillDescription from "@/components/SkillDescription";
import CharacterSkillScaling from "./CharacterSkillScaling";
import CharacterSkillLevelUp from "./CharacterSkillLevelUp";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// Helper imports
import { useGameTag, useSkillContext } from "@/context";
import { useTextColor } from "@/helpers/styles";
import { skillKeys, skillIconURLs } from "@/data/skills";
import { formatSkillIconURL, useSkillKeyword } from "@/helpers/skills";

// Type imports
import { CharacterSkillProps } from "./CharacterSkills.types";
import { CharacterSkillsList, SkillKeyword } from "@/types/skill";

export default function CharacterSkillTab({
    skillKey,
    keywords,
    materials,
    attributes,
}: CharacterSkillProps) {
    const theme = useTheme();

    const game = useGameTag();

    const textColor = useTextColor(theme.text);

    const getSkillKeyword = useSkillKeyword()[game];

    const skillIconURL = formatSkillIconURL(
        skillIconURLs[game][skillKey],
        attributes
    );

    const skillsContext = useSkillContext();
    let skills: CharacterSkillsList | undefined;
    if (skillsContext) {
        skills = skillsContext;
    }

    const [currentKeyword, setCurrentKeyword] = useState<SkillKeyword | null>(
        null
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = (event: React.BaseSyntheticEvent) => {
        const keyword = getSkillKeyword({
            tag: event.target.className.split("-")[1],
            skills: skills,
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

    if (skills) {
        const skill = skills[skillKey];

        return (
            <>
                <Stack spacing={3}>
                    <Box>
                        <Text sx={{ mb: "16px", color: theme.text.header }}>
                            {skillKeys[game][skillKey]}
                        </Text>
                        <Stack spacing={2}>
                            {skill?.map((skl, index) => (
                                <Stack key={`${skillKey}-${index}`} spacing={3}>
                                    <Stack spacing={2}>
                                        <TextLabel
                                            icon={
                                                <SkillIcon
                                                    icon={
                                                        skl.icon || skillIconURL
                                                    }
                                                    attributes={attributes}
                                                />
                                            }
                                            title={skl.name}
                                            titleProps={{ variant: "h6" }}
                                            subtitle={skl.tag && `[${skl.tag}]`}
                                            subtitleProps={{
                                                color: textColor(
                                                    game,
                                                    "header"
                                                ),
                                                variant: "body1",
                                            }}
                                            spacing={2}
                                        />
                                        <Text
                                            component="span"
                                            variant="subtitle1"
                                            sx={{
                                                color: theme.text.description,
                                            }}
                                        >
                                            <SkillDescription
                                                game={game}
                                                description={skl.description}
                                                onClick={handleDialogOpen}
                                            />
                                        </Text>
                                    </Stack>
                                    {skl.splash && (
                                        <Text
                                            variant="body2"
                                            sx={{ fontStyle: "italic" }}
                                        >
                                            <SkillDescription
                                                game={game}
                                                description={skl.splash}
                                            />
                                        </Text>
                                    )}
                                </Stack>
                            ))}
                        </Stack>
                    </Box>
                    <Stack spacing={2}>
                        <CharacterSkillScaling
                            skill={skill}
                            color={textColor(game, attributes.element)}
                        />
                        {!["altsprint"].includes(skillKey) && (
                            <CharacterSkillLevelUp
                                materials={materials}
                                color={textColor(game, attributes.element)}
                            />
                        )}
                    </Stack>
                </Stack>
                <ContentDialog
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    onClose={handleDialogClose}
                    header={
                        currentKeyword?.type
                            ? "Related Talents"
                            : "Related effects"
                    }
                    maxWidth="md"
                >
                    <KeywordPopup
                        keyword={currentKeyword}
                        attributes={attributes}
                    />
                </ContentDialog>
            </>
        );
    } else {
        return <></>;
    }
}
