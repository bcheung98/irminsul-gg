import { ZZZWeaponMainStat, ZZZWeaponSubStat } from "@/data/zzz/weaponStats";
import { ZZZRarity, ZZZWeaponType } from ".";
import { BaseDataWithRelease } from "..";
import { WeaponStats } from "../weapon";

export interface ZZZWeapon extends BaseDataWithRelease {
    id: number;
    name: string;
    displayName: string;
    rarity: ZZZRarity;
    weaponType: ZZZWeaponType;
    stats: ZZZWeaponStats;
    description: string;
    shortDescription: string;
    signature?: number;
}

export interface ZZZWeaponStats extends WeaponStats {
    mainStat: {
        type: ZZZWeaponMainStat;
        value: string;
    };
    subStat: ZZZWeaponSubStat;
}
