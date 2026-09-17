"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import EquipmentList from "@/components/EquipmentList";
import { GenshinArtifactInfoCard } from "@/components/InfoCard";

// Helper imports
import { categories } from "@/data/categories";
import { filterEquipment } from "@/helpers/equipment";
import sortItems from "@/helpers/_sort/genshin";

// Type imports
import { GenshinArtifact } from "@/types/genshin/artifact";

export default function EquipmentGallery(props: {
    equipment: GenshinArtifact[];
}) {
    const { params, gallery } = useInfoGallery({
        game: "genshin",
        galleryKey: "genshin/artifacts", // Pathname
        items: props.equipment,
        views: {
            icon: (artifact) => (
                <GenshinArtifactInfoCard
                    key={artifact.id}
                    artifact={artifact}
                />
            ),
            list: (artifacts) => <EquipmentList equipment={artifacts} />,
        },
        transformItems: (items, { searchValue }) =>
            filterEquipment(
                sortItems({
                    items,
                    value: "version",
                    reverse: false,
                }),
                searchValue,
            ),
    });

    return (
        <InfoGallery
            title={categories["genshin/equipment"]}
            buttonKeys={["icon", "list"]}
            hideFilters
            {...params}
        >
            {gallery}
        </InfoGallery>
    );
}
