"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import { EndfieldWeaponInfoCard } from "@/components/InfoCard";
import WeaponList from "./WeaponList";

// Helper imports
import { categories } from "@/data/categories";

// Type imports
import { EndfieldWeapon } from "@/types/endfield/weapon";

export default function WeaponGallery(props: { weapons: EndfieldWeapon[] }) {
    const { params, gallery } = useInfoGallery({
        game: "endfield",
        galleryKey: "endfield/weapons", // Pathname
        filterKey: "endfield/weapons", // Data tag
        items: props.weapons,
        views: {
            icon: (weapon) => (
                <EndfieldWeaponInfoCard key={weapon.id} weapon={weapon} />
            ),
            list: (weapons, isPending) => (
                <WeaponList weapons={weapons} loading={isPending} />
            ),
        },
    });

    return (
        <InfoGallery
            title={categories["endfield/weapons"]}
            buttonKeys={["icon", "list"]}
            {...params}
        >
            {gallery}
        </InfoGallery>
    );
}
