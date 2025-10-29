import { Dispatch, SetStateAction } from "react";
import { servers } from "@/helpers/dates";
import { gameNames } from "@/data/games";
import { UmaVersion, Version, VersionWithDate } from "./version";
import { createFilterButtons } from "@/helpers/filters";

// General
export type Orientation = "row" | "column";
export type SortOrder = "asc" | "desc";
export type GalleryView = "icon" | "card" | "table";
export interface VoiceActorData {
    en: string;
    jp: string;
}
// Taken from:
// https://medium.com/xgeeks/typescript-utility-keyof-nested-object-fa3e457ef2b2
export type NestedKeyOf<T extends object> = {
    [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}` | keyof T[K]
        : `${K}`;
}[keyof T & (string | number)];

// General data
export interface BaseData {
    id: number | string;
    name: string;
}
export interface BaseDataWithRelease extends BaseData {
    release: Version;
}

// Attribute data
export interface AttributeData {
    name?: string;
    displayName?: string;
    title?: string;
    description?: string;
    element?: string;
    weapon?: string;
    weaponType?: string;
    rarity?: number;
    subStat?: string;
    cost?: string;
    arkhe?: string | string[];
}
export type AttributeDataKey = keyof AttributeData;
export interface AttributeDataMisc {
    constellation?: string;
    nation?: string;
    birthday?: string;
    voiceActors?: VoiceActorData;
    release?: VersionWithDate;
    releaseUma?: UmaVersion;
}
export type AttributeDataMiscKey = keyof AttributeDataMisc;

// Game data
export type Game = (typeof gameNames)[number];
export interface GameInfo {
    tag: string;
    name: string;
    shortName: string;
    enabled: boolean;
    color: string;
    dev: string;
}
export type GameData<T> = Record<Game, T>;

// Settings
export type SkillDisplay = "slider" | "table";
export type Server = keyof typeof servers;

// Filters
export type Filters = Record<string, (string | number)[]>;
export interface FilterGroupsProps<T> {
    filters: T;
    setFilters: Dispatch<SetStateAction<T>>;
}
export type FilterGroups = Record<string, FilterGroup>;
export interface FilterGroup {
    name: string;
    value: (string | number)[];
    buttons: FilterButtons[];
    onChange: (...args: any) => any;
    padding?: string | number;
    width?: string;
    groupButtons?: GroupFilterButtons[];
}
export interface FilterButtons {
    value: string | number;
    icon?: React.ReactNode;
    label?: React.ReactNode;
}
export interface GroupFilterButtons {
    buttons: FilterButtons[];
    icon?: string;
    label?: string;
}
