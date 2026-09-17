import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Game, GameData } from "@/types";

interface CalendarSettings {
    firstDay: number;
}

interface CalendarGameSettings {
    enabled: boolean;
    fullDuration: boolean;
}

export type CalendarState = CalendarSettings & GameData<CalendarGameSettings>;

export interface CalendarActions {
    setCalendarStartDay: (newValue: number) => void;
    setCalendarGameSettings: (
        game: Game,
        key: keyof CalendarGameSettings,
        newValue: boolean,
    ) => void;
}

export type CalendarStore = CalendarState & CalendarActions;

export const initialState: CalendarState = {
    firstDay: 0,
    genshin: {
        enabled: true,
        fullDuration: false,
    },
    hsr: {
        enabled: true,
        fullDuration: false,
    },
    wuwa: {
        enabled: true,
        fullDuration: false,
    },
    zzz: {
        enabled: true,
        fullDuration: false,
    },
    uma: {
        enabled: true,
        fullDuration: false,
    },
    endfield: {
        enabled: true,
        fullDuration: false,
    },
    nte: {
        enabled: true,
        fullDuration: false,
    },
};

export const useCalendarStore = create(
    persist<CalendarStore>(
        (set) => ({
            ...initialState,
            setCalendarStartDay: function (newValue) {
                return set(() => ({
                    firstDay: newValue,
                }));
            },
            setCalendarGameSettings: function (game, key, newValue) {
                return set((state) => ({
                    [`${game}`]: { ...state[game], [`${key}`]: newValue },
                }));
            },
        }),
        { name: "v2/calendar" },
    ),
);
