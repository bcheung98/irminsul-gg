import { Suspense } from "react";

// Component imports
import WeaponGallery from "./WeaponGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { EndfieldWeapon } from "@/types/endfield/weapon";

export const metadata = getMetadata({ game: "endfield", tag: "weapons" });

export default async function Page() {
    const weapons = await getDataSet<EndfieldWeapon>("endfield/weapons");

    return (
        <Suspense fallback={<Loader />}>
            <WeaponGallery weapons={weapons} />
        </Suspense>
    );
}
