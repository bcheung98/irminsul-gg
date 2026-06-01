import { BaseDataWithRelease } from "..";
import { NTERarity, NTEWeaponType } from ".";
import { WeaponStats } from "../weapon";
import { NTEWeaponMaterials } from "./materials";
import { NTEWeaponBaseATK, NTEWeaponSubStat } from "@/data/nte/weaponStats";

export interface NTEWeapon extends BaseDataWithRelease {
    name: string;
    displayName: string;
    rarity: NTERarity;
    weaponType: NTEWeaponType;
    stats: NTEWeaponStats;
    materials: NTEWeaponMaterials;
    description: string;
}

export interface NTEWeaponStats extends WeaponStats {
    atk: NTEWeaponBaseATK;
    subStat: NTEWeaponSubStat;
}
