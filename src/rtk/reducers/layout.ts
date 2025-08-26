import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
    background: string;
}

const initialState: State = {
    background: "Irminsul",
};

export const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        setBackground: (
            state,
            action: PayloadAction<{ background: string }>
        ) => {
            state.background = action.payload.background;
        },
    },
    selectors: {
        selectBackground: (state): string => state.background,
    },
});

export const { setBackground } = layoutSlice.actions;
export const { selectBackground } = layoutSlice.selectors;

export default layoutSlice.reducer;
