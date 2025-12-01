import { GameData } from "@/types";

export interface NavItem {
    icon: string;
    title: string;
    href: string;
}

export const navItems: GameData<NavItem[]> = {
    genshin: [
        {
            icon: "icons/Home",
            title: "Home",
            href: "",
        },
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
    hsr: [
        {
            icon: "icons/Home",
            title: "Home",
            href: "",
        },
        {
            icon: "icons/Character",
            title: "Characters",
            href: "characters",
        },
        {
            icon: "icons/Lightcone",
            title: "Light Cones",
            href: "lightcones",
        },
        {
            icon: "icons/Relic",
            title: "Relics",
            href: "relics",
        },
        {
            icon: "icons/Ascension",
            title: "Ascension Planner",
            href: "planner",
        },
        {
            icon: "icons/Warp",
            title: "Banner Archive",
            href: "banners",
        },
    ],
    wuwa: [],
    zzz: [],
    uma: [],
};
