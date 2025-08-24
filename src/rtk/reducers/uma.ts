import { createSlice } from "@reduxjs/toolkit";
import {
    fetchUmaCharacters,
    fetchUmaSupports,
    LoadingStatus,
} from "rtk/fetchData";
import { UmaItemData } from "types/uma";

export interface State {
    status: LoadingStatus;
    characters: UmaItemData[];
    supports: UmaItemData[];
}

const initialState: State = {
    status: "idle",
    characters: [],
    supports: [],
};

export const umaSlice = createSlice({
    name: "uma",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUmaCharacters.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchUmaCharacters.fulfilled, (state, action) => {
            state.characters = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchUmaCharacters.rejected, (state) => {
            state.status = "error";
        });
        builder.addCase(fetchUmaSupports.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchUmaSupports.fulfilled, (state, action) => {
            state.supports = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchUmaSupports.rejected, (state) => {
            state.status = "error";
        });
    },
    selectors: {
        getStatus: (state): LoadingStatus => state.status,
        selectUmaCharacters: (state): UmaItemData[] => state.characters,
        selectUmaSupports: (state): UmaItemData[] => state.supports,
    },
});

export const { getStatus, selectUmaCharacters, selectUmaSupports } =
    umaSlice.selectors;

export default umaSlice.reducer;
