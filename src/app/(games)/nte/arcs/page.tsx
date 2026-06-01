import { Suspense } from "react";

// Component imports
import WeaponGallery from "./WeaponGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { NTEWeapon } from "@/types/nte";

export const metadata = getMetadata({ game: "nte", tag: "weapons" });

export default async function Page() {
    const weapons = await getDataSet<NTEWeapon>("nte/arcs");

    return (
        <Suspense fallback={<Loader />}>
            <WeaponGallery weapons={weapons} />
        </Suspense>
    );
}
