import { UmaRarity, UmaSkillRarity } from ".";
import { UmaVersion } from "../version";
import { EventRewards } from "./event";

export interface UmaSkill {
    id: number;
    icon: number;
    name: UmaVersion;
    description: UmaVersion;
    unique?: number;
    rarity: UmaSkillRarity;
    unlock?: UmaRarity;
    activation: 0 | 1;
    cost: number;
    conditions: UmaSkillCondition[];
    evo?: UmaSkillEvo;
    tags: string[];
    scenarioEvents?: number[];
    versions?: (number | string)[];
    geneVersion: UmaSkillInherited;
}

export interface UmaSkillInherited
    extends Omit<UmaSkill, "unique" | "versions" | "geneVersion"> {
    inherited: boolean;
}

export interface UmaSkillCondition {
    duration: number;
    precondition: string;
    condition: string;
}

export interface UmaSkillEvo {
    old: number;
    evoConditions: EventRewards[][];
}
