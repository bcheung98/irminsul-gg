import Sitemap from "@/components/Sitemap";
import { getSitemapXML } from "@/api";
import { getMetadata } from "@/helpers/metadata";

export const metadata = getMetadata({
    overrides: {
        title: {
            default: "Sitemap",
            template: "%s - IRMINSUL.GG",
        },
        description:
            "A complete directory of every page on IRMINSUL.GG, organized by category.",
        canonical: "/sitemap",
    },
});

export default async function SitemapPage() {
    const data = await getSitemapXML();

    return <Sitemap data={data} />;
}
