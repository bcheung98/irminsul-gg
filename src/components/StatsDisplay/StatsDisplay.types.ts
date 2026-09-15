import { AttributeData, Game } from "@/types";
import { EndfieldStats } from "@/types/endfield";
import { EndfieldCharacterStats } from "@/types/endfield/character";
import { EndfieldWeaponStats } from "@/types/endfield/weapon";
import { GenshinStats } from "@/types/genshin";
import { GenshinCharacterStats } from "@/types/genshin/character";
import { GenshinWeaponStats } from "@/types/genshin/weapon";
import { HSRStats } from "@/types/hsr";
import { HSRCharacterStats } from "@/types/hsr/character";
import { HSRWeaponStats } from "@/types/hsr/weapon";
import { NTEStats } from "@/types/nte";
import { NTECharacterStats } from "@/types/nte/character";
import { NTEWeaponStats } from "@/types/nte/weapon";
import { WuWaStats } from "@/types/wuwa";
import { WuWaCharacterStats } from "@/types/wuwa/character";
import { WuWaWeaponStats } from "@/types/wuwa/weapon";
import { ZZZStats } from "@/types/zzz";
import { ZZZCharacterStats } from "@/types/zzz/character";
import { ZZZWeaponStats } from "@/types/zzz/weapon";

export type TStats =
    | GenshinStats
    | HSRStats
    | WuWaStats
    | ZZZStats
    | EndfieldStats
    | NTEStats;

export type TCharacterStats =
    | GenshinCharacterStats
    | HSRCharacterStats
    | WuWaCharacterStats
    | ZZZCharacterStats
    | EndfieldCharacterStats
    | NTECharacterStats;

export type TWeaponStats =
    | GenshinWeaponStats
    | HSRWeaponStats
    | WuWaWeaponStats
    | ZZZWeaponStats
    | EndfieldWeaponStats
    | NTEWeaponStats;

export interface StatsDisplayProps<T> {
    game?: Game;
    title?: string;
    stats: T;
    attributes: AttributeData;
    initialValue?: number;
}
