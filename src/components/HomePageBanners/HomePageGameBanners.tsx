import { useMemo } from "react";

// Component imports
import TextLabel from "@/components/TextLabel";
import Image from "@/components/Image";
import InfoButton from "@/components/InfoButton";
import CurrentBannersContent from "@/components/CurrentBanners/CurrentBannersContent";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";

// Helper imports
import { useServerStore } from "@/stores";
import { BannerDataContext } from "@/components/BannerArchive/BannerArchive.utils";
import { getBannerGroups } from "@/helpers/filterBanners";
import { createBannerLookup } from "@/helpers/banners";

// Type imports
import type { Banner, BannerOption } from "@/types/banner";
import type { SearchResult } from "@/components/SiteSearch";
import type { GameInfo } from "@/types";

export default function HomePageGameBanners(props: {
    game: GameInfo;
    banners: Record<string, Banner[]>;
    characters: SearchResult[];
    weapons: SearchResult[];
}) {
    const theme = useTheme();

    const game = props.game;
    const server = useServerStore()[game.tag];

    const banners = {
        character: props.banners[`${game.tag}/characters`] || [],
        weapon: props.banners[`${game.tag}/weapons`] || [],
        chronicled: props.banners[`${game.tag}/chronicled`] || [],
    };

    const {
        currentCharacterBanners,
        currentWeaponBanners,
        currentChronicledBanners,
        activeBanners,
    } = getBannerGroups(game.tag, server, banners);

    const characters = props.characters
        .filter((item) => item.category.startsWith(game.tag))
        .map((item) => ({
            ...item,
            category: "characters",
            url: item.url ? `${item.id}` : "",
        })) as BannerOption[];
    const weapons = props.weapons
        .filter((item) => item.category.startsWith(game.tag))
        .map((item) => ({
            ...item,
            category: "weapons",
            url: item.url ? `${item.id}` : "",
        })) as BannerOption[];

    const loaded = characters.length > 0 && weapons.length > 0;

    const lookup = useMemo(
        () => createBannerLookup(characters, weapons),
        [characters, weapons],
    );

    return (
        <Card
            sx={{
                p: loaded ? 2 : 0,
                backgroundColor: theme.background(0),
                borderRadius: theme.contentBox.border.radius,
            }}
        >
            {loaded ? (
                <BannerDataContext value={{ lookup, server }}>
                    <Stack
                        spacing={1}
                        divider={<Divider />}
                        sx={{ textAlign: "left" }}
                    >
                        <TextLabel
                            icon={`${game.tag}/_common/Icon`}
                            iconProps={{ size: 32 }}
                            title={game.name}
                            spacing={2}
                        />
                        <Stack spacing={2}>
                            <div style={{ minHeight: "128px" }}>
                                {activeBanners ? (
                                    <CurrentBannersContent
                                        game={game.tag}
                                        character={currentCharacterBanners}
                                        weapon={currentWeaponBanners}
                                        chronicled={currentChronicledBanners}
                                    />
                                ) : (
                                    <Stack>
                                        <TextLabel title="No active banners" />
                                        <Image
                                            src={`${game.tag}/emotes/error1`}
                                            alt="No banners"
                                            size={96}
                                        />
                                    </Stack>
                                )}
                            </div>
                            <InfoButton
                                game={game.tag}
                                href={`/${game.tag}/banners`}
                                title={`View all ${game.shortName} Banners`}
                            />
                        </Stack>
                    </Stack>
                </BannerDataContext>
            ) : (
                <Skeleton
                    variant="rounded"
                    height="253px"
                    sx={{ backgroundColor: theme.background(1, "light") }}
                />
            )}
        </Card>
    );
}
