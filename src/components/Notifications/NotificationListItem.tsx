// Component imports
import MenuItem from "@/components/MenuItem";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import NotificationTag from "./NotificationTag";
import NotificationDate from "./NotificationDate";
import { StatusDot } from "@/components/StatusIndicator/StatusIndicator.components";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

// Helper imports
import { useNotificationsStore } from "@/stores";

// Type imports
import type { Notification } from "@/notifications";

export default function NotificationListItem({
    notification,
    setActiveNotification,
}: {
    notification: Notification;
    setActiveNotification: (notification: Notification | null) => void;
}) {
    const theme = useTheme();

    const read = useNotificationsStore((state) => state.read);

    const hasReadNotification = read.includes(notification.slug);

    return (
        <>
            <MenuItem
                onClick={() => setActiveNotification(notification)}
                sx={{
                    "&.MuiMenuItem-root": {
                        backgroundColor: hasReadNotification
                            ? theme.background(1, "light")
                            : theme.background(0),
                        border: `1px solid ${hasReadNotification ? theme.border.color.primary : theme.palette.info.light}`,
                        borderRadius: "8px",
                    },
                }}
            >
                <FlexBox spacing={2} sx={{ position: "relative" }}>
                    {!hasReadNotification && (
                        <Box sx={{ position: "absolute", top: -8, left: -20 }}>
                            <StatusDot status="info" size={10} />
                        </Box>
                    )}
                    <Stack spacing={1}>
                        <Text variant="subtitle1" weight="highlight">
                            {notification.title}
                        </Text>
                        <FlexBox spacing={1}>
                            <NotificationTag tag={notification.tag} />
                            <NotificationDate
                                date={notification.date}
                                color={theme.background(2, "dark")}
                            />
                        </FlexBox>
                    </Stack>
                </FlexBox>
            </MenuItem>
        </>
    );
}
