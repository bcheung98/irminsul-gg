import { UmaSkillRarity } from ".";

export type DataArray = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
];
export type StatArray = [number, number, number, number, number];
export type ValueArray = [StatArray, number, number];

export interface UmaSkillOption {
    id: number;
    name: string;
    nameJP: string;
    nameJPNative: string;
    icon: number;
    rarity: UmaSkillRarity;
    values: string[];
}
