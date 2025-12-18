"use client";

import { BaseSyntheticEvent, useState, useEffect, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import { UmaSupportInfoCard } from "@/components/InfoCard";
import SupportList from "./SupportList";

// MUI imports
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useView } from "@/hooks";
import {
    useStore,
    useGalleryStore,
    useFilterStore,
    useServerStore,
} from "@/stores";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { filterItems } from "@/helpers/filterItems";

// Type imports
import { UmaSupport } from "@/types/uma";

export default function SupportGallery(props: { supports: UmaSupport[] }) {
    const game = "uma";
    const tag = "uma/supports";

    const filters = useFilterStore(useShallow((state) => state[tag]));
    const sortParams = useGalleryStore(useShallow((state) => state[tag]));

    const server = useStore(useServerStore, (state) => state.uma);
    const hideUnreleasedContent = server === "NA";

    const supports = filterUnreleasedContent(
        hideUnreleasedContent,
        props.supports,
        game
    );

    const [loading, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState("");
    const [currentSupports, setCurrentSupports] = useState<UmaSupport[]>([]);

    useEffect(() => {
        startTransition(() => {
            setCurrentSupports(
                filterItems(game, supports, filters, searchValue, sortParams)
            );
        });
    }, [filters, searchValue, hideUnreleasedContent, sortParams]);

    const renderGallery = () => {
        switch (sortParams.view) {
            case "icon":
            default:
                if (loading) return <LinearProgress />;
                return (
                    <Grid container spacing={3}>
                        {currentSupports.map((support) => (
                            <UmaSupportInfoCard
                                key={support.id}
                                support={support}
                            />
                        ))}
                    </Grid>
                );
            case "list":
                return (
                    <SupportList supports={currentSupports} loading={loading} />
                );
        }
    };

    const params = {
        view: sortParams.view,
        handleView: useView(tag),
        searchValue,
        handleInputChange: (event: BaseSyntheticEvent) => {
            setSearchValue(event.target.value);
        },
    };

    return (
        <InfoGallery
            title="Support Cards"
            buttonKeys={["icon", "list"]}
            {...params}
        >
            {renderGallery()}
        </InfoGallery>
    );
}
