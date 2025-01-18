import { createSlice } from "@reduxjs/toolkit";
import { fetchBanners, LoadingStatus } from "rtk/fetchData";
import { BannerList } from "types/common";

export interface BannerState {
    status: LoadingStatus;
    banners: BannerList;
}

const initialState: BannerState = {
    status: "idle",
    banners: {},
};

export const bannerSlice = createSlice({
    name: "banners",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBanners.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchBanners.fulfilled, (state, action) => {
            const { tag, type } = action.meta.arg;
            if (!state.banners[tag]) {
                state.banners[tag] = {
                    [`${type}`]: [],
                };
            }
            state.banners[tag][type] = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchBanners.rejected, (state) => {
            state.status = "error";
        });
    },
    selectors: {
        selectBanners: (state): BannerList => state.banners,
    },
});

export const { selectBanners } = bannerSlice.selectors;

export default bannerSlice.reducer;
