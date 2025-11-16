import { AttributeDataKey, Game } from "@/types";

interface Props {
    game: Game;
    key: AttributeDataKey;
    value?: string | number;
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
            src = `genshin/weapons/icons/${value}`;
            tooltip = `${value}`;
        }
        if (key === "subStat" && value) {
            src = `genshin/icons/ascension_stats/${value}`;
            tooltip = `${value}`;
        }
        if (key === "arkhe") {
            src = `genshin/tcg/icons/factions/${value}`;
            tooltip = `${value}`;
        }
    }
    return { src, tooltip };
}
