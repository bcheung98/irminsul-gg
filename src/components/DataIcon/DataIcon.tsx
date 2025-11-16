// Component imports
import Image from "../Image";

// MUI imports
import { CSSProperties } from "@mui/material/styles";

// Helper imports
import { getDataIconURL } from "@/helpers/dataIcon";

// Type imports
import { AttributeDataKey, Game } from "@/types";

export interface DataIconProps {
    game: Game;
    property: AttributeDataKey;
    value: string;
    styles: CSSProperties;
}

export default function DataIcon({
    game,
    property,
    value,
    styles,
}: DataIconProps) {
    const { src, tooltip } = getDataIconURL({ game, key: property, value });
    if (!src && !tooltip) return <></>;
    return <Image src={src} tooltip={tooltip} style={styles} />;
}
