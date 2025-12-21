import { getMetadata } from "@/helpers/metadata";

export const metadata = getMetadata({ game: "uma" });

export default function HSRPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
