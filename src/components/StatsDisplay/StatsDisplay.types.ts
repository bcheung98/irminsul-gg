import { AttributeData, Game } from "@/types";
import { GenshinCharacterStats } from "@/types/genshin/character";
import { GenshinWeaponStats } from "@/types/genshin/weapon";
import { HSRCharacterStats } from "@/types/hsr/character";
import { HSRWeaponStats } from "@/types/hsr/weapon";

export type TCharacterStats = GenshinCharacterStats | HSRCharacterStats;
export type TWeaponStats = GenshinWeaponStats | HSRWeaponStats;

export interface StatsDisplayProps {
    game?: Game;
    title?: string;
    stats: TCharacterStats | TWeaponStats;
    attributes: AttributeData;
    initialValue?: number;
}
