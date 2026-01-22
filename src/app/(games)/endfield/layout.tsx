import { getMetadata } from "@/helpers/metadata";

export const metadata = getMetadata({ game: "endfield" });

export default function EndfieldPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
