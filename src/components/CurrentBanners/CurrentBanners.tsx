"use client";

// Component imports
import BannerItems from "@/components/BannerItems";
import ContentBox from "@/components/ContentBox";
import FlexBox from "@/components/FlexBox";
import Dropdown from "@/components/Dropdown";
import Text from "@/components/Text";

// MUI imports
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useServerStore } from "@/stores";
import {
    BannerDataContext,
    isCurrentBanner,
    isFutureBanner,
} from "@/components/BannerArchive/BannerArchive.utils";
import { categories } from "@/data/categories";

// Type imports
import { Game, GameData } from "@/types";
import { Banner, BannerOption, BannerProps } from "@/types/banner";
import { BannerArchiveProps } from "@/components/BannerArchive";
import { VersionHighlightsProps } from "@/components/VersionHighlights/VersionHighlights.types";

export default function CurrentBanners<
    T extends BannerOption,
    U extends BannerOption
>({ characters, weapons, banners }: BannerArchiveProps<T, U>) {
    const {
        character: characterBanners,
        weapon: weaponBanners,
        chronicled: chronicledBanners,
    } = banners;

    const game = useGameTag();
    const server = useStore(useServerStore, (state) => state[game]) || "NA";

    function filterUmaBanner(banner: Banner) {
        if (game === "uma" && server === "NA") return banner.start !== "";
        else return banner;
    }

    function filterCurrentBanners(banners: Banner[]) {
        return banners
            .filter(filterUmaBanner)
            .filter((banner) => isCurrentBanner(banner, server, game));
    }

    function filterFutureBanners(banners: Banner[]) {
        return banners
            .filter(filterUmaBanner)
            .filter((banner) => isFutureBanner(banner, server, game));
    }

    const currentCharacterBanners = filterCurrentBanners(characterBanners);
    const currentWeaponBanners = filterCurrentBanners(weaponBanners);
    const currentChronicledBanners =
        chronicledBanners && filterCurrentBanners(chronicledBanners);

    const futureCharacterBanners = filterFutureBanners(characterBanners);
    const futureWeaponBanners = filterFutureBanners(weaponBanners);
    const futureChronicledBanners =
        chronicledBanners && filterFutureBanners(chronicledBanners);

    const activeBanners =
        [
            ...currentCharacterBanners,
            ...currentWeaponBanners,
            ...(currentChronicledBanners || []),
        ].length > 0;
    const futureBanners =
        [
            ...futureCharacterBanners,
            ...futureWeaponBanners,
            ...(futureChronicledBanners || []),
        ].length > 0;

    const bannerItemsParams = {
        characters,
        weapons,
        showCountdown: true,
    };

    function Banners({ character, weapon, chronicled }: BannerProps) {
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
                                    banner={banner}
                                    {...bannerItemsParams}
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
                                game === "uma" ? "supports" : "weapons"
                            )}
                        </Text>
                        <Stack spacing={2}>
                            {weapon.map((banner) => (
                                <BannerItems
                                    key={banner.id}
                                    banner={banner}
                                    {...bannerItemsParams}
                                />
                            ))}
                        </Stack>
                    </Stack>
                )}
                {chronicled && chronicled.length > 0 && (
                    <Stack spacing={1}>
                        <Text>{`Chronicled Wish Banner`}</Text>
                        <Stack spacing={2}>
                            {chronicled.map((banner) => (
                                <BannerItems
                                    key={banner.id}
                                    banner={banner}
                                    {...bannerItemsParams}
                                />
                            ))}
                        </Stack>
                    </Stack>
                )}
            </FlexBox>
        );
    }

    return (
        <BannerDataContext value={{ characters, weapons, server }}>
            <ContentBox header={title[game]}>
                <Stack spacing={2} divider={<Divider />}>
                    {activeBanners && (
                        <Dropdown
                            title={`Current Banners`}
                            textVariant="h6"
                            contentPadding={"8px 0"}
                            reverse
                            defaultOpen
                        >
                            <Banners
                                character={currentCharacterBanners}
                                weapon={currentWeaponBanners}
                                chronicled={currentChronicledBanners}
                            />
                        </Dropdown>
                    )}
                    {futureBanners && (
                        <Dropdown
                            title={`Upcoming Banners`}
                            textVariant="h6"
                            contentPadding={"8px 0"}
                            reverse
                            defaultOpen={!activeBanners}
                        >
                            <Box
                                sx={{
                                    maxHeight: "350px",
                                    overflowY: "auto",
                                    scrollbarWidth: "thin",
                                }}
                            >
                                <Banners
                                    character={futureCharacterBanners}
                                    weapon={futureWeaponBanners}
                                    chronicled={futureChronicledBanners}
                                />
                            </Box>
                        </Dropdown>
                    )}
                </Stack>
            </ContentBox>
        </BannerDataContext>
    );
}

const title: GameData<string> = {
    genshin: "Wishes",
    hsr: "Warps",
    wuwa: "Convenes",
    zzz: "Signal Searches",
    uma: "Spotlight Scouts",
};

function bannerTitle(game: Game, tag: keyof VersionHighlightsProps) {
    return `${categories[`${game}/${tag}`].slice(0, -1)} Banner`;
}
