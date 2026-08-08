import { UmaSkillOption } from "@/components/_uma/RatingCalculator/RatingCalculatorSkills";
import { UmaRank } from "@/types/uma";
import { UmaCharacterAptitude } from "@/types/uma/character";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RatingCalculatorState {
    character: number | null;
    stats: [number, number, number, number, number, number, number];
    aptitude: UmaCharacterAptitude;
    skills: UmaSkillOption[];
    hiddenSkills: number[];
}

export interface RatingCalculatorActions {
    addCharacter: (character: number | null) => void;
    addAptitude: (aptitude: UmaCharacterAptitude) => void;
    setAptitude: (
        key1: keyof UmaCharacterAptitude,
        key2: string,
        value: UmaRank,
    ) => void;
    setStat: (index: number, value: number) => void;
    setSkills: (skills: UmaSkillOption[]) => void;
    setHiddenSkills: (id: number) => void;
}

export type RatingCalculatorStore = RatingCalculatorState &
    RatingCalculatorActions;

const initialState: RatingCalculatorState = {
    character: null,
    stats: [0, 0, 0, 0, 0, 3, 3],
    aptitude: {
        surface: {
            turf: "A",
            dirt: "B",
        },
        distance: {
            sprint: "E",
            mile: "A",
            medium: "A",
            long: "B",
        },
        strategy: {
            front: "F",
            pace: "A",
            late: "A",
            end: "D",
        },
    },
    skills: [],
    hiddenSkills: [],
};

export const useRatingCalculatorStore = create(
    persist<RatingCalculatorStore>(
        (set, get) => ({
            ...initialState,
            addCharacter: function (character) {
                return set((state) => ({
                    ...state,
                    character,
                }));
            },
            addAptitude: function (aptitude) {
                return set((state) => ({
                    ...state,
                    aptitude,
                }));
            },
            setAptitude: function (key1, key2, value) {
                const aptitude = get()["aptitude"];
                aptitude[key1][key2] = value;
                return set((state) => ({
                    ...state,
                    aptitude,
                }));
            },
            setStat: function (index, value) {
                const stats = get()["stats"];
                stats[index] = value;
                return set((state) => ({
                    ...state,
                    stats,
                }));
            },
            setSkills: function (skills) {
                return set((state) => ({
                    ...state,
                    skills,
                }));
            },
            setHiddenSkills: function (id) {
                const hidden = get()["hiddenSkills"];
                !hidden.includes(id)
                    ? hidden.push(id)
                    : hidden.splice(hidden.indexOf(id), 1);
                return set((state) => ({ ...state, hiddenSkills: hidden }));
            },
        }),
        {
            name: "v2/uma-rating-calculator",
        },
    ),
);
