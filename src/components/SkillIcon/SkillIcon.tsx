import { usePathname } from "next/navigation";

// Component imports
import Image from "../Image";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { useTextColor } from "@/helpers/useTextColor";

// Type imports
import { AttributeData } from "@/types/_common";

export default function SkillIcon({
    icon,
    attributes,
    selected,
}: {
    icon: string;
    attributes?: AttributeData;
    selected?: boolean;
}) {
    const theme = useTheme();

    const game = usePathname().split("/")[1];

    const textColor = useTextColor(theme.text);

    return (
        <Image
            src={icon}
            size={48}
            style={{
                padding: "4px",
                backgroundColor: theme.iconBackground.primary,
                borderWidth: selected ? "thick" : "3px",
                borderStyle: selected ? "double" : "solid",
                borderColor: textColor(game, attributes?.element),
                borderRadius: "64px",
                boxShadow: selected
                    ? `0 0 12px 4px ${textColor(game, attributes?.element)}`
                    : "none",
                transition: "box-shadow 250ms",
            }}
            responsive
            responsiveSize={1 / 6}
        />
    );
}
