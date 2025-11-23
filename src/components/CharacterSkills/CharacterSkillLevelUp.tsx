// Component imports
import Dropdown from "@/components/Dropdown";
import LevelUpCosts from "@/components/LevelUpCosts";

// Type imports
import { Materials } from "@/types/materials";

export default function CharacterSkillLevelUp({
    materials,
    color,
}: {
    materials: Materials;
    color?: string;
}) {
    return (
        <Dropdown title="Level Up Cost" iconColor={color}>
            <LevelUpCosts
                levelKey="skill"
                costKey="characterSkill"
                materials={materials}
                color={color}
            />
        </Dropdown>
    );
}
