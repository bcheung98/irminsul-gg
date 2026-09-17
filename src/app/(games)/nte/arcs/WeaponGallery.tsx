"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import { NTEWeaponInfoCard } from "@/components/InfoCard";
import WeaponList from "./WeaponList";

// Helper imports
import { categories } from "@/data/categories";

// Type imports
import { NTEWeapon } from "@/types/nte/weapon";

export default function WeaponGallery(props: { weapons: NTEWeapon[] }) {
    const { params, gallery } = useInfoGallery({
        game: "nte",
        galleryKey: "nte/arcs", // Pathname
        filterKey: "nte/weapons", // Data tag
        items: props.weapons,
        views: {
            icon: (weapon) => (
                <NTEWeaponInfoCard key={weapon.id} weapon={weapon} />
            ),
            list: (weapons, isPending) => (
                <WeaponList weapons={weapons} loading={isPending} />
            ),
        },
    });

    return (
        <InfoGallery
            title={categories["nte/weapons"]}
            buttonKeys={["icon", "list"]}
            {...params}
        >
            {gallery}
        </InfoGallery>
    );
}
