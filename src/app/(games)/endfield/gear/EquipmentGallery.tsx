"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import GearList from "@/components/_endfield/GearList";
import GearCard from "@/components/_endfield/GearCard";
// import { EndfieldGearInfoCard } from "@/components/InfoCard";

// Helper imports
import { categories } from "@/data/categories";

// Type imports
import { EndfieldGear } from "@/types/endfield";

export default function EquipmentGallery(props: { equipment: EndfieldGear[] }) {
    const { params, gallery } = useInfoGallery({
        game: "endfield",
        galleryKey: "endfield/gear", // Pathname
        filterKey: "endfield/gear", // Data tag
        items: props.equipment,
        views: {
            // icon: (gear) => <EndfieldGearInfoCard key={gear.id} gear={gear} />,
            card: (gear) => <GearCard key={gear.id} gear={gear} />,
            list: (gear) => <GearList gear={gear} />,
        },
    });

    return (
        <InfoGallery
            title={categories["endfield/equipment"]}
            buttonKeys={["card", "list"]}
            {...params}
        >
            {gallery}
        </InfoGallery>
    );
}
