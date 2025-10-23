// Component imports
import Text from "@/components/Text";

// MUI imports
import { TypographyVariant } from "@mui/material/styles";

// Helper imports
import { range } from "@/utils";

export default function RarityStars({
    rarity = 3,
    star = "★",
    color,
    variant = "body1",
}: {
    rarity?: number;
    star?: string;
    color?: string;
    variant?: TypographyVariant;
}) {
    return (
        <Text
            component="span"
            variant={variant}
            sx={(theme) => ({
                color: color || theme.text.star,
                userSelect: "none",
                lineHeight: theme.typography[variant].fontSize,
            })}
        >
            {range(rarity).map((_) => star)}
        </Text>
    );
}
