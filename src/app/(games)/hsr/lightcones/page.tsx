import { Suspense } from "react";

// Component imports
import WeaponGallery from "./WeaponGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { HSRWeapon } from "@/types/hsr/weapon";

export const metadata = getMetadata({ game: "hsr", tag: "weapons" });

export default async function Page() {
    const weapons = await getDataSet<HSRWeapon>("hsr/lightcones");

    return (
        <Suspense fallback={<Loader />}>
            <WeaponGallery weapons={weapons} />
        </Suspense>
    );
}
