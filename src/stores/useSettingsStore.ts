import { create } from "zustand";
import { persist } from "zustand/middleware";

import { SkillDisplay } from "@/types";

export interface SettingsState {
    theme: number;
    statDisplay: SkillDisplay;
    hideUnreleasedContent: boolean;
}

export interface SettingsActions {
    setSettings: (payload: SettingsState) => void;
    setTheme: (payload: number) => void;
    setStatDisplay: (payload: SkillDisplay) => void;
    setUnreleasedContent: (payload: boolean) => void;
}

export type SettingsStore = SettingsState & SettingsActions;

export const initialState: SettingsState = {
    theme: 1,
    statDisplay: "slider",
    hideUnreleasedContent: true,
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
            setStatDisplay: function (payload) {
                return set(() => ({ statDisplay: payload }));
            },
            setUnreleasedContent: function (payload) {
                return set(() => ({ hideUnreleasedContent: payload }));
            },
        }),
        { name: "v2/settings" }
    )
);
