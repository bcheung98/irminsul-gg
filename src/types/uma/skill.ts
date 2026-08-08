import { skillEffects, skillTargets } from "@/data/uma/skills";
import { UmaNames, UmaRarity, UmaSkillRarity } from ".";
import { UmaVersion } from "../version";
import { EventRewards } from "./event";

export interface UmaSkill {
    id: number;
    icon: number;
    name: UmaNames;
    description: UmaVersion;
    rarity: UmaSkillRarity;
    unlock?: UmaRarity;
    activation: 0 | 1;
    cost: number;
    conditions: UmaSkillCondition[];
    evolutions?: UmaSkillEvolution[];
    evo?: UmaSkillEvo;
    tags: string[];
    scenarioEvents?: number[];
    versions?: number[];
    geneVersion: UmaSkillInherited;
    global: boolean;
    values?: string[];
}

export interface UmaSkillInherited extends Omit<
    UmaSkill,
    "unique" | "versions" | "geneVersion"
> {
    inherited: boolean;
}

export interface UmaSkillCondition {
    duration: number;
    precondition?: string;
    condition: string;
    effects: UmaSkillEffects[];
}

export interface UmaSkillEvolution {
    cardID?: number;
    scenarioID?: number;
    evos: number[];
}

export interface UmaSkillEvo {
    old: number;
    evoConditions: EventRewards[][];
}

export type UmaSkillEffect = keyof typeof skillEffects;
export type UmaSkillTarget = keyof typeof skillTargets;

export interface UmaSkillEffects {
    type: UmaSkillEffect;
    target?: UmaSkillTarget;
    value: number;
    valueScaling?: UmaSkillValueScaling;
}

export interface UmaSkillValueScaling {
    title?: string;
    description: string;
    values?: [string, number][];
}
