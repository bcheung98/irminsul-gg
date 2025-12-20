import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Zenless Zone Zero",
        template: "%s - Zenless Zone Zero - Irminsul.GG",
    },
    description:
        "The Zenless Zone Zero branch of Irminsul.GG - a database and companion website for various gacha games.",
};

export default function ZZZPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
