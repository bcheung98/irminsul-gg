"use client";

// Component imports
import ContentBox from "@/components/ContentBox";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import Countdown from "@/components/Countdown";
import { renderInfoAvatar } from "@/components/InfoAvatar";

// MUI imports
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// Helper imports
import { useGameTag } from "@/context";
import { createBannerData } from "@/helpers/createBannerData";
import DateObject from "@/helpers/dates";

// Type imports
import { Banner, BannerOption, BannerProps } from "@/types/banner";

export default function CurrentBanners<
    T extends BannerOption,
    U extends BannerOption
>({
    characters,
    weapons,
    banners,
}: {
    characters: T[];
    weapons: U[];
    banners: BannerProps;
}) {
    const game = useGameTag();
    const {
        character: characterBanners,
        weapon: weaponBanners,
        chronicled: chronicledBanners,
    } = banners;

    function filterBanner(banner: Banner) {
        const start = new DateObject(banner.start).createDateObject();
        const end = new DateObject(banner.end).createDateObject();
        return DateObject.inRange(start, end);
    }

    const currentCharacterBanners = characterBanners.filter(filterBanner);
    const currentWeaponBanners = weaponBanners.filter(filterBanner);
    const currentChronicledBanners =
        chronicledBanners && chronicledBanners.filter(filterBanner);

    const activeBanners =
        [
            ...currentCharacterBanners,
            ...currentWeaponBanners,
            ...(currentChronicledBanners || []),
        ].length > 0;

    function renderBanner(banner: Banner, tag: "character" | "weapon") {
        const bannerData = banner.rateUps.map((item) =>
            createBannerData({ name: `${item}`, tag, characters, weapons })
        );
        return (
            <Stack spacing={1}>
                <Grid container spacing={1}>
                    {bannerData.map((item, index) => (
                        <Box key={index}>
                            {renderInfoAvatar({
                                game,
                                tag: `${tag}s`,
                                item,
                                id: `-${banner.version}-${index}`,
                            })}
                        </Box>
                    ))}
                </Grid>
                <Countdown date={banner.end} endText="Banner has ended" />
            </Stack>
        );
    }

    return (
        <ContentBox header="Current Banners">
            {activeBanners ? (
                <FlexBox wrap spacing={[2, 8]}>
                    {currentCharacterBanners.length > 0 && (
                        <Stack spacing={1}>
                            <Text>{`Character Banner`}</Text>
                            <Stack spacing={1}>
                                {currentCharacterBanners.map(
                                    (banner, index) => (
                                        <Box key={index}>
                                            {renderBanner(banner, "character")}
                                        </Box>
                                    )
                                )}
                            </Stack>
                        </Stack>
                    )}
                    {currentWeaponBanners.length > 0 && (
                        <Stack spacing={1}>
                            <Text>{`Weapon Banner`}</Text>
                            <Stack spacing={1}>
                                {currentWeaponBanners.map((banner, index) => (
                                    <Box key={index}>
                                        {renderBanner(banner, "weapon")}
                                    </Box>
                                ))}
                            </Stack>
                        </Stack>
                    )}
                </FlexBox>
            ) : (
                <Text>There are no active banners.</Text>
            )}
        </ContentBox>
    );
}
