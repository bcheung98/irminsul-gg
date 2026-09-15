import {
    attackTypes,
    elements,
    factions,
    rarities,
    weapons,
} from "@/data/zzz/common";
import { ZZZCharacter, ZZZCharacterStats } from "./character";
import { ZZZBangboo, ZZZBangbooStats } from "./bangboo";
import { ZZZDriveDisc } from "./drive-disc";
import { ZZZWeapon, ZZZWeaponStats } from "./weapon";

export type ZZZElement = (typeof elements)[number];
export type ZZZWeaponType = (typeof weapons)[number];
export type ZZZAttackType = (typeof attackTypes)[number];
export type ZZZRarity = (typeof rarities)[number];
export type ZZZFaction = (typeof factions)[number];

export type ZZZStats = ZZZCharacterStats | ZZZWeaponStats | ZZZBangbooStats;

export type { ZZZCharacter, ZZZWeapon, ZZZDriveDisc, ZZZBangboo };
