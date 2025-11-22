"use client";

import {
    BaseSyntheticEvent,
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
import ContentBox from "@/components/ContentBox";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";
import Switch from "@/components/Switch";
import Checkbox from "@/components/Checkbox";

// MUI imports
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

// Helper imports
import { useGameTag } from "@/context";
import { banners as bannerLabels } from "@/data/banners";
import {
    BannerCharactersContext,
    BannerWeaponsContext,
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
    const game = useGameTag();

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
        (_: BaseSyntheticEvent, newValue: BannerType | null) => {
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
    const handleDirectionChange = (_: BaseSyntheticEvent) => {
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
        setUnique(!unique);
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

    const [open, setOpen] = useState(false);
    const toggleDropdownState = () => {
        setOpen(!open);
    };

    const HeaderAction = (
        <Tooltip
            title={`${open ? "Hide" : "Expand"} search options`}
            placement="top"
        >
            <IconButton
                onClick={toggleDropdownState}
                disableRipple
                sx={(theme) => ({
                    p: 0.5,
                    borderRadius: "8px",
                    backgroundColor: open
                        ? theme.palette.info.main
                        : "transparent",
                    "&:hover": {
                        backgroundColor: open
                            ? theme.palette.info.light
                            : theme.drawer.backgroundColor.hover,
                    },
                })}
            >
                <SearchIcon />
            </IconButton>
        </Tooltip>
    );

    const HeaderRoot = (
        <Box sx={{ width: "100%" }}>
            <FlexBox spacing={2}>
                {HeaderAction}
                <BannerArchiveHeader
                    bannerType={bannerType}
                    sortDirection={sortDirection}
                    handleViewChange={handleViewChange}
                    handleDirectionChange={handleDirectionChange}
                />
            </FlexBox>
            <Collapse in={open} timeout="auto">
                <FlexBox spacing={[0, 2]} wrap>
                    <BannerArchiveSelector
                        options={bannerOptions}
                        values={values}
                        setValues={setValues}
                    />
                    <FlexBox spacing={0.5}>
                        <Switch
                            checked={unique}
                            onChange={handleSelect}
                            sx={{ mt: 1 }}
                        />
                        <Tooltip
                            title="If toggled, will filter banners that only contain all selected items."
                            placement="top"
                        >
                            <Text
                                variant="body2"
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
                    <FlexBox sx={{ mt: 0.5 }} spacing={1}>
                        <Text variant="body2">Limit Search:</Text>
                        <FlexBox spacing={2}>
                            <FlexBox spacing={1}>
                                <Text variant="body2">
                                    {`${
                                        bannerLabels[game].find(
                                            (item) => item.value === "character"
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
                                            (item) => item.value === "weapon"
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
                </FlexBox>
            </Collapse>
        </Box>
    );

    return (
        <BannerCharactersContext value={characters}>
            <BannerWeaponsContext value={weapons}>
                <Stack spacing={2} sx={{ p: 1 }}>
                    <Text variant="h5">Banner Archive</Text>
                    <ContentBox
                        header={HeaderRoot}
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
