import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Gender, MenuSide, SkillDisplay } from "@/types";

export interface SettingsState {
    theme: number;
    statDisplay: SkillDisplay;
    gender: Gender;
    hideUnreleasedContent: boolean;
    navDrawerOpen: boolean;
    mobileMenuSide: MenuSide;
    _hasHydrated: boolean;
}

export interface SettingsActions {
    setSettings: (payload: SettingsState) => void;
    setTheme: (payload: number) => void;
    setStatDisplay: (payload: SkillDisplay) => void;
    setGender: (payload: Gender) => void;
    setUnreleasedContent: (payload: boolean) => void;
    setNavDrawer: (payload: boolean) => void;
    setMobileMenuSide: (payload: MenuSide) => void;
}

export type SettingsStore = SettingsState & SettingsActions;

export const initialState: SettingsState = {
    theme: 1,
    statDisplay: "slider",
    gender: "Male",
    hideUnreleasedContent: true,
    navDrawerOpen: true,
    mobileMenuSide: "right",
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
            setNavDrawer: function (payload) {
                return set(() => ({ navDrawerOpen: payload }));
            },
            setMobileMenuSide: function (payload) {
                return set(() => ({ mobileMenuSide: payload }));
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
