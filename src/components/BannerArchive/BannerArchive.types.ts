import { Dispatch, SetStateAction } from "react";
import { Game, SortOrder } from "@/types";
import { Banner, BannerOption, BannerProps, BannerType } from "@/types/banner";

export interface BannerArchiveProps<
    T extends BannerOption,
    U extends BannerOption,
> {
    characters: T[];
    weapons: U[];
    banners: BannerProps;
}

export interface BannerArchiveHeaderProps {
    bannerType: BannerType[];
    sortDirection: SortOrder;
    handleViewChange: (
        _: React.BaseSyntheticEvent,
        newValue: BannerType[],
    ) => void;
    handleDirectionChange: (_: React.BaseSyntheticEvent) => void;
    dropdownOpen: boolean;
    toggleDropdown: () => void;
}

export interface BannerListRowProps {
    banner: Banner;
}

export interface BannerItemsProps extends BannerListRowProps {
    showCountdown?: boolean;
    backgroundColor?: string;
    game?: Game;
}

export interface BannerArchiveFilterProps extends BannerArchiveSelectorProps {
    matchAll: boolean;
    handleMatchAllChange: () => void;
    filterCharacter: boolean;
    handleCharacterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filterWeapon: boolean;
    handleWeaponChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface BannerArchiveSelectorProps {
    options: BannerOption[];
    values: BannerOption[];
    setValues: Dispatch<SetStateAction<BannerOption[]>>;
}

export interface BannerArchiveYearSelectorProps {
    years: number[];
    selectedYears: number[];
    setYears: Dispatch<SetStateAction<number[]>>;
}

export type BannerArchiveSettingsProps = BannerArchiveHeaderProps &
    BannerArchiveFilterProps &
    BannerArchiveSelectorProps &
    BannerArchiveYearSelectorProps;
