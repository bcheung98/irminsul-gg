import { GalleryView, SortOrder } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const defaultSettings: GallerySettings = {
    sortBy: "release",
    sortDirection: "asc",
    view: "icon",
};

export interface GallerySettings {
    sortBy: string;
    sortDirection: SortOrder;
    view: GalleryView;
}

export interface GalleryState {
    "genshin/characters": GallerySettings;
    "genshin/weapons": GallerySettings;
    "genshin/artifacts": GallerySettings;
    "hsr/characters": GallerySettings;
    "hsr/lightcones": GallerySettings;
    "hsr/relics": GallerySettings;
}

export interface GalleryActions {
    setGalleryState: (
        key: keyof GalleryState,
        tag: keyof GallerySettings,
        settings: string
    ) => void;
}

export type GalleryStore = GalleryState & GalleryActions;

export const initialState: GalleryState = {
    "genshin/characters": defaultSettings,
    "genshin/weapons": {
        sortBy: "version",
        sortDirection: "asc",
        view: "icon",
    },
    "genshin/artifacts": defaultSettings,
    "hsr/characters": defaultSettings,
    "hsr/lightcones": {
        sortBy: "version",
        sortDirection: "asc",
        view: "icon",
    },
    "hsr/relics": defaultSettings,
};

export const useGalleryStore = create(
    persist<GalleryStore>(
        (set) => ({
            ...initialState,
            setGalleryState: function (key, tag, settings) {
                return set((state) => ({
                    [`${key}`]: { ...state[key], [`${tag}`]: settings },
                }));
            },
        }),
        { name: "v2/gallery" }
    )
);
