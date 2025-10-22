import { BaseSyntheticEvent, useContext, useState } from "react";

// Component imports
import ContentBox from "@/components/ContentBox";
import ContentDialog from "@/components/ContentDialog";
import KeywordPopup from "@/components/KeywordPopup";
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";
import SkillCard from "@/components/SkillCard";
import SkillIcon from "@/components/SkillIcon";
import SkillDescription from "@/components/SkillDescription";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Helper imports
import { splitJoin } from "@/utils";
import { skillKeys } from "@/data/skills";
import { useSkillKeyword } from "@/helpers/skills";
import { SkillContext } from "@/app/context";

// Type imports
import { GenshinCharacterPassive } from "@/types/genshin/character";
import { AttributeData } from "@/types";
import { CharacterSkillsList, SkillKeyword } from "@/types/skill";

interface CharacterPassivesProps {
    keywords?: SkillKeyword[];
    attributes: AttributeData;
}

export default function CharacterPassives({
    keywords,
    attributes,
}: CharacterPassivesProps) {
    const theme = useTheme();

    const getSkillKeyword = useSkillKeyword().genshin;

    function getIconURL(key: string) {
        return `genshin/characters/talents/${splitJoin(
            attributes.name
        ).toLocaleLowerCase()}_${key}passive`;
    }

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

    if (skills?.passives) {
        const passives = skills.passives as GenshinCharacterPassive[];

        return (
            <>
                <ContentBox header="Passive Talents">
                    <Grid container spacing={3}>
                        {passives.map((passive, index) => (
                            <SkillCard key={index}>
                                <Stack spacing={1}>
                                    <TextLabel
                                        icon={
                                            <SkillIcon
                                                icon={getIconURL(passive.type)}
                                                attributes={attributes}
                                            />
                                        }
                                        title={passive.name}
                                        titleProps={{ variant: "h6" }}
                                        subtitle={
                                            skillKeys.genshin[passive.type]
                                        }
                                        subtitleProps={{
                                            color: theme.text.header,
                                            variant: "body1",
                                        }}
                                        spacing={2}
                                    />
                                    <Text
                                        component="span"
                                        variant="subtitle1"
                                        sx={{ color: theme.text.description }}
                                    >
                                        <SkillDescription
                                            game="genshin"
                                            description={passive.description}
                                            onClick={handleDialogOpen}
                                        />
                                    </Text>
                                </Stack>
                            </SkillCard>
                        ))}
                    </Grid>
                </ContentBox>
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
