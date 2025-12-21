import StyledRoot from "./StyledRoot";
import { getMetadata } from "@/helpers/metadata";

export const metadata = getMetadata({
    overrides: {
        title: {
            default: "Gacha Calendar",
            template: "%s - Gacha Calendar",
        },
        description:
            "A calendar to view the release schedule of each game's banners",
    },
});

export default function GamesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <StyledRoot>{children}</StyledRoot>;
}
