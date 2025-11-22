import versions from "@/data/versions";
import { BaseDataWithRelease, Game } from "@/types";

export function isUnreleasedContent(version: string, game: Game) {
    if (game === "uma") return version === "";
    else return versions[game].map((v) => v.version).includes(version);
}

export function filterUnreleasedContent<T extends BaseDataWithRelease>(
    hideUnreleasedContent = false,
    items: T[],
    game: Game
) {
    if (hideUnreleasedContent) {
        items = items.filter((item) =>
            isUnreleasedContent(item.release.version, game)
        );
    }
    return items;
}
