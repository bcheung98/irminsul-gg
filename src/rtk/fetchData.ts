import { createAsyncThunk } from "@reduxjs/toolkit";
import { Banner, Website } from "types/common";
import { UmaItemData } from "types/uma";

export type LoadingStatus = "idle" | "pending" | "success" | "error";

// https://api.irminsul.gg/main/websites.json
const websitesURL = "https://api.irminsul.gg/main/websites.json";

// https://api.irminsul.gg/uma/characters.json
const umaCharactersURL = "https://api.irminsul.gg/uma/characters.json";

// https://api.irminsul.gg/uma/supports.json
const umaSupportsURL = "https://api.irminsul.gg/uma/supports.json";

export const fetchWebsites = createAsyncThunk(
    "GET/websites",
    async (): Promise<Website[]> => {
        const response = await fetch(websitesURL);
        return await response.json();
    }
);

export const fetchBanners = createAsyncThunk(
    "GET/banners",
    async (params: { tag: string; type: string }): Promise<Banner[]> => {
        const response = await fetch(
            `https://api.irminsul.gg/${params.tag.toLowerCase()}/${
                params.type
            }-banners.json`
        );
        return await response.json();
    }
);

export const fetchUmaCharacters = createAsyncThunk(
    "GET/umaCharacters",
    async (): Promise<UmaItemData[]> => {
        const response = await fetch(umaCharactersURL);
        return await response.json();
    }
);

export const fetchUmaSupports = createAsyncThunk(
    "GET/umaSupports",
    async (): Promise<UmaItemData[]> => {
        const response = await fetch(umaSupportsURL);
        return await response.json();
    }
);
