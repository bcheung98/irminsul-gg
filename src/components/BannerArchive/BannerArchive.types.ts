import { BaseSyntheticEvent } from "react";
import { SortOrder } from "@/types";
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
    bannerType: BannerType;
    sortDirection: SortOrder;
    handleViewChange: (_: BaseSyntheticEvent, newValue: BannerType) => void;
    handleDirectionChange: (_: BaseSyntheticEvent) => void;
}

export interface BannerArchiveRowProps {
    banner: Banner;
}

export interface BannerItemsProps extends BannerArchiveRowProps {
    showCountdown?: boolean;
    backgroundColor?: string;
}
