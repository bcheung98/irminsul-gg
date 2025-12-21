import { Suspense } from "react";

// Component imports
import WeaponGallery from "./WeaponGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { WuWaWeapon } from "@/types/wuwa";

export const metadata = getMetadata({ game: "wuwa", tag: "weapons" });

export default async function Page() {
    const weapons = await getDataSet<WuWaWeapon>("wuwa/weapons");

    return (
        <Suspense fallback={<Loader />}>
            <WeaponGallery weapons={weapons} />
        </Suspense>
    );
}
