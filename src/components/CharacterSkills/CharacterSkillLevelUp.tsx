// Component imports
import Text from "@/components/Text";
import Dropdown from "@/components/Dropdown";
import LevelUpCosts from "@/components/LevelUpCosts";

// MUI imports
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
}: {
    materials: Materials;
    color?: string;
    skillKey: string;
    attributes: AttributeData;
}) {
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

    const Root = (
        <LevelUpCosts
            levelKey={levelKey}
            costKey={costKey}
            materials={materials}
            color={color}
            {...attributes}
        />
    );

    const title = "Level Up Cost";

    return (
        <Stack>
            <Stack sx={{ display: { xs: "block", md: "none" } }}>
                <Dropdown title="Level Up Cost" iconColor={color}>
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
