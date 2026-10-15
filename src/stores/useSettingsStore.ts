import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { GalleryView, Gender, MenuSide, SkillDisplay } from "@/types";

export interface SettingsState {
    theme: number;
    statDisplay: SkillDisplay;
    gender: Gender;
    hideUnreleasedContent: boolean;
    navDrawerOpen: boolean;
    mobileMenuSide: MenuSide;
    plannerMaterialView: GalleryView;
    _hasHydrated: boolean;
}

export interface SettingsActions {
    setSettings: (payload: Partial<SettingsState>) => void;
    setTheme: (payload: number) => void;
    setStatDisplay: (payload: SkillDisplay) => void;
    setGender: (payload: Gender) => void;
    setUnreleasedContent: (payload: boolean) => void;
    setNavDrawer: (payload: boolean) => void;
    setMobileMenuSide: (payload: MenuSide) => void;
    setPlannerMaterialView: (payload: GalleryView) => void;
}

export type SettingsStore = SettingsState & SettingsActions;

export const initialState: SettingsState = {
    theme: 1,
    statDisplay: "slider",
    gender: "Male",
    hideUnreleasedContent: true,
    navDrawerOpen: true,
    mobileMenuSide: "right",
    plannerMaterialView: "card",
    _hasHydrated: false,
};

export const RELOAD_SETTINGS = [
    "hideUnreleasedContent",
] as const satisfies readonly (keyof SettingsState)[];

export const useSettingsStore = create<SettingsStore>()(
    persist(
        (set) => ({
            ...initialState,
            setSettings: function (payload) {
                return set(payload);
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
            setPlannerMaterialView: function (payload) {
                return set(() => ({ plannerMaterialView: payload }));
            },
        }),
        {
            name: "v2/settings",
            skipHydration: true,
            partialize: (state) => ({
                theme: state.theme,
                statDisplay: state.statDisplay,
                gender: state.gender,
                hideUnreleasedContent: state.hideUnreleasedContent,
                navDrawerOpen: state.navDrawerOpen,
                mobileMenuSide: state.mobileMenuSide,
                plannerMaterialView: state.plannerMaterialView,
            }),
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

export function settingsRequireReload(
    previous: Partial<SettingsState>,
    current: Partial<SettingsState>,
): boolean {
    return RELOAD_SETTINGS.some((key) => previous[key] !== current[key]);
}
