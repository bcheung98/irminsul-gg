import { GearStat } from "@/data/endfield/gearStats";
import { EndfieldRarity } from ".";
import { BaseDataWithRelease } from "..";

export type EndfieldGearType = "armor" | "gloves" | "kit";

export interface EndfieldGear extends BaseDataWithRelease {
    rarity: EndfieldRarity;
    level: number;
    type: EndfieldGearType;
    stats: EndfieldGearStats[];
    set: string;
    region: string;
    description: string;
    url: string;
}

export interface EndfieldGearStats {
    stat: GearStat;
    values: number[];
    format?: string;
}
