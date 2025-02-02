import { createVersionInfo } from "./createVersionInfo";
import { createDateObject, isCurrentBanner } from "./dates";
import { objectKeys } from "./utils";
import {
    BannerList,
    EventObject,
    EventSourceObject,
    WebsiteColorInfo,
} from "types/common";

export function createEventSourceObject({
    banners,
    colors,
    showDuration,
}: {
    banners: BannerList;
    colors: WebsiteColorInfo;
    showDuration: boolean;
}) {
    const eventSources: EventSourceObject[] = objectKeys(banners)
        .map((game) => {
            return objectKeys(banners[game]).map((type) => {
                const events: EventObject[] = [];
                const versions = createVersionInfo({
                    banners: banners[game][type],
                    game,
                });
                versions.forEach((version) => {
                    const start = createDateObject({
                        date: version.start,
                    });
                    const end = createDateObject({
                        date: version.end,
                    });
                    events.push({
                        title: `${game} ${version.subVersion}`,
                        start: start.obj.toISOString(),
                        end: showDuration ? end.obj.toISOString() : undefined,
                        extendedProps: {
                            tag: game,
                            version: version.version,
                            subVersion: version.subVersion,
                            currentVersion: isCurrentBanner(start.obj, end.obj),
                            futureVersion: version.futureVersion,
                            start: start.date,
                            end: end.date,
                            characters: version.characters,
                            color: colors[game] || "dodgerblue",
                        },
                    });
                });
                return {
                    events: events,
                    tag: `${game.toLowerCase()}/${type}s`,
                };
            });
        })
        .flat();
    return eventSources;
}
