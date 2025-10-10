import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Genshin Impact - Irminsul.GG",
        template: "%s - Genshin Impact - Irminsul.GG",
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
