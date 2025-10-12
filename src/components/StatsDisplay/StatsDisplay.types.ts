import { GenshinCharacterStats } from "@/app/(games)/genshin/_types/character";
import { AttributeData } from "@/types/_common";

export type TCharacterStats = GenshinCharacterStats;

export interface StatsDisplayProps {
    game: string;
    stats: GenshinCharacterStats;
    attributes: AttributeData;
}
