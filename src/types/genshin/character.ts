import { BaseData, VoiceActorData } from "@/types";
import {
    GenshinRarity,
    GenshinElement,
    GenshinArkhe,
    GenshinWeaponType,
    GenshinNation,
} from ".";
import { VersionWithDate } from "@/types/version";
import { CharacterOutfit, CharacterStats } from "@/types/character";
import { characterAscensionStats } from "@/data/genshin/characterAscensionStats";
import { GenshinCharacterMaterials } from "./materials";
import { CharacterSkillsList, Skill, SkillKeyword } from "../skill";

export interface GenshinCharacter extends BaseData {
    displayName: string;
    title: string;
    rarity: GenshinRarity;
    element: GenshinElement;
    arkhe?: GenshinArkhe[];
    weaponType: GenshinWeaponType;
    skills: GenshinCharacterSkills;
    passives: GenshinCharacterPassive[];
    upgrades: Skill[];
    keywords?: SkillKeyword[];
    stats: GenshinCharacterStats;
    materials: GenshinCharacterMaterials;
    description: string;
    constellation: string;
    birthday: string;
    gender: "Male" | "Female";
    nation: GenshinNation;
    outfits: CharacterOutfit[];
    voiceActors: VoiceActorData;
    release: VersionWithDate;
}

export type CharacterAscensionStat = keyof typeof characterAscensionStats;

export interface GenshinCharacterSkills extends CharacterSkillsList {
    attack: Skill[];
    skill: Skill[];
    ultimate: Skill[];
    altsprint?: Skill[];
}

export type GenshinSkillKey = keyof GenshinCharacterSkills;

export type GenshinCharacterPassiveType =
    | "a1"
    | "a4"
    | "util"
    | "nightsoul"
    | "moon"
    | "special"
    | "";

export interface GenshinCharacterPassive extends Skill {
    type: GenshinCharacterPassiveType;
}

export interface GenshinCharacterStats extends CharacterStats {
    ascensionStat: CharacterAscensionStat;
    em: number[];
}
