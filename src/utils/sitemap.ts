import { urls } from "@/api";
import { blogList } from "@/data/blog-list";
import { navItems } from "@/data/navItems";

const EXCLUDED_DYNAMIC_ROUTES = new Set([
    "genshin/tcg",
    "genshin/tcg-keywords",
    "uma/character-profiles",
    "nte/cartridges",
]);

interface SitemapItem {
    id: number;
    url?: string;
}

function getStaticURL(game: string, href: string) {
    return href ? `${game}/${href}` : game;
}

const staticRoutes = Object.entries(navItems).flatMap(([game, items]) =>
    items.map((item) => `/${getStaticURL(game, item.href)}`),
);

const blogRoutes = blogList.map((blog) => `/blog/${blog.slug}`);

const staticPages = [
    "/",
    "/privacy-policy",
    "/calendar",
    "/blog",
    ...blogRoutes,
    ...staticRoutes,
];

const dynamicRoutes = Object.entries(urls)
    .filter(([route]) => {
        const [, section] = route.split("/");
        return (
            !section?.startsWith("banner") &&
            !EXCLUDED_DYNAMIC_ROUTES.has(route)
        );
    })
    .map(([route, endpoint]) => ({
        route,
        endpoint,
    }));

function isReleasedItem(route: string, item: SitemapItem) {
    return route === "uma/skills" || Boolean(item.url);
}

async function getItems(endpoint: string): Promise<SitemapItem[]> {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`Failed to fetch sitemap data from ${endpoint}`);
    }
    return response.json();
}

export async function getSitemapPaths() {
    const dynamicPages = await Promise.all(
        dynamicRoutes.map(async ({ route, endpoint }) => {
            const items = await getItems(endpoint);
            return items
                .filter((item) => isReleasedItem(route, item))
                .map((item) => `/${route}/${item.id}`);
        }),
    );
    return [...staticPages, ...dynamicPages.flat()];
}

export function getPathsByGame(paths: string[]) {
    return Object.groupBy(paths, (path) => path.split("/")[1]);
}
