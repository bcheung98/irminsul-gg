// Component imports
import Image from "../Image";

// MUI imports
import { CSSProperties } from "@mui/material/styles";

// Helper imports
import { getDataIconURL } from "@/helpers/dataIcon";

// Type imports
import { AttributeDataKey } from "@/types/_common";

export interface DataIconProps {
    game: string;
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
    const { src, tooltip } = getDataIconURL(game, property, value);
    return <Image src={src} tooltip={tooltip} style={styles} />;
}
