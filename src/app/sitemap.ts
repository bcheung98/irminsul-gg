import type { MetadataRoute } from "next";
import { urls } from "@/api";
import { blogList } from "@/data/blog-list";
import { navItems } from "@/data/navItems";

const BASE_URL = "https://irminsul.gg";

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
    items.map((item) => ({
        url: `${BASE_URL}/${getStaticURL(game, item.href)}`,
    })),
);

const blogRoutes = blogList.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
}));

const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL },
    { url: `${BASE_URL}/privacy-policy` },
    { url: `${BASE_URL}/calendar` },
    { url: `${BASE_URL}/blog` },
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const dynamicPages = await Promise.all(
        dynamicRoutes.map(async ({ route, endpoint }) => {
            const items = await getItems(endpoint);
            return items
                .filter((item) => isReleasedItem(route, item))
                .map((item) => ({
                    url: `${BASE_URL}/${route}/${item.id}`,
                }));
        }),
    );

    return [...staticPages, ...dynamicPages.flat()];
}
