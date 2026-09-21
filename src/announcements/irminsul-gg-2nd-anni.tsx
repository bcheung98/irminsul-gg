// Component imports
import { SubHeader, DescriptionSmall } from "@/components/Blog";
import NavLink from "@/components/NavLink";
import TextLabel from "@/components/TextLabel";
import FlexBox from "@/components/FlexBox";

// MUI imports
import { alpha, rgbToHex, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import ButtonBase from "@mui/material/ButtonBase";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// Helper imports
import { games } from "@/data/games";
import { adjustColor } from "@/utils/colors";

// Type imports
import type { AnnouncementContentProps } from "@/data/announcements";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export default function TwoYearAnniAnnouncement({
    onDismiss,
}: AnnouncementContentProps) {
    const theme = useTheme();

    const linkStyle = {
        color: theme.text.selected,
        textDecoration: "underline",
        fontWeight: theme.font.weight.highlight,
        cursor: "pointer",
    };

    const buttonStyles = {
        p: 0.5,
        mt: -1,
        color: theme.contentBox.color.header,
        borderRadius: "4px",
        border: `1px solid ${theme.border.color.primary}`,
        backgroundColor: theme.contentBox.backgroundColor.headerHover,
        "&:hover": {
            backgroundColor:
                theme.contentBox.backgroundColor.headerSelectedHover,
        },
    };

    const iconProps: SvgIconProps = {
        sx: {
            fontSize: {
                xs: "16px",
                sm: "18px",
            },
        },
    };

    return (
        <Stack spacing={2}>
            <Stack spacing={1}>
                <DescriptionSmall>
                    It's been two years since Irminsul.GG was first launched,
                    and to celebrate, I've released a large set of updates, with
                    many new features and optimizations!
                </DescriptionSmall>
                <DescriptionSmall>
                    The following is a quick summary of the major additions
                    included in this update. You can read a more detailed
                    changelog{" "}
                    <NavLink
                        href="/blog/irminsul-gg-2nd-anni"
                        onClick={onDismiss}
                        style={linkStyle}
                    >
                        here
                    </NavLink>{" "}
                    or by clicking the button below.
                </DescriptionSmall>
            </Stack>
            <Card
                sx={{
                    p: 2,
                    borderRadius: theme.contentBox.border.radius,
                    border: `1px solid ${games.genshin.color}`,
                    backgroundColor: alpha(
                        `${adjustColor(rgbToHex(games.genshin.color), -0.5)}`,
                        0.5,
                    ),
                }}
            >
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        <SubHeader>New home page dashboard</SubHeader>
                        <DescriptionSmall>
                            A new section has been added to the home page where
                            you can view active banners, current game versions,
                            and popular pages.
                        </DescriptionSmall>
                    </Stack>
                    <Stack spacing={1}>
                        <SubHeader>
                            Site-wide performance improvements
                        </SubHeader>
                        <DescriptionSmall>
                            Several optimizations have been made across the
                            site, particularly for database pages, Site Search,
                            and the Banner Archive.
                        </DescriptionSmall>
                    </Stack>
                    <Stack spacing={1}>
                        <SubHeader>
                            Custom items for the Ascension Planner
                        </SubHeader>
                        <DescriptionSmall>
                            You can now create custom characters and weapons in
                            the Ascension Planner, making it possible to plan
                            for items that aren't currently available on the
                            site.
                        </DescriptionSmall>
                        <DescriptionSmall>
                            When creating a custom item, you can select which
                            materials it requires and add it to the planner just
                            like a normal character or weapon.
                        </DescriptionSmall>
                    </Stack>
                    <Stack spacing={1}>
                        <SubHeader>Banner Archive year filter</SubHeader>
                        <DescriptionSmall>
                            Banner Archive results can now be filtered by year,
                            making it easier to browse and compare banners from
                            specific periods.
                        </DescriptionSmall>
                    </Stack>
                    <Stack spacing={1}>
                        <SubHeader>New Gacha Calendar settings</SubHeader>
                        <DescriptionSmall>
                            You can now choose which day of the week the
                            calendar starts on to better match your preferred
                            calendar layout.
                        </DescriptionSmall>
                        <DescriptionSmall>
                            The Gacha Calendar also now includes an alternative
                            list view for browsing banner schedules without the
                            traditional calendar layout.
                        </DescriptionSmall>
                    </Stack>
                    <Stack spacing={1}>
                        <SubHeader>Redesigned mobile navigation</SubHeader>
                        <DescriptionSmall>
                            The mobile navigation menu has been redesigned to
                            make navigating between games, databases, tools, and
                            other pages easier.
                        </DescriptionSmall>
                    </Stack>
                    <Stack spacing={1}>
                        <SubHeader>
                            Persistent sidebar state (desktop only)
                        </SubHeader>
                        <DescriptionSmall>
                            Your desktop sidebar preference is now saved, so it
                            will remain open or collapsed when you return to the
                            site.
                        </DescriptionSmall>
                    </Stack>
                    <Stack spacing={1}>
                        <SubHeader>Updated game home pages</SubHeader>
                        <DescriptionSmall>
                            The main page for each game has been updated with
                            some introductory text and quick links.
                        </DescriptionSmall>
                    </Stack>
                    <Stack spacing={1}>
                        <SubHeader>Main character gender setting</SubHeader>
                        <DescriptionSmall>
                            For games with selectable protagonists, you can now
                            choose which main character gender is displayed
                            throughout the site.
                        </DescriptionSmall>
                    </Stack>
                    <Stack spacing={1}>
                        <SubHeader>Random page</SubHeader>
                        <DescriptionSmall>
                            A new random page link lets you jump to a randomly
                            selected page from somewhere on the site.
                        </DescriptionSmall>
                    </Stack>
                    <Stack spacing={1}>
                        <SubHeader>
                            Website update alerts and status indicators
                        </SubHeader>
                        <DescriptionSmall>
                            The site can now detect when a new website or data
                            update has been deployed while you still have an
                            older version open.
                        </DescriptionSmall>
                        <DescriptionSmall>
                            New status indicators have been added to show
                            information about the website's current build and
                            data.
                        </DescriptionSmall>
                    </Stack>
                    <Stack spacing={1}>
                        <FlexBox sx={{ justifyContent: "space-between" }}>
                            <SubHeader>Site Directory</SubHeader>
                            <ButtonBase
                                href="/site-map"
                                onClick={onDismiss}
                                sx={buttonStyles}
                            >
                                <OpenInNewIcon {...iconProps} />
                            </ButtonBase>
                        </FlexBox>
                        <DescriptionSmall>
                            A new site directory page provides a centralized
                            list of pages across Irminsul.GG, including the
                            different game databases, tools, and individual
                            content pages.
                        </DescriptionSmall>
                    </Stack>
                </Stack>
            </Card>
            <Card
                sx={{
                    p: 2,
                    borderRadius: theme.contentBox.border.radius,
                    border: `1px solid ${adjustColor(rgbToHex(games.endfield.color), -0.5)}`,
                    backgroundColor: alpha(
                        `${adjustColor(rgbToHex(games.endfield.color), -0.75)}`,
                        0.5,
                    ),
                }}
            >
                <Stack spacing={2}>
                    <TextLabel
                        icon="endfield/_common/Icon"
                        title="Arknights: Endfield"
                        iconProps={{ size: 32 }}
                        spacing={1.5}
                    />
                    <Stack spacing={1}>
                        <FlexBox sx={{ justifyContent: "space-between" }}>
                            <SubHeader>Gear database added</SubHeader>
                            <ButtonBase
                                href="/endfield/gear"
                                onClick={onDismiss}
                                sx={buttonStyles}
                            >
                                <OpenInNewIcon {...iconProps} />
                            </ButtonBase>
                        </FlexBox>
                        <DescriptionSmall>
                            Gear database has been added for browsing gear and
                            its associated information in Arknights: Endfield.
                        </DescriptionSmall>
                    </Stack>
                </Stack>
            </Card>
            <Card
                sx={{
                    p: 2,
                    borderRadius: theme.contentBox.border.radius,
                    border: `1px solid ${games.uma.color}`,
                    backgroundColor: alpha(
                        `${adjustColor(rgbToHex(games.uma.color), -0.5)}`,
                        0.5,
                    ),
                }}
            >
                <Stack spacing={2}>
                    <TextLabel
                        icon="uma/_common/Icon"
                        title="Umamusume: Pretty Derby"
                        iconProps={{ size: 32 }}
                        spacing={1.5}
                    />
                    <Stack spacing={1}>
                        <FlexBox sx={{ justifyContent: "space-between" }}>
                            <SubHeader>
                                Rating Calculator / Showcase Card Builder
                            </SubHeader>
                            <ButtonBase
                                href="/uma/rating-calculator"
                                onClick={onDismiss}
                                sx={buttonStyles}
                            >
                                <OpenInNewIcon {...iconProps} />
                            </ButtonBase>
                        </FlexBox>
                        <DescriptionSmall>
                            A new tool lets you calculate a trainee's rating and
                            create a customizable showcase card from their
                            stats, aptitudes, and skills.
                        </DescriptionSmall>
                    </Stack>
                    <Stack spacing={1}>
                        <SubHeader>
                            Expanded skill popup details and pages
                        </SubHeader>
                        <DescriptionSmall>
                            Skill popups now display additional details
                            including activation conditions and other variants.
                        </DescriptionSmall>
                        <DescriptionSmall>
                            In addition, skills now have their own dedicated
                            pages to view these details separately.
                        </DescriptionSmall>
                    </Stack>
                    <Stack spacing={1}>
                        <SubHeader>
                            Table view for Support Card effects
                        </SubHeader>
                        <DescriptionSmall>
                            Support Card effects can now be viewed in a table,
                            making it easier to see how each effect changes
                            across the different Support Card levels.
                        </DescriptionSmall>
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    );
}
