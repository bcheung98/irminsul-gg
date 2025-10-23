import { BaseSyntheticEvent, useState } from "react";

// Component imports
import ContentBox from "../ContentBox";
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
import { useGameTag, useSkillContext } from "@/app/context";
import { splitJoin } from "@/utils";
import { useSkillKeyword } from "@/helpers/skills";

// Type imports
import type { CharacterUpgrades } from "@/types/character";
import { AttributeData, GameData } from "@/types";
import { CharacterSkillsList, SkillKeyword } from "@/types/skill";

interface CharacterUpgradesProps {
    title?: string;
    actions?: React.ReactNode;
    keywords?: SkillKeyword[];
    attributes: AttributeData;
}

export default function CharacterUpgrades({
    title,
    actions,
    keywords,
    attributes,
}: CharacterUpgradesProps) {
    const theme = useTheme();

    const game = useGameTag();

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

    if (skills?.upgrades) {
        const upgrades = skills.upgrades;

        return (
            <>
                <ContentBox header={title} actions={actions}>
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
                                        title={`${index + 1}. ${upgrade.name}`}
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
