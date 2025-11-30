import { useState } from "react";

// Component imports
import CharacterBuffs from "@/components/CharacterBuffs";
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
import { useSkillContext, useSkillVersionContext } from "@/context";
import { splitJoin } from "@/utils";
import { skillKeys } from "@/data/skills";
import { useSkillKeyword } from "@/helpers/skills";

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

    const buffs = useSkillVersionContext();

    const getSkillKeyword = useSkillKeyword().genshin;

    function getIconURL(key: string) {
        return key
            ? `genshin/skills/${attributes.id}_passive_${key}`
            : `genshin/skills/${attributes.id}_passive`;
    }

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

    if (skills?.passives) {
        const types: string[] = [];
        const passives: GenshinCharacterPassive[] = [];
        (skills.passives as GenshinCharacterPassive[]).forEach((skill) => {
            if (!types.includes(skill.type)) {
                types.push(skill.type);
                passives.push(skill);
            } else {
                if (buffs && buffs.value === skill.version?.value) {
                    passives.pop();
                    passives.push(skill);
                }
            }
        });

        return (
            <>
                <ContentBox
                    header="Passive Talents"
                    actions={<CharacterBuffs {...buffs} />}
                >
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
