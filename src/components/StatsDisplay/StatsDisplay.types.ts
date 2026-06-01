import { AttributeData, Game } from "@/types";
import { EndfieldCharacterStats } from "@/types/endfield/character";
import { EndfieldWeaponStats } from "@/types/endfield/weapon";
import { GenshinCharacterStats } from "@/types/genshin/character";
import { GenshinWeaponStats } from "@/types/genshin/weapon";
import { HSRCharacterStats } from "@/types/hsr/character";
import { HSRWeaponStats } from "@/types/hsr/weapon";
import { NTECharacterStats } from "@/types/nte/character";
import { NTEWeaponStats } from "@/types/nte/weapon";
import { WuWaCharacterStats } from "@/types/wuwa/character";
import { WuWaWeaponStats } from "@/types/wuwa/weapon";
import { ZZZBangbooStats } from "@/types/zzz/bangboo";
import { ZZZCharacterStats } from "@/types/zzz/character";
import { ZZZWeaponStats } from "@/types/zzz/weapon";

export type TCharacterStats =
    | GenshinCharacterStats
    | HSRCharacterStats
    | WuWaCharacterStats
    | ZZZCharacterStats
    | ZZZBangbooStats
    | EndfieldCharacterStats
    | NTECharacterStats;
export type TWeaponStats =
    | GenshinWeaponStats
    | HSRWeaponStats
    | WuWaWeaponStats
    | ZZZWeaponStats
    | EndfieldWeaponStats
    | NTEWeaponStats;

export interface StatsDisplayProps {
    game?: Game;
    title?: string;
    stats: TCharacterStats | TWeaponStats;
    attributes: AttributeData;
    initialValue?: number;
}
