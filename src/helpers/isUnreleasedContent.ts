import versions from "@/data/versions";
import { Game } from "@/types";

export function isUreleasedContent(version: string, game: Game) {
    if (game === "uma") return version === "";
    else return versions[game].map((v) => v.version).includes(version);
}
