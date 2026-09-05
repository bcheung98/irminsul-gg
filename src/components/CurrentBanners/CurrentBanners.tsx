"use client";

// Component imports
import ContentBox from "@/components/ContentBox";
import Dropdown from "@/components/Dropdown";
import CurrentBannersContent from "./CurrentBannersContent";

// MUI imports
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useServerStore } from "@/stores";
import { BannerDataContext } from "@/components/BannerArchive/BannerArchive.utils";
import { getBannerGroups } from "@/helpers/filterBanners";

// Type imports
import { GameData } from "@/types";
import { BannerOption } from "@/types/banner";
import { BannerArchiveProps } from "@/components/BannerArchive";

export default function CurrentBanners<
    T extends BannerOption,
    U extends BannerOption,
>({ characters, weapons, banners }: BannerArchiveProps<T, U>) {
    const game = useGameTag();
    const server = useStore(useServerStore, (state) => state[game]) || "NA";

    const {
        currentCharacterBanners,
        currentWeaponBanners,
        currentChronicledBanners,
        futureCharacterBanners,
        futureWeaponBanners,
        futureChronicledBanners,
        activeBanners,
        futureBanners,
    } = getBannerGroups(game, server, banners);

    return (
        <BannerDataContext value={{ characters, weapons, server }}>
            <ContentBox header={bannerTitle[game]}>
                <Stack spacing={2} divider={<Divider />}>
                    {activeBanners && (
                        <Dropdown
                            title={`Current Banners`}
                            textVariant="h6"
                            contentPadding={"8px 0"}
                            reverse
                            defaultOpen
                        >
                            <CurrentBannersContent
                                game={game}
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
                                    maxHeight: "340px",
                                    overflowY: "auto",
                                    scrollbarWidth: "thin",
                                }}
                            >
                                <CurrentBannersContent
                                    game={game}
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

export const bannerTitle: GameData<string> = {
    genshin: "Wishes",
    hsr: "Warps",
    wuwa: "Convenes",
    zzz: "Signal Searches",
    uma: "Spotlight Scouts",
    endfield: "Headhunts",
    nte: "Scarborough Fair",
};
