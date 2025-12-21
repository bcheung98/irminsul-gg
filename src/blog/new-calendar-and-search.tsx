"use client";

// Component imports
import { Description } from "@/components/Blog";
import BlogPage from "@/components/Blog/BlogPage";
import Image from "@/components/Image";
import NavLink from "@/components/NavLink";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { blogList } from "@/data/blog-list";

export default function Post() {
    const theme = useTheme();

    const slug = "new-calendar-and-search";
    const post = blogList.find((post) => slug === post.slug);

    const imgStyle = {
        width: "100%",
        border: `1px solid ${theme.border.color.primary}`,
        borderRadius: "8px",
        margin: "8px 0px",
    };

    const linkStyle = {
        color: theme.text.selected,
        textDecoration: "underline",
        cursor: "pointer",
    };

    return (
        <BlogPage post={post}>
            <Stack spacing={2}>
                <Description>
                    Two new features have been added: the gacha calendar and the
                    site search.
                </Description>
                <Description>
                    The gacha calendar is a way to help visualize the dates of
                    when each game's updates come out. You can check out the
                    calendar{" "}
                    <NavLink href="/calendar" style={linkStyle}>
                        here
                    </NavLink>
                    .
                </Description>
                <Image
                    src="https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/calendar-img.png"
                    style={imgStyle}
                />
                <Description>
                    The new site search will allow you to search for any unit
                    for that game. You can also pin your searches if you need to
                    save them.
                </Description>
                <Image
                    src="https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/search-img.png"
                    style={imgStyle}
                />
            </Stack>
        </BlogPage>
    );
}
