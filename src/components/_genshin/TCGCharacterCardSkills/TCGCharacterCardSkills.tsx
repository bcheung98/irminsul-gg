import { useState } from "react";

// Component imports
import FlexBox from "@/components/FlexBox";
import ContentDialog from "@/components/ContentDialog";
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";
import SkillCard from "@/components/SkillCard";
import SkillIcon from "@/components/SkillIcon";
import SkillDescription from "@/components/SkillDescription";
import TCGKeywordPopup from "../TCGKeywordPopup";
import TCGCardDiceIcon from "../TCGCard/TCGCardDiceIcon";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";

// Helper imports
import { objectKeys } from "@/utils";
import { useTCGKeywordContext } from "@/context";
import getTCGSkillKeyword from "@/helpers/genshin/getTCGSkillKeyword";

// Type imports
import { AttributeData } from "@/types";
import { SkillKeyword } from "@/types/skill";
import type {
    TCGCharacterCardSkills,
    TCGSkill,
    TCGSkillKey,
} from "@/types/genshin/tcg";

export default function TCGCharacterCardSkills({
    skills,
    attributes,
}: {
    skills: TCGCharacterCardSkills;
    attributes: AttributeData;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const keywords = useTCGKeywordContext();

    const [currentKeyword, setCurrentKeyword] = useState<SkillKeyword | null>(
        null
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = (event: React.BaseSyntheticEvent) => {
        const keyword = getTCGSkillKeyword({
            tag: event.target.dataset.tag,
            keywords,
            attributes,
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

    function getIconURL(key: TCGSkillKey, index: number) {
        let url = "genshin/tcg/skills/";
        if (key === "attack") {
            url += `Attack_${attributes.weaponType}`;
        } else {
            url += `${attributes.id}_${key}`;
            if (index > 0) url += `${index + 1}`;
        }
        return url;
    }

    const spacing = 2;

    return (
        <>
            <Stack spacing={spacing}>
                {objectKeys(skills).map((skillKey) => (
                    <Stack key={skillKey} spacing={spacing}>
                        {skills[skillKey]?.map((skill: TCGSkill, index) => (
                            <SkillCard key={index} size={12}>
                                <Stack spacing={1}>
                                    <FlexBox
                                        spacing={1}
                                        sx={{ justifyContent: "space-between" }}
                                        wrap
                                    >
                                        <TextLabel
                                            icon={
                                                <SkillIcon
                                                    icon={
                                                        skill.icon ||
                                                        getIconURL(
                                                            skillKey,
                                                            index
                                                        )
                                                    }
                                                    attributes={attributes}
                                                />
                                            }
                                            title={skill.name}
                                            titleProps={{ variant: "h6" }}
                                            subtitle={tcgSkillKeys[skillKey]}
                                            subtitleProps={{
                                                color: theme.text.genshin
                                                    .header,
                                                variant: "subtitle1",
                                            }}
                                            spacing={2}
                                        />
                                        {skill.cost && (
                                            <TCGCardDiceIcon
                                                cost={skill.cost}
                                                orientation="row"
                                                size={matches ? "40px" : "32px"}
                                            />
                                        )}
                                    </FlexBox>
                                    <Text
                                        component="span"
                                        variant="subtitle1"
                                        sx={{ color: theme.text.description }}
                                    >
                                        <SkillDescription
                                            game="genshin"
                                            description={skill.description}
                                            onClick={handleDialogOpen}
                                        />
                                    </Text>
                                </Stack>
                            </SkillCard>
                        ))}
                    </Stack>
                ))}
            </Stack>
            <ContentDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                onClose={handleDialogClose}
                header={"Keywords"}
                maxWidth="md"
            >
                <TCGKeywordPopup
                    keyword={currentKeyword}
                    attributes={attributes}
                />
            </ContentDialog>
        </>
    );
}

const tcgSkillKeys: Record<TCGSkillKey, string> = {
    attack: "Normal Attack",
    skill: "Elemental Skill",
    ultimate: "Elemental Burst",
    passive: "Passive Skill",
};
