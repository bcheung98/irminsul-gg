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
import { categories, categoryImgURLs } from "@/data/categories";
import { blogList } from "@/data/blog-list";
import { navItems } from "@/data/navItems";
import { rarityMap } from "@/data/uma/common";
import { getCharacterImageURLs } from "@/helpers/characterImage";

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
                description: isSitemap ? "The main page of Irminsul.GG" : "",
            };
        if (page.path === "/blog")
            return {
                title: "Blog",
                description: isSitemap
                    ? "Keep up with the latest news and content of Irminsul.GG"
                    : "",
            };
        if (page.path === "/calendar")
            return {
                title: "Gacha Calendar",
                description: isSitemap
                    ? "Calendar to view the content release schedule of various gacha games"
                    : "",
            };
        if (page.path === "/privacy-policy")
            return {
                title: "Privacy Policy",
                description: isSitemap
                    ? "Read the privacy policy of Irminsul.GG"
                    : "",
            };
        if (page.path === "/site-map")
            return {
                title: "Sitemap",
                description: isSitemap
                    ? "A complete directory of every page on IRMINSUL.GG, organized by category"
                    : "",
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
        if (!isSitemap) description = gameName;

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
            description={description}
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

    let title = getDynamicPathLabel(game, item);
    let description = "";
    if (!isSitemap)
        description = `${categories[`${game}/${getTag(path)}`]} - ${games[game].name}`;

    return (
        <Label
            title={title}
            description={description}
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
                    sx={(theme) => ({
                        color: theme.text.description,
                        textAlign: "left",
                    })}
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

function getDynamicPathLabel(game: Game, item: any) {
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
    return title;
}

function getDynamicIcon(pathname: string, item: any, gender: Gender) {
    if (!item) return "";
    let [game, path] = pathname.split("/");

    const tag = getTag(path);

    if (game === "blog") {
        return "_common/logo/logo_red";
    }
    if (pathname === "uma/skills") {
        return `uma/skills/${item.icon}`;
    }
    if (tag === "characters") {
        return getCharacterImageURLs({
            game: game as Game,
            id: item.id,
            gender,
        }).icon;
    }
    return categoryImgURLs[`${game}/${tag}`](item.id, item.name);
}

function getTag(tag: string) {
    if (["agents", "espers", "resonators"].includes(tag)) {
        tag = "characters";
    }
    if (["lightcones", "w-engines", "arcs"].includes(tag)) {
        tag = "weapons";
    }
    if (["artifacts", "relics", "drive-discs", "echoes"].includes(tag)) {
        tag = "equipment";
    }
    return tag;
}
