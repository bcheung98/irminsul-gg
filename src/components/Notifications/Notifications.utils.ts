import useSWR from "swr";
import GameVersionUpdateNotification from "@/notifications/game-version-update";
import { getDataSet, urls } from "@/api";
import { games } from "@/data/games";
import DateObject from "@/helpers/dates";
import type { Notification } from "@/notifications";
import type { Game, GameData } from "@/types";
import type { VersionItemData } from "@/components/VersionHighlights/VersionHighlights.types";
import type { VersionInfo } from "@/types/version";

const NOTIFICATION_LIFETIME = 14 * 24 * 60 * 60 * 1000;

export function isNotificationActive({ date, expires }: Notification) {
    const publishedAt = new DateObject(date).date;

    const expiresAt = expires
        ? new DateObject(expires).date
        : new Date(publishedAt.getTime() + NOTIFICATION_LIFETIME);

    return DateObject.inRange(publishedAt, expiresAt);
}

export function isNotificationExpired({ date, expires }: Notification) {
    const publishedAt = new DateObject(date).date;

    const expiresAt = expires
        ? new DateObject(expires).date
        : new Date(publishedAt.getTime() + NOTIFICATION_LIFETIME);

    return Date.now() >= expiresAt.getTime();
}

export function isCurrentPath(currentPath: string, paths?: string[]) {
    if (!paths) return true;

    const normalize = (path: string) =>
        path === "/" ? "/" : path.replace(/\/+$/, "");

    const current = normalize(currentPath);

    return paths.some((path) => {
        const target = normalize(path);

        return (
            current === target ||
            current.startsWith(target === "/" ? "/" : `${target}/`)
        );
    });
}

export function getPathSpecificity(currentPath: string, paths?: string[]) {
    if (!paths) return 0;

    return Math.max(
        0,
        ...paths
            .filter((path) => isCurrentPath(currentPath, [path]))
            .map((path) => path.split("/").filter(Boolean).length),
    );
}

export const versionDataKeys = {
    genshin: {
        characters: "genshin/characters",
        weapons: "genshin/weapons",
        equipment: "genshin/artifacts",
    },
    hsr: {
        characters: "hsr/characters",
        weapons: "hsr/lightcones",
        equipment: "hsr/relics",
    },
    wuwa: {
        characters: "wuwa/resonators",
        weapons: "wuwa/weapons",
        equipment: "wuwa/echoes",
    },
    zzz: {
        characters: "zzz/agents",
        weapons: "zzz/w-engines",
        equipment: "zzz/drive-discs",
    },
    uma: {
        characters: "uma/characters",
        weapons: "uma/supports",
    },
    endfield: {
        characters: "endfield/operators",
        weapons: "endfield/weapons",
        equipment: "endfield/gear",
    },
    nte: {
        characters: "nte/espers",
        weapons: "nte/arcs",
    },
} as const satisfies Record<
    string,
    {
        characters: keyof typeof urls;
        weapons: keyof typeof urls;
        equipment?: keyof typeof urls;
    }
>;

export function useGameVersionData(game: Game) {
    const keys = versionDataKeys[game];

    const characterData = useSWR(keys.characters, () =>
        getDataSet<VersionItemData>(keys.characters),
    );

    const weaponData = useSWR(keys.weapons, () =>
        getDataSet<VersionItemData>(keys.weapons),
    );

    const equipmentKey = "equipment" in keys ? keys.equipment : null;
    const equipmentData = useSWR(equipmentKey, (key: keyof typeof urls) =>
        getDataSet<VersionItemData>(key),
    );

    return {
        characters: characterData.data ?? [],
        weapons: weaponData.data ?? [],
        equipment: equipmentData.data ?? [],
        isLoading:
            characterData.isLoading ||
            weaponData.isLoading ||
            equipmentData.isLoading,
        error: characterData.error || weaponData.error || equipmentData.error,
    };
}

export function parseVersionTag(tag?: string) {
    if (!tag) return null;

    const [game, version] = tag.split("-");

    if (!(game in versionDataKeys) || !version) {
        return null;
    }

    return {
        game: game as keyof typeof versionDataKeys,
        version,
    };
}

const VERSION_NOTIFICATION_START = new DateObject(
    "2025-12-21 00:00:00 UTC+8",
).date.getTime();

const GAME_NOTIFICATION_START: Partial<GameData<string>> = {
    nte: "2026-05-31 20:00:00 UTC-7",
};

const NOTIFICATION_OFFSET = 12 * 60 * 60 * 1000;

function getNotificationDate({
    releaseDate,
    notificationDate,
}: VersionInfo): string | undefined {
    if (notificationDate) return notificationDate;
    if (!releaseDate) return undefined;

    const timestamp =
        new DateObject(releaseDate).date.getTime() - NOTIFICATION_OFFSET;

    return new Date(timestamp)
        .toISOString()
        .replace("T", " ")
        .replace(/\.\d{3}Z$/, " UTC+0");
}

export function createVersionNotifications(
    game: Game,
    versionList: VersionInfo[],
): Notification[] {
    const gameStart = GAME_NOTIFICATION_START[game];

    return versionList.flatMap((info) => {
        const date = getNotificationDate(info);

        if (
            !date ||
            new DateObject(date).date.getTime() < VERSION_NOTIFICATION_START
        ) {
            return [];
        }

        if (
            gameStart &&
            info.releaseDate &&
            new DateObject(info.releaseDate).date.getTime() <
                new DateObject(gameStart).date.getTime()
        ) {
            return [];
        }

        return [
            {
                slug: `${game}-${info.version}-update`,
                title: `${games[game].name} - Version ${info.version} Update`,
                tag: `${game}-${info.version}`,
                date,
                paths: [`/${game}`],
                Content: GameVersionUpdateNotification,
            },
        ];
    });
}
