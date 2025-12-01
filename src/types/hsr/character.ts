import { BaseData, VoiceActorData } from "@/types";
import { HSRElement, HSRRarity, HSRWeaponType, HSRWorld } from ".";
import { VersionWithDate } from "../version";
import { CharacterOutfit, CharacterStats } from "@/types/character";
import { characterBonusStats } from "@/data/hsr/characterBonusStats";
import { HSRCharacterMaterials } from "./materials";
import { CharacterSkillsList, Skill, SkillKeyword } from "../skill";

export interface HSRCharacter extends BaseData {
    displayName: string;
    rarity: HSRRarity;
    element: HSRElement;
    weaponType: HSRWeaponType;
    skills: HSRCharacterSkills;
    memosprite?: HSRCharacterMemosprite;
    traces: (HSRCharacterTraceNodeMain | HSRCharacterTraceNodeSmall)[];
    upgrades: Skill[];
    keywords?: SkillKeyword[];
    stats: HSRCharacterStats;
    materials: HSRCharacterMaterials;
    description: string;
    gender: "Male" | "Female" | "Adaptive";
    faction: string;
    world: HSRWorld;
    outfits: CharacterOutfit[];
    voiceActors: VoiceActorData;
    release: VersionWithDate;
}

export interface HSRCharacterSkills extends CharacterSkillsList {
    attack: Skill[];
    skill: Skill[];
    ultimate: Skill[];
    talent: Skill[];
    technique: Skill[];
}

export type HSRSkillKey = keyof HSRCharacterSkills;

export type BonusStat = keyof typeof characterBonusStats;

export type HSRCharacterSkillTag =
    | "Single Target"
    | "Blast"
    | "AoE"
    | "Bounce"
    | "Enhance"
    | "Support"
    | "Impair"
    | "Restore"
    | "Defense"
    | "Summon";

export interface HSRCharacterSkill extends Skill {
    tag?: HSRCharacterSkillTag;
    cost: {
        value: number | string;
        type: string;
    };
    regen?: number;
    break?: Record<"Single Target" | "Blast" | "AoE", number>;
}

export type HSRCharacterTalent = Omit<HSRCharacterSkill, "cost">;
export type HSRCharacterTechnique = Omit<HSRCharacterSkill, "cost" | "scaling">;

export type HSRCharacterUnlockKeys =
    | "Lv. 1"
    | "A2"
    | "A3"
    | "A4"
    | "A5"
    | "A6"
    | "Lv. 75"
    | "Lv. 80";

export interface HSRCharacterTraceNodeData {
    id: string;
    title: string;
    description: string;
    unlock: HSRCharacterUnlockKeys;
    stat?: BonusStat;
}

export interface HSRCharacterTraceNodeMain {
    name: string;
    description: string;
    unlock: HSRCharacterUnlockKeys;
    subTraces?: HSRCharacterTraceNodeSmall[];
}

export interface HSRCharacterTraceNodeSmall {
    stat: BonusStat;
    unlock: HSRCharacterUnlockKeys;
    subTraces?: (HSRCharacterTraceNodeMain | HSRCharacterTraceNodeSmall)[];
}

export interface HSRCharacterStats extends CharacterStats {
    speed: number[];
    taunt: number[];
}

export type HSRCharacterMemospriteSkillKey = Exclude<
    keyof HSRCharacterMemosprite,
    "name"
>;
export interface HSRCharacterMemosprite {
    name: string;
    skill: MemospriteSkill[];
    talent: MemospriteSkill[];
}

export type MemospriteSkill = Partial<HSRCharacterSkill>;
