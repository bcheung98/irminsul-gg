import { AttributeData } from "@/types";
import { Skill, SkillKeyword } from "@/types/skill";
import { Materials } from "@/types/materials";

interface SkillProps {
    materials: Materials;
    keywords?: SkillKeyword[];
    attributes: AttributeData;
}

export interface CharacterSkillsProps extends SkillProps {
    title?: string;
    keys: string[];
}

export interface CharacterSkillProps extends SkillProps {
    skillKey: string;
}

export interface CharacterSkillScalingProps {
    skill?: Skill | Skill[];
    color?: string;
    index?: number;
}
