import { BaseData, VoiceActorData } from "@/types";
import {
    EndfieldClass,
    EndfieldElement,
    EndfieldRarity,
    EndfieldStatAttribute,
    EndfieldWeaponType,
} from ".";
import { VersionWithDate } from "@/types/version";
import { CharacterOutfit, CharacterStats } from "@/types/character";
import { EndfieldCharacterMaterials } from "./materials";
import { CharacterSkillsList, Skill, SkillKeyword } from "../skill";

export interface EndfieldCharacter extends BaseData {
    displayName: string;
    rarity: EndfieldRarity;
    element: EndfieldElement;
    specialty: EndfieldClass;
    weaponType: EndfieldWeaponType;
    combatRoles: string[];
    skills: EndfieldCharacterSkills;
    passives: EndfieldCharacterPassive[];
    baseSkills: EndfieldCharacterPassive[];
    upgrades: Skill[];
    keywords?: SkillKeyword[];
    stats: EndfieldCharacterStats;
    materials: EndfieldCharacterMaterials;
    description: string;
    birthday: string;
    gender: "Male" | "Female" | "Adaptive";
    faction: string;
    outfits: CharacterOutfit[];
    voiceActors: VoiceActorData;
    release: VersionWithDate;
}

export interface EndfieldCharacterSkills extends CharacterSkillsList {
    attack: Skill[];
    skill: Skill[];
    combo: Skill[];
    ultimate: Skill[];
}

export type EndfieldSkillKey = keyof EndfieldCharacterSkills;

export interface EndfieldCharacterPassive extends Skill {
    levels: number[];
}

export type EndfieldCharacterStatAttributes = [
    EndfieldStatAttribute,
    EndfieldStatAttribute,
];

export interface EndfieldCharacterStats extends CharacterStats {
    attributes: EndfieldCharacterStatAttributes;
    str: number[];
    agi: number[];
    int: number[];
    wil: number[];
}
