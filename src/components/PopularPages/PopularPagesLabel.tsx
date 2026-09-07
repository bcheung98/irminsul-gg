import { usePathname } from "next/navigation";
import useSWR from "swr";

// Component imports
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";

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

export default function PopularPagesLabel({ page }: { page: PopularPageData }) {
    const pathname = usePathname();
    const isSitemap = pathname === "/site-map";

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
                isSitemap={isSitemap}
            />
        );
    }

    function getStaticPathLabel(tag?: string, path?: string) {
        if (page.path === "/")
            return {
                title: "Home",
                description: "The main page of Irminsul.GG",
            };
        if (page.path === "/blog")
            return {
                title: "Blog",
                description:
                    "Keep up with the latest news and content of Irminsul.GG",
            };
        if (page.path === "/calendar")
            return {
                title: "Gacha Calendar",
                description:
                    "Calendar to view the content release schedule of various gacha games",
            };
        if (page.path === "/privacy-policy")
            return {
                title: "Privacy Policy",
                description: "Read the privacy policy of Irminsul.GG",
            };
        if (page.path === "/site-map")
            return {
                title: "Sitemap",
                description:
                    "A complete directory of every page on IRMINSUL.GG, organized by category",
            };

        if (!tag || !(tag in games)) {
            if (tag === "blog") {
                const blog = blogList.find((blog) => blog.slug === path);
                if (blog) {
                    return {
                        title: blog.title,
                        description: blog.description,
                    };
                }
            }
            return { title: undefined, description: undefined };
        }

        const gameName = games[tag as Game].name;

        const navItem = navItems[tag as Game].find(
            (item) => item.href === (path ?? ""),
        );
        if (!navItem) {
            return { title: undefined, description: undefined };
        }

        let { title, description } = navItem;

        if (title === "Home" && isSitemap) title = gameName;
        if (!isSitemap) title += ` - ${gameName}`;

        return { title, description };
    }

    function getStaticIcon(tag?: string, path?: string) {
        if (!tag || !(tag in games)) {
            return path ? "" : "_common/logo/logo_red";
        }

        if (isSitemap && path) {
            const navItem = navItems[tag as Game].find(
                (item) => item.href === (path ?? ""),
            );
            if (!navItem) {
                return undefined;
            }
            if (typeof navItem.icon === "string") {
                return `${tag}/${navItem.icon}`;
            } else {
                return navItem.icon;
            }
        }

        return `${tag}/_common/Icon`;
    }

    const { title, description } = getStaticPathLabel(game, path);
    const icon = getStaticIcon(game, path);

    return title ? (
        <Label
            title={title}
            description={isSitemap ? description : ""}
            icon={icon}
            href={page.path}
            isSitemap={isSitemap}
        />
    ) : null;
}

function DynamicPageLabel({
    game,
    path,
    id,
    isSitemap,
}: {
    game: Game;
    path: string;
    id: string;
    isSitemap?: boolean;
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
            title={getDynamicPathLabel(game, item, isSitemap)}
            icon={getDynamicIcon(`${game}/${path}`, item, gender)}
            href={formatHref(`/${game}/${path}/${id}`)}
            isSitemap={isSitemap}
        />
    );
}

function Label(props: {
    title: string;
    description?: string;
    icon: React.ReactNode;
    href: string;
    isSitemap?: boolean;
}) {
    return (
        <TextLabel
            {...props}
            subtitle={
                <Text
                    variant="subtitle2"
                    sx={(theme) => ({ color: theme.text.description })}
                >
                    {props.description}
                </Text>
            }
            spacing={2}
            titleProps={{ variant: props.isSitemap ? "subtitle1" : "body1" }}
            iconProps={{ size: props.isSitemap ? 24 : 32 }}
        />
    );
}

function getDynamicPathLabel(game: Game, item: any, isSitemap = false) {
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
    if (!isSitemap) res += ` - ${games[game].name}`;
    return res;
}

function getDynamicIcon(path: string, item: any, gender: Gender) {
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
