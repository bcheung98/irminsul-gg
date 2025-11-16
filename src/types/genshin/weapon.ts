import {
    GenshinWeaponBaseATK,
    GenshinWeaponSubStat,
} from "@/data/genshin/weaponStats";
import { GenshinRarity, GenshinWeaponType } from ".";
import { BaseDataWithRelease } from "..";
import { WeaponStats } from "../weapon";
import { GenshinWeaponMaterials } from "./materials";

export interface GenshinWeapon extends BaseDataWithRelease {
    id: number;
    name: string;
    displayName: string;
    rarity: GenshinRarity;
    weaponType: GenshinWeaponType;
    stats: GenshinWeaponStats;
    materials: GenshinWeaponMaterials;
    description: string;
}

export interface GenshinWeaponStats extends WeaponStats {
    atk: GenshinWeaponBaseATK;
    subStat: GenshinWeaponSubStat;
}
