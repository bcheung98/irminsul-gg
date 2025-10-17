import { AttributeData } from "@/types/_common";
import { GenshinCharacterStats } from "@/types/genshin/character";

export type TCharacterStats = GenshinCharacterStats;

export interface StatsDisplayProps {
    game: string;
    stats: TCharacterStats;
    attributes: AttributeData;
}
