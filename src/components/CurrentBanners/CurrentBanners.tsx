"use client";

// Component imports
import BannerItems from "@/components/BannerItems";
import ContentBox from "@/components/ContentBox";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";

// MUI imports
import Stack from "@mui/material/Stack";

// Helper imports
import {
    isCurrentBanner,
    BannerCharactersContext,
    BannerWeaponsContext,
} from "@/components/BannerArchive/BannerArchive.utils";

// Type imports
import { BannerOption } from "@/types/banner";
import { BannerArchiveProps } from "@/components/BannerArchive";

export default function CurrentBanners<
    T extends BannerOption,
    U extends BannerOption
>({ characters, weapons, banners }: BannerArchiveProps<T, U>) {
    const {
        character: characterBanners,
        weapon: weaponBanners,
        chronicled: chronicledBanners,
    } = banners;

    const currentCharacterBanners = characterBanners.filter(isCurrentBanner);
    const currentWeaponBanners = weaponBanners.filter(isCurrentBanner);
    const currentChronicledBanners =
        chronicledBanners && chronicledBanners.filter(isCurrentBanner);

    const activeBanners =
        [
            ...currentCharacterBanners,
            ...currentWeaponBanners,
            ...(currentChronicledBanners || []),
        ].length > 0;

    const bannerItemsParams = {
        characters,
        weapons,
        showCountdown: true,
    };

    return (
        <BannerCharactersContext value={characters}>
            <BannerWeaponsContext value={weapons}>
                <ContentBox header="Current Banners">
                    {activeBanners ? (
                        <FlexBox wrap spacing={[2, 8]}>
                            {currentCharacterBanners.length > 0 && (
                                <Stack spacing={1}>
                                    <Text>{`Character Banner`}</Text>
                                    <Stack spacing={1}>
                                        {currentCharacterBanners.map(
                                            (banner) => (
                                                <BannerItems
                                                    key={banner.id}
                                                    banner={banner}
                                                    {...bannerItemsParams}
                                                />
                                            )
                                        )}
                                    </Stack>
                                </Stack>
                            )}
                            {currentWeaponBanners.length > 0 && (
                                <Stack spacing={1}>
                                    <Text>{`Weapon Banner`}</Text>
                                    <Stack spacing={1}>
                                        {currentWeaponBanners.map((banner) => (
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
                    ) : (
                        <Text>There are no active banners.</Text>
                    )}
                </ContentBox>
            </BannerWeaponsContext>
        </BannerCharactersContext>
    );
}
