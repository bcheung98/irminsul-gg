// Component imports
import Image from "../Image";

// Type imports
import { CSSProperties } from "@mui/material/styles";
import type { InfoBadgeDataKey } from "../InfoBadge/InfoBadge.types";

export interface DataIconProps {
    game: string;
    property: InfoBadgeDataKey;
    value: string;
    styles: CSSProperties;
}

export default function DataIcon({
    game,
    property,
    value,
    styles,
}: DataIconProps) {
    const { src, tooltip } = getDataIconURL(game, property, value);
    return <Image src={src} tooltip={tooltip} style={styles} />;
}

function getDataIconURL(game: string, key: InfoBadgeDataKey, value: string) {
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
