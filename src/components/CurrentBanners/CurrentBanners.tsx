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

// Type imports
import { BannerOption, BannerProps } from "@/types/banner";
import { BannerArchiveProps } from "@/components/BannerArchive";
import { GameData } from "@/types";

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

    const currentCharacterBanners = characterBanners.filter((banner) =>
        isCurrentBanner(banner, server)
    );
    const currentWeaponBanners = weaponBanners.filter((banner) =>
        isCurrentBanner(banner, server)
    );
    const currentChronicledBanners =
        chronicledBanners &&
        chronicledBanners.filter((banner) => isCurrentBanner(banner, server));

    const futureCharacterBanners = characterBanners.filter((banner) =>
        isFutureBanner(banner, server)
    );
    const futureWeaponBanners = weaponBanners.filter((banner) =>
        isFutureBanner(banner, server)
    );
    const futureChronicledBanners =
        chronicledBanners &&
        chronicledBanners.filter((banner) => isFutureBanner(banner, server));

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
            <FlexBox wrap spacing={[2, 8]}>
                {character.length > 0 && (
                    <Stack spacing={1}>
                        <Text weight="highlight">{`Character Banner`}</Text>
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
                        <Text weight="highlight">{`Weapon Banner`}</Text>
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
                            <Box sx={{ maxHeight: "320px", overflowY: "auto" }}>
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
    genshin: "Event Wishes",
    hsr: "Event Warps",
    wuwa: "Convenes",
    zzz: "Signal Searches",
    uma: "Spotlight Scouts",
};
