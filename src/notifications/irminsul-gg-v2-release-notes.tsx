// Component imports
import { DescriptionSmall, SubHeader } from "@/components/Blog";
import DiscordButton from "@/components/DiscordButton";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";

// Type imports
import type { NotificationContentProps } from "@/notifications";

export default function IrminsulGGV2Notification({
    onDismiss,
}: NotificationContentProps) {
    const theme = useTheme();

    return (
        <Stack spacing={3}>
            <Stack spacing={2}>
                <DescriptionSmall>
                    Irminsul.GG Version 2.0 is here! The update brings a massive
                    rewrite and overhaul of the website's core systems and
                    infrastructure. Most of the changes are under the hood, and
                    focused on streamlining the codebase and making features
                    modular to enable future expansion.
                </DescriptionSmall>
            </Stack>
            <Stack spacing={2}>
                <div>
                    <SubHeader>IMPORTANT: New website URLs</SubHeader>
                    <DescriptionSmall>
                        The biggest change that will affect users and may
                        require action is that the URLs of all game websites
                        have been changed from <u>subdomains</u> to{" "}
                        <u>subdirectories</u>. For example,{" "}
                        <code style={{ color: theme.text.primary }}>
                            https://genshin.irminsul.gg/
                        </code>{" "}
                        is now{" "}
                        <code style={{ color: theme.text.primary }}>
                            https://irminsul.gg/genshin
                        </code>
                    </DescriptionSmall>
                    <br />
                    <DescriptionSmall
                        weight="highlight"
                        sx={{ color: theme.text.header }}
                    >
                        This means that any data you have saved in the Ascension
                        Planner or Training Event Helper (for Umamusume) will
                        not be carried over to the new website.
                    </DescriptionSmall>
                    <br />
                    <DescriptionSmall>
                        I plan to shut down the old sites on February 1, 2026,
                        so be sure to transfer any data stored on the old sites
                        to the new site before it becomes unavailable.
                    </DescriptionSmall>
                    <br />
                    <DescriptionSmall>
                        Additionally, if you have bookmarked any of the game
                        websites, you will have to update them to reflect this
                        change.
                    </DescriptionSmall>
                </div>
                <div>
                    <SubHeader>Updated color themes</SubHeader>
                    <DescriptionSmall>
                        An updated color theme has been implemented for the new
                        website. If you liked the older color theme more, don't
                        fret, as you can switch between the two themes in the
                        settings.
                    </DescriptionSmall>
                    <DescriptionSmall>
                        You may have noticed that the light theme and the
                        game-specific themes for each website have been removed.
                        I do plan on bringing back the game-specific themes in
                        the future, but the light theme will probably not be
                        coming back (and who uses light mode anyways).
                    </DescriptionSmall>
                </div>
                <div>
                    <DescriptionSmall>
                        You can read more about the new update{" "}
                        <ButtonBase
                            href="/blog/irminsul-gg-v2-release-notes"
                            onClick={onDismiss}
                            disableRipple
                        >
                            <span
                                style={{
                                    color: theme.text.selected,
                                    fontWeight: theme.font.weight.highlight,
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                }}
                            >
                                here
                            </span>
                        </ButtonBase>
                        {"."}
                    </DescriptionSmall>
                </div>
                <div>
                    <DescriptionSmall>
                        Please let me know in the Discord if you find any bugs
                        or have feedback regarding the new update!
                    </DescriptionSmall>
                </div>
                <div>
                    <DescriptionSmall>
                        Thank you all for using Irminsul.GG. Have a wonderful
                        holiday season!
                    </DescriptionSmall>
                </div>
                <div>
                    <DiscordButton />
                </div>
            </Stack>
        </Stack>
    );
}
