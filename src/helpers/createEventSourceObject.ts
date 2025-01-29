import { createVersionInfo } from "./createVersionInfo";
import { createDateObject } from "./dates";
import { objectKeys } from "./utils";
import {
    BannerList,
    EventObject,
    EventSourceObject,
    VersionInfo,
    WebsiteColorInfo,
} from "types/common";

export function createEventSourceObject(
    banners: BannerList,
    colors: WebsiteColorInfo
) {
    const eventSources: EventSourceObject[] = objectKeys(banners)
        .map((game) => {
            return objectKeys(banners[game]).map((type) => {
                const events: EventObject[] = [];
                const color = colors[game] || "dodgerblue";
                const versions = createVersionInfo({
                    banners: banners[game][type],
                    game,
                });
                versions.forEach((version) => {
                    events.push({
                        tag: game,
                        title: formatVersionTitle(game, version),
                        start: createDateObject({
                            date: version.start,
                        }).obj.toISOString(),
                        // end: createDateObject({
                        //     date: version.end,
                        // }).obj.toISOString(),
                        extendedProps: {
                            characters: version.characters,
                        },
                    });
                });
                return {
                    events: events,
                    tag: `${game.toLowerCase()}/${type}s`,
                    color: color,
                    textColor: `#fff`,
                };
            });
        })
        .flat();
    return eventSources;
}

function formatVersionTitle(game: string, version: VersionInfo) {
    let title = `${game} ${version.version} Phase ${
        version.subVersion.split(".").slice(-1)[0]
    }`;
    if (version.futureVersion) {
        title += ` (Tentative)`;
    }
    return title;
}
