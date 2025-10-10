interface NavItems {
    [key: string]: NavItem[];
}

export interface NavItem {
    icon: string;
    title: string;
    href: string;
}

export const navItems: NavItems = {
    genshin: [
        {
            icon: "icons/Aether",
            title: "Characters",
            href: "characters",
        },
        {
            icon: "icons/Weapons",
            title: "Weapons",
            href: "weapons",
        },
        {
            icon: "icons/Artifact",
            title: "Artifacts",
            href: "artifacts",
        },
        {
            icon: "icons/TCG",
            title: "TCG",
            href: "tcg",
        },
        {
            icon: "icons/Ascension",
            title: "Ascension Planner",
            href: "planner",
        },
        {
            icon: "icons/Wish",
            title: "Banner Archive",
            href: "banners",
        },
    ],
};
