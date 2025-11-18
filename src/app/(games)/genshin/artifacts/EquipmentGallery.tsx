"use client";

import { BaseSyntheticEvent, useState, useEffect, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import EquipmentList from "@/components/EquipmentList";
import { GenshinArtifactInfoCard } from "@/components/InfoCard";

// MUI imports
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useStore, useView } from "@/hooks";
import { useGalleryStore } from "@/stores/useGalleryStore";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { filterEquipment } from "@/helpers/equipment";
import sortItems from "@/helpers/genshin/sortItems";

// Type imports
import { GenshinArtifact } from "@/types/genshin/artifact";

export default function EquipmentGallery(props: {
    equipment: GenshinArtifact[];
}) {
    const game = "genshin";
    const tag = "genshin/artifacts";

    const { view } = useGalleryStore(useShallow((state) => state[tag]));

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const artifacts = sortItems({
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
    const [currentArtifacts, setCurrentArtifacts] = useState<GenshinArtifact[]>(
        []
    );

    useEffect(() => {
        startTransition(() => {
            setCurrentArtifacts(filterEquipment(artifacts, searchValue));
        });
    }, [searchValue, hideUnreleasedContent, view]);

    function renderGallery() {
        switch (view) {
            case "icon":
            default:
                if (loading) return <LinearProgress />;
                return (
                    <Grid container spacing={3}>
                        {currentArtifacts.map((artifact) => (
                            <GenshinArtifactInfoCard
                                key={artifact.id}
                                artifact={artifact}
                            />
                        ))}
                    </Grid>
                );
            case "list":
                return <EquipmentList equipment={currentArtifacts} />;
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
            title="Artifacts"
            buttonKeys={["icon", "list"]}
            hideFilters
            {...params}
        >
            {renderGallery()}
        </InfoGallery>
    );
}
