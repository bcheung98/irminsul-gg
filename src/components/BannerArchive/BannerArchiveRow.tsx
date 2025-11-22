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
} from "./BannerArchive.utils";
import { getContrastText } from "@/utils/getContrastText";

// Type imports
import { BannerArchiveRowProps } from "./BannerArchive.types";

const BannerArchiveRow = memo(function BannerArchiveRow({
    banner,
}: BannerArchiveRowProps) {
    const theme = useTheme();

    const current = isCurrentBanner(banner);
    const upcoming = isFutureBanner(banner);

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
                backgroundColor: backgroundColor,
            }}
        >
            <Text
                sx={{
                    color: getContrastText(theme.text.primary, backgroundColor),
                }}
            >
                {getBannerLabel(banner)}
            </Text>
            <BannerItems
                banner={banner}
                backgroundColor={backgroundColor}
                showCountdown={current || upcoming}
            />
        </Stack>
    );
});

export default BannerArchiveRow;
