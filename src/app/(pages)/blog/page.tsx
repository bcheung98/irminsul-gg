import Blog from "@/components/Blog";
import { getMetadata } from "@/helpers/metadata";

export const metadata = getMetadata({
    overrides: {
        title: {
            default: "Blog",
            template: "%s - IRMINSUL.GG",
        },
        description: "Keep up with the latest news and content of IRMINSUL.GG",
        canonical: "/blog",
    },
});

export default function BlogPage() {
    return <Blog />;
}
