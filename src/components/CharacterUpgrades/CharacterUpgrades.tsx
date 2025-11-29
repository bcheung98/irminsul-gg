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
import { useGameTag, useSkillContext, useSkillVersionContext } from "@/context";
import { splitJoin } from "@/utils";
import { useSkillKeyword } from "@/helpers/skills";

// Type imports
import { AttributeData, GameData } from "@/types";
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

    const game = useGameTag();

    const buffs = useSkillVersionContext();

    const getSkillKeyword = useSkillKeyword()[game];

    const upgradeNames: GameData<string> = {
        genshin: "constellations",
        hsr: "eidolons",
        wuwa: "resonanceChains",
        zzz: "mindscapes",
        uma: "",
    };

    const upgradeURLs: GameData<string> = {
        genshin: "c",
        hsr: "e",
        wuwa: "c",
        zzz: "",
        uma: "",
    };

    function getIconURL(index: number) {
        return `${game}/characters/${upgradeNames[game]}/${splitJoin(
            attributes.name
        ).toLocaleLowerCase()}_${upgradeURLs[game]}${index + 1}`;
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
                    actions={<CharacterBuffs {...buffs} />}
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
