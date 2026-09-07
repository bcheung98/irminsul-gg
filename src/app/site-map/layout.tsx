import StyledRoot from "./StyledRoot";
import { getMetadata } from "@/helpers/metadata";

export const metadata = getMetadata({
    overrides: {
        title: {
            default: "Sitemap",
            template: "%s - IRMINSUL.GG",
        },
        description:
            "A complete directory of every page on IRMINSUL.GG, organized by category.",
        canonical: "/sitemap",
    },
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <StyledRoot>{children}</StyledRoot>;
}
