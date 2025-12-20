import versions from "@/data/versions";
import { BaseDataWithRelease, Game, GameNoUma } from "@/types";
import { UmaVersion } from "@/types/version";
import DateObject from "./dates";

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
    game: Game
) {
    if (hideUnreleasedContent) {
        if (game === "uma") {
            items = items.filter(
                (item) => !isUnreleasedContentUma(item.release as UmaVersion)
            );
        } else {
            items = items.filter((item) =>
                isUnreleasedContent(item.release.version, game)
            );
        }
    }
    return items;
}
