import { Suspense } from "react";

// Component imports
import WeaponPage from "./WeaponPage";
import Loader from "@/components/Loader";
import Page404 from "@/components/Page404";

// Helper imports
import { getData } from "@/api";
import { formatHref } from "@/utils";
import { getMetadata } from "@/helpers/metadata";

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
        (wep) => formatHref(wep.url) === formatHref(lightcone),
    );

    return weaponData
        ? getMetadata({
              game: "hsr",
              tag: "weapons",
              attributes: {
                  id: weaponData.id,
                  name: weaponData.name,
                  displayName: weaponData.displayName,
                  rarity: weaponData.rarity,
                  weaponType: weaponData.weaponType,
                  description: weaponData.description,
              },
          })
        : {};
}

export default async function Page({ params }: Props) {
    const { lightcone } = await params;
    const weaponData = await getData<HSRWeapon>(
        "hsr/lightcones",
        (wep) => formatHref(wep.url) === formatHref(lightcone),
    );

    if (!weaponData) {
        return <Page404 />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <WeaponPage weapon={weaponData} />
        </Suspense>
    );
}
