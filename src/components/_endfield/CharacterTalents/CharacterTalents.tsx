import { useState } from "react";

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
import { useSkillContext } from "@/context";
import { useSkillKeyword } from "@/helpers/skills";

// Type imports
import { AttributeData } from "@/types";
import { Materials } from "@/types/materials";
import { CharacterSkillsList, SkillKeyword } from "@/types/skill";
import { EndfieldCharacterPassive } from "@/types/endfield/character";

export default function CharacterTalents({
    type,
    keywords,
    attributes,
}: {
    type: "talent" | "baseSkill";
    keywords?: SkillKeyword[];
    materials: Materials;
    attributes: AttributeData;
}) {
    const theme = useTheme();

    const getSkillKeyword = useSkillKeyword().endfield;

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

    if (skills?.passives && skills?.baseSkills) {
        const passives =
            type === "talent"
                ? (skills.passives as EndfieldCharacterPassive[])
                : (skills.baseSkills as EndfieldCharacterPassive[]);
        return (
            <>
                <ContentBox
                    header={type === "talent" ? "Talents" : "Base Skills"}
                >
                    {passives.length > 0 ? (
                        <Grid container spacing={3}>
                            {passives.map((passive, index) => (
                                <SkillCard key={index}>
                                    <Stack spacing={1}>
                                        <TextLabel
                                            icon={
                                                type === "talent" ? (
                                                    <SkillIcon
                                                        icon={
                                                            passive.icon ||
                                                            `endfield/skills/${
                                                                attributes.id
                                                            }_talent${index + 1}`
                                                        }
                                                        attributes={attributes}
                                                        size={40}
                                                    />
                                                ) : (
                                                    // <SkillIcon
                                                    //     icon={`endfield/icons/base-skills/${passive.icon}`}
                                                    //     borderRadius="4px"
                                                    //     borderWidth={0}
                                                    //     padding={0}
                                                    //     size={40}
                                                    // />
                                                    <></>
                                                )
                                            }
                                            title={passive.name}
                                            titleProps={{ variant: "h6" }}
                                            spacing={2}
                                        />
                                        {passive.levels.map((level, i) => (
                                            <TextLabel
                                                key={i}
                                                icon={`endfield/icons/skills/Elite${level}`}
                                                iconProps={{
                                                    size: 28,
                                                    tooltip: `Elite ${level}`,
                                                }}
                                                title={
                                                    <Text
                                                        component="span"
                                                        variant="subtitle1"
                                                        sx={{
                                                            color: theme.text
                                                                .description,
                                                        }}
                                                    >
                                                        <SkillDescription
                                                            game="endfield"
                                                            description={getDescription(
                                                                passive.description,
                                                                passive.scaling,
                                                                i,
                                                            )}
                                                            onClick={
                                                                handleDialogOpen
                                                            }
                                                        />
                                                    </Text>
                                                }
                                                spacing={2}
                                            />
                                        ))}
                                    </Stack>
                                </SkillCard>
                            ))}
                        </Grid>
                    ) : (
                        <Text variant="subtitle1">
                            <i>{`${attributes.displayName} does not possess any Base Skills.`}</i>
                        </Text>
                    )}
                </ContentBox>
                <ContentDialog
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    onClose={handleDialogClose}
                    header="Glossary"
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

function getDescription(
    description: string,
    scaling: string[][] | undefined,
    index: number,
) {
    if (scaling) {
        scaling.forEach((values, i) => {
            description = description.replace(
                `$${String.fromCharCode(i + 65)}`,
                values[index],
            );
        });
    }
    return description;
}
