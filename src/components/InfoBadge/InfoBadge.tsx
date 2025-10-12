// Component imports
import DataIcon from "../DataIcon/DataIcon";

// MUI imports
import Stack from "@mui/material/Stack";

// Type imports
import { InfoBadgeProps } from "./InfoBadge.types";
import { AttributeDataKey } from "@/types/_common";

export default function InfoBadge({
    data,
    game,
    styles,
    spacing = 0,
    orientation = "column",
}: InfoBadgeProps) {
    return (
        <Stack direction={orientation} spacing={spacing} sx={styles.root}>
            {Object.entries(data).map(([key, value]) => (
                <DataIcon
                    key={key}
                    game={game}
                    property={key as AttributeDataKey}
                    value={value}
                    styles={styles.icon}
                />
            ))}
        </Stack>
    );
}
