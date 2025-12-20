import { create } from "zustand";

export interface LayoutState {
    dialogOpen: boolean;
}

export interface LayoutActions {
    setDialogOpen: (open?: boolean) => void;
}

export type LayoutStore = LayoutState & LayoutActions;

export const initialState: LayoutState = {
    dialogOpen: false,
};

export const useLayoutStore = create<LayoutStore>((set) => ({
    ...initialState,
    setDialogOpen: function (open) {
        return set((state) => ({
            dialogOpen: open ?? !state.dialogOpen,
        }));
    },
}));
