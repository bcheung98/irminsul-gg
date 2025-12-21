"use client";

// Component imports
import { Description } from "@/components/Blog";
import BlogPage from "@/components/Blog/BlogPage";

// MUI imports
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { blogList } from "@/data/blog-list";

export default function Post() {
    const slug = "irminsul-gg-v1-release-notes";
    const post = blogList.find((post) => slug === post.slug);

    return (
        <BlogPage post={post}>
            <Stack spacing={3} divider={<Divider />}>
                <Stack spacing={1}>
                    <Description>
                        So I got addicted to Umamusume, and I decided that it
                        would only be appropiate to make a site for it on
                        Irminsul. After a few weeks of working, the first
                        release of the Umamusume site is here!
                    </Description>
                    <Description>
                        The site is still a work-in-progress, and I have a
                        couple features that I'm planning to add later on. If
                        you want to know more about the roadmap for the site or
                        have any suggestions on how to improve it, please join
                        the Discord!
                    </Description>
                </Stack>
            </Stack>
        </BlogPage>
    );
}
