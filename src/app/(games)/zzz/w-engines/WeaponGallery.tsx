"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import { ZZZWeaponInfoCard } from "@/components/InfoCard";
import WeaponList from "./WeaponList";

// Helper imports
import { categories } from "@/data/categories";

// Type imports
import { ZZZWeapon } from "@/types/zzz/weapon";

export default function WeaponGallery(props: { weapons: ZZZWeapon[] }) {
    const { params, gallery } = useInfoGallery({
        game: "zzz",
        galleryKey: "zzz/w-engines", // Pathname
        filterKey: "zzz/weapons", // Data tag
        items: props.weapons,
        views: {
            icon: (weapon) => (
                <ZZZWeaponInfoCard key={weapon.id} weapon={weapon} />
            ),
            list: (weapons, isPending) => (
                <WeaponList weapons={weapons} loading={isPending} />
            ),
        },
    });

    return (
        <InfoGallery
            title={categories["zzz/weapons"]}
            buttonKeys={["icon", "list"]}
            {...params}
        >
            {gallery}
        </InfoGallery>
    );
}
