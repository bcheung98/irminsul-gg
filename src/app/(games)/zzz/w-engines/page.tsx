import { Suspense } from "react";

// Component imports
import WeaponGallery from "./WeaponGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { ZZZWeapon } from "@/types/zzz/weapon";

export const metadata = getMetadata({ game: "zzz", tag: "weapons" });

export default async function Page() {
    const weapons = await getDataSet<ZZZWeapon>("zzz/w-engines");

    return (
        <Suspense fallback={<Loader />}>
            <WeaponGallery weapons={weapons} />
        </Suspense>
    );
}
