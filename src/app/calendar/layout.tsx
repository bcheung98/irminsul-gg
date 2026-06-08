import StyledRoot from "./StyledRoot";
import { getMetadata } from "@/helpers/metadata";

export const metadata = getMetadata({
    overrides: {
        title: {
            default: "Gacha Calendar",
            template: "%s - Gacha Calendar",
        },
        description:
            "Calendar to view the content release schedule of various gacha games",
        twitter: {
            card: "summary_large_image",
            images: [
                "https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/calendar-v2-img1.png",
            ],
        },
    },
});

export default function GamesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <StyledRoot>{children}</StyledRoot>;
}
