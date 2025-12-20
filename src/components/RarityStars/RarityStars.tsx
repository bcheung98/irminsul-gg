// Component imports
import Text from "@/components/Text";

// MUI imports
import { TypographyVariant } from "@mui/material/styles";

// Helper imports
import { range } from "@/utils";
import { useGameTag } from "@/context";
import { useRarityColors } from "@/helpers/rarityColors";

export default function RarityStars({
    rarity = 3,
    star = "★",
    color,
    useRarityColor = false,
    variant = "body1",
}: {
    rarity?: number;
    star?: string;
    color?: string;
    useRarityColor?: boolean;
    variant?: TypographyVariant;
}) {
    const game = useGameTag();

    const rarityColors = useRarityColors()[game || "genshin"];

    return (
        <Text
            component="span"
            variant={variant}
            sx={(theme) => ({
                color: useRarityColor
                    ? rarityColors(rarity)
                    : color || theme.text.star,
                userSelect: "none",
                lineHeight: theme.typography[variant].fontSize,
                fontWeight: theme.font.weight.highlight,
            })}
        >
            {range(rarity).map((_) => star)}
        </Text>
    );
}
