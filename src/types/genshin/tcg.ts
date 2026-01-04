import {
    tcgWeaponTypes,
    tcgFactions,
    tcgActionCardTypes,
    tcgActionCardSubTypes,
} from "@/data/genshin/tcg";
import { BaseData } from "..";
import { Version } from "../version";
import { CharacterSkillsList, Skill } from "../skill";

export type TCGWeaponType = (typeof tcgWeaponTypes)[number];
export type TCGFaction = (typeof tcgFactions)[number];
export type TCGActionCardType = (typeof tcgActionCardTypes)[number];
export type TCGActionCardSubType = (typeof tcgActionCardSubTypes)[number];

export type TCGCardType = "character" | "action";

export interface TCGCard extends BaseData {
    id: number;
    displayName: string;
    tags: string[];
    splash: {
        title: string;
        description: string;
    };
    release: Version;
}

export interface TCGCharacterCard extends TCGCard {
    hp: number;
    cost: number;
    skills: TCGCharacterCardSkills;
    talent: number;
}

export interface TCGActionCard extends TCGCard {
    description: string;
    cost: string;
}

export type GenshinTCGCard = TCGCharacterCard | TCGActionCard;

export interface TCGSkill extends Skill {
    cost?: string;
}

export interface TCGCharacterCardSkills extends CharacterSkillsList {
    attack: TCGSkill[];
    skill: TCGSkill[];
    ultimate: TCGSkill[];
    passive?: TCGSkill[];
}

export type TCGSkillKey = keyof TCGCharacterCardSkills;
