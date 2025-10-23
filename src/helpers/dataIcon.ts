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
        if (key === "element") {
            src = `genshin/elements/${value}`;
            tooltip = `${value}`;
        }
        if (key === "weapon" || key === "weaponType") {
            src = `genshin/weapons/icons/${value}`;
            tooltip = `${value}`;
        }
        if (key === "subStat") {
            src = `genshin/icons/ascension_stats/${value}`;
            tooltip = `${value}`;
        }
        if (key === "arkhe") {
            src = `genshin/tcg/icons/factions/${value}`;
            tooltip = `Arkhe: ${value}`;
        }
    }
    return { src, tooltip };
}
