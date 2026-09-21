import { Dispatch, SetStateAction, useEffect, useState } from "react";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";
import InfoChip from "@/components/InfoChip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ButtonBase from "@mui/material/ButtonBase";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// Helper imports
import { useAnnouncementStore } from "@/stores";
import { announcementList } from "@/data/announcements";
import { isAnnouncementActive } from "@/helpers/announcements";
import DateObject from "@/helpers/dates";

export default function Announcements() {
    const theme = useTheme();

    const seen = useAnnouncementStore((state) => state.seen);
    const markAsSeen = useAnnouncementStore((state) => state.markAsSeen);

    const [open, setOpen] = useState(false);

    const announcement = announcementList[0];

    const hasSeenAnnouncement = seen.includes(announcement.slug);
    const isActive = isAnnouncementActive(announcement);

    const shouldShowAnnouncement = isActive && !hasSeenAnnouncement;

    useEffect(() => {
        if (!shouldShowAnnouncement) return;

        const timeout = setTimeout(() => {
            setOpen(true);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [shouldShowAnnouncement]);

    const setAnnouncementOpen: Dispatch<SetStateAction<boolean>> = (value) => {
        setOpen(value);

        if (value === false) {
            markAsSeen(announcement.slug);
        }
    };

    const handleSeen = () => {
        markAsSeen(announcement.slug);
    };

    const { Content } = announcement;

    return (
        <ContentDialog
            open={open}
            setOpen={setAnnouncementOpen}
            header={<Text weight="highlight">{announcement.title}</Text>}
            actions={
                <InfoChip
                    title={new DateObject(
                        announcement.date,
                    ).date.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                    titleProps={{ variant: "body3" }}
                    chipProps={{
                        padding: "0 12px",
                        height: "20px",
                        background: theme.palette.error.dark,
                    }}
                />
            }
            headerProps={{ padding: "0 16px" }}
            maxWidth="sm"
            sx={{
                ".MuiDialog-paper": {
                    maxHeight: { md: "750px" },
                },
            }}
            contentProps={{ padding: 0 }}
        >
            <Stack divider={<Divider />}>
                <Box
                    sx={{
                        p: 2,
                        maxHeight: "600px",
                        overflowY: "auto",
                        scrollbarWidth: "thin",
                    }}
                >
                    <Content onDismiss={handleSeen} />
                </Box>
                <FlexBox
                    spacing={1}
                    sx={{
                        p: 2,
                        backgroundColor:
                            theme.contentBox.backgroundColor.header,
                        justifyContent: "right",
                    }}
                >
                    <ButtonBase
                        onClick={() => setAnnouncementOpen(false)}
                        disableRipple
                        sx={{
                            width: "max-content",
                            height: "28px",
                            px: 2,
                            borderRadius: "4px",
                            backgroundColor: theme.background(0, "light"),
                            "&:hover": {
                                backgroundColor: theme.background(0),
                                transition: "background-color 0.15s",
                            },
                        }}
                    >
                        <Text variant="body2" weight="highlight">
                            Dismiss
                        </Text>
                    </ButtonBase>
                    {announcement.link && (
                        <ButtonBase
                            href={announcement.link}
                            onClick={() => setAnnouncementOpen(false)}
                            disableRipple
                            sx={{
                                width: "max-content",
                                height: "28px",
                                px: 2,
                                borderRadius: "4px",
                                backgroundColor: theme.palette.info.main,
                                "&:hover": {
                                    backgroundColor: theme.palette.info.dark,
                                    transition: "background-color 0.15s",
                                },
                            }}
                        >
                            <FlexBox
                                spacing={1}
                                sx={{ justifyContent: "space-between" }}
                            >
                                <Text variant="body2" weight="highlight">
                                    View full changelog
                                </Text>
                                <OpenInNewIcon
                                    sx={{
                                        color: theme.text.primary,
                                        fontSize: {
                                            xs: "16px",
                                            sm: "18px",
                                        },
                                    }}
                                />
                            </FlexBox>
                        </ButtonBase>
                    )}
                </FlexBox>
            </Stack>
        </ContentDialog>
    );
}
