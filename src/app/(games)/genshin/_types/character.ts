import { BaseData, VoiceActorData } from "@/types/_common";
import {
    GenshinRarity,
    GenshinElement,
    GenshinArkhe,
    GenshinWeaponType,
    GenshinNation,
} from "./_common";
import { VersionWithDate } from "@/types/version";
import { CharacterOutfit } from "@/types/character";

export interface GenshinCharacter extends BaseData {
    displayName: string;
    fullName: string;
    title: string;
    rarity: GenshinRarity;
    element: GenshinElement;
    arkhe?: GenshinArkhe;
    weapon: GenshinWeaponType;
    skills: {};
    passives: {};
    constellation: {};
    keywords?: [];
    stats: {};
    materials: {};
    description: string;
    birthday: string;
    gender: "Male" | "Female";
    nation: GenshinNation;
    outfits: CharacterOutfit[];
    voiceActors: VoiceActorData;
    release: VersionWithDate;
}
