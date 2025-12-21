"use client";

// Component imports
import { Description, H5 } from "@/components/Blog";
import BlogPage from "@/components/Blog/BlogPage";
import Image from "@/components/Image";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { blogList } from "@/data/blog-list";

export default function Post() {
    const theme = useTheme();

    const slug = "irminsul-gg-v1-release-notes";
    const post = blogList.find((post) => slug === post.slug);

    const imgStyle = {
        width: "100%",
        border: `1px solid ${theme.border.color.primary}`,
        borderRadius: "8px",
        margin: "8px 0px",
    };

    return (
        <BlogPage post={post}>
            <Stack spacing={3} divider={<Divider />}>
                <Stack spacing={1}>
                    <Description>
                        Its been a long time coming, but Irminsul.GG Version 1.0
                        is finally here! (for real this time)
                    </Description>
                    <Description>
                        As for what's next, I don't really know to be honest.
                        I'll obviously be updating the sites as new updates for
                        each game come out, but I don't have any major new
                        features planned as of now.
                    </Description>
                </Stack>
                <Stack spacing={2}>
                    <H5>Changelog</H5>
                    <Description>
                        Here's all the major changes included with Version 1.0:
                    </Description>
                    <Description>
                        <ul>
                            <li>Added Zenless Zone Zero site.</li>
                            <li>
                                Standardized the layout of pages across all
                                sites.
                            </li>
                            <li>
                                Updated and polished the appearance of the site.
                            </li>
                            <li>
                                Made a new color theme that will serve as the
                                base for all the other sites.
                            </li>
                            <li>
                                Added various settings including a theme and
                                page width switcher.
                            </li>
                        </ul>
                    </Description>
                </Stack>
                <Stack>
                    <Image
                        src="https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/_v1/genshin/preview.png"
                        style={imgStyle}
                    />
                    <Image
                        src="https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/_v1/hsr/preview.png"
                        style={imgStyle}
                    />
                    <Image
                        src="https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/_v1/wuwa/preview.png"
                        style={imgStyle}
                    />
                    <Image
                        src="https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/_v1/zzz/preview.png"
                        style={imgStyle}
                    />
                </Stack>
            </Stack>
        </BlogPage>
    );
}
