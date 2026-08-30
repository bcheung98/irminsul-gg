import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Gender, SkillDisplay } from "@/types";

export interface SettingsState {
    theme: number;
    statDisplay: SkillDisplay;
    gender: Gender;
    hideUnreleasedContent: boolean;
    _hasHydrated: boolean;
}

export interface SettingsActions {
    setSettings: (payload: SettingsState) => void;
    setTheme: (payload: number) => void;
    setStatDisplay: (payload: SkillDisplay) => void;
    setGender: (payload: Gender) => void;
    setUnreleasedContent: (payload: boolean) => void;
}

export type SettingsStore = SettingsState & SettingsActions;

export const initialState: SettingsState = {
    theme: 1,
    statDisplay: "slider",
    gender: "Male",
    hideUnreleasedContent: true,
    _hasHydrated: false,
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
            setGender: function (payload) {
                return set(() => ({ gender: payload }));
            },
            setUnreleasedContent: function (payload) {
                return set(() => ({ hideUnreleasedContent: payload }));
            },
        }),
        {
            name: "v2/settings",
            skipHydration: true,
            onRehydrateStorage: () => {
                return () => {
                    useSettingsStore.setState({
                        _hasHydrated: true,
                    });
                };
            },
        },
    ),
);
