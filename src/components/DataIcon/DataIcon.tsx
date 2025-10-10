// Component imports
import Image from "../Image";

// MUI imports
import { CSSProperties } from "@mui/material/styles";

// Helper imports
import { getDataIconURL } from "@/helpers/dataIcon";

// Type imports
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
