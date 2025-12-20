import { elements, rarities, weapons, worlds } from "@/data/hsr/common";
import { HSRCharacter } from "./character";
import { HSRWeapon } from "./weapon";
import { HSRRelic } from "./relic";

export type HSRElement = (typeof elements)[number];
export type HSRWeaponType = (typeof weapons)[number];
export type HSRRarity = (typeof rarities)[number];
export type HSRWorld = (typeof worlds)[number];

export type { HSRCharacter, HSRWeapon, HSRRelic };
