import { useState } from "react";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import KeywordPopup from "@/components/KeywordPopup";
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";
import SkillIcon from "@/components/SkillIcon";
import SkillDescription from "@/components/SkillDescription";
import LevelSlider from "@/components/LevelSlider";
import CharacterSkillAdvancedStats from "@/components/_hsr/CharacterSkillAdvancedStats";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { useGameTag, useSkillContext, useSkillVersionContext } from "@/context";
import { useTextColor } from "@/helpers/styles";
import { skillIconURLs } from "@/data/skills";
import {
    formatSkillIconURL,
    getKeywordPopupTitle,
    useSkillKeyword,
} from "@/helpers/skills";

// Type imports
import { CharacterSkillDescriptionProps } from "./CharacterSkills.types";
import { CharacterSkillsList, SkillKeyword } from "@/types/skill";
import { HSRCharacterSkill } from "@/types/hsr/character";

export default function CharacterSkillDescription({
    skill,
    skillKey,
    keywords,
    attributes,
    levels,
    sliderValue = 1,
    handleSliderChange,
    index = 0,
}: CharacterSkillDescriptionProps) {
    const theme = useTheme();

    const game = useGameTag();
    const buffs = useSkillVersionContext();
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
            skillVersion: buffs.value,
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

    function getSkillIcon() {
        if (skill.icon) return skill.icon;
        let icon = skillIconURL;
        if (index > 0) icon += `${index}`;
        return icon;
    }

    return (
        <>
            <Stack spacing={3}>
                <Stack spacing={2}>
                    <TextLabel
                        icon={
                            skill.icon !== null && (
                                <SkillIcon
                                    icon={getSkillIcon()}
                                    attributes={attributes}
                                />
                            )
                        }
                        title={skill.name}
                        titleProps={{ variant: "h6" }}
                        subtitle={skill.tag && `[${skill.tag}]`}
                        subtitleProps={{
                            color: textColor(game, "header"),
                            variant: "body1",
                        }}
                        spacing={2}
                    />
                    {game === "hsr" && (
                        <CharacterSkillAdvancedStats
                            skill={skill as HSRCharacterSkill}
                        />
                    )}
                    <Text
                        component="span"
                        variant="subtitle1"
                        sx={{
                            color: theme.text.description,
                        }}
                    >
                        <SkillDescription
                            game={game}
                            description={skill.description}
                            newClassName="character-skill-value"
                            onClick={handleDialogOpen}
                        />
                    </Text>
                    {game === "hsr" && skill.scaling && (
                        <LevelSlider
                            mode="slider"
                            levels={levels}
                            value={sliderValue}
                            handleSliderChange={handleSliderChange}
                            sx={{
                                minWidth: "100px",
                                maxWidth: "500px",
                                ml: "8px",
                                color: textColor(game, attributes.element),
                            }}
                        />
                    )}
                </Stack>
                {skill.splash && (
                    <Text variant="body2" sx={{ fontStyle: "italic" }}>
                        <SkillDescription
                            game={game}
                            description={skill.splash}
                        />
                    </Text>
                )}
            </Stack>
            <ContentDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                onClose={handleDialogClose}
                header={getKeywordPopupTitle(game, currentKeyword)}
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
