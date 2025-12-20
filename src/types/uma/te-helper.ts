export type TEHDeckData = number | null;

export type TEHItemCategory = "character" | "support" | "scenario" | null;

export interface TEHDeck {
    name: string;
    character: TEHDeckData;
    scenario: TEHDeckData;
    supports: [
        TEHDeckData,
        TEHDeckData,
        TEHDeckData,
        TEHDeckData,
        TEHDeckData,
        TEHDeckData,
        number
    ];
}

export interface TEHSettings {
    showAll: boolean;
    expanded: boolean;
}
