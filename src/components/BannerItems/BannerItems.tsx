import { memo, useEffect, useState, useTransition } from "react";

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
import { createBannerData } from "@/helpers/createBannerData";

// Type imports
import { BannerOption } from "@/types/banner";
import { BannerItemsProps } from "@/components/BannerArchive";

const BannerItems = memo(function BannerItems({
    banner,
    backgroundColor,
    showCountdown = false,
    game,
}: BannerItemsProps) {
    const theme = useTheme();

    if (!game) {
        game = useGameTag();
    }

    const { characters, weapons, server } = useBannerData();

    const [loading, startTransition] = useTransition();
    const [bannerData, setBannerData] = useState<BannerOption[]>([]);
    useEffect(() => {
        startTransition(() => {
            const data = banner.rateUps
                .map((item) =>
                    createBannerData({
                        id: typeof item === "number" ? item : undefined,
                        name: `${item}`,
                        characters,
                        weapons,
                    })
                )
                .sort((a, b) => sortBy(a.rarity, b.rarity));
            setBannerData(data);
        });
    }, []);

    const Loader = range(banner.rateUps.length).map((i) => (
        <Skeleton
            key={i}
            variant="rounded"
            width={64}
            height={64}
            sx={(theme) => ({ backgroundColor: theme.background(0) })}
        />
    ));

    const upcoming = isFutureBanner(banner, server, game);

    const { versionStart, versionEnd } = getVersionDates(banner, server, game);

    const textColor = getContrastText(
        theme.text.primary,
        backgroundColor || theme.contentBox.backgroundColor.main
    );

    return (
        <Stack spacing={1}>
            <Grid container spacing={1}>
                {loading
                    ? Loader
                    : bannerData.map((item, index) => (
                          <Box key={index}>
                              {item.name === "TBA" ? (
                                  <InfoAvatar
                                      id={0}
                                      componentID={`-${banner.version}-${index}`}
                                      tag="_common/images"
                                      name="TBA"
                                      url="Unknown"
                                      rarity={1}
                                      disableZoomOnHover
                                  />
                              ) : (
                                  renderInfoAvatar({
                                      game,
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
                    endText="Banner has ended"
                    textColor={textColor}
                />
            )}
        </Stack>
    );
});

export default BannerItems;
