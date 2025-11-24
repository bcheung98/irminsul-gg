"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    useTransition,
} from "react";

// Component imports
import BannerArchiveHeader from "./BannerArchiveHeader";
import BannerArchiveSelector from "./BannerArchiveSelector";
import BannerArchiveRow from "./BannerArchiveRow";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";
import Switch from "@/components/Switch";
import Checkbox from "@/components/Checkbox";

// MUI imports
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useServerStore } from "@/stores";
import { banners as bannerLabels } from "@/data/banners";
import {
    BannerDataContext,
    isCurrentBanner,
    isFutureBanner,
} from "./BannerArchive.utils";
import { getBannerList } from "@/helpers/createBannerList";
import { createBannerOptions } from "@/helpers/createBannerData";

// Type imports
import { SortOrder } from "@/types";
import { Banner, BannerOption, BannerType } from "@/types/banner";
import { BannerArchiveProps } from "./BannerArchive.types";

export default function BannerArchive<
    T extends BannerOption,
    U extends BannerOption
>({ characters, weapons, banners }: BannerArchiveProps<T, U>) {
    const theme = useTheme();

    const game = useGameTag();
    const server = useStore(useServerStore, (state) => state[game]) || "NA";

    const [loading, startTransition] = useTransition();

    const [filterCharacter, setFilterCharacter] = useState(true);
    const handleCharacterChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFilterCharacter(event.target.checked);
    };
    const [filterWeapon, setFilterWeapon] = useState(false);
    const handleWeaponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterWeapon(event.target.checked);
    };

    const [bannerType, setBannerType] = useState<BannerType>("character");
    const handleViewChange = useCallback(
        (_: React.BaseSyntheticEvent, newValue: BannerType | null) => {
            if (newValue) {
                setBannerType(() => newValue);
                if (newValue == "all" || newValue === "chronicled") {
                    setFilterCharacter(true);
                    setFilterWeapon(true);
                }
                if (newValue === "character") {
                    setFilterCharacter(true);
                    setFilterWeapon(false);
                }
                if (newValue === "weapon") {
                    setFilterCharacter(false);
                    setFilterWeapon(true);
                }
            }
        },
        []
    );

    const [sortDirection, setSortDirection] = useState<SortOrder>("asc");
    const handleDirectionChange = (_: React.BaseSyntheticEvent) => {
        startTransition(() => {
            if (sortDirection === "asc") {
                setSortDirection("desc");
            } else {
                setSortDirection("asc");
            }
        });
    };

    const [unique, setUnique] = useState(true);
    const handleSelect = () => {
        startTransition(() => setUnique(!unique));
    };

    const [values, setValues] = useState<BannerOption[]>([]);

    const [bannerList, setBannerList] = useState<Banner[]>([]);
    useEffect(() => {
        startTransition(async () => {
            let items = await getBannerList(banners, bannerType, sortDirection);
            if (values.length > 0) {
                items = items.filter((banner) => {
                    function filterFn(item: BannerOption) {
                        return banner.rateUps
                            .map((item) => item)
                            .includes(item.name);
                    }
                    return unique
                        ? values.every(filterFn)
                        : values.some(filterFn);
                });
            }
            startTransition(() => setBannerList(items));
        });
    }, [bannerType, sortDirection, values, unique]);

    const bannerOptions = useMemo(() => {
        let items = createBannerOptions(banners, characters, weapons);
        if (filterCharacter && filterWeapon) return items;
        if (filterCharacter)
            return items.filter((item) => item.category === "characters");
        if (filterWeapon)
            return items.filter((item) => item.category === "weapons");
        return items;
    }, [banners, filterCharacter, filterWeapon]);

    const [dropdownLoading, startDropdownTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const toggleDropdownState = () => {
        startDropdownTransition(() => setOpen(!open));
    };

    const width = { xs: "100%", md: "75%", xl: "50%" };

    const gridStyle = (banner: Banner): SxProps<Theme> => {
        const current = isCurrentBanner(banner, server);
        const upcoming = isFutureBanner(banner, server);
        return (theme) => ({
            borderRadius: theme.contentBox.border.radius,
            backgroundColor: current
                ? theme.palette.info.dark
                : theme.contentBox.backgroundColor.main,
            borderLeft: `8px solid ${
                current
                    ? theme.text.header
                    : upcoming
                    ? theme.palette.success.main
                    : theme.palette.error.main
            }`,
        });
    };

    const HeaderAction = (
        <Tooltip
            title={`${open ? "Hide" : "Expand"} search options`}
            placement="top"
        >
            <IconButton
                onClick={toggleDropdownState}
                disableRipple
                sx={{
                    p: 0.5,
                    borderRadius: "4px",
                    backgroundColor: open
                        ? theme.palette.info.main
                        : "transparent",
                    "&:hover": {
                        backgroundColor: open
                            ? theme.palette.info.light
                            : theme.background(0),
                    },
                }}
            >
                <SettingsIcon />
            </IconButton>
        </Tooltip>
    );

    const HeaderRoot = (
        <Card
            sx={{
                p: 2,
                width: width,
                borderRadius: theme.contentBox.border.radius,
            }}
        >
            <Stack spacing={1}>
                <FlexBox spacing={2} sx={{ justifyContent: "space-between" }}>
                    <BannerArchiveHeader
                        bannerType={bannerType}
                        sortDirection={sortDirection}
                        handleViewChange={handleViewChange}
                        handleDirectionChange={handleDirectionChange}
                    />
                    {HeaderAction}
                </FlexBox>
                {!dropdownLoading ? (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Stack spacing={1}>
                            <FlexBox spacing={1}>
                                <Switch
                                    checked={unique}
                                    onChange={handleSelect}
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
                                                            item.value ===
                                                            "character"
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
                                                            item.value ===
                                                            "weapon"
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
                    </Collapse>
                ) : !open ? (
                    <LinearProgress color="info" />
                ) : null}
            </Stack>
        </Card>
    );

    return (
        <BannerDataContext value={{ characters, weapons, server }}>
            <Stack spacing={2} sx={{ p: 1 }}>
                <Stack spacing={2}>
                    <Text variant="h5" weight="highlight">
                        Banner Archive
                    </Text>
                    {HeaderRoot}
                </Stack>
                {!loading ? (
                    <Grid container spacing={1} sx={{ width: width }}>
                        {bannerList.map((banner) => (
                            <Grid
                                size={12}
                                key={banner.id}
                                sx={gridStyle(banner)}
                            >
                                <BannerArchiveRow banner={banner} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <LinearProgress />
                )}
            </Stack>
        </BannerDataContext>
    );
}
