import { gameNames } from "@/data/games";
import versions from "@/data/versions";
import DateObject from "@/helpers/dates";
import { createVersionNotifications } from "@/components/Notifications/Notifications.utils";
import type { Game } from "@/types";
import type { VersionInfo } from "@/types/version";

import TwoYearAnniNotification from "./irminsul-gg-2nd-anni";
import PlannerGroupingNotification from "./planner-grouping";
import NTEUpdateNotification from "./nte-update";
import EndfieldUpdateNotification from "./endfield-update";
import IrminsulGGV2Notification from "./irminsul-gg-v2-release-notes";

const plannerGames = gameNames.filter((game) => game !== "uma");

const generatedNotifications = (
    Object.entries(versions) as [Game, VersionInfo[]][]
).flatMap(([game, versionList]) =>
    createVersionNotifications(game, versionList),
);

const manualNotifications: Notification[] = [
    {
        slug: "planner-grouping",
        title: "New Ascension Planner Features",
        date: "2026-10-14 10:00:00",
        expires: "2026-10-28 10:00:00",
        paths: plannerGames.map((game) => `/${game}/planner`),
        Content: PlannerGroupingNotification,
    },
    {
        slug: "irminsul-gg-2nd-anni",
        title: "🎉 Two Years of Irminsul.GG!",
        date: "2026-09-21 10:00:00",
        expires: "2026-10-06 10:00:00",
        Content: TwoYearAnniNotification,
        link: "/blog/irminsul-gg-2nd-anni",
        linkTitle: "View full changelog",
    },
    {
        slug: "nte-update",
        title: "Neverness to Everness is here!",
        tag: "nte",
        date: "2026-05-31 20:00:00",
        Content: NTEUpdateNotification,
        link: "/nte",
        linkTitle: "Irminsul.GG: NTE",
    },
    {
        slug: "endfield-update",
        title: "Arknights: Endfield is here!",
        tag: "endfield",
        date: "2026-01-21 10:00:00",
        Content: EndfieldUpdateNotification,
        link: "/endfield",
        linkTitle: "Irminsul.GG: Endfield",
    },
    {
        slug: "irminsul-gg-v2-release-notes",
        title: "Irminsul.GG v2.0 Release Notes",
        date: "2025-12-21 10:00:00",
        Content: IrminsulGGV2Notification,
    },
];

export const notificationList: Notification[] = [
    ...manualNotifications,
    ...generatedNotifications,
].sort(
    (a, b) =>
        new DateObject(b.date).date.getTime() -
        new DateObject(a.date).date.getTime(),
);

export interface Notification {
    slug: string;
    title: string;
    description?: string;
    tag?: string;
    date: string;
    expires?: string;
    image?: string;
    paths?: string[];
    link?: string;
    linkTitle?: string;
    Content: React.ComponentType<NotificationContentProps>;
}

export interface NotificationContentProps {
    onDismiss?: () => void;
    tag?: string;
}
