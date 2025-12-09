// Component imports
import Text from "@/components/Text";
import Dropdown from "@/components/Dropdown";
import LevelUpCosts from "@/components/LevelUpCosts";
import InfoChip from "@/components/InfoChip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { useGameTag } from "@/context";

// Type imports
import { Materials } from "@/types/materials";
import { AttributeData } from "@/types";

export default function CharacterSkillLevelUp({
    materials,
    color,
    skillKey,
    attributes,
    title = "Level Up Cost",
    unlock,
}: {
    materials: Materials;
    color?: string;
    skillKey: string;
    attributes: AttributeData;
    title?: string;
    unlock?: string;
}) {
    const theme = useTheme();

    const game = useGameTag();

    let levelKey = "skill";
    let costKey = "characterSkill";
    if (game === "hsr") {
        if (skillKey === "attack") {
            levelKey = "attack";
        }
        if (skillKey.startsWith("memo")) {
            levelKey = "attack";
            costKey = "characterMemosprite";
        }
    }
    if (game === "wuwa") {
        if (skillKey.startsWith("passive")) {
            levelKey = skillKey.slice(-1);
            costKey = "characterPassive";
        }
        if (skillKey.startsWith("bonus")) {
            levelKey = skillKey.slice(-1);
            costKey = "characterBonusStat";
        }
    }

    const Root = (
        <Stack spacing={2}>
            <LevelUpCosts
                levelKey={levelKey}
                costKey={costKey}
                materials={materials}
                color={color}
                {...attributes}
            />
            {unlock && (
                <InfoChip
                    chipProps={{
                        background: theme.palette.info.main,
                        height: "24px",
                    }}
                    title={unlock}
                />
            )}
        </Stack>
    );

    return (
        <Stack>
            <Stack sx={{ display: { xs: "block", md: "none" } }}>
                <Dropdown title={title} textVariant="body1" iconColor={color}>
                    {Root}
                </Dropdown>
            </Stack>
            <Stack sx={{ display: { xs: "none", md: "block" } }} spacing={1}>
                <Text weight="highlight">{title}</Text>
                {Root}
            </Stack>
        </Stack>
    );
}
