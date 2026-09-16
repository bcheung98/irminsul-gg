"use client";

// Component imports
import BannerList from "@/components/BannerList";
import Text from "@/components/Text";
import BannerArchiveSettings from "./BannerArchiveSettings";

// MUI imports
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { BannerDataContext } from "./BannerArchive.utils";
import { useBannerArchive } from "./BannerArchive.hooks";

// Type imports
import { BannerOption } from "@/types/banner";
import { BannerArchiveProps } from "./BannerArchive.types";

export default function BannerArchive<
    T extends BannerOption,
    U extends BannerOption,
>(props: BannerArchiveProps<T, U>) {
    const {
        loading,
        sortDirection,
        handleDirectionChange,
        filterCharacter,
        handleCharacterChange,
        filterWeapon,
        handleWeaponChange,
        bannerTypes,
        handleBannerTypeChange,
        matchAll,
        handleMatchAllChange,
        bannerContext,
        bannerOptions,
        values,
        setValues,
        years,
        selectedYears,
        setSelectedYears,
        filteredBanners,
        dropdownOpen,
        toggleDropdown,
    } = useBannerArchive(props);

    const settingsParams = {
        matchAll,
        handleMatchAllChange,
        filterCharacter,
        handleCharacterChange,
        filterWeapon,
        handleWeaponChange,
        options: bannerOptions,
        values,
        setValues,
        years,
        selectedYears,
        setYears: setSelectedYears,
        bannerType: bannerTypes,
        sortDirection,
        handleViewChange: handleBannerTypeChange,
        handleDirectionChange,
        dropdownOpen,
        toggleDropdown,
    };

    return (
        <BannerDataContext value={bannerContext}>
            <Stack
                spacing={2}
                sx={(theme) => ({
                    px: 1,
                    py: { xs: 1, sm: 2, lg: 1 },
                    maxWidth: theme.breakpoints.values.xl,
                })}
            >
                <Stack spacing={2}>
                    <Text variant="h5" weight="highlight">
                        Banner Archive
                    </Text>
                    <BannerArchiveSettings {...settingsParams} />
                </Stack>
                {!loading ? (
                    <BannerList
                        activeBanners={bannerTypes}
                        banners={filteredBanners}
                        reverse={sortDirection === "desc"}
                    />
                ) : (
                    <LinearProgress />
                )}
            </Stack>
        </BannerDataContext>
    );
}
