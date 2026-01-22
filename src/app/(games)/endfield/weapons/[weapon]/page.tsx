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
import { EndfieldWeapon } from "@/types/endfield/weapon";

interface Props {
    params: Promise<{ weapon: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { weapon } = await params;
    const weaponData = await getData<EndfieldWeapon>(
        "endfield/weapons",
        (wep) => formatHref(wep.url) === formatHref(weapon),
    );

    return getMetadata({
        game: "endfield",
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
    const { weapon } = await params;
    const weaponData = await getData<EndfieldWeapon>(
        "endfield/weapons",
        (wep) => formatHref(wep.url) === formatHref(weapon),
    );

    return (
        <Suspense fallback={<Loader />}>
            <WeaponPage weapon={weaponData} />
        </Suspense>
    );
}
