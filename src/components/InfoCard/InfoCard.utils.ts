import { getCharacterImageURLs } from "@/helpers/characterImage";
import type { Game, Gender } from "@/types";

const CHARACTER_TAGS = new Set([
    "characters",
    "resonators",
    "agents",
    "operators",
    "espers",
]);

export function getImageURL({
    game,
    tag,
    id,
    gender,
    url,
}: {
    game: Game;
    tag: string;
    id: number;
    gender: Gender;
    url?: string;
}) {
    if (url) return `${tag}/${url}`;
    if (CHARACTER_TAGS.has(tag.split("/")[1])) {
        return getCharacterImageURLs({ game, id, gender }).icon;
    }
    return `${tag}/${id}`;
}
