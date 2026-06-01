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

    const slug = "uma-update";
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
                    <ButtonBase
                        href="/uma"
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
                                "https://assets.irminsul.gg/v2/uma/_common/Icon.png"
                            }
                            title="Irminsul.GG: Umamusume"
                            titleProps={{ variant: "body2" }}
                            spacing={2}
                        />
                    </ButtonBase>
                </Stack>
                <Image
                    src="https://assets.irminsul.gg/v2/uma/_common/wallpapers/Uma_1.0.png"
                    style={imgStyle}
                />
            </Stack>
        </BlogPage>
    );
}
