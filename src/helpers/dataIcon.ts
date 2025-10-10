import { InfoBadgeDataKey } from "@/components/InfoBadge/InfoBadge.types";

export function getDataIconURL(
    game: string,
    key: InfoBadgeDataKey,
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
    }
    return { src, tooltip };
}
