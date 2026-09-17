"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import { WuWaWeaponInfoCard } from "@/components/InfoCard";
import WeaponList from "./WeaponList";

// Helper imports
import { categories } from "@/data/categories";

// Type imports
import { WuWaWeapon } from "@/types/wuwa/weapon";

export default function WeaponGallery(props: { weapons: WuWaWeapon[] }) {
    const { params, gallery } = useInfoGallery({
        game: "wuwa",
        galleryKey: "wuwa/weapons", // Pathname
        filterKey: "wuwa/weapons", // Data tag
        items: props.weapons,
        views: {
            icon: (weapon) => (
                <WuWaWeaponInfoCard key={weapon.id} weapon={weapon} />
            ),
            list: (weapons, isPending) => (
                <WeaponList weapons={weapons} loading={isPending} />
            ),
        },
    });

    return (
        <InfoGallery
            title={categories["wuwa/weapons"]}
            buttonKeys={["icon", "list"]}
            {...params}
        >
            {gallery}
        </InfoGallery>
    );
}
