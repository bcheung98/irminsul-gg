"use client";

// Component imports
import { Description } from "@/components/Blog";
import BlogPage from "@/components/Blog/BlogPage";
import Image from "@/components/Image";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { blogList } from "@/data/blog-list";

export default function Post() {
    const theme = useTheme();

    const slug = "endfield-update";
    const post = blogList.find((post) => slug === post.slug);

    const imgStyle = {
        width: "100%",
        border: `1px solid ${theme.border.color.primary}`,
        borderRadius: "8px",
    };

    return (
        <BlogPage post={post}>
            <Stack spacing={3}>
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
                    <ButtonBase
                        href="/endfield"
                        sx={{
                            width: "max-content",
                            height: "32px",
                            px: 2,
                            borderRadius: "4px",
                            backgroundColor: theme.palette.info.main,
                            "&:hover": {
                                backgroundColor: theme.palette.info.dark,
                            },
                            transition: "background-color 0.15s",
                        }}
                    >
                        <TextLabel
                            icon={
                                "https://assets.irminsul.gg/v2/endfield/_common/Icon.png"
                            }
                            title="Irminsul.GG: Endfield"
                            titleProps={{ variant: "body2" }}
                            spacing={2}
                        />
                    </ButtonBase>
                </Stack>
                <Image
                    src="https://assets.irminsul.gg/v2/endfield/_common/wallpapers/Endfield_1.0.png"
                    style={imgStyle}
                />
            </Stack>
        </BlogPage>
    );
}
