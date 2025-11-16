import { GalleryView } from "@/types";

export interface InfoGalleryProps {
    children?: React.ReactNode;
    title?: string;
    buttonKeys?: string[];
    customButtons?: InfoGalleryButtonProps[];
    view: GalleryView;
    searchValue: string;
    handleView: (_: React.BaseSyntheticEvent, view: GalleryView) => void;
    handleInputChange: (event: React.BaseSyntheticEvent) => void;
    hideSearchBar?: boolean;
    hideFilters?: boolean;
}

export interface InfoGalleryButtonProps {
    value: string;
    icon: React.ReactNode;
    tooltip: string;
}
