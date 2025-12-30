import {
    ZZZAttackType,
    ZZZElement,
    ZZZFaction,
    ZZZRarity,
    ZZZWeaponType,
} from ".";
import { BaseData, VoiceActorData } from "..";
import { CharacterColors, CharacterOutfit, CharacterStats } from "../character";
import { CharacterSkillsList, Skill, SkillKeyword } from "../skill";
import { VersionWithDate } from "../version";
import { ZZZCharacterMaterials } from "./materials";

export interface ZZZCharacter extends BaseData {
    displayName: string;
    title?: string;
    rarity: ZZZRarity;
    element: ZZZElement;
    subElement?: string;
    weaponType: ZZZWeaponType;
    attackType: ZZZAttackType[];
    skills: ZZZCharacterSkills;
    potential?: Skill[];
    upgrades: Skill[];
    keywords?: SkillKeyword[];
    stats: ZZZCharacterStats;
    materials: ZZZCharacterMaterials;
    description: string;
    birthday: string;
    gender: "Male" | "Female";
    faction: ZZZFaction;
    colors: CharacterColors;
    outfits: CharacterOutfit[];
    voiceActors: VoiceActorData;
    release: VersionWithDate;
}

export interface ZZZCharacterSkills extends CharacterSkillsList {
    attack: Skill[];
    dodge: Skill[];
    assist: Skill[];
    special: Skill[];
    chain: Skill[];
    core: Skill[];
}

export type ZZZSkillKey = keyof ZZZCharacterSkills;

export interface ZZZCharacterAscensionStat {
    [stat: string]: number[];
}

export interface ZZZCharacterStats extends CharacterStats {
    ascension: ZZZCharacterAscensionStat;
    impact: number[];
    am: number[];
    ap: number[];
    pen: number[];
    er: number[];
}
