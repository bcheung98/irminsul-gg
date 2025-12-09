"use client";

import { BaseSyntheticEvent, useState, useEffect, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import { WuWaEchoInfoCard } from "@/components/InfoCard";
import EchoList from "./EchoList";

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
import { WuWaEcho } from "@/types/wuwa";

export default function EchoGallery(props: { echoes: WuWaEcho[] }) {
    const game = "wuwa";
    const tag = "wuwa/echoes";

    const filters = useFilterStore(useShallow((state) => state[tag]));
    const sortParams = useGalleryStore(useShallow((state) => state[tag]));

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const echoes = filterUnreleasedContent(
        hideUnreleasedContent,
        props.echoes,
        game
    );

    const [loading, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState("");
    const [currentEchoes, setCurrentEchoes] = useState<WuWaEcho[]>([]);

    useEffect(() => {
        startTransition(() => {
            setCurrentEchoes(
                filterItems(game, echoes, filters, searchValue, sortParams)
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
                        {currentEchoes.map((echo) => (
                            <WuWaEchoInfoCard key={echo.id} echo={echo} />
                        ))}
                    </Grid>
                );
            case "list":
                return <EchoList echoes={currentEchoes} loading={loading} />;
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
        <InfoGallery title="Echoes" buttonKeys={["icon", "list"]} {...params}>
            {renderGallery()}
        </InfoGallery>
    );
}
