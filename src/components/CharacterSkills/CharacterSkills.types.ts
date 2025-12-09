import { AttributeData } from "@/types";
import { Skill, SkillKeyword } from "@/types/skill";
import { Materials } from "@/types/materials";

export interface SkillProps {
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
    skill: Skill[];
    color?: string;
    index?: number;
}

export interface CharacterSkillDescriptionProps
    extends Omit<CharacterSkillProps, "materials"> {
    skill: Skill;
    levels: number[];
    sliderValue?: number;
    handleSliderChange: (_: Event, newValue: number | number[]) => void;
    index?: number;
}
