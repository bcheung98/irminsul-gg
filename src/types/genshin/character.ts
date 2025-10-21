import { BaseData, VoiceActorData } from "@/types/_common";
import {
    GenshinRarity,
    GenshinElement,
    GenshinArkhe,
    GenshinWeaponType,
    GenshinNation,
} from "./_common";
import { VersionWithDate } from "@/types/version";
import {
    CharacterOutfit,
    CharacterStats,
    CharacterUpgrades,
} from "@/types/character";
import { characterAscensionStats } from "@/data/genshin/characterAscensionStats";
import { GenshinCharacterMaterials } from "./materials";
import { CharacterSkills, Skill, SkillKeywords } from "../skill";

export interface GenshinCharacter extends BaseData {
    displayName: string;
    fullName: string;
    title: string;
    rarity: GenshinRarity;
    element: GenshinElement;
    arkhe?: GenshinArkhe;
    weapon: GenshinWeaponType;
    skills: GenshinCharacterSkills;
    passives: GenshinCharacterPassive[];
    constellation: GenshinCharacterConstellations;
    keywords?: SkillKeywords[];
    stats: GenshinCharacterStats;
    materials: GenshinCharacterMaterials;
    description: string;
    constellationName: string;
    birthday: string;
    gender: "Male" | "Female";
    nation: GenshinNation;
    outfits: CharacterOutfit[];
    voiceActors: VoiceActorData;
    release: VersionWithDate;
}

export type CharacterAscensionStat = keyof typeof characterAscensionStats;

export interface GenshinCharacterSkills extends CharacterSkills {
    attack: Skill;
    skill: Skill;
    burst: Skill;
    altsprint?: Skill;
}

export type GenshinSkillKey = keyof GenshinCharacterSkills;

export type GenshinCharacterPassiveType =
    | "a1"
    | "a4"
    | "util"
    | "nightsoul"
    | "moon"
    | "";

export interface GenshinCharacterPassive extends Skill {
    type: GenshinCharacterPassiveType;
}

export interface GenshinCharacterStats extends CharacterStats {
    ascensionStat: CharacterAscensionStat;
    em: number[];
}

export interface GenshinCharacterConstellations extends CharacterUpgrades {
    c1: Skill;
    c2: Skill;
    c3: Skill;
    c4: Skill;
    c5: Skill;
    c6: Skill;
}

export type GenshinCharacterConstellationKey =
    keyof GenshinCharacterConstellations;
