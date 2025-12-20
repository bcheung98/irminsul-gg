"use client";

import { BaseSyntheticEvent, useState, useEffect, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import EquipmentList from "@/components/EquipmentList";
import ToggleButtons from "@/components/ToggleButtons";
import Image from "@/components/Image";
import { HSRRelicInfoCard } from "@/components/InfoCard";

// MUI imports
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useView } from "@/hooks";
import { useStore, useGalleryStore, useSettingsStore } from "@/stores";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { filterEquipment } from "@/helpers/equipment";
import sortItems from "@/helpers/hsr/sortItems";

// Type imports
import { HSRRelic } from "@/types/hsr/relic";
import { InfoGalleryButtonProps } from "@/components/InfoGallery/InfoGallery.types";

type RelicType = "all" | "head" | "orb";

export default function EquipmentGallery(props: { equipment: HSRRelic[] }) {
    const game = "hsr";
    const tag = "hsr/relics";

    const { view } = useGalleryStore(useShallow((state) => state[tag]));

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const relics = sortItems({
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
    const [currentRelics, setCurrentRelics] = useState<HSRRelic[]>([]);

    const [relicType, setRelicType] = useState<RelicType>("all");
    const handleView = (_: React.BaseSyntheticEvent, type: RelicType) => {
        if (type !== null) {
            setRelicType(type);
        }
    };

    const extraButtons = (
        <ToggleButtons
            color="primary"
            buttons={buttonList}
            value={relicType}
            exclusive
            onChange={handleView}
            highlightOnHover={false}
        />
    );

    useEffect(() => {
        startTransition(() => {
            setCurrentRelics(filterEquipment(relics, searchValue, relicType));
        });
    }, [searchValue, hideUnreleasedContent, view, relicType]);

    function renderGallery() {
        switch (view) {
            case "icon":
            default:
                if (loading) return <LinearProgress />;
                return (
                    <Grid container spacing={3}>
                        {currentRelics.map((relic) => (
                            <HSRRelicInfoCard key={relic.id} relic={relic} />
                        ))}
                    </Grid>
                );
            case "list":
                return <EquipmentList equipment={currentRelics} />;
        }
    }

    const params = {
        view,
        handleView: useView(tag),
        searchValue,
        handleInputChange: (event: BaseSyntheticEvent) => {
            setSearchValue(event.target.value);
        },
        extraButtons,
    };

    return (
        <InfoGallery
            title="Relics"
            buttonKeys={["icon", "list"]}
            hideFilters
            {...params}
        >
            {renderGallery()}
        </InfoGallery>
    );
}

const buttonList: InfoGalleryButtonProps[] = [
    {
        value: "all",
        icon: <Image src="hsr/icons/Relic" size={24} />,
        tooltip: "All Relics",
    },
    {
        value: "head",
        icon: <Image src="hsr/icons/relics/head" size={24} />,
        tooltip: "Cavern Relics",
    },
    {
        value: "orb",
        icon: <Image src="hsr/icons/relics/orb" size={24} />,
        tooltip: "Planar Ornaments",
    },
];
