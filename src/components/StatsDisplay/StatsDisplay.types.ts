import { AttributeData } from "@/types";
import { GenshinCharacterStats } from "@/types/genshin/character";
import { GenshinWeaponStats } from "@/types/genshin/weapon";

export type TCharacterStats = GenshinCharacterStats;
export type TWeaponStats = GenshinWeaponStats;

export interface StatsDisplayProps {
    game: string;
    title?: string;
    stats: TCharacterStats | TWeaponStats;
    attributes: AttributeData;
    initialValue?: number;
}
