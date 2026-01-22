import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Game, GameData } from "@/types";

interface CalendarSettings {
    enabled: boolean;
    fullDuration: boolean;
}

export type CalendarState = GameData<CalendarSettings>;

export interface CalendarActions {
    setCalendarSettings: (
        game: Game,
        key: keyof CalendarSettings,
        newValue: boolean
    ) => void;
}

export type CalendarStore = CalendarState & CalendarActions;

export const initialState: CalendarState = {
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
    endfield: { enabled: true, fullDuration: false },
};

export const useCalendarStore = create(
    persist<CalendarStore>(
        (set) => ({
            ...initialState,
            setCalendarSettings: function (game, key, newValue) {
                return set((state) => ({
                    [`${game}`]: { ...state[game], [`${key}`]: newValue },
                }));
            },
        }),
        { name: "v2/calendar" }
    )
);
