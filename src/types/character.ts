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
