import { range } from "@/utils";
import { scenarios } from "@/data/uma/scenarios";
import { TEHDeck, TEHDeckData, TEHSettings } from "@/types/uma/te-helper";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
                const deck = get()["decks"][get()["currentDeck"]];
                deck.character = character;
                return set((state) => ({
                    ...state,
                    decks: get()["decks"],
                }));
            },
            addSupport: function (index, support) {
                const deck = get()["decks"][get()["currentDeck"]];
                deck.supports[index] = support;
                return set((state) => ({
                    ...state,
                    decks: get()["decks"],
                }));
            },
            addScenario: function (scenario) {
                const deck = get()["decks"][get()["currentDeck"]];
                deck.scenario = scenario;
                return set((state) => ({
                    ...state,
                    decks: get()["decks"],
                }));
            },
            setCurrentDeck: function (deckID) {
                return set((state) => ({
                    ...state,
                    currentDeck: deckID,
                }));
            },
            renameDeck: function (newName) {
                const deck = get()["decks"][get()["currentDeck"]];
                deck.name = newName;
                return set((state) => ({
                    ...state,
                    decks: get()["decks"],
                }));
            },
            copyDeck: function (deckID) {
                const decks = get()["decks"];
                const index = get()["currentDeck"];
                const newDeck = { ...decks[index] };
                const name = decks[index].name;
                newDeck.supports[6] = -1;
                decks[deckID] = newDeck;
                decks[deckID].name = `Copy of ${name}`;
                return set((state) => ({
                    ...state,
                    decks: get()["decks"],
                }));
            },
            resetDeck: function (deckID) {
                get()["decks"][deckID] = defaultDecks[deckID];
                return set((state) => ({
                    ...state,
                    decks: get()["decks"],
                }));
            },
            setSettings: function (settings) {
                return set((state) => ({
                    ...state,
                    settings: settings,
                }));
            },
            setShowAll: function (value) {
                return set((state) => ({
                    ...state,
                    settings: {
                        ...state.settings,
                        showAll: value,
                    },
                }));
            },
            setExpanded: function (value) {
                return set((state) => ({
                    ...state,
                    settings: {
                        ...state.settings,
                        expanded: value,
                    },
                }));
            },
        }),
        { name: "v2/uma-te-helper" }
    )
);
