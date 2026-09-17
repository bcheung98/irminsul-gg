import { useState, useEffect, useTransition } from "react";
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
import type { BaseDataWithRelease, Filters } from "@/types";
import type {
    FilterUnreleasedItems,
    InfoGalleryConfig,
    TransformItems,
    UseInfoGalleryProps,
} from "./InfoGallery.types";

const EMPTY_FILTERS: Filters = {};

export function useInfoGallery<T extends Record<string, any>>({
    game,
    galleryKey,
    filterKey,
    items,
    views,
    defaultView,
    transformItems,
    transformDeps = [],
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

    const defaultFilterUnreleased: FilterUnreleasedItems<T> = (
        items,
        { hideUnreleased, game },
    ) =>
        filterUnreleasedContent(
            hideUnreleased,
            items as unknown as BaseDataWithRelease[],
            game,
        ) as unknown as T[];

    const filterUnreleasedItems = filterUnreleased ?? defaultFilterUnreleased;

    const filteredItems = filterUnreleasedItems(items, {
        hideUnreleased,
        game,
    });

    const defaultTransformItems: TransformItems<T> = (
        items,
        { filters, searchValue, sortParams },
    ) => defaultTransform(game, items, filters, searchValue, sortParams);

    const transform = transformItems ?? defaultTransformItems;

    const [isPending, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState("");
    const [currentItems, setCurrentItems] = useState<T[]>([]);

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
        items,
        filters,
        searchValue,
        hideUnreleased,
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
