import { Suspense } from "react";

// Component imports
import WeaponGallery from "./WeaponGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { WuWaWeapon } from "@/types/wuwa";

export const metadata: Metadata = {
    title: "Weapons",
    description: "A list of all Wuthering Waves Weapons",
};

export default async function Page() {
    const weapons = await getDataSet<WuWaWeapon>("wuwa/weapons");

    return (
        <Suspense fallback={<Loader />}>
            <WeaponGallery weapons={weapons} />
        </Suspense>
    );
}
