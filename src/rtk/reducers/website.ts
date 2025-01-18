import { createSlice } from "@reduxjs/toolkit";
import { fetchWebsites, LoadingStatus } from "rtk/fetchData";
import { Website } from "types/common";

export interface WebsiteState {
    status: LoadingStatus;
    websites: Website[];
}

const initialState: WebsiteState = {
    status: "idle",
    websites: [],
};

export const websiteSlice = createSlice({
    name: "websites",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWebsites.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchWebsites.fulfilled, (state, action) => {
            state.websites = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchWebsites.rejected, (state) => {
            state.status = "error";
        });
    },
    selectors: {
        selectWebsites: (state): Website[] => state.websites,
    },
});

export const { selectWebsites } = websiteSlice.selectors;

export default websiteSlice.reducer;
