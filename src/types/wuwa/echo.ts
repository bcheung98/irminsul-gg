import { WuWaRarity } from ".";
import { BaseDataWithRelease } from "..";
import { Equipment } from "../equipment";

export interface WuWaEcho extends BaseDataWithRelease {
    displayName: string;
    code: string;
    rarity: WuWaRarity;
    cost: EchoCost;
    skill: EchoSkill;
    sonata: number[];
    description: string;
    hasPhantom: boolean;
}

export type EchoCost = 4 | 3 | 1;

export interface EchoSkill {
    description: string;
    cooldown: number;
    scaling: string[][];
}

export type SonataEffect = Omit<Equipment, "rarity" | "pieces">;
