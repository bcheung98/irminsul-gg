import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Banner Archive",
    description: "A list of all Genshin Impact Banners.",
};

export default function BannerArchivePageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
