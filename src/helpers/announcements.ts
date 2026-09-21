import type { Announcement } from "@/data/announcements";
import DateObject from "./dates";

const ANNOUNCEMENT_LIFETIME = 14 * 24 * 60 * 60 * 1000;

export function isAnnouncementActive({ date, expires }: Announcement) {
    const publishedAt = new DateObject(date).date;

    const expiresAt = expires
        ? new DateObject(expires).date
        : new Date(publishedAt.getTime() + ANNOUNCEMENT_LIFETIME);

    return DateObject.inRange(publishedAt, expiresAt);
}
