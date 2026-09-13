"use client";

import { useMemo, useState, useTransition } from "react";

// Component imports
import BannerArchiveHeader from "./BannerArchiveHeader";
import BannerArchiveSelector from "./BannerArchiveSelector";
import BannerList from "@/components/BannerList";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";
import Switch from "@/components/Switch";
import Checkbox from "@/components/Checkbox";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useServerStore } from "@/stores";
import { banners as bannerLabels } from "@/data/banners";
import { BannerDataContext } from "./BannerArchive.utils";
import { getBannerData } from "@/helpers/banners";
import { createBannerLookup, createBannerOptions } from "@/helpers/banners";
import { filterBanners } from "@/helpers/filterBanners";

// Type imports
import { SortOrder } from "@/types";
import { BannerOption, BannerType } from "@/types/banner";
import { BannerArchiveProps } from "./BannerArchive.types";

export default function BannerArchive<
    T extends BannerOption,
    U extends BannerOption,
>({ characters, weapons, banners }: BannerArchiveProps<T, U>) {
    const theme = useTheme();

    const game = useGameTag();
    const server = useStore(useServerStore, (state) => state[game]) || "NA";

    const [loading, startTransition] = useTransition();

    const [filterCharacter, setFilterCharacter] = useState(true);
    const handleCharacterChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setFilterCharacter(event.target.checked);
    };

    const [filterWeapon, setFilterWeapon] = useState(true);
    const handleWeaponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterWeapon(event.target.checked);
    };

    const [bannerTypes, setBannerTypes] = useState<BannerType[]>([
        "character",
        "weapon",
    ]);

    const handleBannerTypeChange = (
        _: React.BaseSyntheticEvent,
        value: BannerType[],
    ) => {
        let nextValue = value;
        if (banners.chronicled && value.length === 3) {
            nextValue = ["chronicled"];
        } else if (value.length === 0) {
            nextValue = ["character", "weapon"];
        } else {
            nextValue = value.filter((type) => type !== "chronicled");
        }
        const chronicledSelected = nextValue.includes("chronicled");
        startTransition(() => {
            setFilterCharacter(
                chronicledSelected || nextValue.includes("character"),
            );
            setFilterWeapon(chronicledSelected || nextValue.includes("weapon"));
            setBannerTypes(nextValue);
        });
    };

    const [sortDirection, setSortDirection] = useState<SortOrder>("asc");
    const handleDirectionChange = () => {
        startTransition(() => {
            setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
        });
    };

    const [matchAll, setMatchAll] = useState(true);
    const handleMatchAllChange = () => {
        startTransition(() => setMatchAll((current) => !current));
    };

    const bannerLookup = useMemo(
        () => createBannerLookup(characters, weapons),
        [characters, weapons],
    );

    const bannerData = useMemo(
        () => getBannerData(banners, game, server),
        [banners, game, server],
    );

    const bannerContext = useMemo(
        () => ({
            lookup: bannerLookup,
            server,
        }),
        [bannerLookup, server],
    );

    const bannerOptions = useMemo(() => {
        const items = createBannerOptions(bannerData, bannerLookup);
        if (filterCharacter && filterWeapon) return items;
        if (filterCharacter)
            return items.filter((item) => item.category === "characters");
        if (filterWeapon)
            return items.filter((item) => item.category === "weapons");
        return items;
    }, [bannerData, bannerLookup, filterCharacter, filterWeapon]);

    const [values, setValues] = useState<BannerOption[]>([]);

    const filteredBanners = useMemo(
        () => ({
            character: filterBanners({
                banners: bannerData.character,
                values,
                matchAll,
                sortDirection,
                game,
                server,
            }),
            weapon: filterBanners({
                banners: bannerData.weapon,
                values,
                matchAll,
                sortDirection,
                game,
                server,
            }),
            chronicled: filterBanners({
                banners: bannerData.chronicled ?? [],
                values,
                matchAll,
                sortDirection,
                game,
                server,
            }),
        }),
        [bannerData, values, matchAll, sortDirection, game, server],
    );

    const headerRoot = (
        <Card
            sx={{
                p: 2,
                borderRadius: theme.contentBox.border.radius,
            }}
        >
            <Stack spacing={1}>
                <BannerArchiveHeader
                    bannerType={bannerTypes}
                    sortDirection={sortDirection}
                    handleViewChange={handleBannerTypeChange}
                    handleDirectionChange={handleDirectionChange}
                />
                <Stack spacing={1}>
                    <FlexBox spacing={1}>
                        <Switch
                            checked={matchAll}
                            onChange={handleMatchAllChange}
                            size="small"
                            sx={{ mt: 1 }}
                        />
                        <Tooltip
                            title="If toggled, will filter banners that only contain all selected items."
                            placement="top"
                        >
                            <Text
                                variant="body2"
                                weight="highlight"
                                sx={{
                                    mt: 0.5,
                                    cursor: "help",
                                    textDecoration: "dotted underline",
                                }}
                            >
                                Toggle "AND" Filter
                            </Text>
                        </Tooltip>
                    </FlexBox>
                    <Stack spacing={2}>
                        <FlexBox spacing={1}>
                            <Text variant="body2" weight="highlight">
                                Limit Search:
                            </Text>
                            <FlexBox spacing={2}>
                                <FlexBox spacing={1}>
                                    <Text variant="body2">
                                        {`${
                                            bannerLabels[game].find(
                                                (item) =>
                                                    item.value === "character",
                                            )?.label
                                        }s`}
                                    </Text>
                                    <Checkbox
                                        checked={filterCharacter}
                                        onChange={handleCharacterChange}
                                    />
                                </FlexBox>
                                <FlexBox spacing={1}>
                                    <Text variant="body2">
                                        {`${
                                            bannerLabels[game].find(
                                                (item) =>
                                                    item.value === "weapon",
                                            )?.label
                                        }s`}
                                    </Text>
                                    <Checkbox
                                        checked={filterWeapon}
                                        onChange={handleWeaponChange}
                                    />
                                </FlexBox>
                            </FlexBox>
                        </FlexBox>
                        <BannerArchiveSelector
                            options={bannerOptions}
                            values={values}
                            setValues={setValues}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    );

    return (
        <BannerDataContext value={bannerContext}>
            <Stack
                spacing={2}
                sx={{ p: 1, maxWidth: theme.breakpoints.values.xl }}
            >
                <Stack spacing={2}>
                    <Text variant="h5" weight="highlight">
                        Banner Archive
                    </Text>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, xl: 6 }}>{headerRoot}</Grid>
                    </Grid>
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
