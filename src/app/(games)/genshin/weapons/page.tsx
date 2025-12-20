import { Suspense } from "react";

// Component imports
import WeaponGallery from "./WeaponGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { GenshinWeapon } from "@/types/genshin/weapon";

export const metadata: Metadata = {
    title: "Weapons",
    description: "A list of all Genshin Impact Weapons",
};

export default async function Page() {
    const weapons = await getDataSet<GenshinWeapon>("genshin/weapons");

    return (
        <Suspense fallback={<Loader />}>
            <WeaponGallery weapons={weapons} />
        </Suspense>
    );
}
