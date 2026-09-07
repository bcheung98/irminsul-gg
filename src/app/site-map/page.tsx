import Sitemap from "@/components/Sitemap";
import { getSitemapXML } from "@/api";

export default async function SitemapPage() {
    const data = await getSitemapXML();

    return <Sitemap data={data} />;
}
