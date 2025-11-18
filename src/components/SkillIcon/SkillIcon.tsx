// Component imports
import Image from "@/components/Image";

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
    padding = "4px",
    backgroundColor,
    borderWidth = "2px",
    borderRadius = "64px",
}: {
    icon: string;
    attributes?: AttributeData;
    selected?: boolean;
    size?: number;
    responsiveSize?: number;
    padding?: string | number;
    backgroundColor?: string;
    borderWidth?: string | number;
    borderRadius?: string | number;
}) {
    const theme = useTheme();

    const game = useGameTag();

    const color =
        useTextColor(theme.text)(game, attributes?.element) ||
        theme.border.color.primary;

    return (
        <Image
            src={icon}
            size={size}
            style={{
                padding,
                backgroundColor:
                    backgroundColor || theme.iconBackground.primary,
                borderWidth: selected ? "thick" : borderWidth,
                borderStyle: selected ? "double" : "solid",
                borderColor: color,
                borderRadius,
                boxShadow: selected ? `0 0 12px 4px ${color}` : "none",
                transition: "box-shadow 250ms",
            }}
            responsive
            responsiveSize={responsiveSize}
        />
    );
}
