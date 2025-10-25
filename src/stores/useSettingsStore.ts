import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Server, SkillDisplay } from "@/types";

export interface SettingsState {
    theme: number;
    statDisplay: SkillDisplay;
    server: Server;
    showUnreleasedContent: boolean;
}

export interface SettingsActions {
    setSettings: (payload: SettingsState) => void;
    setTheme: (payload: number) => void;
}

export type SettingsStore = SettingsState & SettingsActions;

export const initialState: SettingsState = {
    theme: 0,
    statDisplay: "slider",
    server: "NA",
    showUnreleasedContent: false,
};

export const useSettingsStore = create(
    persist<SettingsStore>(
        (set) => ({
            ...initialState,
            setSettings: function (payload) {
                return set((state) => Object.assign(state, payload));
            },
            setTheme: function (payload) {
                return set(() => ({ theme: payload }));
            },
        }),
        { name: "v2/settings" }
    )
);
