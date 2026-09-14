import { useMemo, useState, useTransition } from "react";

// Helper imports
import { useGameTag } from "@/context";
import { useStore, useServerStore } from "@/stores";
import { getBannerData, getBannerYears } from "@/helpers/banners";
import { createBannerLookup, createBannerOptions } from "@/helpers/banners";
import { filterBanners } from "@/helpers/filterBanners";

// Type imports
import { SortOrder } from "@/types";
import { BannerOption, BannerType } from "@/types/banner";
import { BannerArchiveProps } from "./BannerArchive.types";

export function useBannerArchive<
    T extends BannerOption,
    U extends BannerOption,
>({ banners, characters, weapons }: BannerArchiveProps<T, U>) {
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

    const years = useMemo(
        () => getBannerYears(bannerData, game, server),
        [bannerData, game, server],
    );
    const [selectedYears, setSelectedYears] = useState<number[]>([]);

    const filteredBanners = useMemo(
        () => ({
            character: filterBanners({
                banners: bannerData.character,
                values,
                matchAll,
                years: selectedYears,
                sortDirection,
                game,
                server,
            }),
            weapon: filterBanners({
                banners: bannerData.weapon,
                values,
                matchAll,
                years: selectedYears,
                sortDirection,
                game,
                server,
            }),
            chronicled: filterBanners({
                banners: bannerData.chronicled ?? [],
                values,
                matchAll,
                years: selectedYears,
                sortDirection,
                game,
                server,
            }),
        }),
        [
            bannerData,
            values,
            matchAll,
            selectedYears,
            sortDirection,
            game,
            server,
        ],
    );

    const [dropdownOpen, setDropdownOpen] = useState(true);
    const toggleDropdown = () => {
        setDropdownOpen((current) => !current);
    };

    return {
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
    };
}
