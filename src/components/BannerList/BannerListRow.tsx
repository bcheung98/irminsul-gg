import { memo } from "react";

// Component imports
import Text from "@/components/Text";
import BannerItems from "@/components/BannerItems";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import {
    getBannerLabel,
    isCurrentBanner,
    isFutureBanner,
    useBannerData,
} from "../BannerArchive/BannerArchive.utils";
import { getContrastText } from "@/utils/getContrastText";

// Type imports
import { BannerListRowProps } from "../BannerArchive/BannerArchive.types";

const BannerListRow = memo(function BannerListRow({
    banner,
}: BannerListRowProps) {
    const theme = useTheme();

    const { server } = useBannerData();

    const current = isCurrentBanner(banner, server);
    const upcoming = isFutureBanner(banner, server);

    const backgroundColor = current
        ? theme.palette.info.dark
        : theme.contentBox.backgroundColor.main;

    return (
        <Stack
            spacing={1}
            sx={{
                px: 2,
                pt: 1,
                pb: current || upcoming ? 1 : 2,
                borderRadius: theme.contentBox.border.radius,
                backgroundColor,
                borderLeft: `8px solid ${
                    current
                        ? theme.palette.warning.light
                        : upcoming
                        ? theme.palette.success.dark
                        : theme.palette.error.dark
                }`,
            }}
        >
            <Text
                weight="highlight"
                sx={{
                    color: getContrastText(theme.text.primary, backgroundColor),
                }}
            >
                {getBannerLabel(banner, server)}
            </Text>
            <BannerItems
                banner={banner}
                backgroundColor={backgroundColor}
                showCountdown={current || upcoming}
            />
        </Stack>
    );
});

export default BannerListRow;
