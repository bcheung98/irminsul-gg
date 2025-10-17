import { AttributeDataKey } from "@/types/_common";

export function getDataIconURL(
    game: string,
    key: AttributeDataKey,
    value = ""
) {
    let src = "";
    let tooltip = "";
    if (game === "genshin") {
        if (key === "element") {
            src = `genshin/elements/${value}`;
            tooltip = value;
        }
        if (key === "weapon" || key === "weaponType") {
            src = `genshin/weapons/icons/${value}`;
            tooltip = value;
        }
        if (key === "subStat") {
            src = `genshin/icons/ascension_stats/${value}`;
            tooltip = value;
        }
        if (key === "arkhe") {
            src = `genshin/tcg/icons/factions/${value}`;
            tooltip = value;
        }
    }
    return { src, tooltip };
}
