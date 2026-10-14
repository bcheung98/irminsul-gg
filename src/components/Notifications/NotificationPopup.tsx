import { type Dispatch, type SetStateAction } from "react";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";
import InfoButton from "@/components/InfoButton";
import NotificationDate from "./NotificationDate";

// MUI imports
import { useTheme } from "@mui/material/styles";
import NoSsr from "@mui/material/NoSsr";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// Type imports
import type { Notification } from "@/notifications";
import type { PaperProps } from "@mui/material/Paper";

export default function NotificationPopup({
    open,
    setNotificationOpen,
    notification,
    handleSeen,
}: {
    open: boolean;
    setNotificationOpen: Dispatch<SetStateAction<boolean>>;
    notification: Notification;
    handleSeen: () => void;
}) {
    const theme = useTheme();

    const paperProps = {
        "data-nosnippet": "",
    } satisfies PaperProps & { "data-nosnippet"?: string };

    const { title, date, tag, link, linkTitle, Content } = notification;

    return (
        <NoSsr>
            <ContentDialog
                open={open}
                setOpen={setNotificationOpen}
                header={<Text weight="highlight">{title}</Text>}
                actions={
                    <NotificationDate
                        date={date}
                        color={theme.palette.error.dark}
                    />
                }
                headerProps={{ padding: "0 16px" }}
                maxWidth="sm"
                contentProps={{ padding: 0 }}
                slotProps={{
                    paper: paperProps,
                }}
            >
                <Stack divider={<Divider />}>
                    <Stack
                        spacing={1}
                        sx={{
                            p: 2,
                            maxHeight: "70vh",
                            overflowY: "auto",
                            scrollbarWidth: "thin",
                        }}
                    >
                        <Content tag={tag} onDismiss={handleSeen} />
                    </Stack>
                    <FlexBox
                        spacing={1}
                        sx={{
                            px: 2,
                            py: 1,
                            backgroundColor:
                                theme.contentBox.backgroundColor.header,
                            justifyContent: "right",
                        }}
                    >
                        <InfoButton
                            title="Dismiss"
                            size="small"
                            color={theme.background(0, "light")}
                            icons={false}
                            onClick={() => setNotificationOpen(false)}
                        />
                        {link && (
                            <InfoButton
                                title={linkTitle}
                                size="small"
                                href={link}
                                icons={{ end: OpenInNewIcon }}
                                onClick={() => setNotificationOpen(false)}
                            />
                        )}
                    </FlexBox>
                </Stack>
            </ContentDialog>
        </NoSsr>
    );
}
