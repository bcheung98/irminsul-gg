"use client";

import { BaseSyntheticEvent, useState, useEffect, useTransition } from "react";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import CartridgeCard from "@/components/_nte/CartridgeCard";

// MUI imports
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useStore, useSettingsStore } from "@/stores";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { filterEquipment } from "@/helpers/equipment";

// Type imports
import { NTECartridge } from "@/types/nte";
import { GalleryView } from "@/types";

export default function EquipmentGallery(props: { equipment: NTECartridge[] }) {
    const game = "nte";

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent,
    );

    const cartridges = filterUnreleasedContent(
        hideUnreleasedContent,
        props.equipment,
        game,
    ).sort((a, b) => (a.url || "")?.localeCompare(b.url || ""));

    const [loading, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState("");
    const [currentCartridges, setCurrentCartridges] = useState<NTECartridge[]>(
        [],
    );

    useEffect(() => {
        startTransition(() => {
            setCurrentCartridges(filterEquipment(cartridges, searchValue));
        });
    }, [searchValue, hideUnreleasedContent]);

    function renderGallery() {
        if (loading) return <LinearProgress />;
        return (
            <Grid container spacing={2}>
                {currentCartridges.map((cartridge) => (
                    <CartridgeCard key={cartridge.id} cartridge={cartridge} />
                ))}
            </Grid>
        );
    }

    const params = {
        view: "card" as GalleryView,
        handleView: () => null,
        searchValue,
        handleInputChange: (event: BaseSyntheticEvent) => {
            setSearchValue(event.target.value);
        },
    };

    return (
        <InfoGallery title="Console" buttonKeys={[]} hideFilters {...params}>
            {renderGallery()}
        </InfoGallery>
    );
}
