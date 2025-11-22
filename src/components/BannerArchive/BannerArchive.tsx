"use client";

import {
    BaseSyntheticEvent,
    useCallback,
    useEffect,
    useState,
    useTransition,
} from "react";

// Component imports
import BannerArchiveHeader from "./BannerArchiveHeader";
import BannerArchiveRow from "./BannerArchiveRow";
import ContentBox from "@/components/ContentBox";
import Text from "@/components/Text";

// MUI imports
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import {
    BannerCharactersContext,
    BannerWeaponsContext,
} from "./BannerArchive.utils";
import { getBannerList } from "@/helpers/createBannerList";

// Type imports
import { SortOrder } from "@/types";
import { Banner, BannerOption, BannerType } from "@/types/banner";
import { BannerArchiveProps } from "./BannerArchive.types";

export default function BannerArchive<
    T extends BannerOption,
    U extends BannerOption
>({ characters, weapons, banners }: BannerArchiveProps<T, U>) {
    const [loading, startTransition] = useTransition();
    const [bannerType, setBannerType] = useState<BannerType>("character");
    const handleViewChange = useCallback(
        (_: BaseSyntheticEvent, newValue: BannerType | null) => {
            if (newValue) setBannerType(() => newValue);
        },
        []
    );

    const [sortDirection, setSortDirection] = useState<SortOrder>("asc");
    const handleDirectionChange = (_: BaseSyntheticEvent) => {
        startTransition(() => {
            if (sortDirection === "asc") {
                setSortDirection("desc");
            } else {
                setSortDirection("asc");
            }
        });
    };

    const [bannerList, setBannerList] = useState<Banner[]>([]);
    useEffect(() => {
        startTransition(async () => {
            const items = await getBannerList(
                banners,
                bannerType,
                sortDirection
            );
            startTransition(() => setBannerList(items));
        });
    }, [bannerType, sortDirection]);

    return (
        <BannerCharactersContext value={characters}>
            <BannerWeaponsContext value={weapons}>
                <Stack spacing={2} sx={{ p: 1 }}>
                    <Text variant="h5">Banner Archive</Text>
                    <ContentBox
                        header={
                            <BannerArchiveHeader
                                bannerType={bannerType}
                                sortDirection={sortDirection}
                                handleViewChange={handleViewChange}
                                handleDirectionChange={handleDirectionChange}
                            />
                        }
                        contentProps={{ padding: 0 }}
                    >
                        <Box
                            sx={{
                                minHeight: "75vh",
                                maxHeight: "75vh",
                                overflowY: "auto",
                            }}
                        >
                            {!loading ? (
                                <Stack divider={<Divider />}>
                                    {bannerList.map((banner) => (
                                        <BannerArchiveRow
                                            key={banner.id}
                                            banner={banner}
                                        />
                                    ))}
                                </Stack>
                            ) : (
                                <LinearProgress />
                            )}
                        </Box>
                    </ContentBox>
                </Stack>
            </BannerWeaponsContext>
        </BannerCharactersContext>
    );
}
