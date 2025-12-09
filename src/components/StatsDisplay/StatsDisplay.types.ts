import { AttributeData, Game } from "@/types";
import { GenshinCharacterStats } from "@/types/genshin/character";
import { GenshinWeaponStats } from "@/types/genshin/weapon";
import { HSRCharacterStats } from "@/types/hsr/character";
import { HSRWeaponStats } from "@/types/hsr/weapon";
import { WuWaCharacterStats } from "@/types/wuwa/character";
import { WuWaWeaponStats } from "@/types/wuwa/weapon";

export type TCharacterStats =
    | GenshinCharacterStats
    | HSRCharacterStats
    | WuWaCharacterStats;
export type TWeaponStats =
    | GenshinWeaponStats
    | HSRWeaponStats
    | WuWaWeaponStats;

export interface StatsDisplayProps {
    game?: Game;
    title?: string;
    stats: TCharacterStats | TWeaponStats;
    attributes: AttributeData;
    initialValue?: number;
}
