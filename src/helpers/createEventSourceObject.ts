import { UmaBanner } from "types/uma";
import { createUmaVersionInfo, createVersionInfo } from "./createVersionInfo";
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
    showDuration: { [game: string]: boolean };
}) {
    const eventSources: EventSourceObject[] = objectKeys(banners)
        .map((game) => {
            return objectKeys(banners[game]).map((type) => {
                const events: EventObject[] = [];
                const versions =
                    game === "Uma"
                        ? createUmaVersionInfo({
                              banners: banners[game][
                                  type
                              ] as unknown as UmaBanner[],
                              game,
                          })
                        : createVersionInfo({
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
                        end: showDuration[game]
                            ? end.obj.toISOString()
                            : undefined,
                        extendedProps: {
                            tag: game,
                            type: type,
                            version: version.version,
                            subVersion: version.subVersion,
                            currentVersion: isCurrentBanner(start.obj, end.obj),
                            futureVersion: version.futureVersion,
                            start: start.date,
                            end: end.date,
                            rateUps: version.rateUps,
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
        .flat()
        .sort((a, b) => a.tag.localeCompare(b.tag));
    return eventSources;
}
