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

    const slug = "nte-update";
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
                        Well, I honestly thought I would never get to this
                        point. I told myself that I wouldn't have the time to
                        work on another site, but here we are. IRMINSUL.GG
                        welcomes its 7th game, Neverness to Everness!
                    </Description>
                    <Description>
                        Please let me know in the Discord if anything is broken!
                    </Description>
                    <Description>
                        As a side note, this will be the first time that I am
                        adding a game to Irminsul.GG that I've never played
                        before. Prior to adding a game to the site, I would
                        usually prefer to have played the game for at least a
                        week or two; this allows me to get a feel for what a
                        player of the game would want to find on a website like
                        this. I do think that after having played a total of six
                        gacha games, I have a pretty good idea of what players
                        would want out of this site, as most of the gacha games
                        are similar. However, if any NTE players have feedback
                        or a suggestion for the site, please let me know in the
                        Discord!
                    </Description>
                    <ButtonBase
                        href="/nte"
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
                                "https://assets.irminsul.gg/v2/nte/_common/Icon.png"
                            }
                            title="Irminsul.GG: NTE"
                            titleProps={{ variant: "body2" }}
                            spacing={2}
                        />
                    </ButtonBase>
                </Stack>
                <Image
                    src="https://assets.irminsul.gg/v2/nte/_common/wallpapers/NTE_1.0.png"
                    style={imgStyle}
                />
            </Stack>
        </BlogPage>
    );
}
