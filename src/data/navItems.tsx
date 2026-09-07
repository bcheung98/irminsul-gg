import HomeIcon from "@mui/icons-material/Home";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { bannerArchiveMetaData, plannerMetaData } from "@/helpers/metadata";
import { games } from "./games";
import { Game, GameData } from "@/types";

export interface NavItem {
    icon: string | React.ReactNode;
    title: string;
    description?: string;
    href: string;
}

export const navItems: GameData<NavItem[]> = {
    genshin: [
        {
            icon: "icons/Home",
            title: "Home",
            description: getGamePageDescription("genshin"),
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
            icon: "icons/Ascension",
            title: "Ascension Planner",
            description: plannerMetaData("genshin").description,
            href: "planner",
        },
        {
            icon: "icons/Wish",
            title: "Banner Archive",
            description: bannerArchiveMetaData("genshin").description,
            href: "banners",
        },
    ],
    hsr: [
        {
            icon: "icons/Home",
            title: "Home",
            description: getGamePageDescription("hsr"),
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
            description: plannerMetaData("hsr").description,
            href: "planner",
        },
        {
            icon: "icons/Warp",
            title: "Banner Archive",
            description: bannerArchiveMetaData("hsr").description,
            href: "banners",
        },
    ],
    wuwa: [
        {
            icon: "icons/Home",
            title: "Home",
            description: getGamePageDescription("wuwa"),
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
            description: plannerMetaData("wuwa").description,
            href: "planner",
        },
        {
            icon: "icons/Convene",
            title: "Banner Archive",
            description: bannerArchiveMetaData("wuwa").description,
            href: "banners",
        },
    ],
    zzz: [
        {
            icon: "icons/Home",
            title: "Home",
            description: getGamePageDescription("zzz"),
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
            description: plannerMetaData("zzz").description,
            href: "planner",
        },
        {
            icon: "icons/Signal_Search",
            title: "Banner Archive",
            description: bannerArchiveMetaData("zzz").description,
            href: "banners",
        },
    ],
    uma: [
        {
            icon: "icons/Home",
            title: "Home",
            description: getGamePageDescription("uma"),
            href: "",
        },
        {
            icon: "icons/Character",
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
            icon: (
                <WorkspacePremiumIcon
                    sx={(theme) => ({
                        color: theme.drawer.color.primary,
                        width: "28px",
                        height: "28px",
                    })}
                />
            ),
            title: "Rating Calculator",
            description:
                "Calculate your Umamusume career rating and generate a shareable showcase card from your stats, aptitudes, and skills",
            href: "rating-calculator",
        },
        {
            icon: "icons/Training",
            title: "Training Event Helper",
            description: "Tool for viewing Training Events in Umamusume",
            href: "training-event-helper",
        },
        {
            icon: "icons/Ticket",
            title: "Banner Archive",
            description: bannerArchiveMetaData("uma").description,
            href: "banners",
        },
    ],
    endfield: [
        {
            icon: "icons/World",
            title: "Home",
            description: getGamePageDescription("endfield"),
            href: "",
        },
        {
            icon: "icons/Operators",
            title: "Operators",
            href: "operators",
        },
        {
            icon: "icons/Weapons",
            title: "Weapons",
            href: "weapons",
        },
        {
            icon: "icons/Upgrade",
            title: "Ascension Planner",
            description: plannerMetaData("endfield").description,
            href: "planner",
        },
        {
            icon: "icons/Headhunt",
            title: "Banner Archive",
            description: bannerArchiveMetaData("endfield").description,
            href: "banners",
        },
    ],
    nte: [
        {
            icon: (
                <HomeIcon
                    sx={(theme) => ({
                        color: theme.drawer.color.primary,
                        width: "28px",
                        height: "28px",
                    })}
                />
            ),
            title: "Home",
            description: getGamePageDescription("nte"),
            href: "",
        },
        {
            icon: "icons/Esper",
            title: "Espers",
            href: "espers",
        },
        {
            icon: "icons/Arc",
            title: "Arcs",
            href: "arcs",
        },
        {
            icon: "icons/Equipment",
            title: "Console",
            href: "console",
        },
        {
            icon: "icons/Ascension",
            title: "Ascension Planner",
            description: plannerMetaData("nte").description,
            href: "planner",
        },
        {
            icon: "icons/Dice",
            title: "Banner Archive",
            description: bannerArchiveMetaData("nte").description,
            href: "banners",
        },
    ],
};

function getGamePageDescription(game: Game) {
    return `The ${games[game].name} branch of Irminsul.GG`;
}
