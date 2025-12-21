import { getMetadata } from "@/helpers/metadata";

export const metadata = getMetadata({ game: "genshin" });

export default function GenshinPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
