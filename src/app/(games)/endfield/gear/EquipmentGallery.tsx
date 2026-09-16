"use client";

import { BaseSyntheticEvent, useState, useEffect, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import GearList from "@/components/_endfield/GearList";
import GearCard from "@/components/_endfield/GearCard";
import { EndfieldGearInfoCard } from "@/components/InfoCard";

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
import { EndfieldGear } from "@/types/endfield";

export default function EquipmentGallery(props: { equipment: EndfieldGear[] }) {
    const game = "endfield";
    const tag = "endfield/gear";

    const filters = useFilterStore(useShallow((state) => state[tag]));
    const sortParams = useGalleryStore(
        useShallow((state) => state["endfield/gear"]),
    );

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent,
    );

    const gear = filterUnreleasedContent(
        hideUnreleasedContent,
        props.equipment,
        game,
    );

    const [loading, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState("");
    const [currentGear, setCurrentGear] = useState<EndfieldGear[]>([]);

    useEffect(() => {
        startTransition(() => {
            setCurrentGear(
                filterItems(game, gear, filters, searchValue, sortParams),
            );
        });
    }, [filters, searchValue, hideUnreleasedContent, sortParams]);

    function renderGallery() {
        if (loading) return <LinearProgress />;
        switch (sortParams.view) {
            case "icon":
                return (
                    <Grid container spacing={3}>
                        {currentGear.map((gear) => (
                            <EndfieldGearInfoCard key={gear.id} gear={gear} />
                        ))}
                    </Grid>
                );
            case "list":
                return <GearList gear={currentGear} />;
            case "card":
            default:
                return (
                    <Grid container spacing={3}>
                        {currentGear.map((gear) => (
                            <GearCard key={gear.id} gear={gear} />
                        ))}
                    </Grid>
                );
        }
    }

    const params = {
        view: sortParams.view,
        handleView: useView(tag),
        searchValue,
        handleInputChange: (event: BaseSyntheticEvent) => {
            setSearchValue(event.target.value);
        },
    };

    return (
        <InfoGallery title="Gear" buttonKeys={["card", "list"]} {...params}>
            {renderGallery()}
        </InfoGallery>
    );
}
