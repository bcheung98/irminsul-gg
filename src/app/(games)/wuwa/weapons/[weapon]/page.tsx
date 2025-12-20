import { Suspense } from "react";

// Component imports
import WeaponPage from "./WeaponPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData } from "@/lib/fetchData";
import { formatHref } from "@/utils";

// Type imports
import type { Metadata } from "next";
import { WuWaWeapon } from "@/types/wuwa/weapon";

interface Props {
    params: Promise<{ weapon: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { weapon } = await params;
    const weaponData = await getData<WuWaWeapon>(
        "wuwa/weapons",
        (wep) => formatHref(wep.url) === formatHref(weapon)
    );

    return {
        title: weaponData?.displayName,
        description: weaponData?.description,
        keywords: [weaponData.displayName, weaponData.name],
    };
}

export default async function Page({ params }: Props) {
    const { weapon } = await params;
    const weaponData = await getData<WuWaWeapon>(
        "wuwa/weapons",
        (wep) => formatHref(wep.url) === formatHref(weapon)
    );

    return (
        <Suspense fallback={<Loader />}>
            <WeaponPage weapon={weaponData} />
        </Suspense>
    );
}
