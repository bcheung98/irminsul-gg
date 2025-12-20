import { WuWaWeaponBaseATK, WuWaWeaponSubStat } from "@/data/wuwa/weaponStats";
import { WuWaRarity, WuWaWeaponType } from ".";
import { BaseDataWithRelease } from "..";
import { WeaponStats } from "../weapon";
import { WuWaWeaponMaterials } from "./materials";

export interface WuWaWeapon extends BaseDataWithRelease {
    id: number;
    name: string;
    displayName: string;
    rarity: WuWaRarity;
    weaponType: WuWaWeaponType;
    stats: WuWaWeaponStats;
    materials: WuWaWeaponMaterials;
    description: string;
}

export interface WuWaWeaponStats extends WeaponStats {
    atk: WuWaWeaponBaseATK;
    subStat: WuWaWeaponSubStat;
}
