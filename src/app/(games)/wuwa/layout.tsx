import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Wuthering Waves",
        template: "%s - Wuthering Waves",
    },
    description:
        "The Wuthering Waves branch of Irminsul.GG - a database and companion website for various gacha games.",
};

export default function WuWaPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
