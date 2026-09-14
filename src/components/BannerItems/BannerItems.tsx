import { memo, useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";

// Component imports
import Countdown from "@/components/Countdown";
import InfoAvatar, { renderInfoAvatar } from "@/components/InfoAvatar";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

// Helper imports
import { useGameTag } from "@/context";
import {
    getVersionDates,
    isFutureBanner,
    useBannerData,
} from "@/components/BannerArchive/BannerArchive.utils";
import { range, sortBy } from "@/utils";
import { getContrastText } from "@/utils/getContrastText";
import { createBannerData } from "@/helpers/banners";

// Type imports
import { BannerItemsProps } from "@/components/BannerArchive";
import { BannerOption } from "@/types/banner";

const BannerItems = memo(function BannerItems({
    banner,
    backgroundColor,
    showCountdown = false,
    game,
}: BannerItemsProps) {
    const theme = useTheme();

    const pathname = usePathname();

    const currentGame = useGameTag();
    const gameTag = game ?? currentGame;

    const { lookup, server } = useBannerData();

    const [isPending, startTransition] = useTransition();
    const [bannerData, setBannerData] = useState<BannerOption[]>([]);

    useEffect(() => {
        startTransition(() => {
            setBannerData(
                banner.rateUps
                    .map((item) =>
                        createBannerData({
                            id: typeof item === "number" ? item : undefined,
                            name: `${item}`,
                            lookup,
                        }),
                    )
                    .sort((a, b) => sortBy(a.rarity, b.rarity)),
            );
        });
    }, [banner.rateUps, lookup]);

    const upcoming = isFutureBanner(banner, server, gameTag);

    const { versionStart, versionEnd } = getVersionDates(
        banner,
        server,
        gameTag,
    );

    const textColor = getContrastText(
        theme.text.primary,
        backgroundColor || theme.contentBox.backgroundColor.main,
    );

    const loader = range(banner.rateUps.length).map((i) => (
        <Skeleton
            key={i}
            variant="rounded"
            width={64}
            height={64}
            sx={(theme) => ({
                backgroundColor: theme.background(Number(pathname === "/")),
            })}
        />
    ));

    return (
        <Stack spacing={1}>
            <Grid container spacing={1}>
                {isPending
                    ? loader
                    : bannerData.map((item, index) => (
                          <Box key={index}>
                              {item.name === "TBA" ? (
                                  <InfoAvatar
                                      id={0}
                                      componentID={`-${banner.version}-${index}`}
                                      tag="genshin"
                                      name="TBA"
                                      url="Unknown"
                                      rarity={1}
                                      disableZoomOnHover
                                  />
                              ) : (
                                  renderInfoAvatar({
                                      game: gameTag,
                                      tag: item.category || "characters",
                                      item,
                                      id: `-${banner.version}-${index}`,
                                  })
                              )}
                          </Box>
                      ))}
            </Grid>
            {showCountdown && (
                <Countdown
                    date={upcoming ? versionStart : versionEnd}
                    server={server}
                    startText={upcoming ? "Starts in" : ""}
                    endText={
                        upcoming ? "Banner has started!" : "Banner has ended!"
                    }
                    textColor={textColor}
                />
            )}
        </Stack>
    );
});

export default BannerItems;
