import { getCharacterImageURLs } from "@/helpers/characterImage";
import { Game, Gender } from "@/types";

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
    if (tag.includes("/characters")) {
        return getCharacterImageURLs({ game, id, gender }).icon;
    }
    return `${tag}/${id}`;
}
