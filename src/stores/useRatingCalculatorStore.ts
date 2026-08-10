import { UmaRank } from "@/types/uma";
import { UmaCharacterAptitude } from "@/types/uma/character";
import { DataArray, UmaSkillOption } from "@/types/uma/calculator";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RatingCalculatorState {
    character: number | null;
    stats: DataArray;
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
    character: 100101,
    stats: [0, 0, 0, 0, 0, 3, 4],
    aptitude: {
        surface: {
            turf: "A",
            dirt: "G",
        },
        distance: {
            sprint: "F",
            mile: "C",
            medium: "A",
            long: "A",
        },
        strategy: {
            front: "G",
            pace: "A",
            late: "A",
            end: "C",
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
