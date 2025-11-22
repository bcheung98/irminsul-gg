import { BaseData } from ".";

export interface Banner {
    id: number;
    version: string;
    start: string;
    end: string;
    startJP?: string;
    endJP?: string;
    rateUps: (string | number)[];
}

export interface BannerOption extends BaseData {
    category?: "characters" | "weapons";
    displayName: string;
    fullName?: string;
    rarity: number;
    element?: string;
    weaponType?: string;
}

export interface BannerProps {
    character: Banner[];
    weapon: Banner[];
    chronicled?: Banner[];
}

export type BannerType = keyof BannerProps | "all";
