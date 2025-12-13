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
import FlexBox from "@/components/FlexBox";
import MindscapeCinemaPopup from "@/components/_zzz/MindscapeCinemaPopup";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// Helper imports
import { useGameTag, useSkillContext, useSkillVersionContext } from "@/context";
import { getKeywordPopupTitle, useSkillKeyword } from "@/helpers/skills";

// Type imports
import { AttributeData } from "@/types";
import { CharacterSkillsList, Skill, SkillKeyword } from "@/types/skill";

interface CharacterUpgradesProps {
    title?: string;
    keywords?: SkillKeyword[];
    attributes: AttributeData;
}

export default function CharacterUpgrades({
    title,
    keywords,
    attributes,
}: CharacterUpgradesProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const game = useGameTag();

    const buffs = useSkillVersionContext();

    const getSkillKeyword = useSkillKeyword()[game];

    function getIconURL(index: number) {
        return `${game}/skills/${attributes.id}_u${index + 1}`;
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

    const [openMCArt, setOpenMCArt] = useState(false);
    const handleClickOpenMCArt = () => {
        setOpenMCArt(true);
    };
    const handleCloseMCArt = () => {
        setOpenMCArt(false);
    };

    if (skills?.upgrades) {
        const indexes: number[] = [];
        const upgrades: Skill[] = [];
        skills.upgrades.forEach((skill) => {
            if (skill.index && !indexes.includes(skill.index)) {
                indexes.push(skill.index);
                upgrades.push(skill);
            } else {
                if (buffs && buffs.value === skill.version?.value) {
                    upgrades.pop();
                    upgrades.push(skill);
                }
            }
        });

        return (
            <>
                <ContentBox
                    header={title}
                    actions={
                        <FlexBox spacing={2}>
                            {game === "zzz" && (
                                <Button
                                    variant="outlined"
                                    onClick={handleClickOpenMCArt}
                                    disableRipple
                                    sx={{
                                        p: "4px 16px",
                                        backgroundColor: theme.background(
                                            0,
                                            "dark"
                                        ),
                                        borderRadius: "4px",
                                        borderColor: theme.border.color.primary,
                                        "&:hover": {
                                            backgroundColor:
                                                theme.background(0),
                                        },
                                    }}
                                >
                                    <Text variant="subtitle1">View Art</Text>
                                </Button>
                            )}
                            <CharacterBuffs {...buffs} />
                        </FlexBox>
                    }
                >
                    <Grid container spacing={3}>
                        {upgrades.map((upgrade, index) => (
                            <SkillCard key={index}>
                                <Stack spacing={1}>
                                    <TextLabel
                                        icon={
                                            game !== "zzz" && (
                                                <SkillIcon
                                                    icon={getIconURL(index)}
                                                    attributes={attributes}
                                                />
                                            )
                                        }
                                        title={`${upgrade.index}. ${upgrade.name}`}
                                        titleProps={{ variant: "h6" }}
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
                                            description={upgrade.description}
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
                    header={getKeywordPopupTitle(game, currentKeyword)}
                    maxWidth="md"
                >
                    <KeywordPopup
                        keyword={currentKeyword}
                        attributes={attributes}
                    />
                </ContentDialog>
                <ContentDialog
                    open={openMCArt}
                    setOpen={setOpenMCArt}
                    onClose={handleCloseMCArt}
                    maxWidth={false}
                    fullScreen={!matches}
                    header="Mindscape"
                    contentProps={{ padding: 0 }}
                >
                    <MindscapeCinemaPopup attributes={attributes} />
                </ContentDialog>
            </>
        );
    } else {
        return <></>;
    }
}
