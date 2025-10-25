// Component imports
import Image from "../Image";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { useGameTag } from "@/context";
import { useTextColor } from "@/helpers/styles";

// Type imports
import { AttributeData } from "@/types";

export default function SkillIcon({
    icon,
    attributes,
    selected,
    size = 48,
    responsiveSize = 1 / 6,
    borderWidth = "2px",
}: {
    icon: string;
    attributes?: AttributeData;
    selected?: boolean;
    size?: number;
    responsiveSize?: number;
    borderWidth?: string;
}) {
    const theme = useTheme();

    const game = useGameTag();

    const textColor = useTextColor(theme.text);

    return (
        <Image
            src={icon}
            size={size}
            style={{
                padding: "4px",
                backgroundColor: theme.iconBackground.primary,
                borderWidth: selected ? "thick" : borderWidth,
                borderStyle: selected ? "double" : "solid",
                borderColor: textColor(game, attributes?.element),
                borderRadius: "64px",
                boxShadow: selected
                    ? `0 0 12px 4px ${textColor(game, attributes?.element)}`
                    : "none",
                transition: "box-shadow 250ms",
            }}
            responsive
            responsiveSize={responsiveSize}
        />
    );
}
