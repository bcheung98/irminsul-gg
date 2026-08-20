import StyledRoot from "./StyledRoot";
import { getMetadata } from "@/helpers/metadata";

export const metadata = getMetadata({
    overrides: {
        title: {
            default: "Privacy Policy",
            template: "%s - IRMINSUL.GG",
        },
        description: "Read the privacy policy of Irminsul.GG",
    },
});

export default function GamesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <StyledRoot>{children}</StyledRoot>;
}
