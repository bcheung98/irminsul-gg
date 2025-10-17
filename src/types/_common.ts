// Taken from:
// https://medium.com/xgeeks/typescript-utility-keyof-nested-object-fa3e457ef2b2
export type NestedKeyOf<T extends object> = {
    [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}` | keyof T[K]
        : `${K}`;
}[keyof T & (string | number)];

export type Orientation = "row" | "column";
export type SortOrder = "asc" | "desc";
export type SkillDisplay = "slider" | "table";

export interface BaseData {
    id: number | string;
    name: string;
}

export interface VoiceActorData {
    en: string;
    jp: string;
}

export type AttributeDataKey = keyof AttributeData;

export interface AttributeData {
    name?: string;
    element?: string;
    weapon?: string;
    weaponType?: string;
    rarity?: number;
    subStat?: string;
    path?: string;
    specialty?: string;
    cost?: string;
    arkhe?: string;
}
