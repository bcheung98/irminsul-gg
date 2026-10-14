// Component imports
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";
import InfoButton from "@/components/InfoButton";
import NotificationTag from "./NotificationTag";
import NotificationDate from "./NotificationDate";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// Type imports
import type { Notification } from "@/notifications";

export default function NotificationItem({
    notification,
    toggleDrawer,
}: {
    notification: Notification;
    toggleDrawer: (newOpen: boolean) => () => void;
}) {
    const theme = useTheme();

    const { title, tag, date, link, linkTitle, Content } = notification;

    return (
        <Stack spacing={2} divider={<Divider />}>
            <Stack spacing={1.5}>
                <Text weight="highlight">{title}</Text>
                <FlexBox spacing={1}>
                    <NotificationTag tag={tag} />
                    <NotificationDate
                        date={date}
                        color={theme.background(0, "light")}
                    />
                </FlexBox>
            </Stack>
            <Stack spacing={2}>
                <Content tag={tag} />
                {link && (
                    <InfoButton
                        title={linkTitle}
                        size="small"
                        href={link}
                        icons={{ end: OpenInNewIcon }}
                        onClick={toggleDrawer(false)}
                    />
                )}
            </Stack>
        </Stack>
    );
}
