import { UmaRank, UmaRarity } from ".";
import { BaseData, VoiceActorData } from "..";
import { UmaVersion } from "../version";

export interface UmaCharacter extends BaseData {
    id: number;
    charID: number;
    name: string;
    displayName: string;
    outfit?: string;
    title: string;
    rarity: UmaRarity;
    stats: UmaCharacterStats;
    aptitude: UmaCharacterAptitude;
    skills: UmaCharacterSkills;
    materials: string[];
    release: UmaVersion;
}

export interface UmaCharacterStats {
    speed: number[];
    stamina: number[];
    power: number[];
    guts: number[];
    wit: number[];
}

export interface UmaCharacterAptitude {
    surface: UmaCharacterAptitudeSurface;
    distance: UmaCharacterAptitudeDistance;
    strategy: UmaCharacterAptitudeStrategy;
}

export interface UmaCharacterAptitudeSurface {
    turf: UmaRank;
    dirt: UmaRank;
}
export interface UmaCharacterAptitudeDistance {
    sprint: UmaRank;
    mile: UmaRank;
    medium: UmaRank;
    long: UmaRank;
}
export interface UmaCharacterAptitudeStrategy {
    front: UmaRank;
    pace: UmaRank;
    late: UmaRank;
    end: UmaRank;
}

export interface UmaCharacterSkills {
    unique: number[];
    innate: number[];
    awakening: number[];
    event: number[];
    eventJP?: number[];
    evo: UmaCharacterEvoSkill[];
}

export type UmaSkillKey = keyof UmaCharacterSkills;

export interface UmaCharacterEvoSkill {
    new: number;
    old: number;
}

export interface UmaCharacterProfile {
    id: number;
    name: string;
    nameJP: string;
    description: string;
    birthday: string;
    height: number;
    sizes: [number, number, number];
    colors: [string, string];
    voiceActors: VoiceActorData;
}
