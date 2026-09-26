import { Dispatch, SetStateAction, useEffect, useState } from "react";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";
import InfoChip from "@/components/InfoChip";
import InfoButton from "@/components/InfoButton";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
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
            contentProps={{ padding: 0 }}
        >
            <Stack divider={<Divider />}>
                <Box
                    sx={{
                        p: 2,
                        maxHeight: "70vh",
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
                    <InfoButton
                        title="Dismiss"
                        color={theme.background(0, "light")}
                        icons={false}
                        onClick={() => setAnnouncementOpen(false)}
                    />
                    {announcement.link && (
                        <InfoButton
                            href={announcement.link}
                            title="View full changelog"
                            icons={{ end: OpenInNewIcon }}
                            onClick={() => setAnnouncementOpen(false)}
                        />
                    )}
                </FlexBox>
            </Stack>
        </ContentDialog>
    );
}
