import { elements, rarities, weapons, worlds } from "@/data/hsr/common";
import { HSRCharacter, HSRCharacterStats } from "./character";
import { HSRWeapon, HSRWeaponStats } from "./weapon";
import { HSRRelic } from "./relic";

export type HSRElement = (typeof elements)[number];
export type HSRWeaponType = (typeof weapons)[number];
export type HSRRarity = (typeof rarities)[number];
export type HSRWorld = (typeof worlds)[number];

export type HSRStats = HSRCharacterStats | HSRWeaponStats;

export type { HSRCharacter, HSRWeapon, HSRRelic };
