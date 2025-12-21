import { Suspense } from "react";

// Component imports
import WeaponPage from "./WeaponPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData } from "@/lib/fetchData";
import { formatHref } from "@/utils";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import type { Metadata } from "next";
import { ZZZWeapon } from "@/types/zzz/weapon";

interface Props {
    params: Promise<{ "w-engine": string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { "w-engine": weapon } = await params;
    const weaponData = await getData<ZZZWeapon>(
        "zzz/w-engines",
        (wep) => formatHref(wep.url) === formatHref(weapon)
    );

    return getMetadata({
        game: "zzz",
        tag: "weapons",
        attributes: {
            id: weaponData.id,
            name: weaponData.name,
            displayName: weaponData.displayName,
            rarity: weaponData.rarity,
            weaponType: weaponData.weaponType,
            description: weaponData.description,
        },
    });
}

export default async function Page({ params }: Props) {
    const { "w-engine": weapon } = await params;
    const weaponData = await getData<ZZZWeapon>(
        "zzz/w-engines",
        (wep) => formatHref(wep.url) === formatHref(weapon)
    );

    return (
        <Suspense fallback={<Loader />}>
            <WeaponPage weapon={weaponData} />
        </Suspense>
    );
}
