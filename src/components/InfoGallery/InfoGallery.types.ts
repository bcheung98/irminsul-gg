import { FilterState } from "@/stores/useFilterStore";
import { GallerySettings, GalleryState } from "@/stores/useGalleryStore";
import { Filters, GalleryView, Game } from "@/types";
import { ToggleButtonProps } from "@/components/ToggleButtons/ToggleButtons.types";

export interface InfoGalleryConfig {
    /** Current view mode. */
    view: GalleryView;
    /** Callback fired when the view changes. */
    handleView: (_: React.BaseSyntheticEvent, view: GalleryView) => void;
    /** Current search value. */
    searchValue: string;
    /** Callback fired when the search value changes. */
    handleInputChange: (event: React.BaseSyntheticEvent) => void;
}

export interface InfoGalleryProps extends InfoGalleryConfig {
    /** Page content */
    children?: React.ReactNode;
    /** Page title */
    title?: string;
    /**
     * Define which buttons to display in the gallery controls.
     * The values in the array should correspond to the `value` key
     * from `InfoGalleryButtonProps`.
     * 
     * To hide the buttons, pass an empty array.
     * @default ["icon", "card", "list"]
     */
    buttonKeys?: string[];
    /** Extra control buttons to add to the gallery controls. */
    extraButtons?: React.ReactNode;
    /** If `true`, the search bar is hidden. */
    hideSearchBar?: boolean;
    /** If `true`, the filter controls are hidden. */
    hideFilters?: boolean;
}

export interface InfoGalleryButtonProps extends ToggleButtonProps {
    /**
     * The value associated with this button. This value is used
     * to set which buttons are shown in the gallery controls.
     */
    value: string;
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

export interface FilterUnreleasedContext {
    hideUnreleased?: boolean;
    game: Game;
}

export type FilterUnreleasedItems<T> = (
    items: T[],
    context: FilterUnreleasedContext,
) => T[];

export interface UseInfoGalleryProps<T extends Record<string, any>> {
    /** Current game tag. */
    game: Game;
    /** Key of the gallery state, equivalent to the pathname. */
    galleryKey: keyof GalleryState;
    /**
     * Key of the filter state, equivalent to the data path.
     * Omit this value to disable filtering items.
     */
    filterKey?: keyof FilterState;
    /** The list of items to render. */
    items: T[];
    /** Render components for each view mode. */
    views: GalleryViews<T>;
    /**
     * Enforce a certain view mode.
     * Used for when there is a single view mode and no view control buttons.
     */
    defaultView?: GalleryView;
    /** Optional callback function to override the default filter and sort function. */
    transformItems?: TransformItems<T>;
    /** Extra dependencies for `transformItems`. */
    transformDeps?: React.DependencyList;
    /** If `true`, unreleased items are hidden from the view. */
    hideUnreleased?: boolean;
    /**
     * Optional callback function to override
     * the default function to filter unreleased items.
     */
    filterUnreleased?: FilterUnreleasedItems<T>;
}
