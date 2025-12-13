"use client";

import { BaseSyntheticEvent, useState, useEffect, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import EquipmentList from "@/components/EquipmentList";
import { ZZZDriveDiscInfoCard } from "@/components/InfoCard";

// MUI imports
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useView } from "@/hooks";
import { useStore, useGalleryStore, useSettingsStore } from "@/stores";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { filterEquipment } from "@/helpers/equipment";
import sortItems from "@/helpers/zzz/sortItems";

// Type imports
import { ZZZDriveDisc } from "@/types/zzz";

export default function EquipmentGallery(props: { equipment: ZZZDriveDisc[] }) {
    const game = "zzz";
    const tag = "zzz/drive-discs";

    const { view } = useGalleryStore(useShallow((state) => state[tag]));

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const discs = sortItems({
        items: filterUnreleasedContent(
            hideUnreleasedContent,
            props.equipment,
            game
        ),
        value: "version",
        reverse: false,
    });

    const [loading, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState("");
    const [currentDiscs, setCurrentDiscs] = useState<ZZZDriveDisc[]>([]);

    useEffect(() => {
        startTransition(() => {
            setCurrentDiscs(filterEquipment(discs, searchValue));
        });
    }, [searchValue, hideUnreleasedContent, view]);

    function renderGallery() {
        switch (view) {
            case "icon":
            default:
                if (loading) return <LinearProgress />;
                return (
                    <Grid container spacing={3}>
                        {currentDiscs.map((disc) => (
                            <ZZZDriveDiscInfoCard key={disc.id} disc={disc} />
                        ))}
                    </Grid>
                );
            case "list":
                if (loading) return <LinearProgress />;
                return <EquipmentList equipment={currentDiscs} />;
        }
    }

    const params = {
        view,
        handleView: useView(tag),
        searchValue,
        handleInputChange: (event: BaseSyntheticEvent) => {
            setSearchValue(event.target.value);
        },
    };

    return (
        <InfoGallery
            title="Drive Discs"
            buttonKeys={["icon", "list"]}
            hideFilters
            {...params}
        >
            {renderGallery()}
        </InfoGallery>
    );
}
