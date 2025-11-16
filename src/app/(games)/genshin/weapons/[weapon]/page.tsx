import { Suspense } from "react";

// Component imports
import WeaponPage from "./WeaponPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData } from "@/lib/fetchData";
import { convertNametoURL } from "@/utils";

// Type imports
import type { Metadata } from "next";
import { GenshinWeapon } from "@/types/genshin/weapon";

interface Props {
    params: Promise<{ weapon: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { weapon } = await params;
    const weaponData = await getData<GenshinWeapon>(
        "genshin/weapons",
        (wep) => convertNametoURL(wep.name) === convertNametoURL(weapon)
    );

    return {
        title: weaponData?.displayName,
        description: weaponData?.description,
        keywords: [weaponData.displayName, weaponData.name],
    };
}

export default async function GenshinWeaponPage({ params }: Props) {
    const { weapon } = await params;
    const weaponData = await getData<GenshinWeapon>(
        "genshin/weapons",
        (wep) => convertNametoURL(wep.name) === convertNametoURL(weapon)
    );

    return (
        <Suspense fallback={<Loader />}>
            <WeaponPage weapon={weaponData} />
        </Suspense>
    );
}
