export const blogList = [
    {
        slug: "endfield-update",
        title: "Arknights: Endfield is here!",
        description: "Check out the new Endfield site for Irminsul.GG.",
        date: "2026-01-21 10:00:00",
        image: "endfield/_common/wallpapers/Endfield_1.0",
    },
    {
        slug: "irminsul-gg-v2-release-notes",
        title: "Irminsul.GG v2.0 Release Notes",
        description: "Check out what's new in Irminsul.GG v2.0.",
        date: "2025-12-21 10:00:00",
        image: "https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/genshin/preview.png",
    },
    {
        slug: "uma-update",
        title: "Umamusume: Pretty Derby is here!",
        description: "Check out the new Umamusume site for Irminsul.GG.",
        date: "2025-08-24 10:00:00",
        image: "uma/_common/wallpapers/Uma_1.0",
    },
    {
        slug: "new-calendar-and-search",
        title: "New features - Calendar and Site Search",
        description:
            "Learn more about the new Gacha Calendar and Site Search features.",
        date: "2025-02-01 10:00:00",
        image: "https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/calendar-img.png",
    },
    {
        slug: "irminsul-gg-v1-release-notes",
        title: "Irminsul.GG v1.0 Release Notes",
        description: "Check out what's new in Irminsul.GG v1.0.",
        date: "2025-01-16 10:00:00",
        lastEdit: "2025-12-21 10:00:00",
        image: "https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/_v1/genshin/preview.png",
    },
    {
        slug: "irminsul-gg-v0.6-release-notes",
        title: "Irminsul.GG v0.6 Release Notes",
        description: "Check out what's new in Irminsul.GG v0.6.",
        date: "2024-11-22 10:00:00",
        lastEdit: "2025-12-21 10:00:00",
    },
    {
        slug: "1.0-roadmap",
        title: "Roadmap to v1.0",
        description: "Find out what's coming in the next major release.",
        date: "2024-09-23 10:00:00",
    },
    {
        slug: "the-story-of-irminsul-gg",
        title: "The Story of Irminsul.GG",
        description: "Learn about the origins of Irminsul.GG.",
        date: "2024-09-21 10:00:00",
        lastEdit: "2025-12-21 10:00:00",
    },
];

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    lastEdit?: string;
    image?: string;
}
