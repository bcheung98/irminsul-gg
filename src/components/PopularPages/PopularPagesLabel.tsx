import useSWR from "swr";

// Component imports
import TextLabel from "@/components/TextLabel";

// Helper imports
import { getDataSet, urls } from "@/api";
import { formatHref } from "@/utils";
import { useSettingsStore } from "@/stores";
import { games } from "@/data/games";
import { categoryImgURLs } from "@/data/categories";
import { blogList } from "@/data/blog-list";
import { navItems } from "@/data/navItems";
import { rarityMap } from "@/data/uma/common";
import { wuwaMainCharIDs } from "@/data/wuwa/common";
import { endfieldMainCharIDs } from "@/data/endfield/common";
import { nteMainCharIDs } from "@/data/nte/common";

// Type imports
import { Game, Gender, PopularPageData } from "@/types";

export default function PopularPagesLabel({
    page,
    hideGameName = false,
}: {
    page: PopularPageData;
    hideGameName?: boolean;
}) {
    const [, game, path, id] = page.path.split("/") as [
        string,
        Game | undefined,
        string | undefined,
        string | undefined,
    ];

    if (id) {
        return (
            <DynamicPageLabel
                game={game!}
                path={path!}
                id={id}
                hideGameName={hideGameName}
            />
        );
    }

    function getStaticPathLabel(tag?: string, path?: string) {
        if (page.path === "/") return "Home";
        if (page.path === "/blog") return "Blog";
        if (page.path === "/calendar") return "Gacha Calendar";
        if (page.path === "/privacy-policy") return "Privacy Policy";
        if (page.path === "/site-map") return "Sitemap";

        if (!tag || !(tag in games)) {
            if (tag === "blog") {
                return blogList.find((blog) => blog.slug === path)?.title ?? "";
            }
            return undefined;
        }

        const gameName = games[tag as Game].name;

        const navItem = navItems[tag as Game].find(
            (item) => item.href === (path ?? ""),
        );
        if (!navItem) {
            return undefined;
        }

        let res = navItem.title;
        if (!hideGameName) res += ` - ${gameName}`;
        return res;
    }

    const title = getStaticPathLabel(game, path);
    const icon =
        game && game in games
            ? `${game}/_common/Icon`
            : "_common/logo/logo_red";

    return title ? <Label title={title} icon={icon} href={page.path} /> : null;
}

function DynamicPageLabel({
    game,
    path,
    id,
    hideGameName,
}: {
    game: Game;
    path: string;
    id: string;
    hideGameName?: boolean;
}) {
    const { gender } = useSettingsStore();

    const { data, isLoading } = useSWR<any[]>(
        `${game}/${path}`,
        () => getDataSet(`${game}/${path}` as keyof typeof urls),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    );

    if (isLoading || !data) {
        return null;
    }

    function getItem() {
        const item = data!.find(
            (item) => formatHref(item.url || `${item.id}`) === id,
        );
        if (item) {
            let res = item.displayName || item.name;
            if (game === "uma") {
                if ("specialty" in item) {
                    res += ` (${rarityMap[item.rarity || 3]} ${item.specialty})`;
                } else if ("conditions" in item) {
                    res = item.name.global || item.name.jp;
                } else {
                    res += ` (${item.outfit || "Original"})`;
                }
            }
            return item;
        } else return null;
    }

    const item = getItem();
    if (!item) return null;

    return (
        <Label
            title={getDynamicTitle(game, item, hideGameName)}
            icon={getImageURL(`${game}/${path}`, item, gender)}
            href={formatHref(`/${game}/${path}/${id}`)}
        />
    );
}

function Label(props: { title: string; icon: string; href: string }) {
    return <TextLabel {...props} spacing={2} iconProps={{ size: 32 }} />;
}

function getDynamicTitle(game: Game, item: any, hideGameName = false) {
    if (!item) return "";
    let title = item.displayName || item.name;
    if (game === "uma") {
        if ("specialty" in item) {
            title += ` (${rarityMap[item.rarity || 3]} ${item.specialty})`;
        } else if ("conditions" in item) {
            title = item.name.global || item.name.jp;
        } else {
            title += ` (${item.outfit || "Original"})`;
        }
    }
    let res = title;
    if (!hideGameName) res += ` - ${games[game].name}`;
    return res;
}

function getImageURL(path: string, item: any, gender: Gender) {
    if (!item) return "";
    let [game, tag] = path.split("/");

    if (["agents", "espers", "resonators"].includes(tag)) {
        tag = "characters";
    }
    if (["lightcones", "w-engines", "arcs"].includes(tag)) {
        tag = "weapons";
    }
    if (["artifacts", "relics", "drive-discs", "echoes"].includes(tag)) {
        tag = "equipment";
    }

    if (game === "blog") {
        return "_common/logo/logo_red";
    }
    if (
        game === "genshin" &&
        tag === "characters" &&
        item?.name.includes("Traveler")
    ) {
        return `genshin/characters/MC_${gender.slice(0, 1)}`;
    }
    if (
        game === "hsr" &&
        tag === "characters" &&
        item?.name.includes("Trailblazer")
    ) {
        return `hsr/characters/${item.id}_${gender.slice(0, 1)}`;
    }
    if (
        game === "wuwa" &&
        tag === "characters" &&
        wuwaMainCharIDs.includes(item!.id)
    ) {
        return `wuwa/resonators/MC_${gender.slice(0, 1)}`;
    }
    if (
        game === "endfield" &&
        tag === "characters" &&
        endfieldMainCharIDs.includes(item!.id)
    ) {
        return `endfield/operators/${item!.id}_${gender.slice(0, 1)}`;
    }
    if (
        game === "nte" &&
        tag === "characters" &&
        nteMainCharIDs.includes(item!.id)
    ) {
        return `nte/espers/${item!.id}_${gender.slice(0, 1)}`;
    }
    if (path === "uma/skills") {
        return `uma/skills/${item.icon}`;
    }
    return categoryImgURLs[`${game}/${tag}`](item.id, item.name);
}
