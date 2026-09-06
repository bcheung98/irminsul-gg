// Component imports
import BannerItems from "@/components/BannerItems";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";

// MUI imports
import Stack from "@mui/material/Stack";

// Helper imports
import { categories } from "@/data/categories";

// Type imports
import { Game } from "@/types";
import { BannerProps } from "@/types/banner";
import { VersionHighlightsProps } from "@/components/VersionHighlights/VersionHighlights.types";

interface Props extends BannerProps {
    game: Game;
}

export default function CurrentBannersContent({
    game,
    character,
    weapon,
    chronicled,
}: Props) {
    return (
        <FlexBox wrap spacing={[2, 8]} sx={{ alignItems: "flex-start" }}>
            {character.length > 0 && (
                <Stack spacing={1} sx={{ minWidth: "192px" }}>
                    <Text weight="highlight">
                        {bannerTitle(game, "characters")}
                    </Text>
                    <Stack spacing={2}>
                        {character.map((banner) => (
                            <BannerItems
                                key={banner.id}
                                game={game}
                                banner={banner}
                                showCountdown
                            />
                        ))}
                    </Stack>
                </Stack>
            )}
            {weapon.length > 0 && (
                <Stack spacing={1}>
                    <Text weight="highlight">
                        {bannerTitle(
                            game,
                            game === "uma" ? "supports" : "weapons",
                        )}
                    </Text>
                    <Stack spacing={2}>
                        {weapon.map((banner) => (
                            <BannerItems
                                key={banner.id}
                                game={game}
                                banner={banner}
                                showCountdown
                            />
                        ))}
                    </Stack>
                </Stack>
            )}
            {chronicled && chronicled.length > 0 && (
                <Stack spacing={1}>
                    <Text weight="highlight">{`Chronicled Wish`}</Text>
                    <Stack spacing={2}>
                        {chronicled.map((banner) => (
                            <BannerItems
                                key={banner.id}
                                game={game}
                                banner={banner}
                                showCountdown
                            />
                        ))}
                    </Stack>
                </Stack>
            )}
        </FlexBox>
    );
}

function bannerTitle(game: Game, tag: keyof VersionHighlightsProps) {
    return `${categories[`${game}/${tag}`].slice(0, -1)} Banner`;
}
