import versions from "@/data/versions";

export function isUreleasedContent(version: string, game: string) {
    const tag = game.toLocaleLowerCase();
    if (tag === "uma") return version === "";
    else return versions[tag].map((v) => v.version).includes(version);
}
