import { Suspense } from "react";

// Component imports
import WeaponGallery from "./WeaponGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import { GenshinWeapon } from "@/types/genshin/weapon";

export const metadata = getMetadata({ game: "genshin", tag: "weapons" });

export default async function Page() {
    const weapons = await getDataSet<GenshinWeapon>("genshin/weapons");

    return (
        <Suspense fallback={<Loader />}>
            <WeaponGallery weapons={weapons} />
        </Suspense>
    );
}
