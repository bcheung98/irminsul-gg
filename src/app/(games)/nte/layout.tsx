import { getMetadata } from "@/helpers/metadata";

export const metadata = getMetadata({ game: "nte" });

export default function NTEPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
