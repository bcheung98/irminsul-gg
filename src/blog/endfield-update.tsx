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
    const slug = "endfield-update";
    const post = blogList.find((post) => slug === post.slug);

    return (
        <BlogPage post={post}>
            <Stack spacing={3} divider={<Divider />}>
                <Stack spacing={1}>
                    <Description>
                        Endmins! The Arknights: Endfield website is now live!
                    </Description>
                    <Description>
                        The site is still pretty barebones for now, and
                        currently only features pages for the Operators and
                        Weapons. I will continue working on adding more familiar
                        features such as the Banner Archive and Ascension
                        Planner, but these may come out later than expected
                        since I will be busy with life stuff soon.
                    </Description>
                    <Description>
                        Please let me know in the Discord if anything is broken!
                    </Description>
                </Stack>
            </Stack>
        </BlogPage>
    );
}
