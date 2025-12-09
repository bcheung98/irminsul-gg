import { sonataEffects } from "@/data/wuwa/sonataEffects";
import { isUnreleasedContent } from "./isUnreleasedContent";
import { AttributeDataKey, Game } from "@/types";

interface Props {
    game: Game;
    key: AttributeDataKey;
    value?: string | number | (string | number)[];
}

export function getDataIconURL({ game, key, value }: Props) {
    let src = "";
    let tooltip = "";
    if (game === "genshin") {
        if (key === "element" && value) {
            src = `genshin/elements/${value}`;
            tooltip = `${value}`;
        }
        if (key === "weaponType" && value) {
            src = `genshin/skills/Attack_${value}`;
            tooltip = `${value}`;
        }
        if (key === "subStat" && value) {
            src = `genshin/icons/stat-icons/${value}`;
            tooltip = `${value}`;
        }
        if (key === "arkhe") {
            src = `genshin/tcg/icons/factions/${value}`;
            tooltip = `${value}`;
        }
    }
    if (game === "hsr") {
        if (key === "element" && value) {
            src = `hsr/elements/${value}`;
            tooltip = `${value}`;
        }
        if (key === "weaponType" && value) {
            src = `hsr/paths/${value}`;
            tooltip = `${value}`;
        }
    }
    if (game === "wuwa") {
        if (key === "element" && value) {
            src = `wuwa/icons/elements/${value}`;
            tooltip = `${value}`;
        }
        if (key === "weaponType" && value) {
            src = `wuwa/skills/Attack_${value}`;
            tooltip = `${value}`;
        }
        if (key === "sonata" && value) {
            src = `wuwa/sonata/${value}`;
            tooltip = `${
                sonataEffects
                    .filter((sonata) =>
                        isUnreleasedContent(sonata.release.version, "wuwa")
                    )
                    .find((sonata) => sonata.id === value)?.displayName
            }`;
        }
    }
    return { src, tooltip };
}
