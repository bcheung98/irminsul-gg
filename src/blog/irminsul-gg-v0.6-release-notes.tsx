"use client";

// Component imports
import { Description } from "@/components/Blog";
import BlogPage from "@/components/Blog/BlogPage";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { blogList } from "@/data/blog-list";

export default function Post() {
    const theme = useTheme();

    const slug = "irminsul-gg-v0.6-release-notes";
    const post = blogList.find((post) => slug === post.slug);

    return (
        <BlogPage post={post}>
            <Stack spacing={3} divider={<Divider />}>
                <Stack spacing={2}>
                    <Description>
                        After spending much more time than needed trying to make
                        the site "perfect", I am finally ready to say that
                        Version 0.6 of Irminsul.GG is complete! I know there's a
                        lot of little things that still need to be polished,
                        there might be things that are straight up broken
                        (hopefully that's not the case), and there's still a lot
                        of features I would like to add, but I feel like the
                        site is in a state where I can proudly say I've reached
                        the milestones I wanted to back when I first released
                        the site near the end of September.
                    </Description>
                    <Description>
                        Main changes:
                        <ul>
                            <li>
                                Added mobile formatting. The websites are now
                                viewable on your phone without it looking ugly.
                            </li>
                            <li>
                                Moved navigation links from the top navbar to a
                                pop-out drawer.
                            </li>
                            <li>
                                Filters for characters, weapons, etc. have been
                                moved to a popup.
                            </li>
                            <li>Adjusted the layout of the Banner Archive.</li>
                            <li>
                                Search function in the Banner Archive has been
                                enhanced.
                            </li>
                        </ul>
                    </Description>
                    <Description>
                        However, you've probably noticed that despite finishing
                        both of my intended milestones, this still isn't Version
                        1.0. This is because I have come up with two big things
                        I want add before the actual 1.0 release.
                    </Description>
                    <Description>
                        One of those things is to rebuild the sites with an
                        updated and more consistent codebase. The reason why I
                        want to do this is since I've worked on this project for
                        so long, I will naturally learn new skills over time and
                        implement them into whichever site I was working on at
                        the time. To save time, I often don't end up
                        transferring whatever new thing I implemented across the
                        other sites. As a result, even though the three websites
                        are mostly identical in appearance and functionality,
                        the code behind them can be vastly different, which I
                        would like to avoid. I figured that the best way to
                        rebuild the sites is to just start from scratch, and if
                        I'm going to start from scratch, I might as well start
                        working on something new. This leads to the other big
                        thing I want to do next: a site for Zenless Zone Zero.
                    </Description>
                    <Description>
                        My plan is to make a website for ZZZ that uses all the
                        new skills and tools I've learned over the years, and
                        then have the codebase of the ZZZ site be the new
                        template for all the other sites. This means that any
                        major changes to the Genshin, HSR, and WuWa sites won't
                        be done until the majority of the ZZZ site is finished.
                        Both the ZZZ site and the code rebuilding will take
                        quite a lot of time, but I plan to have features of the
                        ZZZ site be released bit by bit (so you don't have to
                        wait for the entire thing). I will probably take a short
                        break from working on Irminsul.GG to take care of other
                        projects and life, but expect a ZZZ site to be available
                        Soon™.
                    </Description>
                    <Description>
                        Once again, I don't know if anyone will actually use
                        this site (other than myself and friends I show this
                        to), but if it somehow gets popular and people need to
                        contact me for feedback and/or to report issues, I can
                        set something up for that (probably Discord). If you are
                        reading this and made it to the end, thank you!
                    </Description>
                </Stack>
            </Stack>
        </BlogPage>
    );
}
