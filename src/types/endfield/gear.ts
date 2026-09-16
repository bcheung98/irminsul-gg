import { GearStat } from "@/data/endfield/gearStats";
import { EndfieldRarity } from ".";
import { BaseDataWithRelease } from "..";
import { SetEffect } from "../equipment";
import { gearTypes } from "@/data/endfield/common";

export type EndfieldGearType = Lowercase<(typeof gearTypes)[number]>;

export interface EndfieldGear extends BaseDataWithRelease {
    displayName: string;
    stringId: string;
    rarity: EndfieldRarity;
    level: number;
    type: EndfieldGearType;
    stats: EndfieldGearAttributes[];
    set: number;
    region: string;
    description: string;
    url: string;
}

export interface EndfieldGearAttributes {
    stat: GearStat;
    values: string[];
}

export type EndfieldGearStats = Record<"DEF", string[]> &
    Record<Exclude<GearStat, "DEF">, string[]>;

export interface EndfieldGearSet {
    id: number;
    stringId: string;
    name: string;
    displayName: string;
    setEffect: SetEffect;
    levels: number[];
}
