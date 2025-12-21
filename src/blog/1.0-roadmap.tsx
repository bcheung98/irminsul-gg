"use client";

// Component imports
import { Description, H6 } from "@/components/Blog";
import BlogPage from "@/components/Blog/BlogPage";
import NavLink from "@/components/NavLink";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { blogList } from "@/data/blog-list";

export default function Post() {
    const theme = useTheme();

    const slug = "1.0-roadmap";
    const post = blogList.find((post) => slug === post.slug);

    const linkStyle = {
        color: theme.text.selected,
        textDecoration: "underline",
        cursor: "pointer",
    };

    return (
        <BlogPage post={post}>
            <Stack spacing={3}>
                <Description>
                    In the{" "}
                    <NavLink
                        href="/blog/the-story-of-irminsul-gg"
                        openInNewTab
                        style={linkStyle}
                    >
                        previous post
                    </NavLink>
                    , I mentioned that I would like to polish some things up
                    before a full 1.0 Version of the site. There are two main
                    things I will aim to complete for the 1.0 release:
                </Description>
                <Stack spacing={2}>
                    <div>
                        <H6>Visual touchups & theming</H6>
                        <Description>
                            There's still a lot of styling and layout
                            adjustments I'd like to do to make the subsites look
                            cleaner. Additionally, I'll be looking to add
                            functionality switch between dark and light themes.
                        </Description>
                    </div>
                    <div>
                        <H6>Mobile formatting</H6>
                        <Description>
                            If you currently try to view the website on a phone,
                            it will look...ugly. The reason it looks awful is
                            because I have not implemented mobile formatting
                            yet, and this is something I would like to get done
                            so mobile users can view the site without any
                            issues.
                        </Description>
                    </div>
                </Stack>
                <Description>
                    I can't really give you an exact timeframe of when each of
                    these milestones will be completed (because I suck at
                    figuring out how long things will take), but I'll be
                    extremely generous and say I'll have this all done by the
                    end of November. If it isn't done by then, I'll just say
                    Soon™.
                </Description>
            </Stack>
        </BlogPage>
    );
}
