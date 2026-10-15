import { useLayoutEffect, useRef, useState } from "react";

// Component imports
import NavButton from "@/components/NavButton";
import ContentBox from "@/components/ContentBox";
import CloseButton from "@/components/CloseButton";
import NotificationList from "./NotificationList";
import NotificationItem from "./NotificationItem";
import { StatusDot } from "@/components/StatusIndicator/StatusIndicator.components";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Helper imports
import { useNotificationsStore } from "@/stores";
import { notificationList, type Notification } from "@/notifications";
import DateObject from "@/helpers/dates";

export default function Notifications() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const read = useNotificationsStore((state) => state.read);
    const acknowledgeNotification = useNotificationsStore(
        (state) => state.acknowledgeNotification,
    );

    const [drawerOpen, setDrawerOpen] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const listScrollPosition = useRef(0);

    const toggleDrawer = (newOpen: boolean) => () => {
        setDrawerOpen(newOpen);
    };

    const handleDrawerExited = () => {
        setActiveNotification(null);
        listScrollPosition.current = 0;
    };

    const [currentNotification, setCurrentNotification] =
        useState<Notification | null>(null);

    const setActiveNotification = (notification: Notification | null) => {
        if (notification) {
            acknowledgeNotification(notification.slug);

            // Save the list's current scroll position
            listScrollPosition.current = scrollRef.current?.scrollTop ?? 0;
        }

        setCurrentNotification(notification);
    };

    useLayoutEffect(() => {
        if (!scrollRef.current) return;

        scrollRef.current.scrollTop = currentNotification
            ? 0
            : listScrollPosition.current;
    }, [currentNotification]);

    const publishedNotifications = notificationList.filter(
        (notification) =>
            new DateObject(notification.date).date.getTime() <= Date.now(),
    );

    const unreadNotifications = publishedNotifications.filter(
        (notification) => !read.includes(notification.slug),
    );

    const unreadCount = unreadNotifications.length;

    const notificationLabel = (() => {
        let title = "Notifications";
        if (unreadCount) title += ` (${unreadCount})`;
        return title;
    })();

    return (
        <>
            <Box sx={{ position: "relative" }}>
                <NavButton
                    onClick={toggleDrawer(!drawerOpen)}
                    title={notificationLabel}
                    sx={{
                        p: 0.5,
                    }}
                >
                    <Badge
                        invisible={!unreadCount}
                        badgeContent={<StatusDot status="info" size={10} />}
                        overlap="circular"
                    >
                        <NotificationsIcon />
                    </Badge>
                </NavButton>
            </Box>
            <Drawer
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                anchor="right"
                slotProps={{
                    transition: {
                        onExited: handleDrawerExited,
                    },
                }}
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    "& .MuiDrawer-paper": {
                        width: { xs: "100vw", sm: "500px", md: "600px" },
                        height: "100dvh",
                        "& > .MuiCard-root": {
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            minHeight: 0,
                            "& > .MuiAppBar-root": {
                                flexShrink: 0,
                            },
                            "& > .MuiBox-root": {
                                flex: 1,
                                minHeight: 0,
                                overflow: "hidden",
                            },
                        },
                    },
                }}
            >
                <ContentBox
                    header={
                        currentNotification ? (
                            <NavButton
                                onClick={() => setActiveNotification(null)}
                                title="Back"
                                sx={{ p: 0.5 }}
                            >
                                <ArrowBackIcon />
                            </NavButton>
                        ) : (
                            notificationLabel
                        )
                    }
                    actions={
                        <CloseButton
                            onClick={toggleDrawer(false)}
                            hoverColor={theme.drawer.backgroundColor.hover}
                        />
                    }
                    elevation={0}
                    headerProps={{
                        textVariant: "body1",
                        padding: matches
                            ? currentNotification
                                ? "4px 24px 4px 16px"
                                : "4px 24px"
                            : currentNotification
                              ? "4px 16px 4px 8px"
                              : "4px 16px",
                        dense: true,
                    }}
                    contentProps={{ padding: 0 }}
                >
                    <Box
                        ref={scrollRef}
                        sx={{
                            height: "100%",
                            overflowY: "auto",
                            scrollbarGutter: "stable",
                            scrollbarWidth: "thin",
                            px: 2,
                            pt: 2,
                            pb: 10,
                        }}
                    >
                        {currentNotification ? (
                            <NotificationItem
                                notification={currentNotification}
                                toggleDrawer={toggleDrawer}
                            />
                        ) : (
                            <NotificationList
                                notifications={publishedNotifications}
                                setActiveNotification={setActiveNotification}
                            />
                        )}
                    </Box>
                </ContentBox>
            </Drawer>
        </>
    );
}
