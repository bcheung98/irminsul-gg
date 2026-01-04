import { UmaRarity, UmaSpecialty } from ".";
import { BaseData } from "..";
import { UmaVersion } from "../version";

export interface UmaSupport extends BaseData {
    id: number;
    charID: number;
    displayName: string;
    title: string;
    rarity: UmaRarity;
    specialty: UmaSpecialty;
    perks: SupportPerks;
    supportEffects: SupportEffect[];
    hints: SupportHints;
    skillEvents: number[];
    skillEventsJP: number[];
    trainingEvents: {
        chain: string[];
        random: string[];
    };
    splash: {
        en: string;
        jp: string;
    };
    release: UmaVersion;
}

export interface UmaSupportSkills {
    event: number[];
    hint: number[];
    stat: StatHint[];
}

export interface SupportPerks {
    effects: UniqueEffect[];
    unlock: number;
    description?: string[];
}

export interface SupportEffect {
    effect: string;
    values: number[];
    unlock: number;
}

export interface UniqueEffect {
    effect: string;
    value: number;
}

export interface SupportHints {
    stats: StatHint[];
    skills: number[];
}

export interface StatHint {
    type: string;
    value: number;
}
