import { Dispatch, SetStateAction } from "react";
import { Game, SortOrder } from "@/types";
import { Banner, BannerOption, BannerProps, BannerType } from "@/types/banner";

export interface BannerArchiveProps<
    T extends BannerOption,
    U extends BannerOption
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
        newValue: BannerType[]
    ) => void;
    handleDirectionChange: (_: React.BaseSyntheticEvent) => void;
}

export interface BannerArchiveRowProps {
    banner: Banner;
}

export interface BannerItemsProps extends BannerArchiveRowProps {
    showCountdown?: boolean;
    backgroundColor?: string;
    game?: Game;
}

export interface BannerArchiveSelectorProps {
    options: BannerOption[];
    values: BannerOption[];
    setValues: Dispatch<SetStateAction<BannerOption[]>>;
}
