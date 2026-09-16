import {
    elements,
    opClasses,
    rarities,
    statAttributes,
    weapons,
} from "@/data/endfield/common";
import { EndfieldCharacter, EndfieldCharacterStats } from "./character";
import { EndfieldWeapon, EndfieldWeaponStats } from "./weapon";
import { EndfieldGear, EndfieldGearStats } from "./gear";

export type EndfieldElement = (typeof elements)[number];
export type EndfieldWeaponType = (typeof weapons)[number];
export type EndfieldClass = (typeof opClasses)[number];
export type EndfieldRarity = (typeof rarities)[number];
export type EndfieldStatAttribute = (typeof statAttributes)[number];

export type EndfieldStats =
    | EndfieldCharacterStats
    | EndfieldWeaponStats
    | EndfieldGearStats;

export type { EndfieldCharacter, EndfieldWeapon, EndfieldGear };
