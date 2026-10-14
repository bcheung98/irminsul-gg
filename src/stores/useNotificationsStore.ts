import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NotificationState {
    seen: string[];
    read: string[];
}

interface NotificationActions {
    markAsSeen: (slug: string) => void;
    markAsRead: (slug: string) => void;
    markAsUnread: (slug: string) => void;
    markAllAsRead: (slugs: string[]) => void;
    markAllAsUnread: () => void;
    acknowledgeNotification: (slug: string) => void;
}

type NotificationStore = NotificationState & NotificationActions;

const historicalNotifications = [
    "wuwa-3.7-update",
    "nte-1.4-update",
    "hsr-4.6-update",
    "genshin-7.1-update",
    "irminsul-gg-2nd-anni",
    "zzz-3.2-update",
    "endfield-1.5-update",
    "hsr-4.5-update",
    "wuwa-3.6-update",
    "nte-1.3-update",
    "genshin-7.0-update",
    "zzz-3.1-update",
    "endfield-1.4-update",
    "hsr-4.4-update",
    "wuwa-3.5-update",
    "nte-1.2-update",
    "genshin-Luna VIII-update",
    "zzz-3.0-update",
    "wuwa-3.4-update",
    "endfield-1.3-update",
    "nte-1.1-update",
    "nte-update",
    "hsr-4.3-update",
    "genshin-Luna VII-update",
    "zzz-2.8-update",
    "wuwa-3.3-update",
    "hsr-4.2-update",
    "endfield-1.2-update",
    "genshin-Luna VI-update",
    "hsr-4.1-update",
    "zzz-2.7-update",
    "wuwa-3.2-update",
    "endfield-1.1-update",
    "genshin-Luna V-update",
    "hsr-4.0-update",
    "zzz-2.6-update",
    "wuwa-3.1-update",
    "endfield-update",
    "endfield-1.0-update",
    "genshin-Luna IV-update",
    "zzz-2.5-update",
    "wuwa-3.0-update",
    "irminsul-gg-v2-release-notes",
];

export const useNotificationsStore = create<NotificationStore>()(
    persist(
        (set) => ({
            seen: [...historicalNotifications],
            read: [...historicalNotifications],
            markAsSeen: (slug) =>
                set((state) => ({
                    seen: state.seen.includes(slug)
                        ? state.seen
                        : [...state.seen, slug],
                })),
            markAsRead: (slug) =>
                set((state) => ({
                    read: state.read.includes(slug)
                        ? state.read
                        : [...state.read, slug],
                })),
            markAsUnread: (slug) =>
                set((state) => ({
                    read: state.read.filter((id) => id !== slug),
                })),
            markAllAsRead: (slugs) =>
                set((state) => ({
                    read: [...new Set([...state.read, ...slugs])],
                })),
            markAllAsUnread: () => set({ read: [] }),
            acknowledgeNotification: (slug) =>
                set((state) => ({
                    seen: state.seen.includes(slug)
                        ? state.seen
                        : [...state.seen, slug],
                    read: state.read.includes(slug)
                        ? state.read
                        : [...state.read, slug],
                })),
        }),
        {
            name: "v2/notifications",
        },
    ),
);
