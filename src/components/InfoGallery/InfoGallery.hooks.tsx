import { useState, useEffect, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

// MUI imports
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useView } from "@/hooks";
import {
    useStore,
    useGalleryStore,
    useSettingsStore,
    useFilterStore,
} from "@/stores";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { filterItems } from "@/helpers/filterItems";

// Type imports
import { BaseDataWithRelease, Filters } from "@/types";
import {
    InfoGalleryConfig,
    TransformItems,
    UseInfoGalleryProps,
} from "./InfoGallery.types";

const EMPTY_FILTERS: Filters = {};

export function useInfoGallery<T extends BaseDataWithRelease>({
    game,
    galleryKey,
    filterKey,
    items,
    views,
    transformItems,
    transformDeps = [],
}: UseInfoGalleryProps<T>): {
    params: InfoGalleryConfig;
    gallery: React.ReactNode;
} {
    const filters = useFilterStore(
        useShallow((state) => (filterKey ? state[filterKey] : EMPTY_FILTERS)),
    );

    const sortParams = useGalleryStore(
        useShallow((state) => state[galleryKey]),
    );

    const { view } = sortParams;

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent,
    );

    const filteredItems = filterUnreleasedContent(
        hideUnreleasedContent,
        items,
        game,
    );

    const [isPending, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState("");
    const [currentItems, setCurrentItems] = useState<T[]>([]);

    const defaultTransform: TransformItems<T> = (
        items,
        { filters, searchValue, sortParams },
    ) => filterItems(game, items, filters, searchValue, sortParams);
    const transform = transformItems ?? defaultTransform;

    useEffect(() => {
        startTransition(() => {
            setCurrentItems(
                transform(filteredItems, {
                    filters,
                    searchValue,
                    sortParams,
                }),
            );
        });
    }, [
        filters,
        searchValue,
        hideUnreleasedContent,
        sortParams,
        ...transformDeps,
    ]);

    const params = {
        view,
        handleView: useView(galleryKey),
        searchValue,
        handleInputChange: (event: React.BaseSyntheticEvent) =>
            setSearchValue(event.target.value),
    };

    const gallery = (() => {
        const { icon, card, list } = views;
        switch (view) {
            case "icon":
            default:
                if (isPending) return <LinearProgress />;
                return (
                    <Grid container spacing={3}>
                        {icon && currentItems.map(icon)}
                    </Grid>
                );
            case "card":
                if (isPending) return <LinearProgress />;
                return (
                    <Grid container spacing={3}>
                        {card && currentItems.map(card)}
                    </Grid>
                );
            case "list":
                return list?.(currentItems, isPending);
        }
    })();

    return { params, gallery };
}
