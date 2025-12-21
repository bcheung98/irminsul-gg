"use client";

// Component imports
import { Description } from "@/components/Blog";
import BlogPage from "@/components/Blog/BlogPage";
import Image from "@/components/Image";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { blogList } from "@/data/blog-list";

export default function Post() {
    const theme = useTheme();

    const slug = "the-story-of-irminsul-gg";
    const post = blogList.find((post) => slug === post.slug);

    const imgStyle = {
        width: "100%",
        border: `1px solid ${theme.border.color.primary}`,
        borderRadius: "8px",
        margin: "8px 0px",
    };

    return (
        <BlogPage post={post}>
            <Stack spacing={2}>
                <Description>
                    Back in March 2021, when I was first learning how to make
                    websites using React in a coding bootcamp, I decided that it
                    would be a good idea to apply what I've learned to something
                    I really enjoy. Of course, making a website for Genshin
                    Impact, which came out six months before, was the first
                    thing that came to mind. I wanted to make a simple,
                    single-page database website that showed all the characters
                    and what materials they need to level up, and be able to
                    filter them based off different attributes. At the time,
                    there were only one or two other database websites that
                    provided this kind of information for Genshin Impact, and
                    popular sites such as Project Amber and Hakush.in didn't
                    exist yet. Over the course of a week, I put together the
                    website, and my creative brain named it "Genshin Impact
                    Reference Sheet" (GIRS).
                </Description>
                <Image
                    src="https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/girs-1.0.png"
                    style={imgStyle}
                />
                <Description>
                    I kept updating the site as new characters were released,
                    and when Version 2.0 of Genshin Impact released in July
                    2021, I decided to commemorate it with GIRS 2.0. GIRS 2.0
                    added a popup showing detailed character information
                    displaying character talents and constellations, expanded
                    filters, and a cleaner look from using Material UI. In
                    addition, I implemented react-redux to help centralize the
                    application state of the site. Once again, I kept updating
                    the site with each new character release, and over time
                    added more features such as tables for character stats,
                    ascension, talent scaling, and levelling.
                </Description>
                <Image
                    src="https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/girs-2.0.png"
                    style={imgStyle}
                />
                <Description>
                    In January 2023, I implemented multi-page browsing, adding
                    separate pages for characters, weapons, banners, and the
                    newly-released TCG game mode. After finishing GIRS 3.0
                    revamp, I decided to name the website "Project Irminsul",
                    after Genshin Impact's world tree that serves as a
                    repository for all of the information of the game's
                    universe.
                </Description>
                <Image
                    src="https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/girs-3.0.png"
                    style={imgStyle}
                />
                <Description>
                    In April 2023, I started playing HoYoverse's newly-released
                    Honkai: Star Rail, and knew that I had to make a website for
                    HSR as well. I finished the website at the end of June 2023,
                    and named it "Project Stellaron". Project Stellaron's
                    release came with a new feature in the ascension planner,
                    and I also implented this planner to Project Irminsul as
                    well.
                </Description>
                <Description>
                    In May 2024, Kuro Games released Wuthering Waves, which I
                    began playing and also decided to make a website for it,
                    naming it "Project Tacetite". In contrast to the previous
                    two websites, I wrote Project Tacetite in TypeScript, which
                    I had began learning at the time. I converted the entirety
                    of Project Irminsul and Project Stellaron to TypeScript a
                    few months later.
                </Description>
                <Description>
                    In September 2024, I learned how to use some Amazon Web
                    Services features, including S3, CloudFront, and Route 53. I
                    realized that with Genshin Impact's Version 5.0's release a
                    few weeks prior, it would be the perfect time to migrate all
                    my websites from GitHub Pages to CloudFront. In addition, I
                    decided that I would create a central hub website that would
                    serve as a portal for my three websites; Project Irminsul,
                    Project Stellaron, and Project Tacetite would all be
                    subdomains of the central website. I also wanted to come up
                    with a brand name that would be the name of the central hub
                    and the entire website collection. I inititally came up with
                    "Project Elysia", named after one of my favorite gacha game
                    characters of all time, but decided to keep the "Irminsul"
                    name, as it conveys the idea of an information database the
                    best. The irminsul.gg domain was available, so I used that
                    to complete the brand name of my project.
                </Description>
                <Description>
                    Today marks the first official release of Irminsul.GG. I'm
                    deciding to tag it as Version 0.5; its not 1.0 just yet
                    because I still want to polish some more stuff first, and
                    the previous four versions (0.1 - 0.4 if you will) represent
                    the evolutions from the GIRS to Project Irminsul. It
                    certainly has been a long journey, from a single little page
                    in March 2021 to three comprehensive websites hosted on
                    CloudFront in September 2024. I don't plan on stopping
                    updating these sites anytime soon, and I have been thinking
                    about making a fourth site for Zenless Zone Zero in the
                    future if time allows.
                </Description>
                <Description>
                    Truthfuly, I have no idea if anyone will actually use this
                    site (other than myself and friends I show this to), but if
                    it somehow gets popular and people need to contact me for
                    feedback and/or to report issues, I can probably set
                    something up for that. If you are reading this and made it
                    to the end, thank you!
                </Description>
            </Stack>
        </BlogPage>
    );
}
