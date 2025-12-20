import { ZZZElement, ZZZFaction, ZZZRarity } from ".";
import { BaseData } from "..";
import { CharacterStats } from "../character";
import { CharacterSkillsList, Skill } from "../skill";
import { VersionWithDate } from "../version";

export interface ZZZBangboo extends BaseData {
    displayName: string;
    rarity: ZZZRarity;
    element?: ZZZElement;
    faction?: ZZZFaction;
    skills: ZZZBangbooSkills;
    stats: ZZZBangbooStats;
    description: string;
    release: VersionWithDate;
}

export interface ZZZBangbooSkills extends CharacterSkillsList {
    A: Skill[];
    B: Skill[];
    C: Skill[];
}

export interface ZZZBangbooStats extends CharacterStats {
    critRate: number[];
    critDMG: number[];
    am: number[];
}
