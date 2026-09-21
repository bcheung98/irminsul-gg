import TwoYearAnniAnnouncement from "@/announcements/irminsul-gg-2nd-anni";

export const announcementList: Announcement[] = [
    {
        slug: "irminsul-gg-2nd-anni",
        title: "🎉 Two Years of Irminsul.GG!",
        date: "2026-09-21 10:00:00 UTC+8",
        expires: "2026-10-06 10:00:00",
        Content: TwoYearAnniAnnouncement,
        link: "/blog/irminsul-gg-2nd-anni",
    },
];

export interface Announcement {
    slug: string;
    title: string;
    description?: string;
    date: string;
    expires?: string;
    image?: string;
    link?: string;
    Content: React.ComponentType<AnnouncementContentProps>;
}

export interface AnnouncementContentProps {
    onDismiss?: () => void;
}
