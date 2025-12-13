import { getVersionDates } from "@/components/BannerArchive/BannerArchive.utils";
import DateObject from "./dates";
import { games } from "@/data/games";
import { Game, Server } from "@/types";
import { Banner } from "@/types/banner";
import { CalendarVersionInfo, EventObject } from "@/types/calendar";

function incrementVersionNumber(version: string, game: Game) {
    let main: number | string;
    let sub: number | string;
    let versionNumber: string;
    // Genshin specific
    if (game === "genshin" && version.startsWith("Luna")) {
        const arr = version.split(" ");
        main = arr[0];
        const index = numerals.findIndex((i) => i === arr[1].split(".")[0]);
        sub = numerals[index + 1];
        versionNumber = `${main} ${sub}`;
    } else {
        const arr = version.split(".");
        main = parseInt(arr[0]);
        sub = parseInt(arr[1]);
        if (sub < 8) {
            sub += 1;
        } else {
            main += 1;
            sub = 0;
        }
        versionNumber = `${main}.${sub}`;
    }

    // Game specific adjustments
    if (game === "genshin" && versionNumber === "Luna X") {
        return "7.0";
    }

    return versionNumber;
}

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export function createEventSourceObject({
    tag,
    banners,
    server,
    showFullDuration,
}: {
    tag: string;
    banners: Banner[];
    server: Server;
    showFullDuration: boolean;
}): EventObject[] {
    const game = tag.split("/")[0] as Game;
    if (game === "uma" && server === "NA") {
        banners = banners.filter((banner) => banner.start !== "");
    }
    return createVersionInfo({ game, banners }).map((version) => {
        const { versionStart, versionEnd } = getVersionDates(
            version,
            server,
            game
        );
        const start = new DateObject(versionStart, server, game).date;
        const end = new DateObject(versionEnd, server, game).date;
        return {
            id: `${game}-${version.id}`,
            title: `${games[game].shortName} ${version.version}`,
            start: start.toISOString(),
            end: showFullDuration ? end.toISOString() : undefined,
            extendedProps: {
                game,
                color: games[game].color,
                isCurrent: DateObject.inRange(start, end),
                ...version,
            },
        };
    });
}

export function createVersionInfo({
    game,
    banners,
}: {
    game: Game;
    banners: Banner[];
}): CalendarVersionInfo[] {
    const versions: CalendarVersionInfo[] = [...banners];
    if (game !== "uma") {
        const lastVersion = versions.slice(-1)[0];
        let { id, version } = lastVersion;
        let start = new DateObject(lastVersion.end).date;
        let end = new DateObject(lastVersion.end).date;
        let startTime, startUTC, endTime, endUTC;
        id++;
        for (let i = 0; i < 32; i++) {
            start.setDate(end.getDate() + 1);
            if (lastVersion.version.endsWith(".1")) {
                end.setDate(end.getDate() + 42);
            } else {
                end.setDate(end.getDate() + 21);
            }
            if (i % 2 === 0) {
                version = incrementVersionNumber(version, game);
                startTime = "11:00:00";
                startUTC = " UTC+8";
                endTime = "17:59:59";
                endUTC = "";
            } else {
                startTime = "18:00:00";
                startUTC = "";
                endTime = "14:59:59";
                endUTC = "";
            }
            const newStartString = `${
                start.toISOString().split("T")[0]
            } ${startTime}${startUTC}`;
            const newEndString = `${
                end.toISOString().split("T")[0]
            } ${endTime}${endUTC}`;
            versions.push({
                id: id,
                version: `${version}.${(i % 2) + 1}`,
                start: newStartString,
                end: newEndString,
                rateUps: [],
                isFuture: true,
            });
            start = new DateObject(newEndString).date;
            end = new DateObject(newEndString).date;
            id++;
        }
    }
    return versions;
}
