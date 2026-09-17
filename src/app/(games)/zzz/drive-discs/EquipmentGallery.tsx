"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import EquipmentList from "@/components/EquipmentList";
import { ZZZDriveDiscInfoCard } from "@/components/InfoCard";

// Helper imports
import { categories } from "@/data/categories";
import { filterEquipment } from "@/helpers/equipment";
import sortItems from "@/helpers/_sort/zzz";

// Type imports
import { ZZZDriveDisc } from "@/types/zzz/drive-disc";

export default function EquipmentGallery(props: { equipment: ZZZDriveDisc[] }) {
    const { params, gallery } = useInfoGallery({
        game: "zzz",
        galleryKey: "zzz/drive-discs", // Pathname
        items: props.equipment,
        views: {
            icon: (disc) => <ZZZDriveDiscInfoCard key={disc.id} disc={disc} />,
            list: (discs) => <EquipmentList equipment={discs} />,
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
            title={categories["zzz/equipment"]}
            buttonKeys={["icon", "list"]}
            hideFilters
            {...params}
        >
            {gallery}
        </InfoGallery>
    );
}
