import { usePathname } from "next/navigation";

// Component imports
import Dropdown from "../Dropdown";
import LevelUpCosts from "../LevelUpCosts";

// Type imports
import { Materials } from "@/types/materials";

export default function CharacterSkillLevelUp({
    game,
    materials,
    color,
}: {
    game: string;
    materials: Materials;
    color?: string;
}) {
    return (
        <Dropdown title="Level Up Cost" iconColor={color}>
            <LevelUpCosts
                tag={`${game}/skill`}
                type="characterSkill"
                materials={materials}
                color={color}
            />
        </Dropdown>
    );
}
