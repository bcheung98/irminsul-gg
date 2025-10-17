import { AttributeData } from "@/types/_common";
import {
    CharacterSkills,
    CharacterSkillsList,
    Skill,
    SkillKeywords,
} from "@/types/skill";
import { Materials } from "@/types/materials";

interface SkillProps {
    materials: Materials;
    keywords?: SkillKeywords[];
    attributes: AttributeData;
}

export interface CharacterSkillsProps extends SkillProps {
    title?: string;
    skills: CharacterSkills | CharacterSkillsList;
}

export interface CharacterSkillProps extends SkillProps {
    skill?: Skill | Skill[];
    skillKey: string | number;
}

export interface CharacterSkillScalingProps {
    skill?: Skill | Skill[];
    color?: string;
    index?: number;
}
