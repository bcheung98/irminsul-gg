import { create } from "zustand";

export interface DrawerState {
    rightDrawerOpen: boolean;
    rightDrawerMobileOpen: boolean;
}

export interface DrawerActions {
    toggleRightDrawer: (open?: boolean) => void;
    toggleRightDrawerMobile: (open?: boolean) => void;
}

export type DrawerStore = DrawerState & DrawerActions;

export const initialState: DrawerState = {
    rightDrawerOpen: true,
    rightDrawerMobileOpen: false,
};

export const useDrawerStore = create<DrawerStore>((set) => ({
    ...initialState,
    toggleRightDrawer: function (open) {
        return set((state) => ({
            rightDrawerOpen: open ?? !state.rightDrawerOpen,
        }));
    },
    toggleRightDrawerMobile: function (open) {
        return set((state) => ({
            rightDrawerMobileOpen: open ?? !state.rightDrawerMobileOpen,
        }));
    },
}));
