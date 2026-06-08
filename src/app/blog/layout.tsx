import StyledRoot from "./StyledRoot";
import { getMetadata } from "@/helpers/metadata";

export const metadata = getMetadata({
    overrides: {
        title: {
            default: "Blog",
            template: "%s - IRMINSUL.GG",
        },
        description: "Keep up with the latest news and content of IRMINSUL.GG",
    },
});

export default function GamesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <StyledRoot>{children}</StyledRoot>;
}
