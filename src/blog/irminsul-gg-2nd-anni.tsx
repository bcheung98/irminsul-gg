"use client";

// Component imports
import { Description, H5, H6 } from "@/components/Blog";
import BlogPage from "@/components/Blog/BlogPage";
import Image from "@/components/Image";
import NavLink from "@/components/NavLink";
import TextLabel from "@/components/TextLabel";
import DiscordButton from "@/components/DiscordButton";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

// Helper imports
import { blogList } from "@/data/blog-list";

export default function Post() {
    const theme = useTheme();

    const slug = "irminsul-gg-2nd-anni";
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
                        It's been two years since Irminsul.GG was first
                        launched, and to celebrate, I've released a large set of
                        updates for the site, with many new features and
                        optimizations!
                        <br />
                        Most of these changes have actually been slowly rolled
                        out over the past month, so I'm compiling a changelog of
                        everything that's been added.
                    </Description>
                    <Description>
                        If you have any questions, have feedback, or want to
                        report a bug, please join the Discord using the button
                        below.
                    </Description>
                    <div>
                        <DiscordButton />
                    </div>
                </Stack>
                <Stack spacing={6}>
                    <Stack spacing={3}>
                        <H5>General</H5>
                        <Stack spacing={3}>
                            <Stack spacing={1}>
                                <H6>New home page dashboard</H6>
                                <Description>
                                    <ul>
                                        <li>
                                            After two years, the home page gets
                                            its first ever update!. A new
                                            section has been added below the
                                            website cards where you can get a
                                            better overview of what's happening
                                            across the site.
                                        </li>
                                        <li>
                                            Active banners from each game are
                                            now displayed directly on the home
                                            page, along with the current version
                                            of each game.
                                        </li>
                                        <li>
                                            If you're new to the site and have
                                            no idea where to start, or are just
                                            curious to see what everyone else is
                                            looking at, you can take a look at
                                            the popular pages section.
                                        </li>
                                        <Image
                                            src="https://assets.irminsul.gg/docs/2nd-anni/dashboard.png"
                                            style={imgStyle}
                                        />
                                    </ul>
                                </Description>
                            </Stack>
                            <Stack spacing={1}>
                                <H6>Site-wide performance improvements</H6>
                                <Description>
                                    <ul>
                                        <li>
                                            Several optimizations have been made
                                            across the site, particularly for
                                            database pages, Site Search, and the
                                            Banner Archive. The biggest
                                            improvements should be noticeable on
                                            pages with a large number of items,
                                            where filtering and searching should
                                            now feel much more responsive.
                                        </li>
                                        <li>
                                            Under the hood, data processing and
                                            rendering have been streamlined to
                                            reduce unnecessary work when
                                            filters, searches, or other controls
                                            change.
                                        </li>
                                    </ul>
                                </Description>
                            </Stack>
                            <Stack spacing={1}>
                                <H6>
                                    Unreleased content in the Ascension Planner
                                </H6>
                                <Description>
                                    <ul>
                                        <li>
                                            You can now create custom characters
                                            and weapons in the Ascension
                                            Planner.
                                        </li>
                                        <li>
                                            The main purpose of this feature is
                                            to allow you to plan for future
                                            characters or weapons that haven't
                                            been added to Irminsul.GG yet. While
                                            I generally don't add unreleased
                                            content to the site until shortly
                                            before an update, information about
                                            that content may already be
                                            available elsewhere.
                                        </li>
                                        <li>
                                            When creating a custom item, you can
                                            select which materials it requires
                                            and add it to the planner just like
                                            a normal character or weapon.
                                        </li>
                                        <li>
                                            In addition, if an item requires a
                                            material that is not available yet,
                                            you can set your own custom material
                                            as a placeholder.
                                        </li>
                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <Image
                                                    src="https://assets.irminsul.gg/docs/2nd-anni/custom-items-2.png"
                                                    style={imgStyle}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <Image
                                                    src="https://assets.irminsul.gg/docs/2nd-anni/custom-items-4.png"
                                                    style={imgStyle}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Image
                                            src="https://assets.irminsul.gg/docs/2nd-anni/custom-items-5.png"
                                            style={imgStyle}
                                        />
                                        <i>
                                            Arknights: Endfield currently does
                                            not support this feature.
                                        </i>
                                    </ul>
                                </Description>
                            </Stack>
                            <Stack spacing={1}>
                                <H6>Banner Archive year filter</H6>
                                <Description>
                                    <ul>
                                        <li>
                                            You can now filter banners in the
                                            Banner Archive by year. This works
                                            alongside the existing banner
                                            filters, so you can narrow the
                                            archive down to a specific year
                                            while still filtering for particular
                                            characters, weapons, or banner
                                            categories.
                                        </li>
                                    </ul>
                                </Description>
                            </Stack>
                            <Stack spacing={1}>
                                <H6>New Gacha Calendar settings</H6>
                                <Description>
                                    <ul>
                                        <li>
                                            You can now choose which day of the
                                            week the calendar starts on to
                                            better match your preferred calendar
                                            layout.
                                        </li>
                                        <Image
                                            src="https://assets.irminsul.gg/docs/2nd-anni/calendar-1.png"
                                            style={imgStyle}
                                        />
                                        <li>
                                            In addition, a new list view has
                                            been added to the Gacha Calendar.
                                            You can freely switch between the
                                            calendar and list views depending on
                                            which format is easier to use.
                                        </li>
                                        <Image
                                            src="https://assets.irminsul.gg/docs/2nd-anni/calendar-2.png"
                                            style={imgStyle}
                                        />
                                    </ul>
                                </Description>
                            </Stack>
                            <Stack spacing={1}>
                                <H6>Redesigned mobile navigation</H6>
                                <Description>
                                    <ul>
                                        <li>
                                            The mobile navigation menu has been
                                            redesigned to make navigating
                                            between games, databases, tools, and
                                            other pages easier.
                                        </li>
                                    </ul>
                                </Description>
                            </Stack>
                            <Stack spacing={1}>
                                <H6>Persistent sidebar state</H6>
                                <Description>
                                    <ul>
                                        <li>
                                            For desktop users, the site will now
                                            remember whether you left the
                                            sidebar open or collapsed.
                                            <br />
                                            Previously, the sidebar would return
                                            to its default state whenever you
                                            came back to the site. Your
                                            preference is now saved in your
                                            browser, so you no longer have to
                                            keep collapsing it every time you
                                            visit if you prefer having the extra
                                            screen space.
                                        </li>
                                    </ul>
                                </Description>
                            </Stack>
                            <Stack spacing={1}>
                                <H6>Updated game home pages</H6>
                                <Description>
                                    <ul>
                                        <li>
                                            The main page for each game has been
                                            updated with some introductory text
                                            and quick links.
                                        </li>
                                    </ul>
                                </Description>
                            </Stack>
                            <Stack spacing={1}>
                                <H6>Main character gender setting</H6>
                                <Description>
                                    <ul>
                                        <li>
                                            For games with selectable
                                            protagonists, you can now choose
                                            which main character gender is
                                            displayed throughout the site.
                                            Supported parts of the site will use
                                            your selected protagonist instead of
                                            assuming a default option. Now the
                                            site can stop telling you that you
                                            picked the wrong main character.
                                        </li>
                                    </ul>
                                </Description>
                            </Stack>
                            <Stack spacing={1}>
                                <H6>Random page</H6>
                                <Description>
                                    <ul>
                                        <li>
                                            A{" "}
                                            <NavLink
                                                href="/random"
                                                style={linkStyle}
                                                openInNewTab
                                            >
                                                Random Page
                                            </NavLink>{" "}
                                            option has been added. As the name
                                            suggests, clicking it will take you
                                            to a randomly selected page from
                                            somewhere on Irminsul.GG.
                                        </li>
                                        <li>
                                            The random page link can also be
                                            accessed by pressing{" "}
                                            <code>Alt + x</code>
                                        </li>
                                        <i>
                                            There isn't really a practical
                                            reason for this one, I just thought
                                            it would be fun.
                                        </i>
                                    </ul>
                                </Description>
                            </Stack>
                            <Stack spacing={1}>
                                <H6>
                                    Website update alerts and status indicators
                                </H6>
                                <Description>
                                    <ul>
                                        <li>
                                            The site can now detect when a new
                                            website or data update has been
                                            deployed while you still have an
                                            older version open.
                                        </li>
                                        <li>
                                            If an update is available, an alert
                                            will appear with the option to
                                            refresh the page and load the newest
                                            version.
                                        </li>
                                        <li>
                                            New status indicators (located at
                                            the bottom of the page) have been
                                            added to show information about the
                                            website's current build and data.
                                            <br />
                                            The website itself and the game data
                                            used by the site can be updated
                                            separately. These indicators make it
                                            easier to see when each was last
                                            updated and whether the version
                                            currently loaded in your browser is
                                            up to date. This is mostly useful
                                            for troubleshooting, but it also
                                            provides a little more transparency
                                            into when the site and its data were
                                            last updated.
                                        </li>
                                    </ul>
                                </Description>
                            </Stack>
                            <Stack spacing={1}>
                                <H6>Site Directory</H6>
                                <Description>
                                    <ul>
                                        <li>
                                            A new{" "}
                                            <NavLink
                                                href="/site-map"
                                                style={linkStyle}
                                            >
                                                Site Directory
                                            </NavLink>{" "}
                                            page has been added. The directory
                                            contains a list of pages available
                                            throughout Irminsul.GG, including
                                            the different game databases, tools,
                                            and individual content pages.
                                        </li>
                                    </ul>
                                </Description>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack spacing={3}>
                        <TextLabel
                            icon="endfield/_common/Icon"
                            title="Arknights: Endfield"
                            titleProps={{ variant: "h5" }}
                            iconProps={{ size: 32 }}
                            spacing={1.5}
                        />
                        <Stack spacing={3}>
                            <Stack spacing={1}>
                                <H6>Gear database</H6>
                                <Description>
                                    <ul>
                                        <li>
                                            The{" "}
                                            <NavLink
                                                href="/endfield/gear"
                                                style={linkStyle}
                                            >
                                                Gear database
                                            </NavLink>{" "}
                                            has finally been added for
                                            Arknights: Endfield. You can now
                                            browse the gear currently available
                                            in the game and view their
                                            associated information just like the
                                            other types of content available in
                                            the Endfield database.
                                        </li>
                                        <Image
                                            src="https://assets.irminsul.gg/docs/2nd-anni/gear-1.png"
                                            style={imgStyle}
                                        />
                                    </ul>
                                </Description>

                                <Description>
                                    <ul>
                                        <li>
                                            The filters allow you to search for
                                            Gear based on type, set, attributes,
                                            and rarity.
                                        </li>
                                        <Image
                                            src="https://assets.irminsul.gg/docs/2nd-anni/gear-2.png"
                                            style={imgStyle}
                                        />
                                    </ul>
                                </Description>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack spacing={3}>
                        <TextLabel
                            icon="uma/_common/Icon"
                            title="Umamusume: Pretty Derby"
                            titleProps={{ variant: "h5" }}
                            iconProps={{ size: 32 }}
                            spacing={1.5}
                        />
                        <Stack spacing={3}>
                            <Stack spacing={1}>
                                <H6>
                                    Rating Calculator / Showcase Card Builder
                                </H6>
                                <Description>
                                    <ul>
                                        <li>
                                            The{" "}
                                            <NavLink
                                                href="/uma/rating-calculator"
                                                style={linkStyle}
                                                openInNewTab
                                            >
                                                Rating Calculator
                                            </NavLink>{" "}
                                            is a new tool that lets you enter a
                                            trainee's stats, aptitudes, and
                                            skills, and calculates their final
                                            career rating alongside a breakdown
                                            of how different parts of their
                                            stats contribute to the final
                                            rating.
                                        </li>
                                        <Image
                                            src="https://assets.irminsul.gg/docs/2nd-anni/rating-calculator-1.png"
                                            style={imgStyle}
                                        />
                                        <li>
                                            The tool also includes a Showcase
                                            Card Builder, allowing you to turn
                                            that information into a shareable
                                            showcase card. Now, you no longer
                                            have to send multiple screenshots to
                                            show your Uma's final build!
                                        </li>
                                        <Image
                                            src="https://assets.irminsul.gg/docs/2nd-anni/rating-calculator-2.png"
                                            style={imgStyle}
                                        />
                                    </ul>
                                </Description>
                            </Stack>
                            <Stack spacing={1}>
                                <H6>Expanded skill popup details and pages</H6>
                                <Description>
                                    <ul>
                                        <li>
                                            Skill popups now display additional
                                            details including activation
                                            conditions and other variants.
                                        </li>
                                        <Image
                                            src="https://assets.irminsul.gg/docs/2nd-anni/uma-skills-1.png"
                                            style={imgStyle}
                                        />
                                        <li>
                                            In addition, skills now have their
                                            own dedicated pages to view these
                                            details separately.
                                        </li>
                                        <Image
                                            src="https://assets.irminsul.gg/docs/2nd-anni/uma-skills-2.png"
                                            style={imgStyle}
                                        />
                                    </ul>
                                </Description>
                            </Stack>
                            <Stack spacing={1}>
                                <H6>Table view for Support Card effects</H6>
                                <Description>
                                    <ul>
                                        <li>
                                            Support Card effects can now be
                                            viewed in a table, making it easier
                                            to see how each effect changes
                                            across the different Support Card
                                            levels.
                                        </li>
                                    </ul>
                                </Description>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </BlogPage>
    );
}
