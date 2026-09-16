"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import CartridgeCard from "@/components/_nte/CartridgeCard";

// Helper imports
import { categories } from "@/data/categories";
import { filterEquipment } from "@/helpers/equipment";

// Type imports
import { NTECartridge } from "@/types/nte";

export default function EquipmentGallery(props: { equipment: NTECartridge[] }) {
    const { params, gallery } = useInfoGallery({
        game: "nte",
        galleryKey: "nte/console", // Pathname
        items: props.equipment,
        views: {
            icon: (cartridge) => (
                <CartridgeCard key={cartridge.id} cartridge={cartridge} />
            ),
        },
        transformItems: (items, { searchValue }) =>
            filterEquipment(items, searchValue),
    });

    return (
        <InfoGallery
            title={categories["nte/equipment"]}
            buttonKeys={[]}
            hideFilters
            {...params}
        >
            {gallery}
        </InfoGallery>
    );
}
