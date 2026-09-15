import { elements, weapons, rarities } from "@/data/wuwa/common";
import { WuWaCharacter, WuWaCharacterStats } from "./character";
import { WuWaWeapon, WuWaWeaponStats } from "./weapon";
import { WuWaEcho } from "./echo";

export type WuWaElement = (typeof elements)[number];
export type WuWaWeaponType = (typeof weapons)[number];
export type WuWaRarity = (typeof rarities)[number];

export type WuWaStats = WuWaCharacterStats | WuWaWeaponStats;

export type { WuWaCharacter, WuWaWeapon, WuWaEcho };
