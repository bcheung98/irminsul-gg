import versions from "@/data/versions";
import { BaseDataWithRelease, Game, GameNoUma } from "@/types";
import { UmaVersion } from "@/types/version";
import DateObject from "./dates";

// Change to `true` do override user setting for showing unrleased content
const DISABLE_LEAKS_OVERRIDE = true;

export function isUnreleasedContent(version: string, game: GameNoUma) {
    return versions[game].map((v) => v.version).includes(version);
}

export function isUnreleasedContentUma(release: UmaVersion) {
    if (release.global === "") return true;
    const date = new DateObject(release.global);
    return date.checkDate === 1;
}

export function filterUnreleasedContent<T extends BaseDataWithRelease>(
    hideUnreleasedContent = false,
    items: T[],
    game: Game,
    pathname?: string,
) {
    if (pathname !== "calendar") {
        if (game === "uma") {
            if (hideUnreleasedContent) {
                items = items.filter(
                    (item) =>
                        !isUnreleasedContentUma(item.release as UmaVersion),
                );
            }
        } else {
            if (DISABLE_LEAKS_OVERRIDE || hideUnreleasedContent) {
                items = items.filter((item) =>
                    isUnreleasedContent(item.release.version, game),
                );
            }
        }
    }
    return items;
}
