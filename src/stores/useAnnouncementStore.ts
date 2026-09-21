import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AnnouncementState {
    seen: string[];
}

interface AnnouncementActions {
    markAsSeen: (slug: string) => void;
}

type AnnouncementStore = AnnouncementState & AnnouncementActions;

export const useAnnouncementStore = create<AnnouncementStore>()(
    persist(
        (set) => ({
            seen: [],
            markAsSeen: (slug) =>
                set((state) => ({
                    seen: state.seen.includes(slug)
                        ? state.seen
                        : [...state.seen, slug],
                })),
        }),
        {
            name: "v2/announcements",
        },
    ),
);
