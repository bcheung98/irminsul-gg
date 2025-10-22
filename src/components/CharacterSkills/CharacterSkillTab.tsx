import { BaseSyntheticEvent, useState, useContext } from "react";
import { usePathname } from "next/navigation";

// Component imports
import ContentDialog from "../ContentDialog";
import KeywordPopup from "../KeywordPopup";
import Text from "../Text";
import TextLabel from "../TextLabel";
import SkillIcon from "../SkillIcon";
import SkillDescription from "../SkillDescription";
import CharacterSkillScaling from "./CharacterSkillScaling";
import CharacterSkillLevelUp from "./CharacterSkillLevelUp";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// Helper imports
import { useTextColor } from "@/helpers/useTextColor";
import { skillKeys, skillIconURLs } from "@/data/skills";
import { formatSkillIconURL, useSkillKeyword } from "@/helpers/skills";
import { SkillContext } from "@/app/context";

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

    const game = usePathname().split("/")[1];

    const textColor = useTextColor(theme.text);

    const getSkillKeyword = useSkillKeyword()[game];

    const skillIconURL = formatSkillIconURL(
        skillIconURLs[game][skillKey],
        attributes
    );

    const skillsContext = useContext(SkillContext);
    let skills: CharacterSkillsList | undefined;
    if (skillsContext) {
        skills = skillsContext;
    }

    const [currentKeyword, setCurrentKeyword] = useState<SkillKeyword | null>(
        null
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = (event: BaseSyntheticEvent) => {
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
