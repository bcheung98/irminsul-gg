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
    wuwa: [
        {
            icon: "icons/Home",
            title: "Home",
            href: "",
        },
        {
            icon: "icons/Character",
            title: "Resonators",
            href: "resonators",
        },
        {
            icon: "icons/Weapon",
            title: "Weapons",
            href: "weapons",
        },
        {
            icon: "icons/Echo",
            title: "Echoes",
            href: "echoes",
        },
        {
            icon: "icons/Ascension",
            title: "Ascension Planner",
            href: "planner",
        },
        {
            icon: "icons/Convene",
            title: "Banner Archive",
            href: "banners",
        },
    ],
    zzz: [
        {
            icon: "icons/Home",
            title: "Home",
            href: "",
        },
        {
            icon: "icons/Agents",
            title: "Agents",
            href: "agents",
        },
        {
            icon: "icons/W-Engine",
            title: "W-Engines",
            href: "w-engines",
        },
        {
            icon: "icons/Drive_Disc",
            title: "Drive Discs",
            href: "drive-discs",
        },
        {
            icon: "icons/Bangboo",
            title: "Bangboos",
            href: "bangboos",
        },
        {
            icon: "icons/Check",
            title: "Ascension Planner",
            href: "planner",
        },
        {
            icon: "icons/Signal_Search",
            title: "Banner Archive",
            href: "banners",
        },
    ],
    uma: [
        {
            icon: "icons/Home",
            title: "Home",
            href: "",
        },
        {
            icon: "icons/Horse",
            title: "Characters",
            href: "characters",
        },
        {
            icon: "icons/Card",
            title: "Support Cards",
            href: "supports",
        },
        {
            icon: "icons/Skill",
            title: "Skills",
            href: "skills",
        },
        {
            icon: "icons/Training",
            title: "Training Event Helper",
            href: "training-event-helper",
        },
        {
            icon: "icons/Ticket",
            title: "Banner Archive",
            href: "banners",
        },
    ],
};
