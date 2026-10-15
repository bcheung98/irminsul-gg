// Component imports
import InfoButton from "@/components/InfoButton";
import NotificationListItem from "./NotificationListItem";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";

// Helper imports
import { useNotificationsStore } from "@/stores";

// Type imports
import type { Notification } from "@/notifications";

export default function NotificationList({
    notifications,
    setActiveNotification,
}: {
    notifications: Notification[];
    setActiveNotification: (notification: Notification | null) => void;
}) {
    const theme = useTheme();

    const read = useNotificationsStore((state) => state.read);

    const markAllAsRead = useNotificationsStore((state) => state.markAllAsRead);
    const markAllAsUnread = useNotificationsStore(
        (state) => state.markAllAsUnread,
    );

    const unreadNotifications = notifications.filter(
        (notification) => !read.includes(notification.slug),
    );

    const unreadCount = unreadNotifications.length;

    const markAll = () => {
        if (unreadCount) {
            markAllAsRead(unreadNotifications.map(({ slug }) => slug));
        } else {
            markAllAsUnread();
        }
    };

    return (
        <Stack spacing={2} divider={<Divider />}>
            <InfoButton
                title={`Mark all as ${unreadCount ? "read" : "unread"}`}
                size="small"
                color={
                    unreadCount
                        ? theme.palette.success.main
                        : theme.palette.error.main
                }
                icons={{
                    start: unreadCount ? MarkEmailReadIcon : MarkAsUnreadIcon,
                }}
                onClick={markAll}
            />
            <Stack spacing={2}>
                {notifications.map((notification) => (
                    <NotificationListItem
                        key={notification.slug}
                        notification={notification}
                        setActiveNotification={setActiveNotification}
                    />
                ))}
            </Stack>
        </Stack>
    );
}
