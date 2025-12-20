import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Umamusume",
        template: "%s - Umamusume",
    },
    description:
        "The Umamusume: Pretty Derby branch of Irminsul.GG - a database and companion website for various gacha games.",
};

export default function HSRPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
