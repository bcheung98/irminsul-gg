import { useState, useMemo, useDeferredValue } from "react";
import { useShallow } from "zustand/react/shallow";

// MUI imports
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useView } from "@/hooks";
import { useGalleryStore, useFilterStore } from "@/stores";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { transformItems as defaultTransform } from "@/helpers/transformItems";

// Type imports
import type { BaseDataWithRelease, Item } from "@/types";
import type { Filters } from "@/types/filters";
import type {
    FilterUnreleasedContext,
    InfoGalleryConfig,
    UseInfoGalleryProps,
} from "./InfoGallery.types";

const EMPTY_FILTERS: Filters = {};

function defaultFilterUnreleased<T extends Item>(
    items: T[],
    { hideUnreleased, game }: FilterUnreleasedContext,
) {
    return filterUnreleasedContent(
        hideUnreleased,
        items as unknown as BaseDataWithRelease[],
        game,
    ) as unknown as T[];
}

export function useInfoGallery<T extends Item>({
    game,
    galleryKey,
    filterKey,
    items,
    views,
    defaultView,
    transformItems,
    dependencies = [],
    hideUnreleased,
    filterUnreleased,
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

    const view = defaultView ?? sortParams.view;
    const deferredView = useDeferredValue(view);

    const [searchValue, setSearchValue] = useState("");

    const currentItems = useMemo(() => {
        const filteredItems = (filterUnreleased ?? defaultFilterUnreleased)(
            items,
            { hideUnreleased, game },
        );

        const context = {
            filters,
            searchValue,
            sortParams,
        };

        return transformItems
            ? transformItems(filteredItems, context)
            : defaultTransform(
                  game,
                  filteredItems,
                  filters,
                  searchValue,
                  sortParams,
              );
    }, [
        game,
        items,
        filters,
        searchValue,
        hideUnreleased,
        sortParams,
        ...dependencies, // Custom transform dependencies are provided explicitly through dependencies prop.
    ]);

    const params = {
        view,
        handleView: useView(galleryKey),
        searchValue,
        setSearchValue,
    };

    const loading = view !== deferredView;

    const gallery = (() => {
        if (loading) return <LinearProgress color="info" />;
        const { icon, card, list } = views;
        switch (deferredView) {
            case "icon":
            default:
                return (
                    <Grid container spacing={3}>
                        {icon && currentItems.map(icon)}
                    </Grid>
                );
            case "card":
                return (
                    <Grid container spacing={3}>
                        {card && currentItems.map(card)}
                    </Grid>
                );
            case "list":
                return list?.(currentItems);
        }
    })();

    return { params, gallery };
}
