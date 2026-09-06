import useSWR from "swr";

// Component imports
import TextLabel from "@/components/TextLabel";

// Helper imports
import { getDataSet, urls } from "@/api";
import { formatHref } from "@/utils";
import { useSettingsStore } from "@/stores";
import { categoryImgURLs } from "@/data/categories";
import { navItems } from "@/data/navItems";
import { games } from "@/data/games";
import { rarityMap } from "@/data/uma/common";
import { wuwaMainCharIDs } from "@/data/wuwa/common";
import { endfieldMainCharIDs } from "@/data/endfield/common";
import { nteMainCharIDs } from "@/data/nte/common";

// Type imports
import { Game, Gender, PopularPageData } from "@/types";

export default function PopularPagesLabel({ page }: { page: PopularPageData }) {
    const [, game, path, id] = page.path.split("/") as [
        string,
        Game | undefined,
        string | undefined,
        string | undefined,
    ];

    if (id) {
        return <DynamicPageLabel game={game!} path={path!} id={id} />;
    }

    function getStaticPathLabel(game?: Game, path?: string) {
        if (page.path === "/calendar") return "Gacha Calendar";

        if (!game || !(game in games)) {
            return undefined;
        }

        const gameName = games[game].name;

        const navItem = navItems[game].find(
            (item) => item.href === (path ?? ""),
        );
        if (!navItem) {
            return undefined;
        }

        return `${navItem.title} - ${gameName}`;
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
}: {
    game: Game;
    path: string;
    id: string;
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
            title={getDynamicTitle(game, item)}
            icon={getImageURL(`${game}/${path}`, item, gender)}
            href={formatHref(`/${game}/${path}/${id}`)}
        />
    );
}

function Label(props: { title: string; icon: string; href: string }) {
    return <TextLabel {...props} spacing={2} iconProps={{ size: 32 }} />;
}

function getDynamicTitle(game: Game, item: any) {
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
    return `${title} - ${games[game].name}`;
}

function getImageURL(path: string, item: any, gender: Gender) {
    if (!item) return "";
    const game = path.split("/")[0];
    if (game === "genshin" && item?.name.includes("Traveler")) {
        return `genshin/characters/MC_${gender.slice(0, 1)}`;
    }
    if (game === "hsr" && item?.name.includes("Trailblazer")) {
        return `hsr/characters/${item.id}_${gender.slice(0, 1)}`;
    }
    if (game === "wuwa" && wuwaMainCharIDs.includes(item!.id)) {
        return `wuwa/resonators/MC_${gender.slice(0, 1)}`;
    }
    if (game === "endfield" && endfieldMainCharIDs.includes(item!.id)) {
        return `endfield/operators/${item!.id}_${gender.slice(0, 1)}`;
    }
    if (game === "nte" && nteMainCharIDs.includes(item!.id)) {
        return `nte/espers/${item!.id}_${gender.slice(0, 1)}`;
    }
    if (path === "uma/skills") {
        return `uma/skills/${item.icon}`;
    }
    return categoryImgURLs[path](item.id);
}
