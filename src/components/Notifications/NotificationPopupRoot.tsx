import {
    useEffect,
    useRef,
    useState,
    type Dispatch,
    type SetStateAction,
} from "react";
import { usePathname } from "next/navigation";

// Component imports
import NotificationPopup from "./NotificationPopup";

// Helper imports
import { useNotificationsStore } from "@/stores";
import { notificationList, type Notification } from "@/notifications";
import {
    getPathSpecificity,
    isNotificationActive,
    isCurrentPath,
} from "./Notifications.utils";

export default function NotificationPopupRoot() {
    const pathname = usePathname();

    const seen = useNotificationsStore((state) => state.seen);
    const acknowledgeNotification = useNotificationsStore(
        (state) => state.acknowledgeNotification,
    );

    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState<Notification | null>(null);

    const hasShownPopup = useRef(false);

    useEffect(() => {
        if (hasShownPopup.current) return;

        const nextNotification = notificationList
            .filter(
                (item) =>
                    isNotificationActive(item) &&
                    isCurrentPath(pathname, item.paths) &&
                    !seen.includes(item.slug),
            )
            .reduce<Notification | null>((best, item) => {
                if (!best) return item;

                return getPathSpecificity(pathname, item.paths) >
                    getPathSpecificity(pathname, best.paths)
                    ? item
                    : best;
            }, null);

        if (!nextNotification) return;

        const timeout = setTimeout(() => {
            hasShownPopup.current = true;
            setNotification(nextNotification);
            setOpen(true);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [pathname, seen]);

    const setNotificationOpen: Dispatch<SetStateAction<boolean>> = (value) => {
        setOpen(value);

        if (value === false && notification) {
            acknowledgeNotification(notification.slug);
        }
    };

    const handleDismiss = () => {
        if (notification) {
            acknowledgeNotification(notification.slug);
        }
    };

    if (!notification) return null;

    return (
        <NotificationPopup
            open={open}
            setNotificationOpen={setNotificationOpen}
            notification={notification}
            handleSeen={handleDismiss}
        />
    );
}
