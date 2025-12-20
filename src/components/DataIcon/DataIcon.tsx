// Component imports
import Image from "@/components/Image";

// MUI imports
import { CSSProperties } from "@mui/material/styles";

// Helper imports
import { getDataIconURL } from "@/helpers/dataIcon";

// Type imports
import { AttributeDataKey, Game } from "@/types";

export interface DataIconProps {
    game: Game;
    property: AttributeDataKey;
    value: string | number | (string | number)[];
    styles: CSSProperties;
}

export default function DataIcon({
    game,
    property,
    value,
    styles,
}: DataIconProps) {
    if (!Array.isArray(value)) {
        value = [value];
    }
    return value.map((v, i) => {
        const { src, tooltip } = getDataIconURL({
            game,
            key: property,
            value: v,
        });
        if (!src && !tooltip) return null;
        return <Image key={i} src={src} tooltip={tooltip} style={styles} />;
    });
}
