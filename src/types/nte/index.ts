import { elements, weapons, rarities } from "@/data/nte/common";
import { NTECharacter } from "./character";
import { NTEWeapon } from "./weapon";
import { NTECartridge } from "./cartridge";
import { NTEDrive } from "./drive";

export type NTEElement = (typeof elements)[number];
export type NTEWeaponType = (typeof weapons)[number];
export type NTERarity = (typeof rarities)[number];

export type { NTECharacter, NTEWeapon, NTECartridge, NTEDrive };
