import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Genshin Impact",
        template: "%s - Genshin Impact",
    },
    description:
        "The Genshin Impact branch of Irminsul.GG - a database and companion website for various gacha games.",
};

export default function GenshinPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
