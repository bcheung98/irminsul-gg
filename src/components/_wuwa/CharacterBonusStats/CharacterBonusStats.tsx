// Component imports
import SkillCard from "@/components/SkillCard";
import SkillIcon from "@/components/SkillIcon";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";
import CharacterSkillLevelUp from "@/components/CharacterSkills/CharacterSkillLevelUp";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useTextColor } from "@/helpers/styles";
import { characterBonusStats } from "@/data/wuwa/characterBonusStats";
import { elements } from "@/data/wuwa/common";

// Type imports
import { CharacterSkillProps } from "@/components/CharacterSkills/CharacterSkills.types";
import { WuWaCharacterBonusStats, WuWaSkillKey } from "@/types/wuwa/character";
import { WuWaElement } from "@/types/wuwa";

export default function CharacterBonusStats({
    attributes,
    skillKey,
    materials,
}: CharacterSkillProps) {
    const theme = useTheme();

    const textColor = useTextColor(theme.text);

    const bonusStats = attributes.bonusStats as WuWaCharacterBonusStats;
    const bonusStat = getCharacterStatBonus(skillKey, bonusStats);

    const isElement = elements.includes(bonusStat.split(" ")[0] as WuWaElement);

    return (
        <Grid container spacing={2}>
            {[0, 1].map((index) => (
                <SkillCard key={index} size={{ xs: 6, md: 3.5 }}>
                    <Stack spacing={2} divider={<Divider />}>
                        <TextLabel
                            icon={
                                <SkillIcon
                                    icon={`wuwa/icons/stat-icons/${bonusStat}`}
                                    attributes={attributes}
                                    size={40}
                                />
                            }
                            title={bonusStat}
                            titleProps={{ variant: "h6" }}
                            subtitle={
                                <Text
                                    sx={{ color: theme.text.description }}
                                    variant="subtitle1"
                                >
                                    <span
                                        style={{
                                            color: isElement
                                                ? textColor(
                                                      "wuwa",
                                                      attributes.element
                                                  )
                                                : theme.text.description,
                                            fontWeight: isElement
                                                ? theme.font.weight.element
                                                : theme.font.weight.primary,
                                        }}
                                    >
                                        {bonusStat}
                                    </span>
                                    {` increased by ${characterBonusStats[bonusStat][index]}`}
                                </Text>
                            }
                            spacing={2}
                        />
                        <CharacterSkillLevelUp
                            title="Unlock Cost"
                            materials={materials}
                            color={textColor("wuwa", attributes.element)}
                            attributes={attributes}
                            skillKey={`passive${index + 1}`}
                            unlock={`Requires Resonator Ascension ${getUnlockLevel(
                                skillKey,
                                index
                            )}`}
                        />
                    </Stack>
                </SkillCard>
            ))}
        </Grid>
    );
}

function getCharacterStatBonus(
    skillKey: WuWaSkillKey,
    bonusStats: WuWaCharacterBonusStats
) {
    switch (skillKey) {
        case "skill":
        case "ultimate":
            return bonusStats[0];
        case "attack":
        case "intro":
            return bonusStats[1];
        case "circuit":
        case "outro":
        default:
            return "";
    }
}

function getUnlockLevel(skillKey: WuWaSkillKey, index: number) {
    switch (skillKey) {
        case "skill":
        case "ultimate":
            return index * 2 + 2;
        case "attack":
        case "intro":
            return index * 2 + 3;
        case "circuit":
        case "outro":
        default:
            return 0;
    }
}
