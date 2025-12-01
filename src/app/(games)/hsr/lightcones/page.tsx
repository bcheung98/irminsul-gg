import { Suspense } from "react";

// Component imports
import WeaponGallery from "./WeaponGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { HSRWeapon } from "@/types/hsr/weapon";

export const metadata: Metadata = {
    title: "Weapons",
    description: "A list of all Honkai: Star Rail Light",
};

export default async function Page() {
    const weapons = await getDataSet<HSRWeapon>("hsr/lightcones");

    return (
        <Suspense fallback={<Loader />}>
            <WeaponGallery weapons={weapons} />
        </Suspense>
    );
}
