import { FilterState } from "@/stores/useFilterStore";
import { GallerySettings, GalleryState } from "@/stores/useGalleryStore";
import { BaseDataWithRelease, Filters, GalleryView, Game } from "@/types";

export interface InfoGalleryConfig {
    view: GalleryView;
    handleView: (_: React.BaseSyntheticEvent, view: GalleryView) => void;
    searchValue: string;
    handleInputChange: (event: React.BaseSyntheticEvent) => void;
}

export interface InfoGalleryProps extends InfoGalleryConfig {
    children?: React.ReactNode;
    title?: string;
    buttonKeys?: string[];
    customButtons?: InfoGalleryButtonProps[];
    extraButtons?: React.ReactNode;
    hideSearchBar?: boolean;
    hideFilters?: boolean;
}

export interface InfoGalleryButtonProps {
    value: string;
    icon: React.ReactNode;
    tooltip: string;
}

interface GalleryViews<T> {
    icon?: (item: T) => React.ReactNode;
    card?: (item: T) => React.ReactNode;
    list?: (items: T[], isPending: boolean) => React.ReactNode;
}

interface TransformContext {
    filters: Filters;
    searchValue: string;
    sortParams: GallerySettings;
}

export type TransformItems<T> = (items: T[], context: TransformContext) => T[];

export interface UseInfoGalleryProps<T extends BaseDataWithRelease> {
    game: Game;
    galleryKey: keyof GalleryState;
    filterKey?: keyof FilterState;
    items: T[];
    views: GalleryViews<T>;
    transformItems?: TransformItems<T>;
    transformDeps?: React.DependencyList;
}
