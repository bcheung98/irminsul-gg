import { createAsyncThunk } from "@reduxjs/toolkit";
import { Banner, Website } from "types/common";

export type LoadingStatus = "idle" | "pending" | "success" | "error";

// https://api.irminsul.gg/main/websites.json
const websitesURL = "https://api.irminsul.gg/main/websites.json";

export const fetchWebsites = createAsyncThunk(
    "GET/websites",
    async (): Promise<Website[]> => {
        const response = await fetch(websitesURL);
        return await response.json();
    }
);

export const fetchBanners = createAsyncThunk(
    "GET/banners",
    async (params: {
        tag: string;
        type: "character" | "weapon";
    }): Promise<Banner[]> => {
        const response = await fetch(
            `https://api.irminsul.gg/${params.tag.toLowerCase()}/${
                params.type
            }-banners.json`
        );
        return await response.json();
    }
);
