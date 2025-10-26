import { create } from "zustand";

export interface DrawerState {
    rightDrawerOpen: boolean;
    rightDrawerMobileOpen: boolean;
}

export interface DrawerActions {
    toggleRightDrawer: () => void;
    toggleRightDrawerMobile: () => void;
}

export type DrawerStore = DrawerState & DrawerActions;

export const initialState: DrawerState = {
    rightDrawerOpen: true,
    rightDrawerMobileOpen: false,
};

export const useDrawerStore = create<DrawerStore>((set) => ({
    ...initialState,
    toggleRightDrawer: function () {
        return set((state) => ({ rightDrawerOpen: !state.rightDrawerOpen }));
    },
    toggleRightDrawerMobile: function () {
        return set((state) => ({
            rightDrawerMobileOpen: !state.rightDrawerMobileOpen,
        }));
    },
}));
