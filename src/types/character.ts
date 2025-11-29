export interface CharacterStats {
    hp: number[];
    atk: number[];
    def: number[];
}

export interface CharacterOutfit {
    name: string;
    displayName?: string;
    rarity: number;
    description: string;
}

export interface CharacterBuffs {
    versions?: {
        value: string;
        label: string;
    }[];
    value?: string;
    onChange?: (arg0: any, arg1: any) => void;
}
