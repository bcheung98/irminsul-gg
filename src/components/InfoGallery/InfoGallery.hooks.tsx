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

    const [isPending, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState("");
    const [currentItems, setCurrentItems] = useState<T[]>([]);

    useEffect(() => {
        startTransition(() => {
            const filteredItems = (filterUnreleased ?? defaultFilterUnreleased)(
                items,
                {
                    hideUnreleased,
                    game,
                },
            );
            const context = {
                filters,
                searchValue,
                sortParams,
            };
            setCurrentItems(
                transformItems
                    ? transformItems(filteredItems, context)
                    : defaultTransform(
                          game,
                          filteredItems,
                          filters,
                          searchValue,
                          sortParams,
                      ),
            );
        });
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
