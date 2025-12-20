import { AttributeData } from "@/types";
import { Skill, SkillKeyword } from "@/types/skill";
import { Materials } from "@/types/materials";
import { WuWaSkillTutorial } from "@/types/wuwa/character";

export interface SkillProps {
    materials: Materials;
    keywords?: SkillKeyword[];
    attributes: AttributeData;
}

export interface CharacterSkillsProps extends SkillProps {
    title?: string;
    tutorial?: WuWaSkillTutorial;
    keys: string[];
}

export interface CharacterSkillProps extends SkillProps {
    skillKey: string;
}

export interface CharacterSkillScalingProps {
    skill: Skill[];
    color?: string;
    initialValue: number;
    maxLevel: number;
}

export interface CharacterSkillDescriptionProps
    extends Omit<CharacterSkillProps, "materials"> {
    skill: Skill;
    levels: number[];
    sliderValue?: number;
    handleSliderChange: (_: Event, newValue: number | number[]) => void;
    index?: number;
}
