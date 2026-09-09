import type { MetadataRoute } from "next";
import { getSitemapPaths } from "@/utils/sitemap";

const BASE_URL = "https://irminsul.gg";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const paths = await getSitemapPaths();
    return paths.map((path) => ({
        url: `${BASE_URL}${path}`,
    }));
}
