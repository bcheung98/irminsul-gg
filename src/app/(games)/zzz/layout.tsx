import { getMetadata } from "@/helpers/metadata";

export const metadata = getMetadata({ game: "zzz" });

export default function ZZZPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
