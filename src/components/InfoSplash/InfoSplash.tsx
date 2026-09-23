// Component imports
import Image from "@/components/Image";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Helper imports
import { useGameTag } from "@/context";
import {
    useBackgroundRarityColors,
    useRarityColors,
} from "@/helpers/rarityColors";

interface InfoSplashProps {
    src: string;
    rarity?: number;
    width?: string | number;
    height?: string | number;
    padding?: string | number;
    maxWidth?: string | number;
    backgroundColor?: string;
    hideBorder?: boolean;
}

export default function InfoSplash({
    src,
    rarity,
    width = "96px",
    height,
    padding = 0,
    maxWidth = "256px",
    backgroundColor,
    hideBorder = false,
}: InfoSplashProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const game = useGameTag();

    const rarityColors = useRarityColors()[game];
    const backgroundColors = useBackgroundRarityColors()[game];

    return (
        <Image
            src={src}
            style={{
                width: matches ? "100%" : width,
                maxWidth,
                height: height ? (matches ? "100%" : height) : "auto",
                padding,
                backgroundColor: backgroundColor ?? theme.background(1),
                backgroundImage: rarity
                    ? `url(https://assets.irminsul.gg/v2/_common/rarity-background/${rarity}.png)`
                    : "none",
                backgroundSize: "contain",
                backgroundRepeat: "repeat",
                borderRadius: theme.contentBox.border.radius * 4,
                outline:
                    !hideBorder && !rarity
                        ? `1px solid ${theme.border.color.primary}`
                        : "none",
                border:
                    !hideBorder && rarity
                        ? `2px solid ${rarityColors(rarity)}`
                        : "none",
                boxShadow: rarity
                    ? `inset 0 0 24px 16px ${backgroundColors(rarity)}`
                    : "none",
            }}
            fadeOnLoad={matches}
        />
    );
}
