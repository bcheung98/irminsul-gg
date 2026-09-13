// Component imports
import BannerListRow from "@/components/BannerList/BannerListRow";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

// Helper imports
import { sortBanners } from "@/helpers/filterBanners";
import { useGameTag } from "@/context";
import { useServerStore } from "@/stores";

// Type imports
import { BannerProps, BannerType } from "@/types/banner";

export interface BannerListProps {
    activeBanners: BannerType[];
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
    const chronicledActive = activeBanners.includes("chronicled");

    const bannerOrder: BannerType[] = ["character", "weapon", "chronicled"];

    return (
        <Grid container spacing={2}>
            {bannerOrder.map((type) => {
                if (!activeBanners.includes(type)) return null;
                const bannerList = banners[type] ?? [];
                if (!bannerList.length) return null;
                return (
                    <Grid
                        key={type}
                        size={{
                            xs: 12,
                            lg: chronicledActive ? 12 : 6,
                        }}
                    >
                        <Stack spacing={1}>
                            {bannerList.map((banner) => (
                                <BannerListRow
                                    key={banner.id}
                                    banner={banner}
                                />
                            ))}
                        </Stack>
                    </Grid>
                );
            })}
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

    const bannerList = sortBanners(
        activeBanners.flatMap((type) => banners[type] ?? []),
        game,
        server,
        reverse,
    );

    return (
        <Stack spacing={1}>
            {bannerList.map((banner) => (
                <BannerListRow key={banner.id} banner={banner} />
            ))}
        </Stack>
    );
}
