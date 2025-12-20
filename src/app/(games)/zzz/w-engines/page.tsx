import { Suspense } from "react";

// Component imports
import WeaponGallery from "./WeaponGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { ZZZWeapon } from "@/types/zzz/weapon";

export const metadata: Metadata = {
    title: "W-Engines",
    description: "A list of all Zenless Zone Zero W-Engines",
};

export default async function Page() {
    const weapons = await getDataSet<ZZZWeapon>("zzz/w-engines");

    return (
        <Suspense fallback={<Loader />}>
            <WeaponGallery weapons={weapons} />
        </Suspense>
    );
}
