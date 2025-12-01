// Component imports
import Dropdown from "@/components/Dropdown";
import LevelUpCosts from "@/components/LevelUpCosts";

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

    return (
        <Dropdown title="Level Up Cost" iconColor={color}>
            <LevelUpCosts
                levelKey={levelKey}
                costKey={costKey}
                materials={materials}
                color={color}
                {...attributes}
            />
        </Dropdown>
    );
}
