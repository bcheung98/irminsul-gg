"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import { GenshinWeaponInfoCard } from "@/components/InfoCard";
import WeaponList from "./WeaponList";

// Helper imports
import { categories } from "@/data/categories";

// Type imports
import { GenshinWeapon } from "@/types/genshin/weapon";

export default function WeaponGallery(props: { weapons: GenshinWeapon[] }) {
    const { params, gallery } = useInfoGallery({
        game: "genshin",
        galleryKey: "genshin/weapons", // Pathname
        filterKey: "genshin/weapons", // Data tag
        items: props.weapons,
        views: {
            icon: (weapon) => (
                <GenshinWeaponInfoCard key={weapon.id} weapon={weapon} />
            ),
            list: (weapons, isPending) => (
                <WeaponList weapons={weapons} loading={isPending} />
            ),
        },
    });

    return (
        <InfoGallery
            title={categories["genshin/weapons"]}
            buttonKeys={["icon", "list"]}
            {...params}
        >
            {gallery}
        </InfoGallery>
    );
}
