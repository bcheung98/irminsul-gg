// Component imports
import BannerListRow from "@/components/BannerList/BannerListRow";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

// Type imports
import { ActiveBanners, Banner, BannerProps, BannerType } from "@/types/banner";
import { sortBanners } from "@/helpers/filterBanners";
import { useGameTag } from "@/context";
import { useServerStore } from "@/stores";

export interface BannerListProps {
    activeBanners: ActiveBanners;
    banners: BannerProps;
    reverse?: boolean;
}

export default function BannerList(props: BannerListProps) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("lg"));
    return matches ? (
        <BannerListDesktop {...props} />
    ) : (
        <BannerListMobile {...props} />
    );
}

function BannerListDesktop({ activeBanners, banners }: BannerListProps) {
    const { character, weapon, chronicled = [] } = banners;

    const gridSize = { xs: 12, lg: !activeBanners.chronicled ? 6 : 12 };

    return (
        <Grid
            container
            spacing={2}
            sx={{ display: { xs: "none", lg: "flex" } }}
        >
            <Grid
                size={gridSize}
                sx={{
                    display:
                        activeBanners.character && character.length > 0
                            ? "block"
                            : "none",
                }}
            >
                <Stack spacing={1}>
                    {character.map((banner) => (
                        <BannerListRow key={banner.id} banner={banner} />
                    ))}
                </Stack>
            </Grid>
            <Grid
                size={gridSize}
                sx={{
                    display:
                        activeBanners.weapon && weapon.length > 0
                            ? "block"
                            : "none",
                }}
            >
                <Stack spacing={1}>
                    {weapon.map((banner) => (
                        <BannerListRow key={banner.id} banner={banner} />
                    ))}
                </Stack>
            </Grid>
            <Grid
                size={12}
                sx={{
                    display:
                        activeBanners.chronicled && chronicled.length > 0
                            ? "block"
                            : "none",
                }}
            >
                <Stack spacing={1}>
                    {chronicled.map((banner) => (
                        <BannerListRow key={banner.id} banner={banner} />
                    ))}
                </Stack>
            </Grid>
        </Grid>
    );
}

function BannerListMobile({
    activeBanners,
    banners,
    reverse = false,
}: BannerListProps) {
    const game = useGameTag();
    const server = useServerStore()[game];

    let bannerList: Banner[] = [];
    Object.entries(banners).forEach(
        ([key, value]) =>
            activeBanners[key as BannerType] && bannerList.push(value)
    );
    bannerList = sortBanners(bannerList.flat(), game, server, reverse);

    return (
        <Stack spacing={1} sx={{ display: { xs: "flex", lg: "none" } }}>
            {bannerList.map((banner) => (
                <BannerListRow key={banner.id} banner={banner} />
            ))}
        </Stack>
    );
}
