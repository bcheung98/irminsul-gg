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
import { objectKeys } from "@/utils";
import { useGameTag } from "@/context";
import { useStore, useServerStore } from "@/stores";
import { banners as bannerLabels } from "@/data/banners";
import { BannerDataContext } from "./BannerArchive.utils";
import { getBannerData } from "@/helpers/createBannerList";
import { createBannerOptions } from "@/helpers/createBannerData";
import { filterBanners } from "@/helpers/filterBanners";

// Type imports
import { SortOrder } from "@/types";
import {
    ActiveBanners,
    BannerOption,
    BannerProps,
    BannerType,
} from "@/types/banner";
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
    const handleCharacterChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterCharacter(() => event.target.checked);
        },
        []
    );
    const [filterWeapon, setFilterWeapon] = useState(true);
    const handleWeaponChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterWeapon(() => event.target.checked);
        },
        []
    );

    const [bannerType, setBannerType] = useState<BannerType[]>([
        "character",
        "weapon",
    ]);
    const handleViewChange = useCallback(
        (_: React.BaseSyntheticEvent, newValue: BannerType[]) => {
            if (banners.chronicled && newValue.length === 3) {
                newValue = ["chronicled"];
                setFilterCharacter(true);
                setFilterWeapon(true);
            } else if (newValue.length === 0) {
                newValue = ["character", "weapon"];
                setFilterCharacter(true);
                setFilterWeapon(true);
            } else {
                newValue = newValue.filter((i) => i !== "chronicled");
                setFilterCharacter(newValue.includes("character"));
                setFilterWeapon(newValue.includes("weapon"));
            }
            startTransition(() => setBannerType(() => newValue));
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

    const activeBanners = useMemo(() => {
        const res: ActiveBanners = {
            character: false,
            weapon: false,
            chronicled: false,
        };
        objectKeys(banners).forEach(
            (banner) => (res[banner] = bannerType.includes(banner))
        );
        return res;
    }, [JSON.stringify(bannerType)]);

    const [bannerData, setBannerData] = useState<BannerProps>({
        character: [],
        weapon: [],
    });
    useEffect(() => {
        startTransition(async () => {
            let items = await getBannerData(banners, game, server);
            startTransition(() => setBannerData(items));
        });
    }, [banners, game, server]);

    const [values, setValues] = useState<BannerOption[]>([]);

    const characterBanners = useMemo(
        () =>
            filterBanners(
                bannerData.character,
                values,
                unique,
                sortDirection,
                game,
                server
            ),
        [bannerData.character, values, unique, sortDirection, game, server]
    );
    const weaponBanners = useMemo(
        () =>
            filterBanners(
                bannerData.weapon,
                values,
                unique,
                sortDirection,
                game,
                server
            ),
        [bannerData.weapon, values, unique, sortDirection, game, server]
    );
    const chronicledBanners = useMemo(
        () =>
            filterBanners(
                bannerData.chronicled || [],
                values,
                unique,
                sortDirection,
                game,
                server
            ),
        [bannerData.chronicled, values, unique, sortDirection, game, server]
    );

    const bannerOptions = useMemo(() => {
        let items = createBannerOptions(bannerData, characters, weapons);
        if (filterCharacter && filterWeapon) return items;
        if (filterCharacter)
            return items.filter((item) => item.category === "characters");
        if (filterWeapon)
            return items.filter((item) => item.category === "weapons");
        return items;
    }, [bannerData, filterCharacter, filterWeapon]);

    const HeaderRoot = (
        <Card
            sx={{
                p: 2,
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
                </FlexBox>
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
                                                    item.value === "character"
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
                                                    item.value === "weapon"
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
        <BannerDataContext value={{ characters, weapons, server }}>
            <Stack
                spacing={2}
                sx={{ p: 1, maxWidth: theme.breakpoints.values.xl }}
            >
                <Stack spacing={2}>
                    <Text variant="h5" weight="highlight">
                        Banner Archive
                    </Text>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, xl: 6 }}>{HeaderRoot}</Grid>
                    </Grid>
                </Stack>
                {!loading ? (
                    <BannerList
                        activeBanners={activeBanners}
                        banners={{
                            character: characterBanners,
                            weapon: weaponBanners,
                            chronicled: chronicledBanners,
                        }}
                        reverse={sortDirection === "desc"}
                    />
                ) : (
                    <LinearProgress />
                )}
            </Stack>
        </BannerDataContext>
    );
}
