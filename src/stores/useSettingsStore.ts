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
    toggleUnreleasedContent: () => void;
}

export type SettingsStore = SettingsState & SettingsActions;

export const initialState: SettingsState = {
    theme: 0,
    statDisplay: "slider",
    hideUnreleasedContent: false,
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
            toggleUnreleasedContent: function () {
                return set((state) => ({
                    hideUnreleasedContent: !state.hideUnreleasedContent,
                }));
            },
        }),
        { name: "v2/settings" }
    )
);
