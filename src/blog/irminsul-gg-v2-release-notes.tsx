"use client";

// Component imports
import { Description, H5, H6 } from "@/components/Blog";
import BlogPage from "@/components/Blog/BlogPage";
import Image from "@/components/Image";
import NavLink from "@/components/NavLink";
import DiscordButton from "@/components/DiscordButton";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { blogList } from "@/data/blog-list";

export default function Post() {
    const theme = useTheme();

    const slug = "irminsul-gg-v2-release-notes";
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
            <Stack spacing={3} divider={<Divider />}>
                <Stack spacing={2}>
                    <Description>
                        Irminsul.GG Version 2.0 is here! The update brings a
                        massive rewrite and overhaul of the website's core
                        systems and infrastructure. Most of the changes are
                        under the hood, and focused on streamlining the codebase
                        and making features modular to enable future expansion.
                        This post will go over the major changes of the website,
                        as well as what will be happening with the old sites and
                        some potential future plans.
                    </Description>
                    <Description>
                        If you have any questions about the new website, have
                        feedback, or want to report a bug, please join the
                        Discord using the button below.
                    </Description>
                    <div>
                        <DiscordButton />
                    </div>
                </Stack>
                <Stack spacing={3}>
                    <H5>Changelog</H5>
                    <Description>
                        The following is a non-exhaustive list of changes
                        included with Version 2.0:
                    </Description>
                    <Stack spacing={2}>
                        <div>
                            <H6>IMPORTANT: New website URLs</H6>
                            <Description>
                                The biggest change that will affect users and
                                may require action is that the URLs of all game
                                websites have been changed from{" "}
                                <u>subdomains</u> to <u>subdirectories</u>. For
                                example,{" "}
                                <code style={{ color: theme.text.primary }}>
                                    https://genshin.irminsul.gg/
                                </code>{" "}
                                is now{" "}
                                <code style={{ color: theme.text.primary }}>
                                    https://irminsul.gg/genshin
                                </code>
                            </Description>
                            <Description
                                weight="highlight"
                                sx={{ color: theme.text.header }}
                            >
                                This means that any data you have saved in the
                                Ascension Planner or Training Event Helper (for
                                Umamusume) will not be carried over to the new
                                website.
                            </Description>
                            <Description>
                                I plan to shut down the old sites on February 1,
                                2026, so be sure to transfer any data stored on
                                the old sites to the new site before it becomes
                                unavailable.
                            </Description>
                            <Description>
                                Additionally, if you have bookmarked any of the
                                game websites, you will have to update them to
                                reflect this change.
                            </Description>
                        </div>
                        <div>
                            <H6>Updated color themes</H6>
                            <Description>
                                An updated color theme has been implemented for
                                the new website. If you liked the older color
                                theme more, don't fret, as you can switch
                                between the two themes in the settings.
                            </Description>
                            <Description>
                                You may have noticed that the light theme and
                                the game-specific themes for each website have
                                been removed. I do plan on bringing back the
                                game-specific themes in the future, but the
                                light theme will probably not be coming back
                                (and who uses light mode anyways).
                            </Description>
                        </div>
                        <div>
                            <H6>New error pages</H6>
                            <Description>
                                Previously, if an error occurred on the old
                                site, you would just get a blank screen, which
                                isn't very helpful. Now, special pages have been
                                added to handle these errors and give
                                instructions on how to potentially resolve the
                                issue.
                            </Description>
                        </div>
                        <div>
                            <H6>General Layout</H6>
                            <Description>
                                Most of the site's layout is the same, but there
                                are a few changes that look to improve
                                quality-of-life:
                            </Description>
                            <Description>
                                <ul>
                                    <li>
                                        The navbar has been expanded to include
                                        breadcrumbs to help with site
                                        navigation.
                                    </li>
                                    <li>
                                        The scroll to top button has been moved
                                        to a more natural location at the bottom
                                        of the screen.
                                    </li>
                                    <li>
                                        The option for "Standard" width has been
                                        removed. Quite frankly I don't know why
                                        I even had that option in the first
                                        place.
                                    </li>
                                    <li>
                                        New visuals to indicate loading status
                                        have been added.
                                    </li>
                                    <li>
                                        Any upcoming banners are now shown on
                                        the home page of each game website.
                                    </li>
                                    <li>
                                        The skills section of Character pages
                                        has been adjusted for better viewing.
                                        For desktop users, the skill description
                                        and the skill scaling are now displayed
                                        side-by-side. In addition, both the
                                        skill description and skill scaling have
                                        internal scrolling so massive walls of
                                        text should no longer be flooding the
                                        screen (looking at you Wuthering Waves).
                                    </li>
                                    <Image
                                        src="https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/genshin/preview3.png"
                                        style={imgStyle}
                                    />
                                    <li>
                                        The layout of the Weapon pages has been
                                        adjusted for better viewing. All
                                        information on the page is now in one
                                        column.
                                    </li>
                                    <Image
                                        src="https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/hsr/preview5.png"
                                        style={imgStyle}
                                    />
                                </ul>
                            </Description>
                        </div>
                        <div>
                            <H6>Banner Archive</H6>
                            <Description>
                                <ul>
                                    <li>
                                        Revamped the layout of the Banner
                                        Archive controls.
                                    </li>
                                    <li>
                                        Added functionality to individually
                                        filter different banner categories.
                                    </li>
                                    <li>
                                        Added countdown timers for current and
                                        upcoming banners.
                                    </li>
                                    <li>
                                        Added color-coded borders to indicate if
                                        a banner is in the past, present, or
                                        future.
                                    </li>
                                </ul>
                            </Description>
                            <Image
                                src="https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/genshin/preview7.png"
                                style={imgStyle}
                            />
                        </div>
                        <div>
                            <H6>Gacha Calendar</H6>
                            <Description>
                                <ul>
                                    <li>
                                        Calendar view is now larger on desktop.
                                    </li>
                                    <li>
                                        Calendar controls have been moved to the
                                        mini-navbar at the top.
                                    </li>
                                    <li>
                                        The button to open the calendar settings
                                        has been moved to the left side of the
                                        mini-navbar.
                                    </li>
                                    <li>
                                        Keyboard controls can be used to
                                        navigate the calendar (desktop only).
                                        Use Left/Right Arrow to jump to the
                                        previous/next month, and use Ctrl +
                                        Left/Right Arrow to jump to the
                                        previous/next year.
                                    </li>
                                    <li>
                                        Added countdown timers in the popup for
                                        current and upcoming banners.
                                    </li>
                                    <li>
                                        You can now separately select which
                                        server you are on for each game. For
                                        example, you can view the NA server
                                        banners for Genshin Impact, and the Asia
                                        server banners for Honkai: Star Rail at
                                        the same time.
                                    </li>
                                </ul>
                            </Description>
                            <Image
                                src="https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/calendar-v2-img.png"
                                style={imgStyle}
                            />
                        </div>
                        <div>
                            <H6>Site Search</H6>
                            <Description>
                                <ul>
                                    <li>
                                        You can search for any item across every
                                        game now. Keep in mind there is a lot of
                                        data, which may take a while to load and
                                        slow down your browser (and hopefully it
                                        doesn't), so this setting is disabled by
                                        default if you are on a game's page.
                                    </li>
                                </ul>
                            </Description>
                        </div>
                        <div>
                            <H6>Blog</H6>
                            <Description>
                                <ul>
                                    <li>
                                        Added blog cards for each blog post.
                                    </li>
                                    <li>
                                        Each blog post now has its own page.
                                    </li>
                                    <li>
                                        You're reading this right now so you can
                                        see the changes in the blog for
                                        yourself.
                                    </li>
                                </ul>
                            </Description>
                        </div>
                        <div>
                            <H6>Technical Stuff</H6>
                            <Description>
                                After four years of being a single-page
                                application, I figured that the site has
                                outgrown its framework (or lack of one), and the
                                entire website was rewritten using Next.js. The
                                framework has allowed me to add many features
                                such as server-side rendering, error handling,
                                loading transitions, and improved SEO.
                            </Description>
                            <Description>
                                Being completely transparent, I do have some
                                concerns about the speed and performance of the
                                new site. In my past experience, the dev server
                                I work with is always much slower than the
                                actual production build, but with Next.js I'm
                                not sure how much of that is true. In addition,
                                I've noticed that the website uses more memory
                                than the old site, which isn't ideal but was
                                expected now that the data from all five games
                                is shared under one site. I'm really hoping that
                                the combination of a new framework and the
                                massive data load doesn't bog down the speed of
                                the website to unbearable levels. Your feedback
                                is crucial in letting me know if the site
                                performance is poor, so please don't hesistate
                                to let me know on Discord if this is the case.
                            </Description>
                        </div>
                    </Stack>
                </Stack>
                <Stack spacing={3}>
                    <H5>About the old websites</H5>
                    <Description>
                        The old websites will remain active until February 1,
                        2026. After that, they will be taken down, and
                        navigating to the old URLs will redirect to the new
                        website. However, during this time, I will likely not be
                        updating any of the content of the old sites, so please
                        use the new sites for all updated information.
                    </Description>
                </Stack>
                <Stack spacing={3}>
                    <H5>Future Plans</H5>
                    <Description>
                        So...what's next for Irminsul.GG? Now that the codebase
                        is unified and no longer a pile of spaghetti, expansion
                        of the site is much more sustainable and enjoyable for
                        me now. I originally had a list of things I wanted to
                        add to Irminsul.GG in 2026, but I have some big life
                        things lined up for me next year, so I likely will not
                        have as much time to accomplish these goals any time
                        soon.
                    </Description>
                    <Description>
                        The big thing I still want to try and do is add
                        Arknights: Endfield back to Irminsul.GG. I originally
                        added an Endfield site during its first beta test purely
                        out of boredom, but I haven't touched it since. With
                        Endfield officially releasing on January 22, 2026, my
                        hope is that I can at least have a baseline version of
                        the site up around that time. Once again, I'm not sure
                        how much time I'll have, so I won't give any promises on
                        a full Endfield site.
                    </Description>
                </Stack>
                <Stack spacing={3}>
                    <H5>End Note</H5>
                    <Description>
                        Its hard to imagine that its almost been over a year
                        since I officially released Irminsul.GG to the public.
                        It's nowhere as popular as any of the bigger sites such
                        as Hakush.in or Project Amber, but to be honest thats
                        not something I ever expected (or wanted) to happen.
                        Irminsul.GG will forever be my passion project,
                        providing me a unique outlet to channel my love for web
                        design and gacha games into one medium.
                    </Description>
                    <Description>
                        If you've managed to make it to the end of this post,
                        thank you! If you enjoy using this site, please consider{" "}
                        <NavLink
                            href="https://ko-fi.com/bcheung"
                            openInNewTab
                            style={linkStyle}
                        >
                            donating
                        </NavLink>{" "}
                        and leaving a star on the project's{" "}
                        <NavLink
                            href="https://github.com/bcheung98/irminsul-gg"
                            openInNewTab
                            style={linkStyle}
                        >
                            GitHub
                        </NavLink>
                        .
                    </Description>
                    <Description>
                        <i>
                            P.S. Can anyone decipher the secret message in the
                            console?
                        </i>
                    </Description>
                </Stack>
            </Stack>
        </BlogPage>
    );
}
