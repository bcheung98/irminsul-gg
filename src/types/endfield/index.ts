import {
    elements,
    opClasses,
    rarities,
    statAttributes,
    weapons,
} from "@/data/endfield/common";
import { EndfieldCharacter } from "./character";
import { EndfieldWeapon } from "./weapon";

export type EndfieldElement = (typeof elements)[number];
export type EndfieldWeaponType = (typeof weapons)[number];
export type EndfieldClass = (typeof opClasses)[number];
export type EndfieldRarity = (typeof rarities)[number];
export type EndfieldStatAttribute = (typeof statAttributes)[number];

export type { EndfieldCharacter, EndfieldWeapon };
