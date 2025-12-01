import { Suspense } from "react";

// Component imports
import WeaponPage from "./WeaponPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData } from "@/lib/fetchData";
import { formatHref } from "@/utils";

// Type imports
import type { Metadata } from "next";
import { HSRWeapon } from "@/types/hsr/weapon";

interface Props {
    params: Promise<{ lightcone: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lightcone } = await params;
    const weaponData = await getData<HSRWeapon>(
        "hsr/lightcones",
        (wep) => formatHref(wep.url) === formatHref(lightcone)
    );

    return {
        title: weaponData?.displayName,
        description: weaponData?.description,
        keywords: [weaponData.displayName, weaponData.name],
    };
}

export default async function Page({ params }: Props) {
    const { lightcone } = await params;
    const weaponData = await getData<HSRWeapon>(
        "hsr/lightcones",
        (wep) => formatHref(wep.url) === formatHref(lightcone)
    );

    return (
        <Suspense fallback={<Loader />}>
            <WeaponPage weapon={weaponData} />
        </Suspense>
    );
}
