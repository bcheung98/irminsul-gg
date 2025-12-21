import Blog from "@/components/Blog";
import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: {
        default: "Blog",
        template: "%s - Blog",
    },
    description: "Updates on the latest news and content with Irminsul.GG",
};

export default function BlogPage() {
    return <Blog />;
}
