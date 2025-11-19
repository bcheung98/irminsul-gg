import StyledRoot from "./StyledRoot";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Gacha Calendar - Irminsul.GG",
        template: "%s - Gacha Calendar - Irminsul.GG",
    },
    description: "A calendar to view the release dates of each game's updates",
};

export default function GamesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <StyledRoot>{children}</StyledRoot>;
}
