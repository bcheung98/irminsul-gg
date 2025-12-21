import { Suspense } from "react";

// Component imports
import Loader from "@/components/Loader";

// Helper imports
import { blogList } from "@/data/blog-list";

// Type imports
import { Metadata } from "next/types";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const blogData = blogList.find((post) => slug === post.slug);

    return {
        title: blogData?.title,
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const { default: Post } = await import(`@/blog/${slug}.tsx`);

    return (
        <Suspense fallback={<Loader />}>
            <Post />
        </Suspense>
    );
}

export function generateStaticParams() {
    return blogList.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;
