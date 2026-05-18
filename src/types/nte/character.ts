import { NTEElement, NTERarity } from ".";
import { BaseData, VoiceActorData } from "..";
import { CharacterOutfit, CharacterStats } from "../character";
import { CharacterSkillsList, Skill, SkillKeyword } from "../skill";
import { VersionWithDate } from "../version";
import { NTECharacterMaterials } from "./materials";

export interface NTECharacter extends BaseData {
    displayName: string;
    title?: string;
    rarity: NTERarity;
    element: NTEElement;
    skills: NTECharacterSkills;
    passives: NTECharacterPassive[];
    upgrades: Skill[];
    keywords?: SkillKeyword[];
    stats: NTECharacterStats;
    materials: NTECharacterMaterials;
    description: string;
    birthday: string;
    gender: "Male" | "Female" | "Adaptive";
    outfits: CharacterOutfit[];
    voiceActors: VoiceActorData;
    release: VersionWithDate;
}

export interface NTECharacterSkills extends CharacterSkillsList {
    attack: Skill[];
    skill: Skill[];
    ultimate: Skill[];
    support: Skill[];
}

export type NTESkillKey = keyof NTECharacterSkills;

export type NTECharacterPassiveType = "passive" | "life" | "";

export interface NTECharacterPassive extends Skill {
    type: NTECharacterPassiveType;
}

export interface NTECharacterStats extends CharacterStats {}
