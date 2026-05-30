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
import CharacterSkillLevelUp from "@/components/CharacterSkills/CharacterSkillLevelUp";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useSkillContext, useSkillVersionContext } from "@/context";
import { skillKeys } from "@/data/skills";
import { useSkillKeyword } from "@/helpers/skills";
import { useTextColor } from "@/helpers/styles";

// Type imports
import { NTECharacterPassive } from "@/types/nte/character";
import { AttributeData } from "@/types";
import { CharacterSkillsList, SkillKeyword } from "@/types/skill";
import { SkillProps } from "@/components/CharacterSkills/CharacterSkills.types";

interface CharacterPassivesProps {
    keywords?: SkillKeyword[];
    attributes: AttributeData;
}

export default function CharacterPassives({
    keywords,
    attributes,
    materials,
}: SkillProps) {
    const theme = useTheme();

    const buffs = useSkillVersionContext();

    const textColor = useTextColor(theme.text);

    const getSkillKeyword = useSkillKeyword().nte;

    function getIconURL(key: string, index: number) {
        return key !== "passive"
            ? `nte/skills/${attributes.id}_${key}`
            : `nte/skills/${attributes.id}_passive${index + 1}`;
    }

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

    const skillKey = (key: string, index: number) => {
        if (key === "passive") {
            return `passive${index}`;
        } else {
            return key;
        }
    };

    if (skills?.passives) {
        const types: string[] = [];
        const passives: NTECharacterPassive[] = [];
        (skills.passives as NTECharacterPassive[]).forEach((skill) => {
            types.push(skill.type);
            passives.push(skill);
            if (buffs && buffs.value === skill.version?.value) {
                passives.pop();
                passives.push(skill);
            }
        });

        return (
            <>
                <ContentBox
                    header="Passives"
                    actions={<CharacterBuffs {...buffs} />}
                >
                    <Grid container spacing={3}>
                        {passives.map((passive, index) => (
                            <SkillCard key={index}>
                                <Stack spacing={2} divider={<Divider />}>
                                    <Stack spacing={2}>
                                        <Stack spacing={1}>
                                            <TextLabel
                                                icon={
                                                    passive.type !== "life" && (
                                                        <SkillIcon
                                                            icon={getIconURL(
                                                                passive.type,
                                                                index,
                                                            )}
                                                            attributes={
                                                                attributes
                                                            }
                                                        />
                                                    )
                                                }
                                                title={passive.name}
                                                titleProps={{ variant: "h6" }}
                                                subtitle={
                                                    skillKeys.nte[passive.type]
                                                }
                                                subtitleProps={{
                                                    color: theme.text.header,
                                                    variant: "subtitle1",
                                                }}
                                                spacing={2}
                                            />
                                            <Text
                                                component="span"
                                                variant="subtitle1"
                                                sx={{
                                                    color: theme.text
                                                        .description,
                                                }}
                                            >
                                                <SkillDescription
                                                    game="nte"
                                                    description={
                                                        passive.description
                                                    }
                                                    onClick={handleDialogOpen}
                                                />
                                            </Text>
                                        </Stack>
                                        {passive.splash && (
                                            <Text
                                                variant="body2"
                                                sx={{ fontStyle: "italic" }}
                                            >
                                                <SkillDescription
                                                    game="nte"
                                                    description={passive.splash}
                                                />
                                            </Text>
                                        )}
                                    </Stack>
                                    {passive.type !== "peculiarity" && (
                                        <CharacterSkillLevelUp
                                            title="Unlock Cost"
                                            materials={materials}
                                            color={textColor(
                                                "nte",
                                                attributes.element,
                                            )}
                                            attributes={attributes}
                                            skillKey={skillKey(
                                                passive.type,
                                                index + 1,
                                            )}
                                            unlock={`Requires Esper Level ${
                                                index ? "60" : "40"
                                            }`}
                                        />
                                    )}
                                </Stack>
                            </SkillCard>
                        ))}
                    </Grid>
                </ContentBox>
                <ContentDialog
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    onClose={handleDialogClose}
                    header={"Keywords"}
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
