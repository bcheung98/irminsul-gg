import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Honkai: Star Rail",
        template: "%s - Honkai: Star Rail",
    },
    description:
        "The Honkai: Star Rail branch of Irminsul.GG - a database and companion website for various gacha games.",
};

export default function HSRPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
