import {
    elements,
    weapons,
    rarities,
    nations,
    arkhe,
} from "@/data/genshin/common";
import { GenshinCharacter } from "./character";
import { GenshinWeapon } from "./weapon";
import { GenshinArtifact } from "./artifact";

export type GenshinElement = (typeof elements)[number];
export type GenshinWeaponType = (typeof weapons)[number];
export type GenshinRarity = (typeof rarities)[number];
export type GenshinNation = (typeof nations)[number];
export type GenshinArkhe = (typeof arkhe)[number];

export type { GenshinCharacter, GenshinWeapon, GenshinArtifact };
