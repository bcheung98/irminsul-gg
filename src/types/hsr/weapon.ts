import {
    HSRWeaponATK,
    HSRWeaponDEF,
    HSRWeaponHP,
} from "@/data/hsr/weaponStats";
import { HSRRarity, HSRWeaponType } from ".";
import { BaseDataWithRelease } from "..";
import { Skill } from "../skill";
import { HSRWeaponMaterials } from "./materials";
import { WeaponStats } from "../weapon";

export interface HSRWeapon extends BaseDataWithRelease {
    id: number;
    name: string;
    displayName: string;
    rarity: HSRRarity;
    weaponType: HSRWeaponType;
    stats: HSRWeaponStats;
    materials: HSRWeaponMaterials;
    description: string;
}

export interface HSRWeaponStats extends Omit<WeaponStats, "subStat"> {
    hp: HSRWeaponHP;
    atk: HSRWeaponATK;
    def: HSRWeaponDEF;
    passive: HSRWeaponPassive;
}

export interface HSRWeaponPassive extends Skill {
    scaling: string[][];
}
