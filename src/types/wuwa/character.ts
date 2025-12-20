import { BaseData, VoiceActorData } from "..";
import { WuWaElement, WuWaRarity, WuWaWeaponType } from ".";
import { VersionWithDate } from "../version";
import { CharacterSkillsList, Skill, SkillKeyword } from "../skill";
import { CharacterOutfit, CharacterStats } from "../character";
import { characterBonusStats } from "@/data/wuwa/characterBonusStats";
import { WuWaCharacterMaterials } from "./materials";

export interface WuWaCharacter extends BaseData {
    displayName: string;
    title: string;
    rarity: WuWaRarity;
    element: WuWaElement;
    weaponType: WuWaWeaponType;
    skills: WuWaCharacterSkills;
    upgrades: Skill[];
    keywords?: SkillKeyword[];
    tutorial?: WuWaSkillTutorial;
    stats: WuWaCharacterStats;
    bonusStats: WuWaCharacterBonusStats;
    combatRoles: string[];
    materials: WuWaCharacterMaterials;
    description: string;
    birthday: string;
    gender: "Male" | "Female" | "Adaptive";
    nation: string;
    outfits: CharacterOutfit[];
    voiceActors: VoiceActorData;
    release: VersionWithDate;
}

export interface WuWaCharacterSkills extends CharacterSkillsList {
    attack: Skill[];
    skill: Skill[];
    ultimate: Skill[];
    forte: Skill[];
    passive1: Skill[];
    passive2: Skill[];
    intro: Skill[];
    outro: Skill[];
    break?: Skill[];
}

export type WuWaSkillKey = keyof WuWaCharacterSkills;

export type WuWaBonusStat = keyof typeof characterBonusStats;
export type WuWaCharacterBonusStats = [WuWaBonusStat, WuWaBonusStat];

export interface WuWaCharacterStats extends CharacterStats {}

export interface WuWaSkillTutorial {
    imgCount?: number;
    description: Skill[];
    combos: Skill[];
}
