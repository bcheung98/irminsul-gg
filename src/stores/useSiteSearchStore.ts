import { create } from "zustand";
import { persist } from "zustand/middleware";

import { SearchResult } from "@/components/SiteSearch";

export interface SiteSearchState {
    pinned: SearchResult[];
    recent: SearchResult[];
}

export interface SiteSearchActions {
    addPinnedSearch: (item: SearchResult) => void;
    removePinnedSearch: (item: SearchResult) => void;
    addRecentSearch: (item: SearchResult) => void;
    removeRecentSearch: (item?: SearchResult) => void;
}

export type SiteSearchStore = SiteSearchState & SiteSearchActions;

export const initialState: SiteSearchState = {
    pinned: [],
    recent: [],
};

export const useSiteSearchStore = create(
    persist<SiteSearchStore>(
        (set) => ({
            ...initialState,
            addPinnedSearch: function (item) {
                return set((state) => {
                    const pinned = [...state.pinned];
                    pinned.unshift(item);
                    const recent = [...state.recent];
                    const index = recent.findIndex(
                        (data) => data.name === item.name
                    );
                    recent.splice(index, 1);
                    return { pinned, recent };
                });
            },
            removePinnedSearch: function (item) {
                return set((state) => {
                    const pinned = [...state.pinned];
                    const index = pinned.findIndex(
                        (data) => data.url === item.url
                    );
                    pinned.splice(index, 1);
                    return {
                        ...state,
                        pinned,
                    };
                });
            },
            addRecentSearch: function (item) {
                return set((state) => {
                    const pinned = [...state.pinned];
                    const recent = [...state.recent];
                    if (!pinned.includes(item)) {
                        if (recent.includes(item)) {
                            const index = recent.findIndex(
                                (data) => data.name === item.name
                            );
                            recent.splice(index, 1);
                        }
                        recent.unshift(item);
                        if (recent.length > 10) {
                            recent.pop();
                        }
                    }
                    return {
                        ...state,
                        recent,
                    };
                });
            },
            removeRecentSearch: function (item) {
                return set((state) => {
                    let recent: SearchResult[] = [];
                    if (item) {
                        recent = [...state.recent];
                        const index = recent.findIndex(
                            (data) => data.url === item.url
                        );
                        recent.splice(index, 1);
                    }
                    return {
                        ...state,
                        recent,
                    };
                });
            },
        }),
        { name: "v2/search" }
    )
);
