import {
    EndfieldWeaponBaseATK,
    EndfieldWeaponSubStat,
} from "@/data/endfield/weaponStats";
import { EndfieldRarity, EndfieldWeaponType } from ".";
import { BaseDataWithRelease } from "..";
import { WeaponStats } from "../weapon";
import { EndfieldWeaponMaterials } from "./materials";
import { Skill } from "../skill";

export interface EndfieldWeapon extends BaseDataWithRelease {
    id: number;
    name: string;
    displayName: string;
    rarity: EndfieldRarity;
    weaponType: EndfieldWeaponType;
    stats: EndfieldWeaponStats;
    materials: EndfieldWeaponMaterials;
    description: string;
}

export interface EndfieldWeaponStats extends WeaponStats {
    atk: EndfieldWeaponBaseATK;
    attributes: EndfieldWeaponAttributes;
}

export type EndfieldWeaponAttrScaling = "L" | "M" | "S";

export interface EndfieldWeaponAttributes {
    primary: EndfieldWeaponAttribute;
    secondary?: EndfieldWeaponAttribute;
}

export interface EndfieldWeaponAttribute {
    stat: EndfieldWeaponSubStat;
    scaling: EndfieldWeaponAttrScaling;
}
