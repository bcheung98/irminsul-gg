import { createDateObject } from "./dates";
import { objectKeys } from "./utils";
import { BannerList, EventObject, EventSourceObject } from "types/common";

export function createEventSourceObject(banners: BannerList) {
    const eventSources: EventSourceObject[] = objectKeys(banners)
        .map((game) => {
            return objectKeys(banners[game]).map((type) => {
                const events: EventObject[] = [];
                let version = "";
                let subVersion = "";
                let startDate = "";
                let fiveStars: string[] = [];
                const { color, textColor } = getColor(game);
                banners[game][type]?.forEach((banner) => {
                    version = banner.version;
                    if (banner.subVersion.endsWith(".1")) {
                        startDate = banner.start;
                    }
                    if (subVersion !== banner.subVersion) {
                        fiveStars = [];
                        events.push({
                            tag: game,
                            title: `${game} ${banner.version} Phase ${
                                banner.subVersion.split(".").slice(-1)[0]
                            }`,
                            start: createDateObject({
                                date: banner.start,
                            }).obj.toISOString(),
                            // end: createDateObject({
                            //     date: banner.end,
                            // }).obj.toISOString(),
                            extendedProps: {
                                fiveStars: fiveStars,
                            },
                        });
                    }
                    banner.fiveStars.forEach((item) => fiveStars.push(item));
                    if (subVersion !== banner.subVersion) {
                        subVersion = banner.subVersion;
                    }
                });
                // Future versions
                let nextDate = new Date(startDate);
                for (let i = 0; i < 20; i++) {
                    if (i == 0) {
                        nextDate.setDate(nextDate.getDate() + 6 * 7);
                    } else {
                        nextDate.setDate(nextDate.getDate() + 3 * 7);
                    }
                    if (i % 2 === 0) {
                        version = incrementVersion(version);
                    }
                    events.push({
                        tag: game,
                        title: `${game} ${version} Phase ${
                            (i % 2) + 1
                        } (Tentative)`,
                        start: nextDate.toISOString(),
                    });
                    nextDate = new Date(nextDate);
                }
                return {
                    events: events,
                    tag: `${game.toLowerCase()}/${type}s`,
                    color: color,
                    textColor: textColor,
                };
            });
        })
        .flat();
    return eventSources;
}

function getColor(game: string) {
    let color;
    let textColor = "white";
    switch (game) {
        case "Genshin":
            color = "rgb(11, 110, 175)";
            break;
        case "HSR":
            color = "rgb(168, 53, 179)";
            break;
        case "WuWa":
            color = "rgb(172, 122, 16)";
            break;
        case "ZZZ":
            color = "rgb(91, 114, 0)";
            break;
        default:
            color = "dodgerblue";
            break;
    }
    return { color, textColor };
}

// TODO: Set manual increment rules for each game once more info is known
function incrementVersion(version: string) {
    const arr = version.split(".");
    let main = parseInt(arr[0]);
    let sub = parseInt(arr[1]);
    if (sub < 8) {
        sub += 1;
    } else {
        main += 1;
        sub = 0;
    }
    return `${main}.${sub}`;
}
