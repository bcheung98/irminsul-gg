import { servers } from "@/helpers/dates";
import { gameNames } from "@/data/games";
import { UmaVersion, Version, VersionWithDate } from "./version";
import { FilterState, SetFilterState } from "@/stores/useFilterStore";
import { CharacterColors } from "./character";

// General
export type Orientation = "row" | "column";
export type SortOrder = "asc" | "desc";
export type GalleryView = "icon" | "card" | "list";
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
    url?: string;
}
export interface BaseDataWithRelease extends BaseData {
    release: Version;
}
export type DataType = BaseDataWithRelease & {
    [key: string]: any;
};

// Attribute data
export interface AttributeData {
    id?: number | string;
    name?: string;
    displayName?: string;
    title?: string;
    description?: string;
    element?: string;
    subElement?: string;
    weaponType?: string;
    attackType?: string[];
    rarity?: number;
    subStat?: string;
    arkhe?: string | string[];
    cost?: string | number;
    sonata?: (string | number)[];
    combatRoles?: string[];
    bonusStats?: string[];
    colors?: CharacterColors;
    specialty?: string;
    outfit?: string;
}
export type AttributeDataKey = keyof AttributeData;
export interface AttributeDataMisc {
    constellation?: string;
    nation?: string;
    faction?: string;
    birthday?: string;
    voiceActors?: VoiceActorData;
    release?: VersionWithDate;
    releaseUma?: UmaVersion;
}
export type AttributeDataMiscKey = keyof AttributeDataMisc;

// Game data
export type Game = (typeof gameNames)[number];
export type GameNoUma = Exclude<Game, "uma">;
export interface GameInfo {
    tag: Game;
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
    key: keyof FilterState;
    filters: T;
    setFilters: SetFilterState;
    hideUnreleasedContent?: boolean;
}
export type FilterGroups = Record<string, FilterGroup>;
export interface FilterGroup {
    name: string;
    value: (string | number)[];
    buttons: FilterButtons[];
    onChange: (...args: any) => any;
    toggle?: React.ReactNode;
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
    dropdown?: boolean;
}
