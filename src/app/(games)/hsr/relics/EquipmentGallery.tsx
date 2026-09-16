"use client";

import { useState } from "react";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import EquipmentList from "@/components/EquipmentList";
import ToggleButtons from "@/components/ToggleButtons";
import Image from "@/components/Image";
import { HSRRelicInfoCard } from "@/components/InfoCard";

// Helper imports
import { categories } from "@/data/categories";
import { filterEquipment } from "@/helpers/equipment";
import sortItems from "@/helpers/hsr/sortItems";

// Type imports
import { HSRRelic } from "@/types/hsr/relic";
import { InfoGalleryButtonProps } from "@/components/InfoGallery/InfoGallery.types";

type RelicType = "all" | "head" | "orb";

export default function EquipmentGallery(props: { equipment: HSRRelic[] }) {
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

    const { params, gallery } = useInfoGallery({
        game: "hsr",
        galleryKey: "hsr/relics", // Pathname
        items: props.equipment,
        views: {
            icon: (relic) => <HSRRelicInfoCard key={relic.id} relic={relic} />,
            list: (relics) => <EquipmentList equipment={relics} />,
        },
        transformItems: (items, { searchValue }) =>
            filterEquipment(
                sortItems({
                    items,
                    value: "version",
                    reverse: false,
                }),
                searchValue,
                relicType,
            ),
        transformDeps: [relicType],
    });

    return (
        <InfoGallery
            title={categories["hsr/equipment"]}
            buttonKeys={["icon", "list"]}
            hideFilters
            extraButtons={extraButtons}
            {...params}
        >
            {gallery}
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
