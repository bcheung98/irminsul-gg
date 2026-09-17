"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import { HSRWeaponInfoCard } from "@/components/InfoCard";
import WeaponList from "./WeaponList";

// Helper imports
import { categories } from "@/data/categories";

// Type imports
import { HSRWeapon } from "@/types/hsr/weapon";

export default function WeaponGallery(props: { weapons: HSRWeapon[] }) {
    const { params, gallery } = useInfoGallery({
        game: "hsr",
        galleryKey: "hsr/lightcones", // Pathname
        filterKey: "hsr/weapons", // Data tag
        items: props.weapons,
        views: {
            icon: (weapon) => (
                <HSRWeaponInfoCard key={weapon.id} weapon={weapon} />
            ),
            list: (weapons, isPending) => (
                <WeaponList weapons={weapons} loading={isPending} />
            ),
        },
    });

    return (
        <InfoGallery
            title={categories["hsr/weapons"]}
            buttonKeys={["icon", "list"]}
            {...params}
        >
            {gallery}
        </InfoGallery>
    );
}
