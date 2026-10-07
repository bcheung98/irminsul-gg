import { create } from "zustand";
import { persist } from "zustand/middleware";
import { range } from "@/utils";
import { scenarios } from "@/data/uma/scenarios";
import type { TEHDeck, TEHDeckData, TEHSettings } from "@/types/uma/te-helper";

export interface TEHelperState {
    decks: TEHDeck[];
    currentDeck: number;
    settings: TEHSettings;
}

export interface TEHelperActions {
    addCharacter: (character: TEHDeckData) => void;
    addSupport: (index: number, support: TEHDeckData) => void;
    addScenario: (scenario: TEHDeckData) => void;
    setCurrentDeck: (deckID: number) => void;
    renameDeck: (newName: string) => void;
    copyDeck: (deckID: number) => void;
    resetDeck: (deckID: number) => void;
    setSettings: (settings: TEHSettings) => void;
    setShowAll: (value: boolean) => void;
    setExpanded: (value: boolean) => void;
}

export type TEHelperStore = TEHelperState & TEHelperActions;

const defaultDecks: TEHDeck[] = range(1, 20).map((i) => ({
    name: `Deck ${i}`,
    character: null,
    scenario: scenarios.findLast((scenario) => scenario.global)?.id || 1,
    supports: [null, null, null, null, null, null, -1],
}));

const defaultSettings: TEHSettings = {
    showAll: false,
    expanded: false,
};

const initialState: TEHelperState = {
    decks: defaultDecks,
    currentDeck: 0,
    settings: defaultSettings,
};

export const useTEHelperStore = create(
    persist<TEHelperStore>(
        (set, get) => ({
            ...initialState,
            addCharacter: function (character) {
                const currentDeck = get().currentDeck;

                return set((state) => ({
                    decks: state.decks.map((deck, index) =>
                        index === currentDeck ? { ...deck, character } : deck,
                    ),
                }));
            },
            addSupport: function (index, support) {
                const currentDeck = get().currentDeck;

                return set((state) => ({
                    decks: state.decks.map((deck, deckIndex) => {
                        if (deckIndex !== currentDeck) return deck;

                        const supports: TEHDeck["supports"] = [
                            ...deck.supports,
                        ];
                        supports[index] = support;

                        return {
                            ...deck,
                            supports,
                        };
                    }),
                }));
            },
            addScenario: function (scenario) {
                const currentDeck = get().currentDeck;

                return set((state) => ({
                    decks: state.decks.map((deck, index) =>
                        index === currentDeck ? { ...deck, scenario } : deck,
                    ),
                }));
            },
            setCurrentDeck: (deckID) => set({ currentDeck: deckID }),
            renameDeck: function (newName) {
                const currentDeck = get().currentDeck;

                return set((state) => ({
                    decks: state.decks.map((deck, index) =>
                        index === currentDeck
                            ? { ...deck, name: newName }
                            : deck,
                    ),
                }));
            },
            copyDeck: function (deckID) {
                const currentDeck = get().currentDeck;

                return set((state) => {
                    const source = state.decks[currentDeck];

                    const supports: TEHDeck["supports"] = [...source.supports];
                    supports[6] = -1;

                    const copy: TEHDeck = {
                        ...source,
                        name: `Copy of ${source.name}`,
                        supports,
                    };

                    return {
                        decks: state.decks.map((deck, index) =>
                            index === deckID ? copy : deck,
                        ),
                    };
                });
            },
            resetDeck: function (deckID) {
                return set((state) => ({
                    decks: state.decks.map((deck, index) => {
                        if (index !== deckID) return deck;

                        const supports: TEHDeck["supports"] = [
                            ...defaultDecks[deckID].supports,
                        ];

                        return {
                            ...defaultDecks[deckID],
                            supports,
                        };
                    }),
                }));
            },
            setSettings: (settings) => set({ settings }),
            setShowAll: function (value) {
                return set((state) => ({
                    settings: {
                        ...state.settings,
                        showAll: value,
                    },
                }));
            },
            setExpanded: function (value) {
                return set((state) => ({
                    settings: {
                        ...state.settings,
                        expanded: value,
                    },
                }));
            },
        }),
        { name: "v2/uma-te-helper" },
    ),
);
