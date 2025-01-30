import { createSlice } from "@reduxjs/toolkit";
import { startAppListening } from "helpers/hooks";
import { fetchWebsites, LoadingStatus } from "rtk/fetchData";
import { Website } from "types/common";

export interface WebsiteState {
    status: LoadingStatus;
    websites: Website[];
}

const storedWebsites = localStorage.getItem("data/websites") || "null";

const initialState: WebsiteState = {
    status: "idle",
    websites: storedWebsites !== "null" ? JSON.parse(storedWebsites) : [],
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
            let payload = action.payload;
            if (JSON.stringify(payload) !== storedWebsites) {
                state.websites = payload;
            }
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

startAppListening({
    actionCreator: fetchWebsites.fulfilled,
    effect: (action) => {
        let payload = action.payload;
        const data = JSON.stringify(payload);
        if (data !== storedWebsites) {
            localStorage.setItem("data/websites", data);
        }
    },
});
