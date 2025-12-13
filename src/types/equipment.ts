import { BaseDataWithRelease } from ".";

export interface Equipment extends BaseDataWithRelease {
    displayName: string;
    rarity: number;
    setEffect: SetEffect;
    pieces?: SetPieces[];
    description?: string;
}

export interface SetEffect {
    "1"?: string;
    "2"?: string;
    "3"?: string;
    "4"?: string;
    "5"?: string;
}

export interface SetPieces {
    type: string;
    name: string;
    description: string;
}
