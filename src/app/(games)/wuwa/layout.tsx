import { getMetadata } from "@/helpers/metadata";

export const metadata = getMetadata({ game: "wuwa" });

export default function WuWaPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
